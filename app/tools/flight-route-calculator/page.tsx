"use client";

import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { getWhatsAppUrl } from "@/data/siteConfig";
import { useQuoteModal } from "@/components/quote/QuoteModalContext";
import {
  GLOBAL_COUNTRIES,
  CountryGroup,
  CityAirport,
  findCountry,
  findAirport,
  getCountryFlag
} from "./airports-data";
import {
  Plane,
  MapPin,
  Clock,
  RotateCcw,
  Play,
  Pause,
  Maximize2,
  Minimize2,
  Plus,
  Minus,
  Copy,
  Check,
  Share2,
  ArrowRight,
  ArrowUpDown,
  ShieldCheck,
  Calendar,
  Info,
  FileText,
  CheckCircle2,
  HelpCircle,
  Phone,
  ChevronDown,
  Globe2,
  ExternalLink,
  Layers,
  Star,
  Compass,
  SlidersHorizontal,
  Ticket,
  LayoutGrid
} from "lucide-react";

// Haversine Great Circle distance calculation in kilometers
function calculateGreatCircleDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's mean radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// Generate intermediate great-circle points along the shortest arc
function generateGeodesicArc(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  numPoints: number = 80
): [number, number][] {
  const points: [number, number][] = [];
  const p1Lat = (lat1 * Math.PI) / 180;
  const p1Lon = (lon1 * Math.PI) / 180;
  const p2Lat = (lat2 * Math.PI) / 180;
  const p2Lon = (lon2 * Math.PI) / 180;

  let dLon = p2Lon - p1Lon;
  if (dLon > Math.PI) dLon -= 2 * Math.PI;
  if (dLon < -Math.PI) dLon += 2 * Math.PI;

  const d =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin((p2Lat - p1Lat) / 2), 2) +
          Math.cos(p1Lat) * Math.cos(p2Lat) * Math.pow(Math.sin(dLon / 2), 2)
      )
    );

  if (d === 0) return [[lon1, lat1], [lon2, lat2]];

  for (let i = 0; i <= numPoints; i++) {
    const f = i / numPoints;
    const A = Math.sin((1 - f) * d) / Math.sin(d);
    const B = Math.sin(f * d) / Math.sin(d);
    const x = A * Math.cos(p1Lat) * Math.cos(p1Lon) + B * Math.cos(p2Lat) * Math.cos(p1Lon + dLon);
    const y = A * Math.cos(p1Lat) * Math.sin(p1Lon) + B * Math.cos(p2Lat) * Math.sin(p1Lon + dLon);
    const z = A * Math.sin(p1Lat) + B * Math.sin(p2Lat);
    const lat = Math.atan2(z, Math.sqrt(x * x + y * y));
    let lon = Math.atan2(y, x);
    let lonDeg = (lon * 180) / Math.PI;

    while (lonDeg > 180) lonDeg -= 360;
    while (lonDeg < -180) lonDeg += 360;

    points.push([lonDeg, (lat * 180) / Math.PI]);
  }

  return points;
}

// Sanitize segments so lines don't cross the antimeridian horizontally in 2D
function splitArcAtAntimeridian(arc: [number, number][]): [number, number][][] {
  const segments: [number, number][][] = [];
  let currentSegment: [number, number][] = [];

  for (let i = 0; i < arc.length; i++) {
    if (i > 0 && Math.abs(arc[i][0] - arc[i - 1][0]) > 180) {
      segments.push(currentSegment);
      currentSegment = [];
    }
    currentSegment.push(arc[i]);
  }
  if (currentSegment.length > 0) {
    segments.push(currentSegment);
  }
  return segments;
}

// Calculate bearing between two coordinates for airplane rotation
function calculateBearing(start: [number, number], end: [number, number]): number {
  const startLat = (start[1] * Math.PI) / 180;
  const startLon = (start[0] * Math.PI) / 180;
  const endLat = (end[1] * Math.PI) / 180;
  const endLon = (end[0] * Math.PI) / 180;
  const y = Math.sin(endLon - startLon) * Math.cos(endLat);
  const x =
    Math.cos(startLat) * Math.sin(endLat) -
    Math.sin(startLat) * Math.cos(endLat) * Math.cos(endLon - startLon);
  const bearing = (Math.atan2(y, x) * 180) / Math.PI;
  return (bearing + 360) % 360;
}

