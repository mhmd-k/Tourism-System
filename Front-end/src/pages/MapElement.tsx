import "@tomtom-international/web-sdk-maps/dist/maps.css";
import tt from "@tomtom-international/web-sdk-maps";
import { useEffect, useRef, useState } from "react";

function MapElement({ longitude, latitude, zoom }) {
  const [map, setMap] = useState({});

  const mapElement = useRef();

  useEffect(() => {
    let map = tt.map({
      key: "YZJHNBZyfgHI0qyHkfQGAPe8ALsnCJN4",
      container: mapElement.current,
      center: [longitude, latitude],
      zoom: zoom,
    });
    setMap(map);

    return () => map.remove();
  }, []);

  return <div ref={mapElement} style={{ width: "100%", height: "100%" }}></div>;
}

export default MapElement;
