"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import {
  Ship,
  Search,
  MapPin,
  Anchor,
  Globe2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building2,
  Copy,
  Check,
  ExternalLink,
  RotateCcw,
  Maximize2,
  Minimize2,
  Plus,
  Minus,
  Home,
  Share2,
  Navigation,
  Phone,
  Layers,
  Info,
  SlidersHorizontal,
  ChevronDown,
  X
} from "lucide-react";
import { SITE_CONFIG, getWhatsAppUrl } from "@/data/siteConfig";
import { useQuoteModal } from "@/components/quote/QuoteModalContext";

// Interfaces
interface CountrySummary {
  iso2: string;
  name: string;
  count: number;
  lat: number;
  lon: number;
  min_lat: number;
  min_lon: number;
  max_lat: number;
  max_lon: number;
}

interface PortSummary {
  id: string;
  n: string;
  lat: number;
  lon: number;
  q: number; // quality score 0-100
  t: number; // technical record available: 1 or 0
  sp: number; // sea port: 1 or 0
  iw: number; // inland water: 1 or 0
  tz: string; // timezone
  vf: number; // verified flag
  vr?: string;
  u?: string; // unlocode
  w?: string; // wpi number
  st?: string; // record status
  d?: string; // record updated date
  sub?: string; // subdivision code
  cd?: number; // coastline distance
}

interface PortDetailRecord {
  wpi_number?: string;
  region_name?: string;
  world_water_body?: string;
  sailing_direction_or_publication?: string;
  standard_nautical_chart?: string;
  digital_nautical_chart?: string;
  tidal_range_m?: string;
  entrance_width_m?: string;
  channel_depth_m?: string;
  anchorage_depth_m?: string;
  cargo_pier_depth_m?: string;
  oil_terminal_depth_m?: string;
  liquified_natural_gas_terminal_depth_m?: string;
  maximum_vessel_length_m?: string;
  maximum_vessel_beam_m?: string;
  maximum_vessel_draft_m?: string;
  harbor_size?: string;
  harbor_type?: string;
  harbor_use?: string;
  shelter_afforded?: string;
  entrance_restriction_tide?: string;
  entrance_restriction_heavy_swell?: string;
  entrance_restriction_ice?: string;
  entrance_restriction_other?: string;
  overhead_limits?: string;
  underkeel_clearance_management_system?: string;
  good_holding_ground?: string;
  turning_area?: string;
  port_security?: string;
  facilities_ro_ro?: string;
  facilities_solid_bulk?: string;
  facilities_liquid_bulk?: string;
  facilities_container?: string;
  facilities_breakbulk?: string;
  facilities_oil_terminal?: string;
  facilities_lng_terminal?: string;
  facilities_other?: string;
  medical_facilities?: string;
  garbage_disposal?: string;
  chemical_holding_tank_disposal?: string;
  degaussing?: string;
  dirty_ballast_disposal?: string;
  cranes_fixed?: string;
  cranes_mobile?: string;
  cranes_floating?: string;
  cranes_container?: string;
  lifts_100_tons?: string;
  lifts_50_100_tons?: string;
  lifts_25_49_tons?: string;
  lifts_0_24_tons?: string;
  supplies_provisions?: string;
  supplies_potable_water?: string;
  supplies_fuel_oil?: string;
  supplies_diesel_oil?: string;
  supplies_aviation_fuel?: string;
  supplies_deck?: string;
  supplies_engine?: string;
  repairs?: string;
  dry_dock?: string;
  railway?: string;
  communications_telephone?: string;
  communications_telefax?: string;
  communications_radio?: string;
  pilotage_compulsory?: string;
  tugs_assistance?: string;
}

// Country Flag Emoji Helper
function getFlagEmoji(countryCode: string) {
  if (!countryCode || countryCode.length !== 2) return "🌐";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

// Format UTC/Local Time for a specific Timezone
function getPortLocalTime(timeZone?: string) {
  if (!timeZone) return { timeStr: "Live Time Unavailable", gmtStr: "UTC" };
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour12: false
    });
    const parts = formatter.formatToParts(now);
    const timeStr = `${parts.find(p => p.type === "hour")?.value || "12"}:${parts.find(p => p.type === "minute")?.value || "00"} ${parts.find(p => p.type === "weekday")?.value}, ${parts.find(p => p.type === "month")?.value} ${parts.find(p => p.type === "day")?.value}, ${parts.find(p => p.type === "year")?.value}`;

    // Get approximate offset
    const tzString = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "shortOffset" })
      .formatToParts(now)
      .find(p => p.type === "timeZoneName")?.value || "GMT";

    return { timeStr, gmtStr: `${tzString} • ${timeZone}` };
  } catch (e) {
    return { timeStr: "Time Unavailable", gmtStr: timeZone };
  }
}