export default function FlightRouteCalculatorPage() {
  const { openQuoteModal } = useQuoteModal();

  // State: Default Origin: China -> Guangzhou (CAN)
  // Default Destination: Philippines -> Manila (MNL) (Matches DDPChain reference image exactly!)
  const [originCountryCode, setOriginCountryCode] = useState<string>("CN");
  const [originAirportCode, setOriginAirportCode] = useState<string>("CAN");

  const [destCountryCode, setDestCountryCode] = useState<string>("PH");
  const [destAirportCode, setDestAirportCode] = useState<string>("MNL");

  // Dynamic Country Groups
  const originCountry = useMemo(() => {
    return GLOBAL_COUNTRIES.find((c) => c.code === originCountryCode) || GLOBAL_COUNTRIES[0];
  }, [originCountryCode]);

  const destCountry = useMemo(() => {
    return (
      GLOBAL_COUNTRIES.find((c) => c.code === destCountryCode) ||
      GLOBAL_COUNTRIES.find((c) => c.code === "PH") ||
      GLOBAL_COUNTRIES[1]
    );
  }, [destCountryCode]);

  // Selected CityAirports
  const originAirport = useMemo(() => {
    return (
      originCountry.airports.find((a) => a.code === originAirportCode) ||
      originCountry.airports[0]
    );
  }, [originCountry, originAirportCode]);

  const destAirport = useMemo(() => {
    return (
      destCountry.airports.find((a) => a.code === destAirportCode) ||
      destCountry.airports[0]
    );
  }, [destCountry, destAirportCode]);

  // Handle Country selection changes
  const handleOriginCountryChange = (code: string) => {
    setOriginCountryCode(code);
    const country = GLOBAL_COUNTRIES.find((c) => c.code === code);
    if (country && country.airports.length > 0) {
      setOriginAirportCode(country.airports[0].code);
    }
  };

  const handleDestCountryChange = (code: string) => {
    setDestCountryCode(code);
    const country = GLOBAL_COUNTRIES.find((c) => c.code === code);
    if (country && country.airports.length > 0) {
      setDestAirportCode(country.airports[0].code);
    }
  };

  // Swap Origin and Destination
  const handleSwap = () => {
    const prevOriginCountry = originCountryCode;
    const prevOriginAirport = originAirportCode;
    const prevDestCountry = destCountryCode;
    const prevDestAirport = destAirportCode;

    setOriginCountryCode(prevDestCountry);
    setOriginAirportCode(prevDestAirport);
    setDestCountryCode(prevOriginCountry);
    setDestAirportCode(prevOriginAirport);
  };

  // Great Circle Distance
  const distanceKm = useMemo(() => {
    return calculateGreatCircleDistance(
      originAirport.lat,
      originAirport.lon,
      destAirport.lat,
      destAirport.lon
    );
  }, [originAirport, destAirport]);

  const distanceNm = useMemo(() => Math.round(distanceKm * 0.539957), [distanceKm]);

  // Flight time calculation: 750 km/h effective planning speed + 0.5h taxi/climb
  const flightTimeHoursFloat = useMemo(() => {
    return distanceKm / 750 + 0.5;
  }, [distanceKm]);

  const flightTimeHours = Math.floor(flightTimeHoursFloat);
  const flightTimeMinutes = Math.round((flightTimeHoursFloat - flightTimeHours) * 60);

  // Customs complexity
  const customsComplexity = destAirport.customsComplexity || "Moderate";
  const customsDays = destAirport.customsDays || "2-4 business days";
  const destHandlingDays = destAirport.destHandlingDays || "1-2 business days";

  // Total Estimated Shipping Time
  const totalShippingDays = useMemo(() => {
    if (customsComplexity === "Low") return "4-8 business days";
    if (customsComplexity === "Moderate") return "5-10 business days";
    if (customsComplexity === "Strict") return "7-14 business days";
    return "5-11 business days";
  }, [customsComplexity]);

  // Map Controls State
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [is3D, setIs3D] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeInfoTab, setActiveInfoTab] = useState<"docs" | "regs">("docs");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mapEngineLoaded, setMapEngineLoaded] = useState<boolean>(false);

  // MapLibre Instance Refs
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const planeMarkerRef = useRef<any>(null);
  const originMarkerRef = useRef<any>(null);
  const destMarkerRef = useRef<any>(null);
  const animFrameRef = useRef<number | null>(null);
  const animProgressRef = useRef<number>(0);
  const arcPointsRef = useRef<[number, number][]>([]);

  // 1. Load MapLibre GL JS & CSS
  useEffect(() => {
    let isMounted = true;

    const loadMapLibre = async () => {
      if (typeof window === "undefined") return;

      try {
        if (!document.getElementById("maplibre-gl-css")) {
          const link = document.createElement("link");
          link.id = "maplibre-gl-css";
          link.rel = "stylesheet";
          link.href = "/data/seaports/maplibre/maplibre-gl.css";
          document.head.appendChild(link);
        }

        if (!(window as any).maplibregl) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "/data/seaports/maplibre/maplibre-gl.js";
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error("MapLibre script failed to load"));
            document.body.appendChild(script);
          });
        }

        if (isMounted) {
          setMapEngineLoaded(true);
        }
      } catch (err) {
        console.warn("MapLibre load fallback:", err);
      }
    };

    loadMapLibre();

    return () => {
      isMounted = false;
    };
  }, []);

  // Update Flight Path, Markers and Animation on Map
  const updateFlightPathOnMap = useCallback(
    (map: any, origin: CityAirport, dest: CityAirport) => {
      if (!map) return;

      const maplibregl = (window as any).maplibregl;
      if (!maplibregl) return;

      // 1. Calculate Geodesic Arc
      const arc = generateGeodesicArc(origin.lat, origin.lon, dest.lat, dest.lon, 80);
      arcPointsRef.current = arc;

      // 2. Split segments if crossing antimeridian to avoid horizontal wrap line
      const segments = splitArcAtAntimeridian(arc);
      const isMulti = segments.length > 1;

      const routeGeoJson = {
        type: "Feature",
        geometry: isMulti
          ? {
              type: "MultiLineString",
              coordinates: segments
            }
          : {
              type: "LineString",
              coordinates: arc
            },
        properties: {}
      };

      if (map.getSource("flight-corridor")) {
        map.getSource("flight-corridor").setData(routeGeoJson);
      } else {
        map.addSource("flight-corridor", {
          type: "geojson",
          data: routeGeoJson
        });

        // Vibrant Coral/Red flight line matching DDPChain reference
        map.addLayer({
          id: "flight-route-core",
          type: "line",
          source: "flight-corridor",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: {
            "line-color": "#FF5733",
            "line-width": 3.2,
            "line-opacity": 0.95
          }
        });
      }

      // 3. Setup Origin Marker (Pill with Flag & Airplane Anchor Icon - exact to DDPChain reference)
      if (originMarkerRef.current) originMarkerRef.current.remove();
      const originEl = document.createElement("div");
      originEl.className = "jcd-city-marker origin-city pointer-events-none";
      originEl.innerHTML = `
        <div class="flex flex-col items-center">
          <div class="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl shadow-md border border-slate-200/90 flex flex-col items-center">
            <span class="font-extrabold text-xs text-slate-900 tracking-tight leading-tight">${origin.city}</span>
            <span class="text-[10px] text-slate-500 font-semibold flex items-center gap-1 mt-0.5">${getCountryFlag(origin.countryCode)} ${origin.country}</span>
          </div>
          <div class="w-6 h-6 rounded-full bg-[#1E293B] text-white flex items-center justify-center shadow-md border-2 border-white -mt-1">
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
            </svg>
          </div>
        </div>
      `;
      originMarkerRef.current = new maplibregl.Marker({ element: originEl, anchor: "bottom" })
        .setLngLat([origin.lon, origin.lat])
        .addTo(map);

      // 4. Setup Destination Marker (Pill with Flag & Red Anchor Dot)
      if (destMarkerRef.current) destMarkerRef.current.remove();
      const destEl = document.createElement("div");
      destEl.className = "jcd-city-marker dest-city pointer-events-none";
      destEl.innerHTML = `
        <div class="flex flex-col items-center">
          <div class="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl shadow-md border border-slate-200/90 flex flex-col items-center">
            <span class="font-extrabold text-xs text-slate-900 tracking-tight leading-tight">${dest.city}</span>
            <span class="text-[10px] text-slate-500 font-semibold flex items-center gap-1 mt-0.5">${getCountryFlag(dest.countryCode)} ${dest.country}</span>
          </div>
          <div class="w-3.5 h-3.5 rounded-full bg-[#EF4444] border-2 border-white shadow-md -mt-1"></div>
        </div>
      `;
      destMarkerRef.current = new maplibregl.Marker({ element: destEl, anchor: "bottom" })
        .setLngLat([dest.lon, dest.lat])
        .addTo(map);

      // 5. Setup Animated Plane Marker (Navy Airplane Flying Along Arc)
      if (planeMarkerRef.current) planeMarkerRef.current.remove();
      const planeEl = document.createElement("div");
      planeEl.id = "animated-airplane";
      planeEl.className = "jcd-plane-marker pointer-events-none";
      planeEl.innerHTML = `
        <div class="w-7 h-7 rounded-full bg-[#1E293B] text-white shadow-xl flex items-center justify-center border-2 border-white">
          <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
          </svg>
        </div>
      `;
      planeMarkerRef.current = new maplibregl.Marker({ element: planeEl, anchor: "center" })
        .setLngLat([origin.lon, origin.lat])
        .addTo(map);

      // 6. Smoothly Fit Map Bounds with Left Padding for the Floating Card
      const bounds = new maplibregl.LngLatBounds();
      bounds.extend([origin.lon, origin.lat]);
      bounds.extend([dest.lon, dest.lat]);

      // Provide generous left padding so route appears centered to the right of the selector
      const isMobile = window.innerWidth < 768;
      map.fitBounds(bounds, {
        padding: {
          top: 80,
          bottom: 80,
          left: isMobile ? 30 : 380,
          right: isMobile ? 30 : 90
        },
        maxZoom: 6,
        duration: 1200,
        essential: true
      });

      animProgressRef.current = 0;
    },
    []
  );

  // 2. Initialize MapLibre with CartoDB Positron Tiles (Exact match to DDPChain)
  useEffect(() => {
    if (!mapEngineLoaded || !mapContainerRef.current) return;
    const maplibregl = (window as any).maplibregl;
    if (!maplibregl) return;

    // High-definition Positron vector map style (100% free, no watermark, no API key required)
    // Supports optional CARTO API key via NEXT_PUBLIC_CARTO_API_KEY if desired
    const cartoKey = process.env.NEXT_PUBLIC_CARTO_API_KEY;
    const style = cartoKey
      ? {
          version: 8,
          sources: {
            "carto-positron": {
              type: "raster",
              tiles: [
                `https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png?api_key=${cartoKey}`,
                `https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png?api_key=${cartoKey}`,
                `https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png?api_key=${cartoKey}`
              ],
              tileSize: 256
            }
          },
          layers: [
            {
              id: "carto-tiles",
              type: "raster",
              source: "carto-positron",
              minzoom: 0,
              maxzoom: 18
            }
          ]
        }
      : "https://tiles.openfreemap.org/styles/positron";

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: style,
      center: [117, 18],
      zoom: 3.5,
      minZoom: 1,
      maxZoom: 12,
      bearing: 0,
      pitch: 0,
      attributionControl: false
    });

    mapInstanceRef.current = map;

    map.on("load", () => {
      updateFlightPathOnMap(map, originAirport, destAirport);
    });

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [mapEngineLoaded]);

  // Trigger route refresh when origin or destination changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (map && map.isStyleLoaded()) {
      updateFlightPathOnMap(map, originAirport, destAirport);
    }
  }, [originAirport, destAirport, updateFlightPathOnMap]);

  // Plane Flight Animation Loop
  useEffect(() => {
    if (!isPlaying) return;

    let startTime = performance.now();
    const duration = 10000; // 10 seconds per flight cycle

    const animatePlane = (currentTime: number) => {
      const elapsed = (currentTime - startTime) % duration;
      const progress = elapsed / duration;
      animProgressRef.current = progress;

      const arc = arcPointsRef.current;
      if (arc.length > 1 && planeMarkerRef.current) {
        const indexFloat = progress * (arc.length - 1);
        const index = Math.floor(indexFloat);
        const nextIndex = Math.min(index + 1, arc.length - 1);
        const frac = indexFloat - index;

        const currentLon = arc[index][0] + (arc[nextIndex][0] - arc[index][0]) * frac;
        const currentLat = arc[index][1] + (arc[nextIndex][1] - arc[index][1]) * frac;

        planeMarkerRef.current.setLngLat([currentLon, currentLat]);

        const bearing = calculateBearing(arc[index], arc[nextIndex]);
        const planeEl = document.getElementById("animated-airplane");
        if (planeEl) {
          planeEl.style.transform = `rotate(${bearing}deg)`;
        }
      }

      animFrameRef.current = requestAnimationFrame(animatePlane);
    };

    animFrameRef.current = requestAnimationFrame(animatePlane);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  // Map Controls Handlers
  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn({ duration: 300 });
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut({ duration: 300 });
  };

  const handleResetView = () => {
    if (mapInstanceRef.current) {
      updateFlightPathOnMap(mapInstanceRef.current, originAirport, destAirport);
    }
  };

  const handleToggle3D = () => {
    const next3D = !is3D;
    setIs3D(next3D);
    if (mapInstanceRef.current && mapInstanceRef.current.setProjection) {
      try {
        mapInstanceRef.current.setProjection({ type: next3D ? "globe" : "mercator" });
      } catch (e) {
        console.warn("Projection toggle:", e);
      }
    }
  };

  const handleToggleFullscreen = () => {
    if (!mapWrapperRef.current) return;
    if (!document.fullscreenElement) {
      mapWrapperRef.current.requestFullscreen().catch((err) => console.warn(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => console.warn(err));
      setIsFullscreen(false);
    }
  };

  const handleCopySummary = () => {
    const summary = `AIR FREIGHT ROUTE ESTIMATE (JCD FORWARDER)
Origin: ${originAirport.city}, ${originAirport.country} (${originAirport.code})
Destination: ${destAirport.city}, ${destAirport.country} (${destAirport.code})
Distance: ${distanceKm.toLocaleString()} km (${distanceNm.toLocaleString()} NM)
Est. Direct Flight Time: ${flightTimeHours}h ${flightTimeMinutes}m
Destination Customs Complexity: ${customsComplexity} (${customsDays})
Est. Total Door-to-Door Shipping Time: ${totalShippingDays}
Route Link: https://jcdforwarder.com/tools/flight-route-calculator`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareRoute = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Air Route: ${originAirport.city} to ${destAirport.city}`,
          text: `Air route distance: ${distanceKm} km, Flight time: ${flightTimeHours}h ${flightTimeMinutes}m`,
          url: window.location.href
        })
        .catch(() => {});
    } else {
      handleCopySummary();
    }
  };

  // FAQ list
  const FAQS = [
    {
      q: "What is an Air Freight Distance Calculator?",
      a: "An Air Freight Distance Calculator estimates the great-circle geodesic route distance between two global cities. It calculates the realistic airport-to-airport flight cruising hours, evaluates destination customs complexity, and outlines the complete door-to-door transit schedule."
    },
    {
      q: "How do I calculate the air freight distance between two cities?",
      a: "Simply select your origin country and city (e.g. China - Guangzhou), then choose any destination country and city worldwide (e.g. Philippines - Manila). The interactive map immediately centers, plots the flight path, and displays the full timeline."
    },
    {
      q: "How is the estimated flight time calculated?",
      a: "Estimated flight time is calculated using great-circle geodesic navigation math with an effective long-haul cargo aircraft cruising speed of 750 km/h (Boeing 747-8F / 777F model), plus a standard 30-minute allowance for airport taxi, air traffic climb, and final approach sequencing."
    },
    {
      q: "Does the calculator show total air freight transit time?",
      a: "Yes. In addition to pure flight cruising hours, the calculator outlines all 4 stages of international freight: 1) Origin Cargo Handling (1-2 days), 2) Air Transit, 3) Destination Terminal Processing (1-2 days), and 4) Destination Customs Clearance (typically 1-4 business days depending on the country)."
    },
    {
      q: "Can I compare different air freight routes and airports?",
      a: "Absolutely. You can switch between different departure hubs in China (such as Guangzhou CAN, Shenzhen SZX, Shanghai PVG, or Hong Kong HKG) and various international arrival airports to compare flight distances, airline space allocations, and customs clearance timelines."
    },
    {
      q: "How accurate is the destination customs clearance estimate?",
      a: "The estimates are based on current World Customs Organization (WCO) clearance standards, automated electronic single-window clearance systems (like US CBP ACE, EU ICS2, UK CDS, or Pakistan WeBOC), and JCD Forwarder's real-world DDP delivery timelines."
    },
    {
      q: "What documents are required for international air freight from China?",
      a: "Standard air cargo requires a Commercial Invoice (CI), Export Packing List (PL), and Air Waybill (AWB). For cargo containing batteries, liquids, or powders, an accredited MSDS (Material Safety Data Sheet) and UN38.3 battery test report are also required."
    },
    {
      q: "Can JCD Forwarder handle door-to-door delivery with customs cleared?",
      a: "Yes! JCD Forwarder specializes in complete DDP (Delivered Duty Paid) air freight from China. We handle pickup from your Chinese factory, export declaration, direct air cargo flight, import customs clearance, duty payment, and final truck/courier delivery directly to your door or Amazon FBA warehouse."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* 1. HERO HEADER SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#081B38] via-[#0C244C] to-[#081B38] text-white pt-10 pb-12">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-3xl space-y-4">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
                <Plane className="w-3.5 h-3.5 text-orange-400" />
                <span>Free Air Freight Planning Tool</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Air Freight Distance <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
                  Calculator
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg font-semibold text-blue-200">
                Plan Routes. Estimate Transit Time.
              </p>

              <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                Calculate air freight distance between two cities, estimate airport-to-airport flight time,
                review destination customs complexity, and plan the complete shipping timeline in seconds.
              </p>

              {/* Feature Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-200 bg-white/5 border border-white/10 rounded-xl p-2.5">
                  <Globe2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Global Airport Coverage</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200 bg-white/5 border border-white/10 rounded-xl p-2.5">
                  <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>Real-time Route Estimation</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200 bg-white/5 border border-white/10 rounded-xl p-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Customs & Transit Insights</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200 bg-white/5 border border-white/10 rounded-xl p-2.5">
                  <FileText className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Plan, Compare & Export</span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 pt-2 text-xs text-slate-300">
                <span className="flex items-center gap-1 text-rose-400">
                  ❤️ Rate our tools!
                </span>
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-white">5/5</span>
                <span>(verified importer rating)</span>
              </div>
            </div>

            {/* Quick Consultation CTA */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={() =>
                  openQuoteModal({
                    originId: `${originAirport.city}, ${originAirport.country}`,
                    destinationSlug: `${destAirport.city}, ${destAirport.country}`,
                    serviceType: "Air Freight"
                  })
                }
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm shadow-lg shadow-orange-500/20 text-center cursor-pointer transition-all"
              >
                Quote Now →
              </button>
              <a
                href={getWhatsAppUrl(
                  `Hi David, I am calculating an air freight route from ${originAirport.city} to ${destAirport.city} (${distanceKm} km). Can you provide current air cargo space & DDP rates?`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp / WeChat</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE MAP STAGE WITH FLOATING SELECTOR CARD (Exact match to DDPChain Image 2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div
          ref={mapWrapperRef}
          className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-[#EAF0F6] dark:bg-slate-900 min-h-[600px]"
        >
          {/* Map Area - Full-stage immersive canvas matching DDPChain */}
          <div className="relative w-full h-[640px] sm:h-[680px] bg-[#EAF0F6] dark:bg-slate-900">
            {/* MapLibre Map Container with CartoDB Positron tiles */}
            <div
              ref={mapContainerRef}
              className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
            />

            {/* Loading Indicator */}
            {!mapEngineLoaded && (
              <div className="absolute inset-0 bg-[#EAF0F6] flex flex-col items-center justify-center text-slate-600 space-y-3 z-10">
                <div className="w-10 h-10 rounded-full border-4 border-orange-500/20 border-t-orange-500 animate-spin" />
                <span className="text-xs font-bold tracking-wider uppercase text-slate-500">
                  Loading Air Route Map...
                </span>
              </div>
            )}

            {/* FLOATING ORIGIN & DESTINATION SELECTOR CARD (Exact match to DDPChain Image 2) */}
            <div className="absolute top-6 left-6 z-30 w-[340px] sm:w-[360px] max-w-[calc(100%-3rem)]">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-100 dark:border-slate-800 space-y-5">
                {/* ORIGIN SECTION */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-orange-50 dark:bg-orange-950/40 flex items-center justify-center text-orange-500">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm font-black text-slate-900 dark:text-white">
                      Origin
                    </span>
                  </div>

                  {/* Country Field */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      COUNTRY
                    </label>
                    <div className="relative">
                      <select
                        value={originCountryCode}
                        onChange={(e) => handleOriginCountryChange(e.target.value)}
                        className="w-full appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-100 pr-9 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all cursor-pointer shadow-xs"
                      >
                        {GLOBAL_COUNTRIES.map((c) => (
                          <option key={`orig-cntry-${c.code}`} value={c.code}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* City Field */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      CITY
                    </label>
                    <div className="relative">
                      <select
                        value={originAirportCode}
                        onChange={(e) => setOriginAirportCode(e.target.value)}
                        className="w-full appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-100 pr-9 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all cursor-pointer shadow-xs"
                      >
                        {originCountry.airports.map((a) => (
                          <option key={`orig-city-${a.code}`} value={a.code}>
                            {a.city}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* SWAP BUTTON (Centered on divider line) */}
                <div className="relative flex items-center justify-center py-1">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-100 dark:border-slate-800" />
                  </div>
                  <button
                    onClick={handleSwap}
                    title="Swap Origin & Destination"
                    className="relative z-10 w-9 h-9 rounded-full bg-[#F3F6FA] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-orange-500 hover:bg-orange-50 hover:border-orange-300 dark:hover:border-orange-500/50 transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                {/* DESTINATION SECTION */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-500">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm font-black text-slate-900 dark:text-white">
                      Destination
                    </span>
                  </div>

                  {/* Country Field (80+ Countries dynamic) */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      COUNTRY
                    </label>
                    <div className="relative">
                      <select
                        value={destCountryCode}
                        onChange={(e) => handleDestCountryChange(e.target.value)}
                        className="w-full appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-100 pr-9 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all cursor-pointer shadow-xs"
                      >
                        {GLOBAL_COUNTRIES.map((c) => (
                          <option key={`dest-cntry-${c.code}`} value={c.code}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* City Field (Dynamically populated) */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      CITY
                    </label>
                    <div className="relative">
                      <select
                        value={destAirportCode}
                        onChange={(e) => setDestAirportCode(e.target.value)}
                        className="w-full appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-100 pr-9 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all cursor-pointer shadow-xs"
                      >
                        {destCountry.airports.map((a) => (
                          <option key={`dest-city-${a.code}`} value={a.code}>
                            {a.city}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Calculate CTA Button (Exact match to DDPChain Image 2) */}
                <button
                  onClick={() => {
                    const el = document.getElementById("results-summary-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#FF5733] hover:bg-[#E64A19] text-white font-bold text-xs shadow-lg shadow-orange-500/25 text-center cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  <span>Calculate Route & Time</span>
                  <Ticket className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* FLOATING MAP CONTROLS TOOLBAR (Right Side - Exact match to DDPChain reference) */}
            <div className="absolute top-6 right-6 z-30 flex flex-col gap-2">
              {/* Zoom In */}
              <button
                onClick={handleZoomIn}
                title="Zoom In"
                className="w-9 h-9 rounded-xl bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:text-orange-500 hover:border-orange-300 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>

              {/* Zoom Out */}
              <button
                onClick={handleZoomOut}
                title="Zoom Out"
                className="w-9 h-9 rounded-xl bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:text-orange-500 hover:border-orange-300 transition-all cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>

              {/* Reset Center */}
              <button
                onClick={handleResetView}
                title="Re-center Route"
                className="w-9 h-9 rounded-xl bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:text-orange-500 hover:border-orange-300 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Play / Pause Plane Animation (Orange icon button like DDPChain) */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                title={isPlaying ? "Pause Flight Animation" : "Play Flight Animation"}
                className="w-9 h-9 rounded-xl bg-[#FF5733] hover:bg-[#E64A19] text-white shadow-md flex items-center justify-center transition-all cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
              </button>

              {/* 2D / 3D Toggle */}
              <button
                onClick={handleToggle3D}
                title={is3D ? "Switch to 2D Mercator Map" : "Switch to 3D Globe Projection"}
                className="w-9 h-9 rounded-xl bg-white shadow-md border border-slate-200 flex items-center justify-center text-xs font-black text-slate-700 hover:text-orange-500 hover:border-orange-300 transition-all cursor-pointer"
              >
                {is3D ? "3D" : "2D"}
              </button>

              {/* Grid / Fullscreen */}
              <button
                onClick={handleToggleFullscreen}
                title="Toggle Fullscreen Canvas"
                className="w-9 h-9 rounded-xl bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:text-orange-500 hover:border-orange-300 transition-all cursor-pointer"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR KEY METRIC CARDS (Est. Flight time, Distance, Avg speed, Destination customs) */}
      <section id="results-summary-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Est. Flight Time */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>Est. flight time</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {flightTimeHours}h {flightTimeMinutes}m
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              Estimated direct flight time
            </div>
          </div>

          {/* 2. Distance */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <Compass className="w-4 h-4 text-emerald-500" />
              <span>Distance</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {distanceKm.toLocaleString()} km
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              Great-circle route estimate
            </div>
          </div>

          {/* 3. Avg Speed */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <Plane className="w-4 h-4 text-amber-500" />
              <span>Avg. speed</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              750 km/h
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              Effective passenger-aircraft model
            </div>
          </div>

          {/* 4. Destination Customs Complexity */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-purple-500" />
              <span>Destination customs</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {customsComplexity}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              {customsDays}
            </div>
          </div>
        </div>
      </section>

      {/* 4. SHIPPING PROCESS & TIMELINE + NAVY TOTAL ESTIMATED SHIPPING TIME CARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 4-Step Process Timeline */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  Shipping Process & Timeline
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Standard door-to-door workflow from China dispatch to delivery
                </p>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                All times are estimates and may vary.
              </span>
            </div>

            {/* 4 Steps Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
              {/* Step 1 */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200/70 dark:border-slate-800 space-y-2 relative">
                <div className="w-6 h-6 rounded-lg bg-orange-500 text-white font-black text-xs flex items-center justify-center">
                  1
                </div>
                <div className="font-bold text-xs text-slate-900 dark:text-white">
                  Origin Handling
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Cargo pickup, packaging, labeling, and export preparation.
                </p>
                <div className="pt-2 text-[11px] font-bold text-orange-600 dark:text-orange-400">
                  1–2 business days
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200/70 dark:border-slate-800 space-y-2 relative">
                <div className="w-6 h-6 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                  2
                </div>
                <div className="font-bold text-xs text-slate-900 dark:text-white">
                  Air Transit
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Estimated air time from {originAirport.city} to {destAirport.city}.
                </p>
                <div className="pt-2 text-[11px] font-bold text-blue-600 dark:text-blue-400">
                  {flightTimeHours}h {flightTimeMinutes}m
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200/70 dark:border-slate-800 space-y-2 relative">
                <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                  3
                </div>
                <div className="font-bold text-xs text-slate-900 dark:text-white">
                  Destination Processing
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Arrival handling and preparation of import documents.
                </p>
                <div className="pt-2 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  {destHandlingDays}
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200/70 dark:border-slate-800 space-y-2 relative">
                <div className="w-6 h-6 rounded-lg bg-purple-600 text-white font-black text-xs flex items-center justify-center">
                  4
                </div>
                <div className="font-bold text-xs text-slate-900 dark:text-white">
                  Customs Clearance
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Estimated customs review and release for general cargo.
                </p>
                <div className="pt-2 text-[11px] font-bold text-purple-600 dark:text-purple-400">
                  {customsDays}
                </div>
              </div>
            </div>
          </div>

          {/* Dark Navy Total Estimated Shipping Time Card (Exact match to DDPChain Image 3) */}
          <div className="bg-[#0A1E3F] text-white rounded-3xl p-7 shadow-xl border border-slate-800 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-blue-300">
                <span className="font-bold uppercase tracking-wider">
                  Total Estimated Shipping Time
                </span>
                <Info className="w-4 h-4 opacity-70" />
              </div>

              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
                <Calendar className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                  {totalShippingDays.split(" ")[0]}
                </div>
                <div className="text-sm font-semibold text-blue-200">
                  business days
                </div>
              </div>

              <div className="pt-3 border-t border-blue-900/50 flex items-center justify-between text-xs">
                <span className="text-blue-300">Customs Complexity:</span>
                <span className="font-bold text-white px-2.5 py-0.5 rounded bg-blue-800/60">
                  {customsComplexity}
                </span>
              </div>
            </div>

            <button
              onClick={() =>
                openQuoteModal({
                  originId: `${originAirport.city}, ${originAirport.country}`,
                  destinationSlug: `${destAirport.city}, ${destAirport.country}`,
                  serviceType: "Air Freight"
                })
              }
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm shadow-lg shadow-orange-500/20 text-center cursor-pointer transition-all"
            >
              Get a Shipping Quote
            </button>
          </div>
        </div>
      </section>

      {/* 5. ROUTE SUMMARY, ANIMATED PROGRESS BAR & SHARE BUTTONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Route Summary */}
            <div className="lg:col-span-4 space-y-2 pr-4 lg:border-r border-slate-100 dark:border-slate-800 text-xs">
              <div className="font-extrabold text-sm text-slate-900 dark:text-white pb-1">
                Route Summary
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">• Origin:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {originAirport.city}, {originAirport.country}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">• Destination:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {destAirport.city}, {destAirport.country}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">• Distance:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {distanceKm.toLocaleString()} km
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">• Est. flight time:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {flightTimeHours}h {flightTimeMinutes}m
                </span>
              </div>
            </div>

            {/* Transit Progress Bar */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="font-bold text-slate-700 dark:text-slate-300">Transit Progress</span>
                <span className="text-[11px] text-slate-400">Animated route preview</span>
              </div>

              {/* Progress Line */}
              <div className="relative h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-visible">
                <div className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full w-full" />
                <div
                  className="absolute -top-2 w-6 h-6 rounded-full bg-white shadow-md border-2 border-orange-500 flex items-center justify-center text-orange-500 transition-all"
                  style={{
                    left: `${Math.min(Math.max(animProgressRef.current * 100, 3), 97)}%`,
                    transform: "translateX(-50%)"
                  }}
                >
                  <Plane className="w-3 h-3 rotate-45 fill-current" />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                <span>{originAirport.city}</span>
                <span className="text-orange-600 dark:text-orange-400 font-bold">100%</span>
                <span>{destAirport.city}</span>
              </div>
            </div>

            {/* Share / Copy Buttons */}
            <div className="lg:col-span-3 flex flex-row lg:flex-col gap-2.5 justify-end">
              <button
                onClick={handleCopySummary}
                className="flex-1 lg:flex-none px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Copied Link!" : "Copy Link"}</span>
              </button>

              <button
                onClick={handleShareRoute}
                className="flex-1 lg:flex-none px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CUSTOMS DOCUMENTATION & DESTINATION REGULATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                <span>Customs & Shipping Insights</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Customs complexity rating: <span className="font-bold text-slate-800 dark:text-slate-200">{customsComplexity}</span> ({destAirport.country})
              </p>
            </div>

            {/* Tabs */}
            <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
              <button
                onClick={() => setActiveInfoTab("docs")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeInfoTab === "docs"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
                }`}
              >
                Documentation
              </button>
              <button
                onClick={() => setActiveInfoTab("regs")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeInfoTab === "regs"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
                }`}
              >
                Local Regulations
              </button>
            </div>
          </div>

          {activeInfoTab === "docs" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-900 dark:text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Commercial Invoice (CI)</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Declares value, commodity description, and Incoterms for export/import clearance.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-900 dark:text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Packing List</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Lists items, quantity, weight, and volume per carton to match air carrier manifests.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-900 dark:text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Air Waybill (AWB)</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Issued by the airline or freight forwarder acting as shipment receipt and contract.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-900 dark:text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Export License (If Applicable)</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Required for certain controlled commodities, battery certification, or dangerous goods.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 space-y-3">
              <div className="flex items-center gap-2 text-sm font-extrabold text-blue-900 dark:text-blue-200">
                <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Import Guidelines for {destAirport.name} ({destAirport.country})</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {destAirport.localRegs}
              </p>
              <div className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                Customs Risk Rating: <span className="font-bold text-slate-700 dark:text-slate-200">{customsComplexity}</span> | Destination Handling: <span className="font-bold text-slate-700 dark:text-slate-200">{destHandlingDays}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Common questions about air freight calculation, transit times, and customs clearance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-orange-500 font-black">+</span>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      openFaq === idx ? "rotate-180 text-orange-500" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. BOTTOM ACTION CONSULTATION CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-gradient-to-r from-[#081B38] via-[#0D2A57] to-[#081B38] rounded-3xl p-8 sm:p-10 text-white shadow-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Calculated Your Air Freight Route?
            </h3>
            <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
              Send your cargo details to JCD Forwarder and compare air freight, sea freight, or express courier options with full door-to-door DDP service from China.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Competitive Rates
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Reliable Partners
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> DDP Service
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Expert Support
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={() =>
                openQuoteModal({
                  originId: `${originAirport.city}, ${originAirport.country}`,
                  destinationSlug: `${destAirport.city}, ${destAirport.country}`,
                  serviceType: "Air Freight"
                })
              }
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/20 text-center cursor-pointer transition-all"
            >
              GET A SHIPPING QUOTE →
            </button>
            <a
              href={getWhatsAppUrl(
                `Hi David, I would like to book air freight shipping from ${originAirport.city} to ${destAirport.city}.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 text-center transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
