import "@tomtom-international/web-sdk-maps/dist/maps.css";
import tt from "@tomtom-international/web-sdk-maps";
import { useEffect, useRef, useState } from "react";
import { PlaceLocation } from "../../types";
import axios from "axios";

function MapElement({
  center,
  markers,
}: {
  center: PlaceLocation;
  markers: PlaceLocation[];
}) {
  const [map, setMap] = useState<tt.Map | null>(null);
  const mapElement = useRef<HTMLDivElement>(null);
  const markersRef = useRef<tt.Marker[]>([]);

  useEffect(() => {
    if (!map) {
      const newMap = tt.map({
        key: "YZJHNBZyfgHI0qyHkfQGAPe8ALsnCJN4",
        container: mapElement.current || "",
        zoom: 10,
      });

      newMap.addControl(new tt.FullscreenControl());
      newMap.addControl(new tt.NavigationControl());

      setMap(newMap);
    } else {
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
    if (map) {
      markersRef.current.forEach((marker) => {
        marker.remove();
      });

      // Add new markers
      const newMarkers = markers.map((e) => {
        const marker = new tt.Marker({
          color:
            center.lat === e.lat && center.lng === e.lng
              ? "var(--blue-color)"
              : "gray",
        }).setLngLat([e.lng, e.lat]);

        marker.addTo(map);

        return marker;
      });

      markersRef.current = newMarkers;

      axios
        .post(
          `https://api.tomtom.com/routing/1/calculateRoute/${markers
            .slice(0, 2)
            .map((e) => `${e.lat},${e.lng}`)
            .join(":")}/json?key=YZJHNBZyfgHI0qyHkfQGAPe8ALsnCJN4`,
          {
            supportingPoints: markers.map((e) => ({
              latitude: e.lat,
              longitude: e.lng,
            })),
          }
        )
        .then((e) => console.log(e));
    }
  }, [center, map, markers]);

  return <div ref={mapElement} className="map"></div>;
}

export default MapElement;
