import React from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { ActivityCard } from '../components/ActivityCard';
import { Button } from '../components/ui/button';
import { MapPin, Calendar, Clock, Users } from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { activities, currentUser, toggleInterest, setSelectedActivity } = useApp();

  const handleActivityClick = (activity: any) => {
    setSelectedActivity(activity);
    navigate(`/activity/${activity.id}`);
  };

  // Filter activities based on user interest
  const bookedEvents = activities.filter(a => 
    a.interestedUsers.includes(currentUser?.id || '')
  ).slice(0, 3);

  // Popular events (highest participants)
  const popularEvents = [...activities]
    .sort((a, b) => b.currentParticipants - a.currentParticipants)
    .slice(0, 3);

  // Recommended events (based on user's neighbourhood and interests)
  const recommendedEvents = [...activities]
    .filter(a => 
      a.neighbourhood === currentUser?.neighbourhood || 
      a.interestedUsers.length > 3 // Or has good engagement
    )
    .filter(a => !a.interestedUsers.includes(currentUser?.id || '')) // Not already joined
    .sort((a, b) => {
      // Prioritize same neighbourhood
      const aScore = (a.neighbourhood === currentUser?.neighbourhood ? 10 : 0) + a.interestedUsers.length;
      const bScore = (b.neighbourhood === currentUser?.neighbourhood ? 10 : 0) + b.interestedUsers.length;
      return bScore - aScore;
    })
    .slice(0, 3);

  // Upcoming events (by date)
  const upcomingEvents = [...activities]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Sports': 'bg-orange-100 text-orange-800',
      'Food': 'bg-red-100 text-red-800',
      'Social': 'bg-blue-100 text-blue-800',
      'Community': 'bg-green-100 text-green-800',
      'Arts': 'bg-purple-100 text-purple-800',
      'Culture': 'bg-pink-100 text-pink-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-[#f5f5f7] min-h-screen">
      <div className="max-w-[1400px] mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="pt-2">
          <h1 className="text-[28px] font-bold text-[#0c1421]">
            Hello {currentUser?.name?.split(' ')[0] || 'User'}!
          </h1>
          <div className="flex items-center gap-1 text-[14px] text-[#6b7280] mt-1">
            <MapPin className="h-4 w-4" />
            <span>{currentUser?.neighbourhood || 'Hougang District'}</span>
          </div>
        </div>

        {/* Booked Events */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[20px] font-semibold text-[#0c1421]">Booked Events</h2>
            <button 
              onClick={() => navigate('/activity/my-activities')}
              className="text-[14px] text-[#5661f6] hover:underline"
            >
              See all
            </button>
          </div>
          
          {bookedEvents.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center">
              <p className="text-gray-500">No booked events yet. Start exploring!</p>
              <Button 
                onClick={() => navigate('/explore')}
                className="mt-4 bg-[#5661f6] hover:bg-[#4551e6]"
              >
                Explore Activities
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-[18px] line-clamp-2">{activity.title}</h3>
                    <div className="flex items-center gap-1.5 text-[14px] text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(activity.date).replace(/^(\w+, )/, '')}</span>
                      <span className="mx-1">at</span>
                      <Clock className="h-4 w-4" />
                      <span>{activity.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[14px] text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span className="line-clamp-1">{activity.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[14px] text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{activity.currentParticipants}/{activity.maxParticipants} going</span>
                    </div>
                    <div className="pt-2">
                      <p className="text-[12px] text-gray-500">Organised by {activity.organiserName}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Popular Events */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[20px] font-semibold text-[#0c1421]">Popular Events</h2>
            <button 
              onClick={() => navigate('/events/popular')}
              className="text-[14px] text-[#5661f6] hover:underline"
            >
              See all
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularEvents.map((activity) => (
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
                  {Math.max(activity.maxParticipants - activity.currentParticipants, 0) <= 5 && (
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-red-500 text-white">
                      {Math.max(activity.maxParticipants - activity.currentParticipants, 0)} spots left
                    </span>
                  )}
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-[18px] line-clamp-2">{activity.title}</h3>
                  <div className="flex items-center gap-1.5 text-[14px] text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(activity.date).replace(/^(\w+, )/, '')}</span>
                    <span className="mx-1">at</span>
                    <Clock className="h-4 w-4" />
                    <span>{activity.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[14px] text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="line-clamp-1">{activity.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[14px] text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{activity.currentParticipants}/{activity.maxParticipants} going</span>
                  </div>
                  <div className="pt-2">
                    <p className="text-[12px] text-gray-500">Organised by {activity.organiserName}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Events */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[20px] font-semibold text-[#0c1421]">Recommended Events</h2>
            <button 
              onClick={() => navigate('/events/recommended')}
              className="text-[14px] text-[#5661f6] hover:underline"
            >
              See all
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedEvents.map((activity) => (
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
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-[18px] line-clamp-2">{activity.title}</h3>
                  <div className="flex items-center gap-1.5 text-[14px] text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(activity.date).replace(/^(\w+, )/, '')}</span>
                    <span className="mx-1">at</span>
                    <Clock className="h-4 w-4" />
                    <span>{activity.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[14px] text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="line-clamp-1">{activity.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[14px] text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{activity.currentParticipants}/{activity.maxParticipants} going</span>
                  </div>
                  <div className="pt-2">
                    <p className="text-[12px] text-gray-500">Organised by {activity.organiserName}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="pb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[20px] font-semibold text-[#0c1421]">Upcoming Events</h2>
            <button 
              onClick={() => navigate('/events/upcoming')}
              className="text-[14px] text-[#5661f6] hover:underline"
            >
              See all
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingEvents.map((activity) => (
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
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-[18px] line-clamp-2">{activity.title}</h3>
                  <div className="flex items-center gap-1.5 text-[14px] text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(activity.date).replace(/^(\w+, )/, '')}</span>
                    <span className="mx-1">at</span>
                    <Clock className="h-4 w-4" />
                    <span>{activity.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[14px] text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="line-clamp-1">{activity.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[14px] text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{activity.currentParticipants}/{activity.maxParticipants} going</span>
                  </div>
                  <div className="pt-2">
                    <p className="text-[12px] text-gray-500">Organised by {activity.organiserName}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};