import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Activity } from '../context/AppContext';

// Fix for default marker icon issue in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LeafletMapProps {
  activities: Activity[];
  selectedActivity: Activity | null;
  onSelectActivity: (activity: Activity) => void;
  onViewDetails?: (activity: Activity) => void;
}

export const LeafletMap: React.FC<LeafletMapProps> = ({ 
  activities, 
  selectedActivity,
  onSelectActivity,
  onViewDetails
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map centered on Singapore
    const map = L.map(mapRef.current).setView([1.3521, 103.8198], 12);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Create custom icon for markers
    const createCustomIcon = (isSelected: boolean, participants: number) => {
      const iconHtml = `
        <div style="position: relative; width: 40px; height: 40px;">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="${isSelected ? '#5661F6' : '#6b7280'}" stroke="white" stroke-width="1"/>
          </svg>
          <div style="position: absolute; top: 6px; left: 50%; transform: translateX(-50%); background: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: bold; color: #333;">
            ${participants}
          </div>
        </div>
      `;

      return L.divIcon({
        html: iconHtml,
        className: 'custom-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });
    };

    // Add markers for each activity
    activities.forEach(activity => {
      const isSelected = selectedActivity?.id === activity.id;
      const icon = createCustomIcon(isSelected, activity.currentParticipants);

      const marker = L.marker([activity.coordinates.lat, activity.coordinates.lng], { icon })
        .addTo(mapInstanceRef.current!)
        .on('click', () => onSelectActivity(activity));

      // Create popup content
      const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
      };

      const formatTime = (timeStr: string) => {
        const [hours, minutes] = timeStr.split(':');
        const hour = parseInt(hours);
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        return `${displayHour}:${minutes} ${period}`;
      };

      const popupContent = `
        <div style="overflow: hidden; border-radius: 12px;">
          <img src="${activity.imageUrl}" alt="${activity.title}" style="width: 100%; height: 120px; object-fit: cover;" />
          <div style="padding: 12px;">
            <h3 style="font-size: 14px; font-weight: 600; margin: 0 0 4px 0; line-height: 1.3;">${activity.title}</h3>
            <p style="font-size: 12px; color: #6b7280; margin: 0 0 8px 0;">${activity.neighbourhood}</p>
            <div style="font-size: 12px; color: #374151; margin-bottom: 8px;">
              <div style="margin-bottom: 4px;">📅 ${formatDate(activity.date)} • ${formatTime(activity.startTime)} – ${formatTime(activity.endTime)}</div>
              <div>👥 ${activity.currentParticipants}/${activity.maxParticipants} going</div>
            </div>
            ${onViewDetails ? `
              <button 
                onclick="window.handleViewDetails('${activity.id}')" 
                style="width: 100%; background: #5661f6; color: white; border: none; padding: 8px; border-radius: 8px; font-size: 12px; font-weight: 500; cursor: pointer;"
              >
                View Details
              </button>
            ` : ''}
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 280,
        className: 'custom-popup',
      });

      if (isSelected) {
        marker.openPopup();
      }

      markersRef.current.push(marker);
    });

    // Add global handler for view details button
    if (onViewDetails) {
      (window as any).handleViewDetails = (activityId: string) => {
        const activity = activities.find(a => a.id === activityId);
        if (activity) {
          onViewDetails(activity);
        }
      };
    }

    // Pan to selected activity
    if (selectedActivity) {
      mapInstanceRef.current.setView(
        [selectedActivity.coordinates.lat, selectedActivity.coordinates.lng],
        14,
        { animate: true }
      );
    }
  }, [activities, selectedActivity, onSelectActivity, onViewDetails]);

  return <div ref={mapRef} className="w-full h-full rounded-lg" style={{ minHeight: '500px' }} />;
};
