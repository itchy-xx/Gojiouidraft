import React from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Calendar, Clock, MapPin, Users } from 'lucide-react';

export const BookedEventsPage = () => {
  const navigate = useNavigate();
  const { activities, currentUser } = useApp();

  // Filter for booked events
  const bookedEvents = activities.filter(a => 
    a.interestedUsers.includes(currentUser?.id || '')
  );

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    return `${dayName}, ${day} ${month}`;
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Sports': 'bg-orange-100 text-orange-800',
      'Food': 'bg-red-100 text-red-800',
      'Social': 'bg-blue-100 text-blue-800',
      'Community': 'bg-green-100 text-green-800',
      'Arts': 'bg-purple-100 text-purple-800',
      'Culture': 'bg-pink-100 text-pink-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const handleActivityClick = (activity) => {
    navigate(`/activity/${activity.id}`);
  };

  return (
    <div className="bg-[#f5f5f7] min-h-screen">
      <div className="max-w-[1400px] mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/home')}
            className="flex items-center gap-2 text-[#5661f6] hover:underline mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>
          <h1 className="text-[32px] font-bold text-[#0c1421]">Booked Events</h1>
          <p className="text-[16px] text-gray-600 mt-1">
            {bookedEvents.length} {bookedEvents.length === 1 ? 'event' : 'events'} you've joined
          </p>
        </div>

        {/* Events Grid */}
        {bookedEvents.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <p className="text-gray-500 text-[18px]">No booked events yet.</p>
            <p className="text-gray-400 mt-2">Start exploring activities to join!</p>
            <button
              onClick={() => navigate('/explore')}
              className="mt-6 px-6 py-3 bg-[#5661f6] text-white rounded-xl hover:bg-[#4551e6] transition-colors"
            >
              Explore Activities
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookedEvents.map((activity) => (
              <div
                key={activity.id}
                onClick={() => handleActivityClick(activity)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={activity.imageUrl}
                    alt={activity.title}
                    className="w-full h-full object-cover"
                  />
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(activity.category)}`}>
                    {activity.category}
                  </span>
                </div>
                <div className="p-4 space-y-3">
                  <h3 className="font-semibold text-[18px] line-clamp-2">{activity.title}</h3>
                  <div className="flex items-center gap-1.5 text-[14px] text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(activity.date)}</span>
                    <span className="mx-1">•</span>
                    <Clock className="h-4 w-4" />
                    <span>{formatTime(activity.startTime)} – {formatTime(activity.endTime)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[14px] text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="line-clamp-1">{activity.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[14px] text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{activity.currentParticipants}/{activity.maxParticipants} going</span>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-[12px] text-gray-500">Organised by {activity.organiserName}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
