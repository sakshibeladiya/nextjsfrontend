"use client"
import { usePathname } from 'next/navigation';
import MapPage from './map';

const LocationPage = () => {
  const pathname = usePathname(); // Access the current path

  // Split the pathname by '/' and get the last segment
  const id = pathname.split('/').pop(); // This will return "9"

  return (
    <div>
      <MapPage idd={id!} />
    </div>
  );
};

export default LocationPage;
