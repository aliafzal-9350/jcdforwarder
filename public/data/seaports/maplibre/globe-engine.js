/*!
 * JCD Forwarder World Ports Map - MapLibre globe adapter.
 *
 * Replaces the legacy custom canvas renderer with MapLibre GL JS. The
 * library and all map geometry are served from the plugin itself. Port data
 * remains split by country and is passed in by app.js only when required.
 */
(function (window, document) {
  'use strict';

  var libraryPromiseByUrl = {};
  var cssPromiseByUrl = {};

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function prefersReducedMotion() {
    try {
      return Boolean(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    } catch (error) {
      return false;
    }
  }

  function parseHexColor(value) {
    var match = /^#?([0-9a-f]{6})$/i.exec(String(value || '').trim());
    if (!match) return null;
    var number = parseInt(match[1], 16);
    return { r: (number >> 16) & 255, g: (number >> 8) & 255, b: number & 255 };
  }

  function rgbToHex(color) {
    function channel(value) { return clamp(Math.round(value), 0, 255).toString(16).padStart(2, '0'); }
    return '#' + channel(color.r) + channel(color.g) + channel(color.b);
  }

  function mixHex(first, second, amount) {
    var a = parseHexColor(first), b = parseHexColor(second);
    if (!a || !b) return String(first || second || '#dceff8');
    amount = clamp(Number(amount || 0), 0, 1);
    return rgbToHex({
      r: a.r + (b.r - a.r) * amount,
      g: a.g + (b.g - a.g) * amount,
      b: a.b + (b.b - a.b) * amount
    });
  }

  function colorDistance(first, second) {
    var a = parseHexColor(first), b = parseHexColor(second);
    if (!a || !b) return 255;
    return Math.sqrt(Math.pow(a.r - b.r, 2) + Math.pow(a.g - b.g, 2) + Math.pow(a.b - b.b, 2));
  }

  function visibleOceanColor(ocean, land) {
    ocean = String(ocean || '#eaf5fb');
    land = String(land || '#f8fafc');
    // Very pale admin-selected ocean and land colours can be almost identical.
    // Preserve the selected palette while guaranteeing that the water surface
    // remains visible on every side of the globe.
    return colorDistance(ocean, land) < 34 ? mixHex(ocean, '#a9d7ee', 0.48) : ocean;
  }

  function lowPowerDevice(stage) {
    var width = stage ? Number(stage.clientWidth || 0) : 0;
    var cores = Number(navigator.hardwareConcurrency || 8);
    var memory = Number(navigator.deviceMemory || 8);
    var coarse = false;
    try { coarse = Boolean(window.matchMedia && window.matchMedia('(pointer: coarse)').matches); } catch (error) {}
    return (width && width < 720) || (coarse && cores <= 6) || memory <= 4;
  }

  function solidColorTileDataUrl(color) {
    try {
      var canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      var context = canvas.getContext('2d', { alpha: false });
      if (!context) return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR42mM4/fwrAAUoAqhrU3ZyAAAAAElFTkSuQmCC';
      context.fillStyle = String(color || '#cbe7f5');
      context.fillRect(0, 0, 256, 256);
      return canvas.toDataURL('image/png');
    } catch (error) {
      return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR42mM4/fwrAAUoAqhrU3ZyAAAAAElFTkSuQmCC';
    }
  }



  function worldHomeZoom(renderer) {
    var configured = Number(renderer && renderer.config ? renderer.config.initialZoom : 1);
    var base = clamp((Number.isFinite(configured) ? configured : 1) + 0.75, 0.85, 2.5);
    var width = renderer && renderer.stage ? renderer.stage.clientWidth : 0;
    if (width && width < 480) return Math.min(base, 1.05);
    if (width && width < 760) return Math.min(base, 1.35);
    return base;
  }

  function validCoordinate(lon, lat) {
    lon = Number(lon);
    lat = Number(lat);
    return Number.isFinite(lon) && Number.isFinite(lat) && lon >= -180 && lon <= 180 && lat >= -90 && lat <= 90;
  }

  function emptyCollection() {
    return { type: 'FeatureCollection', features: [] };
  }

  function pointFeature(id, lon, lat, properties) {
    return {
      type: 'Feature',
      id: String(id || ''),
      geometry: { type: 'Point', coordinates: [Number(lon), Number(lat)] },
      properties: properties || {}
    };
  }

  function injectStylesheet(url) {
    if (!url) return Promise.resolve();
    if (cssPromiseByUrl[url]) return cssPromiseByUrl[url];
    cssPromiseByUrl[url] = new Promise(function (resolve, reject) {
      var existing = Array.prototype.slice.call(document.querySelectorAll('link[rel="stylesheet"]')).find(function (link) {
        return link.href === new URL(url, document.baseURI).href;
      });
      if (existing) {
        if (existing.sheet) resolve();
        else {
          existing.addEventListener('load', resolve, { once: true });
          existing.addEventListener('error', reject, { once: true });
        }
        return;
      }
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      link.setAttribute('data-dwp-maplibre', 'css');
      link.addEventListener('load', resolve, { once: true });
      link.addEventListener('error', function () { reject(new Error('MapLibre stylesheet failed to load.')); }, { once: true });
      document.head.appendChild(link);
    });
    return cssPromiseByUrl[url];
  }

  function compatibleMapLibrary(library) {
    if (!library || typeof library.Map !== 'function') return false;
    var version = String(library.version || '');
    if (!version) return true;
    var major = parseInt(version.split('.')[0], 10);
    return Number.isFinite(major) && major >= 5;
  }

  function loadMapLibrary(jsUrl, cssUrl) {
    if (compatibleMapLibrary(window.DWPMapLibreGL)) {
      return injectStylesheet(cssUrl).then(function () { return window.DWPMapLibreGL; });
    }
    if (compatibleMapLibrary(window.maplibregl)) {
      return injectStylesheet(cssUrl).then(function () { return window.maplibregl; });
    }
    if (libraryPromiseByUrl[jsUrl]) return libraryPromiseByUrl[jsUrl];
    libraryPromiseByUrl[jsUrl] = Promise.all([
      injectStylesheet(cssUrl),
      new Promise(function (resolve, reject) {
        var previousGlobal = window.maplibregl;
        var script = document.createElement('script');
        script.src = jsUrl;
        script.async = true;
        script.setAttribute('data-dwp-maplibre', 'script');
        script.addEventListener('load', function () {
          var loaded = window.maplibregl;
          if (!compatibleMapLibrary(loaded)) {
            reject(new Error('MapLibre loaded without a compatible public API.'));
            return;
          }
          window.DWPMapLibreGL = loaded;
          if (previousGlobal && previousGlobal !== loaded) window.maplibregl = previousGlobal;
          resolve(loaded);
        }, { once: true });
        script.addEventListener('error', function () { reject(new Error('MapLibre script failed to load.')); }, { once: true });
        document.head.appendChild(script);
      })
    ]).then(function (values) { return values[1] || window.DWPMapLibreGL || window.maplibregl; });
    return libraryPromiseByUrl[jsUrl];
  }

  function DWPGlobeRenderer(app) {
    this.app = app;
    this.config = Object.assign({
      text: {
        portRecordsSuffix: 'ports',
        choosePort: 'Choose a port at this location'
      }
    }, app.config || {});
    if (!this.config.text) {
      this.config.text = {
        portRecordsSuffix: 'ports',
        choosePort: 'Choose a port at this location'
      };
    }
    this.root = app.root;
    this.stage = app.dom.mapStage;
    this.shell = app.dom.globeShell;
    this.container = app.dom.globe;
    this.tooltip = app.dom.tooltip;
    this.controls = app.dom.controls;
    this.map = null;
    this.destroyed = false;
    this.readyState = false;
    this.countries = [];
    this.countryByIso = new Map();
    this.selectedCountry = '';
    this.selectedPort = '';
    this.ports = [];
    this.portFilter = 'all';
    this.portById = new Map();
    this.lifecycle = new AbortController();
    this.reduceMotion = prefersReducedMotion();
    this.lastHoverKey = '';
    this.resizeObserver = null;
    this.portChooser = null;
    this.ready = this.initialize();
  }

  DWPGlobeRenderer.prototype.initialize = function () {
    var self = this;
    var jsUrl = this.config.mapLibraryUrl;
    var cssUrl = this.config.mapLibraryCssUrl;
    if (!jsUrl || !cssUrl || !this.container) return Promise.reject(new Error('Map engine assets are missing.'));

    this.container.hidden = false;
    this.container.setAttribute('aria-busy', 'true');

    return loadMapLibrary(jsUrl, cssUrl).then(function (maplibregl) {
      if (self.destroyed) throw new Error('Map instance was destroyed before initialization.');
      if (typeof maplibregl.supported === 'function' && !maplibregl.supported({ failIfMajorPerformanceCaveat: false })) {
        throw new Error('WebGL is not supported by this browser.');
      }

      var configuredOcean = self.config.colors && self.config.colors.ocean ? self.config.colors.ocean : '#eaf5fb';
      var configuredLand = self.config.colors && self.config.colors.land ? self.config.colors.land : '#f8fafc';
      var ocean = visibleOceanColor(configuredOcean, configuredLand);
      var outerBackground = mixHex(ocean, '#ffffff', 0.58);
      var lowPower = lowPowerDevice(self.stage);

      var style = {
        version: 8,
        projection: { type: 'globe' },
        sources: {
          'dwp-ocean-raster': {
            type: 'raster',
            tiles: [solidColorTileDataUrl(ocean)],
            tileSize: 256,
            minzoom: 0,
            maxzoom: 0
          },
          'dwp-world-boundaries': {
            type: 'geojson',
            data: self.config.mapBoundaryUrl,
            maxzoom: 5,
            tolerance: 0.85,
            buffer: 4
          }
        },
        layers: [
          {
            id: 'dwp-ocean-background',
            type: 'background',
            paint: { 'background-color': outerBackground }
          },
          {
            id: 'dwp-ocean-surface-raster',
            type: 'raster',
            source: 'dwp-ocean-raster',
            paint: {
              'raster-opacity': 1,
              'raster-fade-duration': 0,
              'raster-resampling': 'nearest'
            }
          },
          {
            id: 'dwp-world-land',
            type: 'fill',
            source: 'dwp-world-boundaries',
            paint: {
              'fill-color': configuredLand,
              'fill-opacity': 1,
              'fill-antialias': true
            }
          },
          {
            id: 'dwp-world-land-highlight',
            type: 'fill',
            source: 'dwp-world-boundaries',
            filter: ['==', ['get', 'iso2'], ''],
            paint: {
              'fill-color': self.config.colors && self.config.colors.accent ? self.config.colors.accent : '#155eef',
              'fill-opacity': 0.13
            }
          },
          {
            id: 'dwp-world-borders',
            type: 'line',
            source: 'dwp-world-boundaries',
            paint: {
              'line-color': '#b9cee2',
              'line-width': ['interpolate', ['linear'], ['zoom'], 0, 0.45, 4, 0.9, 8, 1.2],
              'line-opacity': 0.92
            }
          }
        ],
        sky: {
          'atmosphere-blend': 0
        },
        light: { anchor: 'map', position: [1.5, 85, 75] }
      };

      self.map = new maplibregl.Map({
        container: self.container,
        style: style,
        center: [8, 18],
        zoom: worldHomeZoom(self),
        minZoom: 0,
        maxZoom: 13,
        bearing: 0,
        pitch: 0,
        attributionControl: false,
        maplibreLogo: false,
        renderWorldCopies: false,
        fadeDuration: self.reduceMotion ? 0 : 120,
        dragRotate: false,
        touchPitch: false,
        cooperativeGestures: false,
        canvasContextAttributes: { antialias: !lowPower, preserveDrawingBuffer: false, powerPreference: 'high-performance', alpha: false }
      });

      self.map.dragRotate.disable();
      if (self.map.touchZoomRotate && self.map.touchZoomRotate.disableRotation) self.map.touchZoomRotate.disableRotation();
      if (self.map.scrollZoom && self.map.scrollZoom.setWheelZoomRate) self.map.scrollZoom.setWheelZoomRate(1 / 420);
      if (self.map.scrollZoom && self.map.scrollZoom.setZoomRate) self.map.scrollZoom.setZoomRate(1 / 110);

      self.bindLifecycle();

      return new Promise(function (resolve, reject) {
        var settled = false;
        var timeout = window.setTimeout(function () {
          if (settled || self.destroyed) return;
          settled = true;
          reject(new Error('The map took too long to initialize.'));
        }, 15000);

        self.map.once('load', function () {
          if (settled || self.destroyed) return;
          settled = true;
          window.clearTimeout(timeout);
          try {
            self.installDataLayers();
            self.installInteractions();
            self.applyCurrentState(false);
            self.readyState = true;
            self.container.removeAttribute('aria-busy');
            self.shell.classList.add('is-ready');
            self.map.resize();
            if (typeof self.map.setPixelRatio === 'function') {
              self.map.setPixelRatio(Math.min(Number(window.devicePixelRatio || 1), lowPower ? 1.25 : 1.75));
            }
            // A second resize after layout/style paint prevents a partially
            // initialised canvas in Elementor tabs, accordions and mobile WebViews.
            window.requestAnimationFrame(function () {
              if (!self.map || self.destroyed) return;
              self.map.resize();
              self.map.triggerRepaint();
            });
            self.bindWebGLRecovery();
            resolve(self);
          } catch (error) {
            reject(error);
          }
        });

        self.map.on('error', function (event) {
          // GeoJSON parsing and WebGL errors are surfaced through the ready
          // promise before load. Non-fatal map errors after load are ignored
          // so a single bad feature cannot replace the whole tool with an
          // error screen.
          if (!settled && event && event.error && /webgl|style|source/i.test(String(event.error.message || event.error))) {
            settled = true;
            window.clearTimeout(timeout);
            reject(event.error);
          }
        });
      });
    });
  };

  DWPGlobeRenderer.prototype.bindLifecycle = function () {
    var self = this;
    var signal = this.lifecycle.signal;

    if (this.controls) {
      this.controls.addEventListener('click', function (event) {
        var button = event.target.closest('[data-map-action]');
        if (!button || button.disabled || !self.map) return;
        var action = button.getAttribute('data-map-action');
        if (action === 'zoom-in') self.setZoom(self.map.getZoom() + 1);
        else if (action === 'zoom-out') self.setZoom(self.map.getZoom() - 1);
        else if (action === 'home') self.home(true);
        else if (action === 'fullscreen') self.toggleFullscreen();
      }, { signal: signal });
    }

    document.addEventListener('fullscreenchange', function () {
      if (!self.map) return;
      window.setTimeout(function () { if (self.map) self.map.resize(); }, 60);
    }, { signal: signal });
    document.addEventListener('webkitfullscreenchange', function () {
      if (!self.map) return;
      window.setTimeout(function () { if (self.map) self.map.resize(); }, 60);
    }, { signal: signal });

    document.addEventListener('visibilitychange', function () {
      if (!self.map || self.destroyed || document.hidden) return;
      window.requestAnimationFrame(function () {
        if (!self.map || self.destroyed) return;
        self.map.resize();
        self.map.triggerRepaint();
      });
    }, { signal: signal });
    window.addEventListener('pageshow', function () {
      if (!self.map || self.destroyed) return;
      window.requestAnimationFrame(function () {
        if (self.map) { self.map.resize(); self.map.triggerRepaint(); }
      });
    }, { signal: signal, passive: true });

    if ('ResizeObserver' in window) {
      this.resizeObserver = new ResizeObserver(function () {
        if (!self.map || self.destroyed) return;
        self.map.resize();
      });
      this.resizeObserver.observe(this.stage);
    } else {
      window.addEventListener('resize', function () { if (self.map) self.map.resize(); }, { signal: signal, passive: true });
    }
  };

  DWPGlobeRenderer.prototype.bindWebGLRecovery = function () {
    if (!this.map || !this.map.getCanvas) return;
    var self = this;
    var canvas = this.map.getCanvas();
    if (!canvas || canvas.__dwpRecoveryBound) return;
    canvas.__dwpRecoveryBound = true;
    canvas.addEventListener('webglcontextlost', function (event) {
      event.preventDefault();
      if (self.shell) self.shell.classList.add('is-context-lost');
      if (self.tooltip) self.hideTooltip();
    }, { signal: this.lifecycle.signal });
    canvas.addEventListener('webglcontextrestored', function () {
      if (self.shell) self.shell.classList.remove('is-context-lost');
      window.setTimeout(function () {
        if (!self.map || self.destroyed) return;
        self.map.resize();
        self.applyCurrentState(false);
        self.map.triggerRepaint();
      }, 80);
    }, { signal: this.lifecycle.signal });
  };

  DWPGlobeRenderer.prototype.installDataLayers = function () {
    var map = this.map;
    var primary = this.config.colors && this.config.colors.primary ? this.config.colors.primary : '#10275c';
    var accent = this.config.colors && this.config.colors.accent ? this.config.colors.accent : '#155eef';
    var highlight = this.config.colors && this.config.colors.highlight ? this.config.colors.highlight : '#f04466';

    map.addSource('dwp-country-points', {
      type: 'geojson',
      data: emptyCollection(),
      cluster: true,
      clusterMaxZoom: 2,
      clusterRadius: 38,
      clusterProperties: { totalPorts: ['+', ['get', 'count']] }
    });
    map.addLayer({
      id: 'dwp-country-clusters',
      type: 'circle',
      source: 'dwp-country-points',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': accent,
        'circle-radius': ['step', ['get', 'point_count'], 13, 8, 16, 20, 18],
        'circle-stroke-width': 2.5,
        'circle-stroke-color': 'rgba(255,255,255,.82)',
        'circle-opacity': 0.9
      }
    });
    map.addLayer({
      id: 'dwp-country-cluster-count',
      type: 'symbol',
      source: 'dwp-country-points',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': ['number-format', ['get', 'totalPorts'], { 'max-fraction-digits': 0 }],
        'text-size': 9,
        'text-allow-overlap': true,
        'text-ignore-placement': true
      },
      paint: { 'text-color': '#ffffff' }
    });
    map.addLayer({
      id: 'dwp-country-points-layer',
      type: 'circle',
      source: 'dwp-country-points',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#ffffff',
        'circle-radius': 10.5,
        'circle-stroke-width': 3,
        'circle-stroke-color': accent,
        'circle-opacity': 0.96
      }
    });
    map.addLayer({
      id: 'dwp-country-point-count',
      type: 'symbol',
      source: 'dwp-country-points',
      filter: ['!', ['has', 'point_count']],
      layout: {
        'text-field': ['number-format', ['get', 'count'], { 'max-fraction-digits': 0 }],
        'text-size': 9,
        'text-allow-overlap': true,
        'text-ignore-placement': true
      },
      paint: { 'text-color': primary }
    });

    map.addSource('dwp-port-points', {
      type: 'geojson',
      data: emptyCollection(),
      cluster: true,
      clusterMaxZoom: 4,
      clusterRadius: 36
    });
    map.addLayer({
      id: 'dwp-port-clusters',
      type: 'circle',
      source: 'dwp-port-points',
      filter: ['has', 'point_count'],
      layout: { visibility: 'none' },
      paint: {
        'circle-color': accent,
        'circle-radius': ['step', ['get', 'point_count'], 13, 10, 16, 40, 19],
        'circle-stroke-width': 4,
        'circle-stroke-color': 'rgba(255,255,255,.88)',
        'circle-opacity': 0.92
      }
    });
    map.addLayer({
      id: 'dwp-port-cluster-count',
      type: 'symbol',
      source: 'dwp-port-points',
      filter: ['has', 'point_count'],
      layout: {
        visibility: 'none',
        'text-field': '{point_count_abbreviated}',
        'text-size': 10,
        'text-allow-overlap': true,
        'text-ignore-placement': true
      },
      paint: { 'text-color': '#ffffff' }
    });
    map.addLayer({
      id: 'dwp-port-halo',
      type: 'circle',
      source: 'dwp-port-points',
      filter: ['!', ['has', 'point_count']],
      layout: { visibility: 'none' },
      paint: {
        'circle-color': ['case', ['==', ['get', 'technical'], 1], highlight, accent],
        'circle-radius': 11,
        'circle-opacity': 0.14,
        'circle-stroke-width': 0
      }
    });
    map.addLayer({
      id: 'dwp-port-points-layer',
      type: 'circle',
      source: 'dwp-port-points',
      filter: ['!', ['has', 'point_count']],
      layout: { visibility: 'none' },
      paint: {
        'circle-color': ['case', ['==', ['get', 'technical'], 1], highlight, primary],
        'circle-radius': ['interpolate', ['linear'], ['zoom'], 2, 4.5, 6, 6, 11, 7.5],
        'circle-stroke-width': 2.5,
        'circle-stroke-color': '#ffffff',
        'circle-opacity': 0.98
      }
    });
    map.addLayer({
      id: 'dwp-port-labels',
      type: 'symbol',
      source: 'dwp-port-points',
      minzoom: 5,
      filter: ['!', ['has', 'point_count']],
      layout: {
        visibility: 'none',
        'text-field': ['get', 'name'],
        'text-size': ['interpolate', ['linear'], ['zoom'], 5, 9.5, 8, 11, 12, 12],
        'text-offset': [0, 1.15],
        'text-anchor': 'top',
        'text-max-width': 14,
        'text-padding': 3,
        'text-optional': true,
        'text-allow-overlap': false
      },
      paint: {
        'text-color': primary,
        'text-halo-color': 'rgba(255,255,255,.96)',
        'text-halo-width': 1.75,
        'text-halo-blur': 0.25
      }
    });

    map.addSource('dwp-selected-port', { type: 'geojson', data: emptyCollection() });
    map.addLayer({
      id: 'dwp-selected-port-pulse',
      type: 'circle',
      source: 'dwp-selected-port',
      paint: {
        'circle-color': highlight,
        'circle-radius': ['interpolate', ['linear'], ['zoom'], 2, 15, 8, 21],
        'circle-opacity': 0.16,
        'circle-stroke-width': 2,
        'circle-stroke-color': highlight,
        'circle-stroke-opacity': 0.36
      }
    });
    map.addLayer({
      id: 'dwp-selected-port-dot',
      type: 'circle',
      source: 'dwp-selected-port',
      paint: {
        'circle-color': highlight,
        'circle-radius': 8,
        'circle-stroke-width': 3,
        'circle-stroke-color': '#ffffff'
      }
    });
    map.addLayer({
      id: 'dwp-selected-port-label',
      type: 'symbol',
      source: 'dwp-selected-port',
      minzoom: 3,
      layout: {
        'text-field': ['get', 'name'],
        'text-size': 11,
        'text-offset': [0, 1.45],
        'text-anchor': 'top',
        'text-max-width': 16,
        'text-allow-overlap': false
      },
      paint: {
        'text-color': primary,
        'text-halo-color': '#ffffff',
        'text-halo-width': 2
      }
    });
  };

  DWPGlobeRenderer.prototype.ensurePortChooser = function () {
    var self = this;
    if (this.portChooser || !this.stage) return this.portChooser;
    var chooser = document.createElement('div');
    chooser.className = 'dwp-map-port-chooser';
    chooser.hidden = true;
    chooser.setAttribute('role', 'dialog');
    chooser.setAttribute('aria-modal', 'false');
    chooser.innerHTML = '<strong class="dwp-map-port-chooser-title"></strong><div class="dwp-map-port-chooser-list"></div>';
    chooser.addEventListener('click', function (event) {
      var button = event.target.closest('[data-port-choice]');
      if (!button) return;
      var id = String(button.getAttribute('data-port-choice') || '');
      self.hidePortChooser();
      if (id) self.app.openPort(id, true);
    }, { signal: this.lifecycle.signal });
    this.stage.appendChild(chooser);
    this.portChooser = chooser;
    return chooser;
  };

  DWPGlobeRenderer.prototype.hidePortChooser = function () {
    if (!this.portChooser) return;
    this.portChooser.hidden = true;
    this.portChooser.style.transform = '';
  };

  DWPGlobeRenderer.prototype.showPortChooser = function (point, ids) {
    var chooser = this.ensurePortChooser();
    if (!chooser) return;
    var seen = new Set();
    var ports = [];
    ids.forEach(function (id) {
      id = String(id || '');
      if (!id || seen.has(id)) return;
      seen.add(id);
      var port = this.portById.get(id);
      if (port) ports.push(port);
    }, this);
    if (ports.length < 2) {
      this.hidePortChooser();
      if (ports[0]) this.app.openPort(String(ports[0].id), true);
      return;
    }
    ports.sort(function (a, b) { return String(a.n || '').localeCompare(String(b.n || '')); });
    chooser.querySelector('.dwp-map-port-chooser-title').textContent = (this.config.text && this.config.text.choosePort) || 'Choose a port at this location';
    var list = chooser.querySelector('.dwp-map-port-chooser-list');
    list.textContent = '';
    ports.slice(0, 8).forEach(function (port) {
      var button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('data-port-choice', String(port.id || ''));
      var strong = document.createElement('strong');
      strong.textContent = port.n || 'Port';
      var small = document.createElement('small');
      small.textContent = port.u || port.w || '';
      button.appendChild(strong);
      button.appendChild(small);
      list.appendChild(button);
    });
    chooser.hidden = false;
    var width = Math.min(268, Math.max(210, this.stage.clientWidth - 20));
    var x = clamp(Number(point.x) + 12, 10, Math.max(10, this.stage.clientWidth - width - 10));
    var estimatedHeight = Math.min(300, 54 + ports.slice(0, 8).length * 48);
    var y = clamp(Number(point.y) + 12, 10, Math.max(10, this.stage.clientHeight - estimatedHeight - 10));
    chooser.style.width = width + 'px';
    chooser.style.transform = 'translate3d(' + Math.round(x) + 'px,' + Math.round(y) + 'px,0)';
    var first = list.querySelector('button');
    if (first) first.focus({ preventScroll: true });
  };

  DWPGlobeRenderer.prototype.openPortAtPoint = function (event) {
    if (!event || !this.map) return;
    var point = event.point;
    var padding = 13;
    var box = [[point.x - padding, point.y - padding], [point.x + padding, point.y + padding]];
    var features = this.map.queryRenderedFeatures(box, { layers: ['dwp-port-points-layer'] });
    var ids = [];
    features.forEach(function (feature) {
      var id = feature && feature.properties ? feature.properties.portId : '';
      if (id && ids.indexOf(String(id)) === -1) ids.push(String(id));
    });
    if (!ids.length && event.features && event.features[0] && event.features[0].properties && event.features[0].properties.portId) {
      ids.push(String(event.features[0].properties.portId));
    }
    if (ids.length > 1) this.showPortChooser(point, ids);
    else if (ids.length === 1) {
      this.hidePortChooser();
      this.app.openPort(ids[0], true);
    }
  };

  DWPGlobeRenderer.prototype.installInteractions = function () {
    var self = this;
    var map = this.map;

    function firstFeature(event, layers) {
      var features = event.features && event.features.length ? event.features : map.queryRenderedFeatures(event.point, { layers: layers });
      return features && features[0] ? features[0] : null;
    }

    map.on('click', 'dwp-country-clusters', async function (event) {
      self.hidePortChooser();
      var feature = firstFeature(event, ['dwp-country-clusters']);
      if (!feature) return;
      var source = map.getSource('dwp-country-points');
      var zoom = await source.getClusterExpansionZoom(feature.properties.cluster_id);
      map.easeTo({ center: feature.geometry.coordinates, zoom: clamp(zoom, 1, 4.5), duration: self.motionDuration(520) });
    });

    map.on('click', 'dwp-country-points-layer', function (event) {
      var feature = firstFeature(event, ['dwp-country-points-layer']);
      if (feature && feature.properties.iso) {
        try {
          var res = self.app.selectCountry(feature.properties.iso, true);
          if (res && typeof res.catch === 'function') {
            res.catch(function () {});
          }
        } catch (error) {}
      }
    });

    map.on('click', 'dwp-world-land', function (event) {
      if (self.selectedCountry) return;
      var feature = firstFeature(event, ['dwp-world-land']);
      var iso = feature && feature.properties ? String(feature.properties.iso2 || '').toUpperCase() : '';
      if (iso && self.countryByIso.has(iso)) {
        try {
          var res = self.app.selectCountry(iso, true);
          if (res && typeof res.catch === 'function') {
            res.catch(function () {});
          }
        } catch (error) {}
      }
    });

    map.on('click', 'dwp-port-clusters', async function (event) {
      self.hidePortChooser();
      var feature = firstFeature(event, ['dwp-port-clusters']);
      if (!feature) return;
      var source = map.getSource('dwp-port-points');
      var zoom = await source.getClusterExpansionZoom(feature.properties.cluster_id);
      map.easeTo({ center: feature.geometry.coordinates, zoom: clamp(zoom, map.getZoom() + 0.75, 10), duration: self.motionDuration(480) });
    });

    map.on('click', 'dwp-port-points-layer', function (event) {
      self.openPortAtPoint(event);
    });

    map.on('click', 'dwp-port-labels', function (event) {
      self.openPortAtPoint(event);
    });

    map.on('click', 'dwp-selected-port-dot', function (event) {
      var feature = firstFeature(event, ['dwp-selected-port-dot']);
      if (!feature || !feature.properties.portId) return;
      self.app.openPort(String(feature.properties.portId), false);
    });

    var interactiveLayers = ['dwp-country-clusters', 'dwp-country-points-layer', 'dwp-world-land', 'dwp-port-clusters', 'dwp-port-points-layer', 'dwp-port-labels', 'dwp-selected-port-dot'];
    interactiveLayers.forEach(function (layerId) {
      map.on('mouseenter', layerId, function () { map.getCanvas().style.cursor = 'pointer'; });
      map.on('mouseleave', layerId, function () { map.getCanvas().style.cursor = ''; self.hideTooltip(); });
    });

    map.on('mousemove', function (event) {
      var layers = self.selectedCountry ? ['dwp-selected-port-dot', 'dwp-port-labels', 'dwp-port-points-layer', 'dwp-port-clusters'] : ['dwp-country-points-layer', 'dwp-country-clusters'];
      var features = map.queryRenderedFeatures(event.point, { layers: layers });
      var feature = features && features[0];
      if (!feature) { self.hideTooltip(); return; }
      var properties = feature.properties || {};
      var key = String(properties.portId || properties.iso || properties.cluster_id || '');
      if (!key) return;
      var title = '';
      var subtitle = '';
      if (properties.portId) {
        title = properties.name || 'Port';
        subtitle = properties.code || properties.type || '';
      } else if (properties.iso) {
        title = properties.name || properties.iso;
        var suffix = (self.config && self.config.text && self.config.text.portRecordsSuffix) || 'ports';
        subtitle = String(properties.count || 0) + ' ' + suffix;
      } else {
        title = String(properties.point_count || '') + ' locations';
        subtitle = 'Click to zoom';
      }
      self.showTooltip(event.point, title, subtitle, key);
    });

    map.on('dragstart', function () { self.shell.classList.add('is-dragging'); self.hideTooltip(); self.hidePortChooser(); });
    map.on('dragend', function () { self.shell.classList.remove('is-dragging'); });
    map.on('zoomstart', function () { self.hideTooltip(); self.hidePortChooser(); });
  };

  DWPGlobeRenderer.prototype.motionDuration = function (milliseconds) {
    return this.reduceMotion ? 0 : milliseconds;
  };

  DWPGlobeRenderer.prototype.showTooltip = function (point, title, subtitle, key) {
    if (!this.tooltip) return;
    if (key !== this.lastHoverKey) {
      this.tooltip.innerHTML = '<strong></strong><span></span>';
      this.tooltip.querySelector('strong').textContent = title;
      this.tooltip.querySelector('span').textContent = subtitle;
      this.lastHoverKey = key;
    }
    var stageRect = this.stage.getBoundingClientRect();
    var x = clamp(Number(point.x) + 14, 10, Math.max(10, stageRect.width - 230));
    var y = clamp(Number(point.y) + 14, 10, Math.max(10, stageRect.height - 86));
    this.tooltip.style.transform = 'translate3d(' + Math.round(x) + 'px,' + Math.round(y) + 'px,0)';
    this.tooltip.hidden = false;
  };

  DWPGlobeRenderer.prototype.hideTooltip = function () {
    if (!this.tooltip) return;
    this.tooltip.hidden = true;
    this.lastHoverKey = '';
  };

  DWPGlobeRenderer.prototype.setCountries = function (countries) {
    this.countries = Array.isArray(countries) ? countries : [];
    this.countryByIso.clear();
    var features = [];
    this.countries.forEach(function (country) {
      var iso = String(country.iso2 || '').toUpperCase();
      if (!iso) return;
      this.countryByIso.set(iso, country);
      if (!validCoordinate(country.lon, country.lat)) return;
      features.push(pointFeature('country-' + iso, country.lon, country.lat, {
        iso: iso,
        name: country.name || iso,
        count: Number(country.count || 0)
      }));
    }, this);
    this.countryGeoJson = { type: 'FeatureCollection', features: features };
    if (this.readyState) {
      this.map.getSource('dwp-country-points').setData(this.countryGeoJson);
      this.applyCurrentState(false);
    }
  };

  DWPGlobeRenderer.prototype.setCountry = function (iso, ports) {
    this.hidePortChooser();
    this.selectedCountry = String(iso || '').toUpperCase();
    this.selectedPort = '';
    this.ports = Array.isArray(ports) ? ports : [];
    this.portById.clear();
    var features = [];
    this.ports.forEach(function (port) {
      this.portById.set(String(port.id), port);
      if (!validCoordinate(port.lon, port.lat)) return;
      features.push(pointFeature(port.id, port.lon, port.lat, {
        portId: String(port.id),
        name: port.n || 'Port',
        code: port.u || port.w || '',
        technical: Number(port.t || 0),
        sea: Number(port.sp || 0),
        inland: Number(port.iw || 0)
      }));
    }, this);
    this.allPortGeoJson = { type: 'FeatureCollection', features: features };
    this.portFilter = 'all';
    this.portGeoJson = this.filteredPortGeoJson();
    this.selectedGeoJson = emptyCollection();
    if (!this.readyState) return;
    this.map.getSource('dwp-port-points').setData(this.portGeoJson);
    this.map.getSource('dwp-selected-port').setData(this.selectedGeoJson);
    this.applyCurrentState(true);
  };

  DWPGlobeRenderer.prototype.filteredPortGeoJson = function () {
    var all = this.allPortGeoJson && Array.isArray(this.allPortGeoJson.features) ? this.allPortGeoJson.features : [];
    var filter = this.portFilter || 'all';
    var features = all.filter(function (feature) {
      var properties = feature.properties || {};
      if (filter === 'sea') return Number(properties.sea) === 1;
      if (filter === 'inland') return Number(properties.inland) === 1;
      if (filter === 'technical') return Number(properties.technical) === 1;
      return true;
    });
    return { type: 'FeatureCollection', features: features };
  };

  DWPGlobeRenderer.prototype.setPortFilter = function (filter) {
    this.portFilter = ['all', 'sea', 'inland', 'technical'].indexOf(filter) === -1 ? 'all' : filter;
    this.portGeoJson = this.filteredPortGeoJson();
    if (this.readyState && this.map.getSource('dwp-port-points')) this.map.getSource('dwp-port-points').setData(this.portGeoJson);
  };

  DWPGlobeRenderer.prototype.setSelectedPort = function (port) {
    if (!port || !validCoordinate(port.lon, port.lat)) {
      this.clearSelectedPort();
      return;
    }
    this.selectedPort = String(port.id || '');
    this.selectedGeoJson = {
      type: 'FeatureCollection',
      features: [pointFeature(port.id, port.lon, port.lat, {
        portId: String(port.id || ''),
        name: port.n || 'Port',
        code: port.u || port.w || ''
      })]
    };
    if (!this.readyState) return;
    this.map.getSource('dwp-selected-port').setData(this.selectedGeoJson);
    var currentZoom = this.map.getZoom();
    this.map.easeTo({
      center: [Number(port.lon), Number(port.lat)],
      zoom: clamp(Math.max(currentZoom, 5.3), 3.8, 8.2),
      duration: this.motionDuration(540),
      essential: true
    });
  };

  DWPGlobeRenderer.prototype.clearSelectedPort = function () {
    this.hidePortChooser();
    this.selectedPort = '';
    this.selectedGeoJson = emptyCollection();
    if (this.readyState && this.map.getSource('dwp-selected-port')) this.map.getSource('dwp-selected-port').setData(this.selectedGeoJson);
  };

  DWPGlobeRenderer.prototype.applyCurrentState = function (moveCamera) {
    if (!this.readyState || !this.map) return;
    var hasCountry = Boolean(this.selectedCountry);
    var countryVisibility = hasCountry ? 'none' : 'visible';
    var portVisibility = hasCountry ? 'visible' : 'none';
    ['dwp-country-clusters', 'dwp-country-cluster-count', 'dwp-country-points-layer', 'dwp-country-point-count'].forEach(function (id) {
      if (this.map.getLayer(id)) this.map.setLayoutProperty(id, 'visibility', countryVisibility);
    }, this);
    ['dwp-port-clusters', 'dwp-port-cluster-count', 'dwp-port-halo', 'dwp-port-points-layer', 'dwp-port-labels'].forEach(function (id) {
      if (this.map.getLayer(id)) this.map.setLayoutProperty(id, 'visibility', portVisibility);
    }, this);
    if (this.map.getLayer('dwp-world-land-highlight')) {
      this.map.setFilter('dwp-world-land-highlight', ['==', ['get', 'iso2'], hasCountry ? this.selectedCountry : '']);
    }
    if (this.countryGeoJson && this.map.getSource('dwp-country-points')) this.map.getSource('dwp-country-points').setData(this.countryGeoJson);
    if (this.portGeoJson && this.map.getSource('dwp-port-points')) this.map.getSource('dwp-port-points').setData(this.portGeoJson);
    if (moveCamera) this.focusCountry();
  };

  DWPGlobeRenderer.prototype.focusCountry = function () {
    if (!this.map || !this.selectedCountry) return;
    var country = this.countryByIso.get(this.selectedCountry);
    if (!country || !validCoordinate(country.lon, country.lat)) return;
    var latSpan = Math.abs(Number(country.max_lat) - Number(country.min_lat));
    var lonSpan = Math.abs(Number(country.max_lon) - Number(country.min_lon));
    if (lonSpan > 180) lonSpan = 360 - lonSpan;
    var span = Math.max(latSpan || 0, lonSpan || 0);
    var zoom = 5.4;
    if (span > 120) zoom = 1.15;
    else if (span > 70) zoom = 1.5;
    else if (span > 42) zoom = 1.9;
    else if (span > 25) zoom = 2.35;
    else if (span > 14) zoom = 2.9;
    else if (span > 8) zoom = 3.45;
    else if (span > 4) zoom = 4.15;
    else if (span > 2) zoom = 4.75;
    this.map.easeTo({
      center: [Number(country.lon), Number(country.lat)],
      zoom: zoom,
      duration: this.motionDuration(680),
      essential: true
    });
  };

  DWPGlobeRenderer.prototype.setZoom = function (zoom) {
    if (!this.map) return;
    this.map.easeTo({ zoom: clamp(Number(zoom), 0, 13), duration: this.motionDuration(260), essential: true });
  };

  DWPGlobeRenderer.prototype.home = function () {
    if (!this.map) return;
    this.hideTooltip();
    if (this.selectedCountry) {
      this.focusCountry();
      return;
    }
    this.map.easeTo({ center: [8, 18], zoom: worldHomeZoom(this), bearing: 0, pitch: 0, duration: this.motionDuration(620), essential: true });
  };

  DWPGlobeRenderer.prototype.clear = function () {
    this.selectedCountry = '';
    this.selectedPort = '';
    this.ports = [];
    this.portFilter = 'all';
    this.portById.clear();
    this.allPortGeoJson = emptyCollection();
    this.portGeoJson = emptyCollection();
    this.selectedGeoJson = emptyCollection();
    if (!this.readyState) return;
    this.map.getSource('dwp-port-points').setData(this.portGeoJson);
    this.map.getSource('dwp-selected-port').setData(this.selectedGeoJson);
    this.applyCurrentState(false);
    this.home();
  };

  DWPGlobeRenderer.prototype.draw = function () {
    if (this.map) this.map.triggerRepaint();
  };

  DWPGlobeRenderer.prototype.toggleFullscreen = function () {
    if (!this.stage) return;
    var active = document.fullscreenElement || document.webkitFullscreenElement;
    if (active) {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      return;
    }
    if (this.stage.requestFullscreen) this.stage.requestFullscreen();
    else if (this.stage.webkitRequestFullscreen) this.stage.webkitRequestFullscreen();
  };

  DWPGlobeRenderer.prototype.destroy = function () {
    if (this.destroyed) return;
    this.destroyed = true;
    this.lifecycle.abort();
    if (this.resizeObserver) this.resizeObserver.disconnect();
    this.hideTooltip();
    this.hidePortChooser();
    if (this.portChooser && this.portChooser.parentNode) this.portChooser.parentNode.removeChild(this.portChooser);
    this.portChooser = null;
    if (this.map) {
      try { this.map.remove(); } catch (error) {}
      this.map = null;
    }
    this.readyState = false;
  };

  window.DWPGlobeRenderer = DWPGlobeRenderer;
})(window, document);
