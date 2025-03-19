// "use client";
// import { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import "./leaflet.css"; // Import Leaflet CSS globally
// import { API_URL } from "@providers/data-provider";
// import { decrypt } from "@app/enc";
// import { useCookies } from 'next-client-cookies';
// import { useSearchParams } from "next/navigation";

// interface MapPageProps {
//   idd: string; // Accept `id` as a prop
// }

// const MapPage: React.FC<MapPageProps> = ({ idd }) => {
//   const searchParams = useSearchParams(); // ✅ Get query params
//   const time = searchParams.get("time") || ""; // ✅ Get "time" from URL
//   const date = searchParams.get("date") || "";
//   const mapRef = useRef<HTMLDivElement | null>(null); // Create a ref to store the map container
//   const [L, setL] = useState<any>(null); // State to hold the Leaflet module
//   const [markers, setMarkers] = useState<any[]>([]); // State to hold markers data from the API
//   const [loading, setLoading] = useState<boolean>(true); // Loading state
//   const cookieStore = useCookies();
//   const token = decrypt(cookieStore.get("token") ?? '');

//   // console.log(time, "time")

//   // Function to fetch marker data from the API
//   const fetchMarkers = async (locationId: string) => {
//     try {
//       const response = await axios.get(`${API_URL}/edpl/location/${idd}`, {
//         params: { date, time },
//         headers: {
//           "Authorization": `Bearer ${token}`, // Include the token in the headers
//         },
//       });
//       setMarkers(response.data); // Assuming response.data contains the marker information
//     } catch (error) {
//       console.error("Error fetching markers:", error);
//     } finally {
//       setLoading(false); // Stop loading once the API call is done
//     }
//   };

//   useEffect(() => {
//     setLoading(true); // Set loading to true before fetching
//     fetchMarkers(idd); // Use the `id` passed as a prop
//   }, [idd]);

//   useEffect(() => {
//     // Load Leaflet library dynamically
//     if (typeof window !== "undefined" && !L) {
//       import('leaflet').then((leaflet) => {
//         setL(leaflet);
//       });
//     }

//     return () => {
//       if (mapRef.current) {
//         mapRef.current.innerHTML = ""; // Clear map on cleanup to avoid reinitialization issues
//       }
//     };
//   }, [L]);

//   useEffect(() => {
//     if (L && mapRef.current && markers.length > 0) {
//       // Initialize the map only after the container is available and Leaflet is loaded
//       const mapInstance = L.map(mapRef.current, {
//         center: markers != null ? [markers[0].lat, markers[0].lon] : [20.5937, 78.9629], // Default center of the map
//         zoom: 13, // Adjust zoom to suit your needs
//         scrollWheelZoom: true,
//       });

//       // Add a TileLayer (background map)
//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       }).addTo(mapInstance);

//       // Custom marker icon setup
//       const customIcon = L.icon({
//         iconUrl: "/map-marker.png", // Path to the custom icon image
//         iconSize: [32, 32], // Size of the icon
//         iconAnchor: [16, 32], // Anchor position of the icon (where the "tip" of the marker is)
//         popupAnchor: [0, -32], // Adjust the position of the popup relative to the marker
//       });

//       // Add markers to the map
//       markers.forEach((marker) => {
//         const lat = marker.lat; // Convert lat to number
//         const lon = marker.lon; // Convert lon to number
//         L.marker([lat, lon], { icon: customIcon })
//           .addTo(mapInstance)
//           .bindPopup(`UID: ${marker.uid}<br/>Time: ${marker.time}`); // Customize the popup
//       });

//       // Store the map instance in the ref for cleanup later
//       return () => {
//         if (mapInstance) {
//           mapInstance.remove();
//         }
//       };
//     }
//   }, [L, markers]); // Re-run when markers or L changes

//   // Wait for markers to load before rendering map
//   if (loading) {
//     return <div>Loading map...</div>;
//   }

