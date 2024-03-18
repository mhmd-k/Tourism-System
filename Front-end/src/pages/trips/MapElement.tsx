import "@tomtom-international/web-sdk-maps/dist/maps.css";
import tt from "@tomtom-international/web-sdk-maps";
import { useEffect, useRef } from "react";

function MapElement() {
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map = tt.map({
      key: "YZJHNBZyfgHI0qyHkfQGAPe8ALsnCJN4",
      container: mapElement.current || "",
      center: [12.446031690814332, 41.920110744370284],
      zoom: 10,
    });

    setTimeout(() => {
      map.panTo(
        { lng: 12.46031690814332, lat: 42.920110744370284 },
        {
          duration: 3000,
          animate: true,
        }
      );
    }, 5000);

    setTimeout(() => {
      new tt.Marker({ color: "red" })
        .setLngLat([12.46031690814332, 42.920110744370284]) // Set marker coordinates
        .addTo(map);
    }, 8000);

    return () => map.remove();
  }, []);

  return (
    <div ref={mapElement} style={{ width: "1000px", height: "700px" }}></div>
  );
}

export default MapElement;
