import React, { useState, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { motion } from 'motion/react';
export const MapView = ({ activities, selectedActivity, onSelectActivity, onViewDetails }) => {
    const mapRef = useRef(null);
    const [hoveredPin, setHoveredPin] = useState(null);
    // Convert lat/lng to pixel coordinates (simplified for demo)
    const getPosition = (activity) => {
        // Singapore bounds: roughly 1.15-1.47 lat, 103.6-104.0 lng
        const latMin = 1.15, latMax = 1.47;
        const lngMin = 103.6, lngMax = 104.0;
        const x = ((activity.coordinates.lng - lngMin) / (lngMax - lngMin)) * 100;
        const y = ((latMax - activity.coordinates.lat) / (latMax - latMin)) * 100;
        return { x, y };
    };
    return (<div ref={mapRef} className="relative w-full h-full bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 rounded-lg overflow-hidden" style={{
            backgroundImage: `
          linear-gradient(rgba(255,255,255,.9), rgba(255,255,255,.9)),
          url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235661F6' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
        `
        }}>
      {/* Map Labels */}
      <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm">
        <p className="text-sm font-medium">Singapore Map</p>
      </div>

      {/* Activity Pins */}
      {activities.map((activity) => {
            const pos = getPosition(activity);
            const isSelected = selectedActivity?.id === activity.id;
            const isHovered = hoveredPin === activity.id;
            return (<motion.div key={activity.id} className="absolute cursor-pointer" style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: 'translate(-50%, -100%)',
                }} initial={{ scale: 0, opacity: 0 }} animate={{
                    scale: isSelected || isHovered ? 1.2 : 1,
                    opacity: 1,
                }} whileHover={{ scale: 1.3 }} transition={{ duration: 0.2 }} onClick={() => onSelectActivity(activity)} onMouseEnter={() => setHoveredPin(activity.id)} onMouseLeave={() => setHoveredPin(null)}>
            {/* Pin */}
            <div className={`relative transition-colors ${isSelected
                    ? 'text-primary drop-shadow-lg'
                    : 'text-primary/70 hover:text-primary'}`}>
              <MapPin className="h-10 w-10 fill-current" strokeWidth={1.5}/>
              {/* Participant Count Badge */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-sm">
                {activity.currentParticipants}
              </div>
            </div>

            {/* Hover Tooltip */}
            {(isHovered || isSelected) && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white rounded-xl shadow-2xl overflow-hidden w-[280px] z-10 border border-primary/20">
                {/* Event Image */}
                <div className="h-32 overflow-hidden">
                  <img src={activity.imageUrl} alt={activity.title} className="w-full h-full object-cover"/>
                </div>
                
                {/* Event Info */}
                <div className="p-3 space-y-2">
                  <div>
                    <p className="font-semibold text-sm line-clamp-2">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.neighbourhood}</p>
                  </div>
                  
                  <div className="space-y-1 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <span>📅</span>
                      <span>{new Date(activity.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                      <span className="mx-1">•</span>
                      <span>{activity.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>👥</span>
                      <span>{activity.currentParticipants}/{activity.maxParticipants} going</span>
                    </div>
                  </div>

                  {onViewDetails && (<button onClick={(e) => {
                            e.stopPropagation();
                            onViewDetails(activity);
                        }} className="w-full bg-[#5661f6] hover:bg-[#4551e6] text-white text-xs py-2 rounded-lg transition-colors font-medium">
                      View Details
                    </button>)}
                </div>
                
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-white border-r border-b border-primary/20 rotate-45"/>
              </motion.div>)}
          </motion.div>);
        })}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Legend</p>
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary"/>
          <span className="text-xs">Activity Location</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-white border border-border flex items-center justify-center text-xs font-bold">
            {activities.length > 0 ? activities[0].currentParticipants : '0'}
          </div>
          <span className="text-xs">Participants</span>
        </div>
      </div>
    </div>);
};