//   return (
//     markers ? (
//       <div style={{ height: "90vh", margin: '-10px' }}>
//         {/* Use mapRef to reference the container element */}
//         <div ref={mapRef} style={{ height: "100%" }}></div>
//       </div>
//     ) : <>NO DATA FOUND</>
//   )
// };

// export default MapPage;

"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./leaflet.css"; // Import Leaflet CSS globally
import { API_URL } from "@providers/data-provider";
import { decrypt } from "@app/enc";
import { useCookies } from "next-client-cookies";
import { useSearchParams } from "next/navigation";

interface MapPageProps {
  idd: string; // Accept `id` as a prop
}

const MapPage: React.FC<MapPageProps> = ({ idd }) => {
  const searchParams = useSearchParams(); // ✅ Get query params
  const type = searchParams.get("type") || ""; // ✅ Get "time" from URL
  const date = searchParams.get("date") || "";
  const mapRef = useRef<HTMLDivElement | null>(null); // Create a ref to store the map container
  const [L, setL] = useState<any>(null); // State to hold the Leaflet module
  const [markers, setMarkers] = useState<any[]>([]); // State to hold markers data from the API
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const cookieStore = useCookies();
  const token = decrypt(cookieStore.get("token") ?? "");

  const defaultCenter = [20.5937, 78.9629]; // Default location (India center)

  // Function to fetch marker data from the API
  const fetchMarkers = async (locationId: string) => {
    try {
      const response = await axios.get(`${API_URL}/edpl/location/${idd}`, {
        params: { date, type },
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      });
      setMarkers(response.data); // Assuming response.data contains the marker information
    } catch (error) {
      console.error("Error fetching markers:", error);
    } finally {
      setLoading(false); // Stop loading once the API call is done
    }
  };

  useEffect(() => {
    setLoading(true); // Set loading to true before fetching
    fetchMarkers(idd); // Use the `id` passed as a prop
  }, [idd]);

  useEffect(() => {
    // Load Leaflet library dynamically
    if (typeof window !== "undefined" && !L) {
      import("leaflet").then((leaflet) => {
        setL(leaflet);
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.innerHTML = ""; // Clear map on cleanup to avoid reinitialization issues
      }
    };
  }, [L]);

  useEffect(() => {
    if (L && mapRef.current) {
      // Initialize the map only after the container is available and Leaflet is loaded
      const mapInstance = L.map(mapRef.current, {
        center: markers.length > 0 ? [markers[0].lat, markers[0].lon] : defaultCenter,
        zoom: 13,
        scrollWheelZoom: true,
      });

      // Add a TileLayer (background map)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance);

      // Custom marker icon setup
      const customIcon = L.icon({
        iconUrl: "/map-marker.png", // Path to the custom icon image
        iconSize: [32, 32], // Size of the icon
        iconAnchor: [16, 32], // Anchor position of the icon (where the "tip" of the marker is)
        popupAnchor: [0, -32], // Adjust the position of the popup relative to the marker
      });

      // Add markers to the map if available
      if (markers.length > 0) {
        markers.forEach((marker) => {
          const lat = marker.lat;
          const lon = marker.lon;
          L.marker([lat, lon], { icon: customIcon })
            .addTo(mapInstance)
            .bindPopup(`UID: ${marker.uid}<br/>Time: ${marker.time}`);
        });
      }

      // Store the map instance in the ref for cleanup later
      return () => {
        if (mapInstance) {
          mapInstance.remove();
        }
      };
    }
  }, [L, markers]);

  // Wait for markers to load before rendering map
  if (loading) {
    return <div>Loading map...</div>;
  }

  return (
    <div style={{ height: "90vh", margin: "-10px" }}>
      {/* Use mapRef to reference the container element */}
      <div ref={mapRef} style={{ height: "100%" }}></div>
    </div>
  );
};

export default MapPage;
