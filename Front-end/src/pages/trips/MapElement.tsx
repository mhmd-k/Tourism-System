import "@tomtom-international/web-sdk-maps/dist/maps.css";
import tt from "@tomtom-international/web-sdk-maps";
import { useEffect, useRef } from "react";

function MapElement({ lng, lat }: { lng: number; lat: number }) {
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map = tt.map({
      key: "YZJHNBZyfgHI0qyHkfQGAPe8ALsnCJN4",
      container: mapElement.current || "",
      center: [lng, lat],
      zoom: 10,
    });

    // setTimeout(() => {
    //   map.panTo(
    //     { lng: 12.46031690814332, lat: 42.920110744370284 },
    //     {
    //       duration: 3000,
    //       animate: true,
    //     }
    //   );
    // }, 5000);

    // setTimeout(() => {
    //   new tt.Marker({ color: "red" })
    //     .setLngLat([12.46031690814332, 42.920110744370284]) // Set marker coordinates
    //     .addTo(map);
    // }, 8000);

    return () => map.remove();
  }, []);

  return <div ref={mapElement} className="map"></div>;
}

export default MapElement;
