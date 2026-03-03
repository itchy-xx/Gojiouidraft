import React from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Calendar, Clock, MapPin, Users } from 'lucide-react';
export const UpcomingEventsPage = () => {
    const navigate = useNavigate();
    const { activities, currentUser, setSelectedActivity } = useApp();
    // Sort by date (earliest first)
    const upcomingEvents = [...activities].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const handleActivityClick = (activity) => {
        setSelectedActivity(activity);
        navigate(`/activity/${activity.id}`);
    };
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    };
    const getDaysUntil = (dateStr) => {
        const date = new Date(dateStr);
        const today = new Date();
        const diffTime = date.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };
    const getCategoryColor = (category) => {
        const colors = {
            'Sports': 'bg-orange-500',
            'Food': 'bg-red-500',
            'Social': 'bg-blue-500',
            'Community': 'bg-green-500',
            'Arts': 'bg-purple-500',
            'Culture': 'bg-pink-500',
        };
        return colors[category] || 'bg-gray-500';
    };
    return (<div className="bg-[#f5f5f7] min-h-screen">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/home')} className="p-2 hover:bg-white rounded-full transition-colors">
            <ArrowLeft className="h-6 w-6"/>
          </button>
          <div>
            <h1 className="text-2xl font-bold">Upcoming Events</h1>
            <p className="text-sm text-gray-600">{upcomingEvents.length} events sorted by date</p>
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {upcomingEvents.map((activity) => {
            const daysUntil = getDaysUntil(activity.date);
            return (<div key={activity.id} onClick={() => handleActivityClick(activity)} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex gap-4 p-4">
                {/* Image */}
                <div className="w-64 h-48 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 relative">
                  <img src={activity.imageUrl} alt={activity.title} className="w-full h-full object-cover"/>
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(activity.category)}`}>
                      {activity.category}
                    </span>
                  </div>
                  {daysUntil <= 7 && daysUntil >= 0 && (<div className="absolute top-3 right-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500 text-white">
                        {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `In ${daysUntil} days`}
                      </span>
                    </div>)}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between py-2">
                  <div>
                    <h3 className="font-semibold text-xl mb-2">{activity.title}</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4"/>
                        <span className="font-semibold text-[#5661f6]">{formatDate(activity.date)}</span>
                        <Clock className="h-4 w-4 ml-2"/>
                        <span>{activity.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4"/>
                        <span>{activity.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4"/>
                        <span>
                          {activity.currentParticipants}/{activity.maxParticipants} participants
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 pt-1">Organised by {activity.organiserName}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mt-3 pt-3 border-t">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-2xl">🔥</span>
                      <span className="font-semibold text-orange-600">
                        {Math.max(activity.maxParticipants - activity.currentParticipants, 0)} spots left
                      </span>
                    </div>
                    {activity.interestedUsers.includes(currentUser?.id || '') && (<span className="px-3 py-1 bg-[#5661f6] text-white text-xs rounded-full font-medium">
                        You're interested
                      </span>)}
                  </div>
                </div>
              </div>);
        })}
        </div>
      </div>
    </div>);
};
