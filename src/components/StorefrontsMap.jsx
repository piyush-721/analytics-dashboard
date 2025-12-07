import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { MapContainer, GeoJSON, useMap } from 'react-leaflet';

const WORLD_GEOJSON_URL = '/geo/world.geojson';

const StoreFrontMap = () => {
  const { storefrontsData = [] } = useSelector(
    (state) => state.dashboard || {}
  );

  const [worldGeoJson, setWorldGeoJson] = useState(null);
  const mapRef = useRef(null); // <– ref for map

  useEffect(() => {
    fetch(WORLD_GEOJSON_URL)
      .then((res) => res.json())
      .then((data) => setWorldGeoJson(data))
      .catch((err) => {
        console.error('Error loading world geojson', err);
      });
  }, []);

  const valueByCountry = useMemo(() => {
    const map = {};
    storefrontsData.forEach((item) => {
      map[item.country] = item.value;
    });
    return map;
  }, [storefrontsData]);

  const baseFill = '#FFE2B8';
  const indiaFill = '#FF7A00';

  const onEachCountry = (feature, layer) => {
    const iso2 = feature.properties.ISO_A2;
    const isIndia = iso2 === 'IN';

    layer.setStyle({
      fillColor: isIndia ? indiaFill : baseFill,
      color: isIndia ? indiaFill : '#F5D3A0',
      weight: isIndia ? 1.5 : 0.4,
      fillOpacity: 1,
    });

    const value = valueByCountry[iso2];
    if (value != null) {
      layer.bindTooltip(
        `${feature.properties.NAME || iso2}: $${value.toLocaleString()}`,
        { sticky: true }
      );
    }
  };

  const indiaValue =
    storefrontsData.find((c) => c.country === 'IN')?.value ?? 0;

  // Small helper inside Map to assign mapRef safely
  const MapRefBinder = () => {
    const map = useMap();
    useEffect(() => {
      mapRef.current = map;
    }, [map]);
    return null;
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <span className="text-base font-medium text-gray-900">Spend</span>
        <div className="flex items-center space-x-4 text-gray-400">
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
            🌐
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
            📊
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
            ⤢
          </button>
        </div>
      </div>

      {/* Map area */}
      <div className="flex-1 relative">
        <MapContainer
          center={[20, 0]}
          zoom={2}
          minZoom={2}
          maxZoom={5}
          zoomControl={false}
          scrollWheelZoom={false}
          style={{ width: '100%', height: '100%', backgroundColor: '#FFF8EC' }}
        >
          {worldGeoJson && (
            <GeoJSON data={worldGeoJson} onEachFeature={onEachCountry} />
          )}
          <MapRefBinder /> {/* binds map instance to mapRef */}
        </MapContainer>
      </div>

      {/* Bottom controls + bar */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* Zoom buttons */}
        <div className="space-y-2">
          <button
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white shadow border border-gray-200 text-gray-600"
            onClick={() => {
              if (mapRef.current) {
                mapRef.current.zoomIn();
              }
            }}
          >
            +
          </button>
          <button
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white shadow border border-gray-200 text-gray-600"
            onClick={() => {
              if (mapRef.current) {
                mapRef.current.zoomOut();
              }
            }}
          >
            –
          </button>
        </div>

        {/* Spend bar */}
        <div className="flex-1 mx-6">
          <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
            <span>$6.11k</span>
            <span>${indiaValue.toFixed(2)}</span>
          </div>
          <div className="h-2 rounded-full bg-[#FF7A00]" />
        </div>

        {/* Info icon */}
        <button className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 text-xs">
          i
        </button>
      </div>
    </div>
  );
};
 
export default StoreFrontMap;