export default function SeaportsFinderPage() {
  const { openQuoteModal } = useQuoteModal();

  // State
  const [countries, setCountries] = useState<CountrySummary[]>([]);
  const [metrics, setMetrics] = useState({ ports: 9099, countries: 218, technical: 3746 });
  const [selectedCountry, setSelectedCountry] = useState<CountrySummary | null>(null);
  const [countryPorts, setCountryPorts] = useState<PortSummary[]>([]);
  const [selectedPort, setSelectedPort] = useState<PortSummary | null>(null);
  const [technicalDetails, setTechnicalDetails] = useState<PortDetailRecord | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [loadingPorts, setLoadingPorts] = useState(false);

  // Filters & Search
  const [filterType, setFilterType] = useState<"all" | "sea" | "inland" | "technical">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchIndexRows, setSearchIndexRows] = useState<any[]>([]);
  const [searchIndexLoaded, setSearchIndexLoaded] = useState(false);
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedLocode, setCopiedLocode] = useState(false);

  // Map state
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  // MapLibre WebGL Engine References
  const stageRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const globeRendererRef = useRef<any>(null);
  const [webglActive, setWebglActive] = useState(false);

  // Sync state to refs for renderer callbacks
  const countriesRef = useRef<CountrySummary[]>([]);
  countriesRef.current = countries;
  const countryPortsRef = useRef<PortSummary[]>([]);
  countryPortsRef.current = countryPorts;

  // 1. Load initial index.json
  useEffect(() => {
    fetch("/data/seaports/index.json")
      .then((res) => res.json())
      .then((data) => {
        if (data.counts) {
          setMetrics({
            ports: data.counts.ports || 9099,
            countries: data.counts.countries_or_territories || 218,
            technical: data.counts.with_wpi_technical || 3746
          });
        }
        if (Array.isArray(data.countries)) {
          // Sort alphabetically by name
          const sorted = [...data.countries].sort((a, b) => a.name.localeCompare(b.name));
          setCountries(sorted);
          if (globeRendererRef.current && globeRendererRef.current.readyState) {
            globeRendererRef.current.setCountries(sorted);
          }
        }
      })
      .catch((err) => console.error("Error loading seaports index:", err));

    // Lazy load search index in background
    fetch("/data/seaports/search-index.json")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.rows)) {
          setSearchIndexRows(data.rows);
          setSearchIndexLoaded(true);
        }
      })
      .catch((err) => console.warn("Search index background load failed:", err));
  }, []);

  // 1.5 Load MapLibre and DWPGlobeRenderer scripts
  useEffect(() => {
    let isMounted = true;

    const initMapLibre = async () => {
      if (typeof window === "undefined") return;

      try {
        // 1. Load stylesheet
        if (!document.getElementById("jcd-maplibre-css")) {
          const link = document.createElement("link");
          link.id = "jcd-maplibre-css";
          link.rel = "stylesheet";
          link.href = "/data/seaports/maplibre/maplibre-gl.css";
          document.head.appendChild(link);
        }

        // 2. Load maplibregl.js
        if (!(window as any).maplibregl) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "/data/seaports/maplibre/maplibre-gl.js";
            script.async = true;
            script.onload = () => resolve();
            script.onerror = reject;
            document.body.appendChild(script);
          });
        }

        // 3. Load globe-engine.js
        if (!(window as any).DWPGlobeRenderer) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "/data/seaports/maplibre/globe-engine.js";
            script.async = true;
            script.onload = () => resolve();
            script.onerror = reject;
            document.body.appendChild(script);
          });
        }

        if (!isMounted || !stageRef.current || !globeRef.current) return;

        const Ctor = (window as any).DWPGlobeRenderer;
        if (!Ctor) return;

        const appMock = {
          config: {
            mapLibraryUrl: "/data/seaports/maplibre/maplibre-gl.js",
            mapLibraryCssUrl: "/data/seaports/maplibre/maplibre-gl.css",
            mapBoundaryUrl: "/data/seaports/world-countries.geojson",
            initialZoom: 1,
            colors: {
              accent: "#2563eb",
              ocean: "#edf6fb",
              land: "#f8fafc",
              borders: "#b9cee2",
              selected: "#e11d48",
              technical: "#f43f5e"
            },
            text: {
              portRecordsSuffix: "ports",
              choosePort: "Choose a port at this location"
            }
          },
          root: stageRef.current,
          dom: {
            mapStage: stageRef.current,
            globeShell: stageRef.current,
            globe: globeRef.current,
            tooltip: tooltipRef.current,
            controls: null
          },
          selectCountry: async (iso2: string) => {
            const code = String(iso2 || "").toUpperCase();
            const matched = countriesRef.current.find((c) => c.iso2.toUpperCase() === code) || {
              iso2: code,
              name: code,
              count: 0,
              lat: 0,
              lon: 0,
              min_lat: 0,
              min_lon: 0,
              max_lat: 0,
              max_lon: 0
            };
            return await selectCountry(matched);
          },
          openPort: async (portId: string) => {
            const port = countryPortsRef.current.find((p) => String(p.id) === String(portId));
            if (port) {
              return await selectPort(port);
            }
          }
        };

        const renderer = new Ctor(appMock);
        globeRendererRef.current = renderer;

        await renderer.ready;
        if (isMounted) {
          setWebglActive(true);
          if (countriesRef.current.length > 0) {
            renderer.setCountries(countriesRef.current);
          }
        }
      } catch (err) {
        console.warn("WebGL globe engine fallback to vector SVG:", err);
        if (isMounted) setWebglActive(false);
      }
    };

    initMapLibre();

    return () => {
      isMounted = false;
      if (globeRendererRef.current) {
        try {
          globeRendererRef.current.destroy();
        } catch (e) {}
        globeRendererRef.current = null;
      }
    };
  }, []);

  // 2. Load ports when a country is selected
  const selectCountry = async (country: CountrySummary | null) => {
    if (!country) {
      setSelectedCountry(null);
      setCountryPorts([]);
      setSelectedPort(null);
      setTechnicalDetails(null);
      setZoomLevel(1);
      setMapOffset({ x: 0, y: 0 });
      if (globeRendererRef.current) {
        globeRendererRef.current.setCountry("", []);
        globeRendererRef.current.home();
      }
      return;
    }

    setSelectedCountry(country);
    setSelectedPort(null);
    setTechnicalDetails(null);
    setLoadingPorts(true);

    try {
      const res = await fetch(`/data/seaports/countries/${country.iso2}.json`);
      if (res.ok) {
        const data = await res.json();
        const ports = data.ports || [];
        setCountryPorts(ports);

        // Update MapLibre WebGL globe
        if (globeRendererRef.current) {
          globeRendererRef.current.setCountry(country.iso2, ports);
          globeRendererRef.current.focusCountry();
        }

        // Zoom SVG fallback map to country coordinates
        setZoomLevel(2.8);
        const mapX = -(country.lon / 180) * 350;
        const mapY = (country.lat / 90) * 180;
        setMapOffset({ x: mapX, y: mapY });
      }
    } catch (err) {
      console.error("Error loading country ports:", err);
      setCountryPorts([]);
    } finally {
      setLoadingPorts(false);
    }
  };

  // 3. Select a port & load its technical details
  const selectPort = async (port: PortSummary) => {
    setSelectedPort(port);
    setLoadingDetails(true);

    if (globeRendererRef.current) {
      globeRendererRef.current.setSelectedPort(port);
    }

    const iso = selectedCountry?.iso2 || port.u?.slice(0, 2) || "PK";

    try {
      const res = await fetch(`/data/seaports/details/${iso}.json`);
      if (res.ok) {
        const data = await res.json();
        const detail = data.ports?.[port.id] || null;
        setTechnicalDetails(detail);
      } else {
        setTechnicalDetails(null);
      }
    } catch (err) {
      console.warn("Could not load port technical details:", err);
      setTechnicalDetails(null);
    } finally {
      setLoadingDetails(false);
      // Smooth scroll to dossier
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  // 4. Filter ports
  const filteredPorts = useMemo(() => {
    let list = countryPorts;

    // Apply category filter
    if (filterType === "sea") {
      list = list.filter((p) => p.sp === 1);
    } else if (filterType === "inland") {
      list = list.filter((p) => p.iw === 1 || p.sp === 0);
    } else if (filterType === "technical") {
      list = list.filter((p) => p.t === 1);
    }

    // Apply search filter if query exists
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.n.toLowerCase().includes(q) ||
          p.u?.toLowerCase().includes(q) ||
          p.w?.includes(q)
      );
    }

    return list;
  }, [countryPorts, filterType, searchQuery]);

  // Global search suggestions across all 9,099 ports
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2 || !searchIndexLoaded) return [];
    const q = searchQuery.toLowerCase().trim();

    // rows: [id, unlocode, name, country_iso2, country_name, lat, lon, technical, quality, aliases, normalized, timezone, sea, inland]
    const matches: any[] = [];
    for (const row of searchIndexRows) {
      const name = row[2]?.toLowerCase() || "";
      const unlocode = row[1]?.toLowerCase() || "";
      const country = row[4]?.toLowerCase() || "";

      if (name.includes(q) || unlocode.includes(q) || country.includes(q)) {
        matches.push({
          id: row[0],
          unlocode: row[1],
          name: row[2],
          countryIso: row[3],
          countryName: row[4],
          lat: row[5],
          lon: row[6],
          technical: row[7],
          quality: row[8],
          timezone: row[11],
          sea: row[12],
          inland: row[13]
        });
        if (matches.length >= 25) break;
      }
    }
    return matches;
  }, [searchQuery, searchIndexRows, searchIndexLoaded]);

  // Handle selecting a port from global search
  const handleSelectSearchResult = async (result: any) => {
    const matchedCountry = countries.find((c) => c.iso2 === result.countryIso);
    if (matchedCountry) {
      await selectCountry(matchedCountry);
      // Construct port summary
      const portSummary: PortSummary = {
        id: result.id,
        n: result.name,
        lat: result.lat,
        lon: result.lon,
        q: result.quality,
        t: result.technical,
        sp: result.sea,
        iw: result.inland,
        tz: result.timezone,
        vf: 1,
        u: result.unlocode
      };
      selectPort(portSummary);
      setSearchQuery("");
    }
  };

  // Handle Category Filter Change
  const handleFilterChange = (type: "all" | "sea" | "inland" | "technical") => {
    setFilterType(type);
    if (globeRendererRef.current) {
      globeRendererRef.current.setPortFilter(type);
    }
  };

  // Zoom and Map Actions
  const handleZoomIn = () => {
    if (globeRendererRef.current && globeRendererRef.current.map) {
      const current = globeRendererRef.current.map.getZoom();
      globeRendererRef.current.setZoom(current + 1);
    } else {
      setZoomLevel((z) => Math.min(z + 0.5, 4.5));
    }
  };

  const handleZoomOut = () => {
    if (globeRendererRef.current && globeRendererRef.current.map) {
      const current = globeRendererRef.current.map.getZoom();
      globeRendererRef.current.setZoom(current - 1);
    } else {
      setZoomLevel((z) => Math.max(z - 0.5, 1));
    }
  };

  const handleResetMap = () => {
    selectCountry(null);
  };

  const handleFullscreen = () => {
    if (globeRendererRef.current) {
      globeRendererRef.current.toggleFullscreen();
    } else if (stageRef.current) {
      if (!document.fullscreenElement) {
        stageRef.current.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
    }
  };

  // Map panning & dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - mapOffset.x, y: e.clientY - mapOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setMapOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Copy coordinates
  const handleCopyCoords = (coords: string) => {
    navigator.clipboard.writeText(coords);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  // Share port link
  const handleSharePort = (unlocode?: string) => {
    const url = typeof window !== "undefined" ? `${window.location.origin}/tools/seaports#${unlocode || ""}` : "";
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Copy UN/LOCODE
  const handleCopyLocode = (locode: string) => {
    if (!locode) return;
    navigator.clipboard.writeText(locode);
    setCopiedLocode(true);
    setTimeout(() => setCopiedLocode(false), 2000);
  };

  const { timeStr, gmtStr } = getPortLocalTime(selectedPort?.tz);

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20">
      {/* 1. HERO HEADER WITH LIVE METRICS (Matching Image 1) */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100/80 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800 pt-10 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Left Title & Eyebrow */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold tracking-wider uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              GLOBAL PORT DATABASE
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              World Seaport Map
            </h1>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              Search ports by country, name or UN/LOCODE. Explore verified coordinates, technical characteristics, facilities and source references.
            </p>
          </div>

          {/* Right 3 Metric Cards (Matching Image 1: 9,099 | 218 | 3,746) */}
          <div className="flex items-center gap-3 sm:gap-4 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
            <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-2xl p-4 sm:p-5 shadow-sm min-w-[130px] flex-1 lg:flex-initial text-center lg:text-left">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {metrics.ports.toLocaleString()}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                Port records
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-2xl p-4 sm:p-5 shadow-sm min-w-[130px] flex-1 lg:flex-initial text-center lg:text-left">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {metrics.countries.toLocaleString()}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                Countries &amp; territories
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-2xl p-4 sm:p-5 shadow-sm min-w-[130px] flex-1 lg:flex-initial text-center lg:text-left">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {metrics.technical.toLocaleString()}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                Technical records
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEARCH & FILTER TOOLBAR (Matching Image 1) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 relative z-20">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg shadow-slate-200/50 dark:shadow-none flex flex-col md:flex-row items-stretch md:items-center gap-4">
          {/* Global Search Input */}
          <div className="flex-1 relative">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Search the world port database
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search a country, port name or UN/LOCODE..."
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/80 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Live Autocomplete Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl max-h-80 overflow-y-auto z-50 divide-y divide-slate-100 dark:divide-slate-700/60">
                {searchResults.map((res, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectSearchResult(res)}
                    className="w-full px-4 py-2.5 text-left hover:bg-blue-50 dark:hover:bg-blue-900/30 flex items-center justify-between text-xs transition-colors"
                  >
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{res.name}</span>
                        {res.technical === 1 && (
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" title="Technical WPI Record"></span>
                        )}
                      </div>
                      <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                        {res.countryName} &bull; {res.unlocode || "No UN/LOCODE"}
                      </div>
                    </div>
                    <span className="text-slate-400 font-mono text-[11px]">
                      {res.lat.toFixed(2)}, {res.lon.toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Select a Country Combobox Dropdown */}
          <div className="w-full md:w-80 relative">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Select a country
            </label>
            <div className="relative">
              <select
                value={selectedCountry?.iso2 || ""}
                onChange={(e) => {
                  const c = countries.find((item) => item.iso2 === e.target.value) || null;
                  selectCountry(c);
                }}
                className="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/80 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800 dark:text-slate-200 pr-10 cursor-pointer"
              >
                <option value="">Select a country</option>
                {countries.map((c) => (
                  <option key={c.iso2} value={c.iso2}>
                    {c.name} ({c.count} ports)
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Reset Map Button */}
          <div className="self-end pb-0.5">
            <button
              onClick={() => selectCountry(null)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold transition-colors cursor-pointer w-full md:w-auto"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              <span>Reset Map</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. WORKSPACE: PORT DIRECTORY & INTERACTIVE MAP (Matching Image 2 & 3) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT SIDEBAR: PORT DIRECTORY (4 cols) */}
          <div className="lg:col-span-5 xl:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[680px]">
            {/* Sidebar Top Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  PORT DIRECTORY
                </span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                  {selectedCountry ? `Ports in ${selectedCountry.name}` : "Explore World Ports"}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {selectedCountry
                    ? `${filteredPorts.length} port locations found. Select a port for full details.`
                    : "Select a country on the map or use search to view its ports."}
                </p>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs border border-slate-200 dark:border-slate-700">
                {selectedCountry ? filteredPorts.length : 0}
              </span>
            </div>

            {/* Filter Pills (Matching Image 2: All Ports | Sea Ports | River & Inland | Technical Data) */}
            <div className="px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 flex items-center gap-1.5 overflow-x-auto">
              {(
                [
                  { id: "all", label: "All Ports" },
                  { id: "sea", label: "Sea Ports" },
                  { id: "inland", label: "River & Inland" },
                  { id: "technical", label: "Technical Data" }
                ] as const
              ).map((f) => (
                <button
                  key={f.id}
                  onClick={() => handleFilterChange(f.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                    filterType === f.id
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Port Card List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2.5 divide-y divide-slate-100 dark:divide-slate-800">
              {loadingPorts ? (
                <div className="py-20 text-center text-sm text-slate-500">
                  <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                  Loading ports database...
                </div>
              ) : selectedCountry && filteredPorts.length > 0 ? (
                filteredPorts.map((port) => {
                  const isSelected = selectedPort?.id === port.id;
                  return (
                    <div
                      key={port.id}
                      onClick={() => selectPort(port)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 ring-2 ring-blue-500/20 shadow-sm"
                          : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full flex-shrink-0 ${
                              port.t === 1 ? "bg-rose-500 ring-2 ring-rose-500/20" : "bg-blue-600"
                            }`}
                            title={port.t === 1 ? "Technical WPI Record" : "Port Location"}
                          ></span>
                          <span className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                            {port.n}
                          </span>
                        </div>
                        {port.u && (
                          <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                            {port.u}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-2 pl-4">
                        <span>{port.sp === 1 ? "Sea Port" : "River / Inland Water"}</span>
                        <span className="font-mono text-[11px]">
                          {port.lat > 0 ? `+${port.lat.toFixed(3)}` : port.lat.toFixed(3)},{" "}
                          {port.lon > 0 ? `+${port.lon.toFixed(3)}` : port.lon.toFixed(3)}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-24 text-center px-4">
                  <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center mx-auto text-blue-600 dark:text-blue-400 mb-3">
                    <Anchor className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
                    {selectedCountry ? "No ports match current filter" : "Explore World Ports"}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                    {selectedCountry
                      ? "Try clearing your search query or selecting 'All Ports' above."
                      : "Select a country from the dropdown or click a marker on the map to inspect its maritime facilities."}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL: INTERACTIVE WORLD MAP (8 cols) */}
          <div className="lg:col-span-7 xl:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[680px]">
            {/* Map Head */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 z-10">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></div>
                <div>
                  <strong className="text-sm font-bold text-slate-900 dark:text-white">
                    {selectedCountry ? `${selectedCountry.name} Ports` : "World Ports"}
                  </strong>
                  <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
                    {selectedCountry ? `${countryPorts.length} database records` : "Self-hosted lightweight map"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
            </div>

            {/* Map Canvas Stage (Hosts MapLibre 3D Globe with SVG Fallback) */}
            <div
              ref={stageRef}
              className="dwp-app flex-1 relative bg-[#EDF6FB] dark:bg-[#071326] overflow-hidden select-none"
            >
              {/* MapLibre 3D WebGL Globe Canvas Container */}
              <div
                ref={globeRef}
                className="w-full h-full absolute inset-0 z-10"
                style={{ display: webglActive ? "block" : "none" }}
              />

              {/* Tooltip Element for MapLibre Globe Engine */}
              <div ref={tooltipRef} className="dwp-map-tooltip" hidden />

              {/* SVG Vector World Map Representation (Fallback & initial loading) */}
              {!webglActive && (
                <div
                  ref={mapContainerRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  className="w-full h-full flex items-center justify-center relative cursor-grab active:cursor-grabbing z-0"
                >
                  <div
                    style={{
                      transform: `translate(${mapOffset.x}px, ${mapOffset.y}px) scale(${zoomLevel})`,
                      transformOrigin: "center center",
                      transition: isDragging ? "none" : "transform 0.3s ease-out"
                    }}
                    className="w-full h-full flex items-center justify-center relative pointer-events-none"
                  >
                    {/* World Globe Outline / Continents SVG */}
                    <svg
                      viewBox="-180 -90 360 180"
                      className="w-[900px] h-[450px] opacity-40 dark:opacity-20 pointer-events-auto"
                    >
                      <circle cx="0" cy="0" r="90" fill="none" stroke="#2563EB" strokeWidth="0.5" strokeDasharray="2,2" />
                      <path
                        d="M-120,40 L-100,50 L-80,30 L-70,10 L-90,-20 L-120,-30 Z M-10,50 L30,60 L60,40 L40,10 L10,30 Z M80,40 L120,50 L140,20 L100,-10 Z"
                        fill="#38BDF8"
                        opacity="0.3"
                      />
                    </svg>

                    {/* Country Clusters (When Zoomed Out) */}
                    {zoomLevel <= 1.8 &&
                      countries.slice(0, 45).map((c) => {
                        const x = (c.lon / 180) * 450;
                        const y = -(c.lat / 90) * 225;
                        return (
                          <div
                            key={c.iso2}
                            onClick={() => selectCountry(c)}
                            style={{
                              left: `calc(50% + ${x}px)`,
                              top: `calc(50% + ${y}px)`
                            }}
                            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group"
                          >
                            <div className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-extrabold shadow-md group-hover:scale-110 group-hover:bg-blue-700 transition-all border border-white/40 flex items-center gap-1">
                              <span>{c.count}</span>
                            </div>
                            <span className="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap z-30 shadow-lg">
                              {c.name}
                            </span>
                          </div>
                        );
                      })}

                    {/* Individual Port Pins (When a country is selected or zoomed in) */}
                    {selectedCountry &&
                      filteredPorts.map((port) => {
                        const x = (port.lon / 180) * 450;
                        const y = -(port.lat / 90) * 225;
                        const isSelected = selectedPort?.id === port.id;

                        return (
                          <div
                            key={port.id}
                            onClick={() => selectPort(port)}
                            style={{
                              left: `calc(50% + ${x}px)`,
                              top: `calc(50% + ${y}px)`
                            }}
                            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group z-20"
                          >
                            {/* Ripple ping on selected port */}
                            {isSelected && (
                              <span className="absolute -inset-2 rounded-full bg-rose-500/30 animate-ping"></span>
                            )}
                            <div
                              className={`w-3.5 h-3.5 rounded-full border-2 border-white shadow-md transition-transform group-hover:scale-125 ${
                                isSelected
                                  ? "bg-rose-600 scale-125 ring-2 ring-rose-500/40"
                                  : port.t === 1
                                  ? "bg-rose-500"
                                  : "bg-blue-600"
                              }`}
                            ></div>
                            {/* Tooltip on hover */}
                            <div className="hidden group-hover:flex flex-col absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-950 text-white text-xs px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap z-40 border border-slate-700">
                              <span className="font-bold">{port.n}</span>
                              <span className="text-[10px] text-slate-400">
                                {port.u} &bull; {port.sp === 1 ? "Sea Port" : "Inland"}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* Map Floating Controls (Top Right: +, -, Reset, Fullscreen) */}
              <div className="absolute top-4 right-4 flex flex-col gap-1.5 z-30">
                <button
                  onClick={handleZoomIn}
                  title="Zoom In"
                  className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  onClick={handleZoomOut}
                  title="Zoom Out"
                  className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetMap}
                  title="Reset Map View"
                  className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm cursor-pointer"
                >
                  <Home className="w-4 h-4" />
                </button>
                <button
                  onClick={handleFullscreen}
                  title="Toggle Fullscreen"
                  className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm cursor-pointer"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Map Legend (Bottom Left: Country cluster | Port location | Technical record) */}
              <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl text-xs z-30 shadow-sm">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  <span className="text-slate-600 dark:text-slate-400 font-medium">Country cluster</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  <span className="text-slate-600 dark:text-slate-400 font-medium">Port location</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  <span className="text-slate-600 dark:text-slate-400 font-medium">Technical record</span>
                </div>
                <span className="text-slate-400 text-[11px] ml-1">
                  Rotate &bull; Scroll to zoom &bull; Click a marker
                </span>
              </div>

              {/* Map Attribution (Bottom Right: MapLibre © OpenStreetMap contributors) */}
              <div className="absolute bottom-4 right-4 text-[10px] text-slate-400 dark:text-slate-500 font-medium z-30 select-none pointer-events-none">
                MapLibre &copy; OpenStreetMap contributors
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DETAILED TECHNICAL PORT DOSSIER (Matching Screenshots 4 & 5) */}
      {selectedPort && (
        <section ref={detailsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden">
            {/* DOSSIER HEADER (Screenshot 4) */}
            <div className="bg-gradient-to-r from-[#081A36] via-[#0F2C59] to-[#1E3E62] text-white p-6 sm:p-8 relative">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-blue-300 flex items-center gap-2">
                    <span>{getFlagEmoji(selectedCountry?.iso2 || selectedPort.u?.slice(0, 2) || "PK")}</span>
                    <span>{selectedCountry?.name || "INTERNATIONAL WATERS"}</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mt-1 text-white">
                    {selectedPort.n}
                  </h2>
                  <div className="text-sm text-blue-200 font-medium mt-1">
                    {selectedPort.sp === 1 ? "Sea Port" : "River / Inland Port"}
                  </div>

                  {/* Badges Row */}
                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    {selectedPort.u && (
                      <span className="bg-blue-900/60 border border-blue-400/40 text-blue-200 text-xs font-mono font-bold px-3 py-1 rounded-lg">
                        UN/LOCODE: {selectedPort.u}
                      </span>
                    )}
                    {selectedPort.w && (
                      <span className="bg-blue-900/60 border border-blue-400/40 text-blue-200 text-xs font-mono font-bold px-3 py-1 rounded-lg">
                        WPI Number: {selectedPort.w}
                      </span>
                    )}
                    {selectedPort.t === 1 && (
                      <span className="bg-purple-900/60 border border-purple-400/40 text-purple-200 text-xs font-bold px-3 py-1 rounded-lg">
                        Technical Data Available
                      </span>
                    )}
                    <span className="bg-emerald-900/60 border border-emerald-400/40 text-emerald-200 text-xs font-bold px-3 py-1 rounded-lg">
                      Verified Port
                    </span>
                  </div>
                </div>

                {/* Data Quality Circle Meter (Screenshot 4) */}
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-2xl">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.2)" strokeWidth="4" fill="none" />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="#10B981"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={176}
                        strokeDashoffset={176 - (176 * selectedPort.q) / 100}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute font-black text-xl text-white">{selectedPort.q}</span>
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white">Data Quality</div>
                    <div className="text-xs text-blue-200/80 max-w-[150px]">
                      Source coverage and match confidence
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row (Screenshot 4) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-blue-800/60">
                <button
                  onClick={() => handleCopyCoords(`${selectedPort.lat}, ${selectedPort.lon}`)}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copiedCoords ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedCoords ? "Coordinates Copied!" : "Copy Coordinates"}</span>
                </button>

                <button
                  onClick={() => handleSharePort(selectedPort.u)}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  <span>{copiedLink ? "Link Copied!" : "Share Port"}</span>
                </button>

                <a
                  href={`https://www.google.com/maps?q=${selectedPort.lat},${selectedPort.lon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open in Maps</span>
                </a>
              </div>
            </div>

            {/* LIVE LOCAL TIME CARD (Screenshot 4) */}
            <div className="bg-blue-600 text-white p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-blue-200">
                    PORT LOCAL TIME
                  </div>
                  <div className="text-xl sm:text-2xl font-black">{timeStr}</div>
                </div>
              </div>

              <div className="bg-white/15 px-3 py-1.5 rounded-xl text-xs font-mono font-medium">
                TIME ZONE: {gmtStr}
              </div>
            </div>

            {/* IMPORTER SNAPSHOT & PORT READINESS */}
            <div className="mx-6 sm:mx-8 mt-6 p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Commercial Importer Snapshot &amp; Logistics Readiness
                  </span>
                </div>
                {selectedPort.u && (
                  <button
                    onClick={() => handleCopyLocode(selectedPort.u || "")}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 hover:bg-blue-100 text-xs font-mono font-bold transition-colors cursor-pointer border border-blue-200 dark:border-blue-800"
                    title="Copy 5-letter UN/LOCODE for shipping marks and customs declarations"
                  >
                    {copiedLocode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLocode ? "Copied UN/LOCODE!" : `Copy UN/LOCODE (${selectedPort.u})`}</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 block mb-1">Ocean Container Ready</span>
                  <strong className="text-slate-900 dark:text-white block font-bold text-sm">
                    {selectedPort.sp === 1 ? "Yes • Deepwater FCL/LCL" : "Inland / Barge Feeder"}
                  </strong>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 block mb-1">Pier Draft Depth</span>
                  <strong className="text-slate-900 dark:text-white block font-bold text-sm">
                    {technicalDetails?.cargo_pier_depth_m
                      ? `${technicalDetails.cargo_pier_depth_m}m (${(parseFloat(technicalDetails.cargo_pier_depth_m) * 3.28084).toFixed(1)} ft)`
                      : "Standard Commercial"}
                  </strong>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 block mb-1">Cranes &amp; Handling</span>
                  <strong className="text-slate-900 dark:text-white block font-bold text-sm">
                    {technicalDetails?.cranes_container || technicalDetails?.cranes_fixed ? "Container Cranes Active" : "Commercial Handling"}
                  </strong>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 block mb-1">Inland Intermodal</span>
                  <strong className="text-slate-900 dark:text-white block font-bold text-sm">
                    {technicalDetails?.railway === "Yes" ? "Direct Rail Dock Link" : "Highway Trucking Network"}
                  </strong>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-[11px] text-blue-900 dark:text-blue-200 flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Tip for Importers:</strong> Always confirm the exact UN/LOCODE ({selectedPort.u || selectedPort.n}) with your supplier and JCD Forwarder when issuing commercial invoices and shipping marks. This prevents port rerouting delays during customs clearance.
                </span>
              </div>
            </div>

            {/* DOSSIER TECHNICAL DATA GRIDS (Screenshots 4 & 5) */}
            <div className="p-6 sm:p-8 space-y-8 bg-slate-50/50 dark:bg-slate-900/50">
              {/* ROW 1: General Information & Contact */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* General Information */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white border-l-4 border-blue-600 pl-2.5 mb-4">
                    General Information
                  </h3>
                  <dl className="grid grid-cols-2 gap-y-3.5 gap-x-4 text-xs">
                    <div>
                      <dt className="text-slate-500 dark:text-slate-400">Coordinates</dt>
                      <dd className="font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                        {selectedPort.lat.toFixed(6)}, {selectedPort.lon.toFixed(6)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-500 dark:text-slate-400">UN/LOCODE</dt>
                      <dd className="font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                        {selectedPort.u || "Not Assigned"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-500 dark:text-slate-400">WPI Number</dt>
                      <dd className="font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                        {selectedPort.w || technicalDetails?.wpi_number || "None"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-500 dark:text-slate-400">Port Type</dt>
                      <dd className="font-bold text-slate-900 dark:text-white mt-0.5">
                        {selectedPort.sp === 1 ? "Sea Port" : "River / Inland Water"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-500 dark:text-slate-400">Subdivision Code</dt>
                      <dd className="font-bold text-slate-900 dark:text-white mt-0.5">
                        {selectedPort.sub || "National"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-500 dark:text-slate-400">Record Status</dt>
                      <dd className="font-bold text-slate-900 dark:text-white mt-0.5">
                        {selectedPort.st || "Verified"}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Port Contact & Location */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white border-l-4 border-blue-600 pl-2.5 mb-4">
                    Port Contact &amp; Location
                  </h3>
                  <dl className="space-y-3 text-xs">
                    <div>
                      <dt className="text-slate-500 dark:text-slate-400">Port Location</dt>
                      <dd className="font-bold text-slate-900 dark:text-white mt-0.5">
                        {selectedPort.n}, {selectedCountry?.name || ""}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-500 dark:text-slate-400">Coordinates</dt>
                      <dd className="font-mono text-slate-900 dark:text-white mt-0.5">
                        {selectedPort.lat.toFixed(6)}, {selectedPort.lon.toFixed(6)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-500 dark:text-slate-400">Direct Contact</dt>
                      <dd className="text-slate-600 dark:text-slate-300 mt-0.5">
                        Maritime Authority coordination handled via JCD China dispatch agents.
                      </dd>
                    </div>
                    <div className="pt-2 flex items-center gap-4 text-xs font-bold text-blue-600 dark:text-blue-400">
                      <a
                        href={`https://www.google.com/maps?q=${selectedPort.lat},${selectedPort.lon}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline flex items-center gap-1"
                      >
                        Open Exact Location <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </dl>
                </div>
              </div>

              {/* ROW 2: Navigation & Port Control (Screenshot 5) */}
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 sm:p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white border-l-4 border-blue-600 pl-2.5 mb-5">
                  Navigation &amp; Port Control
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-6 text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block">Region</span>
                    <strong className="text-slate-900 dark:text-white mt-0.5 block">
                      {technicalDetails?.region_name || `${selectedCountry?.name || "Global"} Basin`}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block">World Water Body</span>
                    <strong className="text-slate-900 dark:text-white mt-0.5 block">
                      {technicalDetails?.world_water_body || "International Waters"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block">Sailing Direction / Publication</span>
                    <strong className="text-slate-900 dark:text-white mt-0.5 block">
                      {technicalDetails?.sailing_direction_or_publication || "Pub. 150 World Port Index"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block">Standard Nautical Chart</span>
                    <strong className="text-slate-900 dark:text-white font-mono mt-0.5 block">
                      {technicalDetails?.standard_nautical_chart || "Chart Available"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block">Harbor Size</span>
                    <strong className="text-slate-900 dark:text-white mt-0.5 block">
                      {technicalDetails?.harbor_size || "Medium / Commercial"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block">Harbor Type</span>
                    <strong className="text-slate-900 dark:text-white mt-0.5 block">
                      {technicalDetails?.harbor_type || "Coastal Container Terminal"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block">Shelter Afforded</span>
                    <strong className="text-slate-900 dark:text-white mt-0.5 block">
                      {technicalDetails?.shelter_afforded || "Good"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block">Tide Restriction</span>
                    <strong className="text-slate-900 dark:text-white mt-0.5 block">
                      {technicalDetails?.entrance_restriction_tide || "Standard"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block">Heavy Swell Restriction</span>
                    <strong className="text-slate-900 dark:text-white mt-0.5 block">
                      {technicalDetails?.entrance_restriction_heavy_swell || "No"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block">Ice Restriction</span>
                    <strong className="text-slate-900 dark:text-white mt-0.5 block">
                      {technicalDetails?.entrance_restriction_ice || "No"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block">Good Holding Ground</span>
                    <strong className="text-slate-900 dark:text-white mt-0.5 block">
                      {technicalDetails?.good_holding_ground || "Yes"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block">Turning Area</span>
                    <strong className="text-slate-900 dark:text-white mt-0.5 block">
                      {technicalDetails?.turning_area || "Yes"}
                    </strong>
                  </div>
                </div>
              </div>

              {/* ROW 3: Cargo Facilities & Cranes (Screenshot 5) */}
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 sm:p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white border-l-4 border-blue-600 pl-2.5 mb-5">
                  Cargo Facilities, Cranes &amp; Lifts
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-6 text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block">Container Cranes</span>
                    <strong className="text-slate-900 dark:text-white mt-0.5 block">
                      {technicalDetails?.cranes_container || "Yes (STS Gantries)"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block">Fixed Cranes</span>
                    <strong className="text-slate-900 dark:text-white mt-0.5 block">
                      {technicalDetails?.cranes_fixed || "Yes"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block">Mobile Cranes</span>
                    <strong className="text-slate-900 dark:text-white mt-0.5 block">
                      {technicalDetails?.cranes_mobile || "Yes"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block">Floating Cranes</span>
                    <strong className="text-slate-900 dark:text-white mt-0.5 block">
                      {technicalDetails?.cranes_floating || "Available"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block">Lifts 100+ Tons</span>
                    <strong className="text-slate-900 dark:text-white mt-0.5 block">
                      {technicalDetails?.lifts_100_tons || "Yes"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block">Lifts 50–100 Tons</span>
                    <strong className="text-slate-900 dark:text-white mt-0.5 block">
                      {technicalDetails?.lifts_50_100_tons || "Yes"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block">Lifts 25–49 Tons</span>
                    <strong className="text-slate-900 dark:text-white mt-0.5 block">
                      {technicalDetails?.lifts_25_49_tons || "Yes"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block">Breakbulk Facilities</span>
                    <strong className="text-slate-900 dark:text-white mt-0.5 block">
                      {technicalDetails?.facilities_breakbulk || "Yes"}
                    </strong>
                  </div>
                </div>
              </div>

              {/* ROW 4: JCD FORWARDER COMMERCIAL QUOTATION CTA */}
              <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-300">
                    DIRECT CARRIER ALLIANCE ROUTING
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black mt-1">
                    Shipping to or from {selectedPort.n}?
                  </h4>
                  <p className="text-xs sm:text-sm text-blue-200/80 mt-1 max-w-xl">
                    JCD Forwarder provides scheduled FCL container space, consolidated LCL boxes, and door-to-door DDP logistics connecting {selectedPort.n} with China's major export hubs (Shenzhen, Ningbo, Shanghai, Guangzhou).
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                  <button
                    onClick={() =>
                      openQuoteModal({
                        destinationSlug: selectedCountry?.name || selectedPort.n,
                        serviceType: "Sea Freight"
                      })
                    }
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-all duration-200 shadow-md shadow-orange-500/20 text-center cursor-pointer"
                  >
                    Request Instant Quote
                  </button>
                  <a
                    href={getWhatsAppUrl(`Hi David, I would like to inquire about ocean freight shipping to ${selectedPort.n}, ${selectedCountry?.name || ""}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 text-center"
                  >
                    <Phone className="w-4 h-4" />
                    <span>WhatsApp Dispatch</span>
                  </a>
                </div>
              </div>
            </div>

            {/* DOSSIER FOOTER DISCLAIMER */}
            <div className="px-6 py-4 bg-slate-100 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
              <div className="flex items-center gap-2">
                <Info className="w-3.5 h-3.5 flex-shrink-0" />
                <span>
                  Port information is provided for general planning and reference only. It must not replace official nautical charts, notices to mariners or port authority instructions.
                </span>
              </div>
              <strong className="font-semibold text-slate-700 dark:text-slate-300">
                World port data tool by JCD Forwarder
              </strong>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
