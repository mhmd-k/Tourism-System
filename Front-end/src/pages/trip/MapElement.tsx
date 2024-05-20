import "@tomtom-international/web-sdk-maps/dist/maps.css";
import tt from "@tomtom-international/web-sdk-maps";
import { useEffect, useRef, useState } from "react";
import { mapStore } from "../../zustand/MapStore";
import { getPath } from "../../RESTFunctions";

function MapElement() {
  const [map, setMap] = useState<tt.Map | null>(null);

  const mapElement = useRef<HTMLDivElement>(null);
  const markersRef = useRef<tt.Marker[]>([]);

  const center = mapStore((state) => state.center);
  const markers = mapStore((state) => state.markers);
  const destination = mapStore((state) => state.destination);

  useEffect(() => {
    const newMap = tt.map({
      key: "YZJHNBZyfgHI0qyHkfQGAPe8ALsnCJN4",
      container: mapElement.current || "",
      zoom: 10,
      language: "english",
    });

    newMap.addControl(new tt.FullscreenControl());
    newMap.addControl(new tt.NavigationControl());

    setMap(newMap);
  }, []);

  // everytime the center changes, update the map
  useEffect(() => {
    if (map) {
      setTimeout(() => {
        map.panTo(
          { ...center },
          {
            duration: 1000,
            animate: true,
          }
        );
      }, 1000);
    }
  }, [center, map]);

  useEffect(() => {
    async function drawPath() {
      try {
        if (!destination || !map) return;

        const path = await getPath(center, destination);

        console.log("path: ", path);

        if (map.getSource("route")) {
          map.removeLayer("path");
          map.removeSource("route");
        }

        map.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: path?.coordinates,
            },
          },
        });

        map.addLayer({
          id: "path",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "red",
            "line-width": 2,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }

    if (map) {
      markersRef.current.forEach((marker) => {
        marker.remove();
      });

      // Add new markers
      const newMarkers = markers.map((e) => {
        const marker = new tt.Marker({
          color: center.lat === e.lat && center.lng === e.lng ? "red" : "gray",
        }).setLngLat([e.lng, e.lat]);

        marker.addTo(map);

        return marker;
      });

      markersRef.current = newMarkers;

      drawPath();
    }
  }, [center, destination, map, markers]);

  return <div ref={mapElement} className="map"></div>;
}

export default MapElement;
