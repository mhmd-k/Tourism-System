import "@tomtom-international/web-sdk-maps/dist/maps.css";
import tt from "@tomtom-international/web-sdk-maps";
import { useEffect, useRef, useState } from "react";
import { PlaceLocation } from "../../types";

function MapElement({ lng, lat }: PlaceLocation) {
  const [map, setMap] = useState<tt.Map | null>(null);
  const [marker, setMarker] = useState<tt.Marker | null>(null);
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!map) {
      const newMap = tt.map({
        key: "YZJHNBZyfgHI0qyHkfQGAPe8ALsnCJN4",
        container: mapElement.current || "",
        zoom: 10,
      });

      setMap(newMap);
    } else {
      setTimeout(() => {
        map.panTo(
          { lng, lat },
          {
            duration: 1000,
            animate: true,
          }
        );
      }, 1000);

      setTimeout(() => {
        marker?.remove();
        const newMarker = new tt.Marker({ color: "red" }).setLngLat([lng, lat]);

        setMarker(newMarker);
      }, 2000);
    }
  }, [lng, lat, map]);

  useEffect(() => {
    if (marker && map) {
      marker.addTo(map);
    }
  }, [map, marker]);

  return <div ref={mapElement} className="map"></div>;
}

export default MapElement;
