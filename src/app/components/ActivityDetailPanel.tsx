import React from 'react';
import { X, Calendar, Clock, MapPin, Users, MessageCircle } from 'lucide-react';
import { Activity } from '../context/AppContext';
import { Button } from './ui/button';
import { useNavigate } from 'react-router';

interface ActivityDetailPanelProps {
  activity: Activity;
  isInterested: boolean;
  onToggleInterest: () => void;
  onClose: () => void;
  currentUserId: string;
}

export const ActivityDetailPanel: React.FC<ActivityDetailPanelProps> = ({
  activity,
  isInterested,
  onToggleInterest,
  onClose,
  currentUserId,
}) => {
  const navigate = useNavigate();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
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
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Hero Image */}
        <div className="relative h-64">
          <img 
            src={activity.imageUrl} 
            alt={activity.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="absolute bottom-4 left-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(activity.category)}`}>
              {activity.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title and Organiser */}
          <div>
            <h2 className="text-2xl font-bold mb-2">{activity.title}</h2>
            <div className="flex items-center gap-2">
              <img 
                src={activity.organiserAvatar} 
                alt={activity.organiserName}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">Organised by {activity.organiserName}</p>
                <p className="text-xs text-gray-500">Community Member</p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3 border-t border-b py-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-gray-600 mt-0.5" />
              <div>
                <p className="font-medium text-sm text-gray-600">Date</p>
                <p className="text-base">{formatDate(activity.date)}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-gray-600 mt-0.5" />
              <div>
                <p className="font-medium text-sm text-gray-600">Time</p>
                <p className="text-base">{activity.time}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-gray-600 mt-0.5" />
              <div>
                <p className="font-medium text-sm text-gray-600">Location</p>
                <p className="text-base">{activity.location}</p>
                <p className="text-sm text-gray-500">{activity.neighbourhood}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-gray-600 mt-0.5" />
              <div>
                <p className="font-medium text-sm text-gray-600">Participants</p>
                <p className="text-base">
                  {activity.currentParticipants} / {activity.maxParticipants} going
                </p>
                {Math.max(activity.maxParticipants - activity.currentParticipants, 0) > 0 && (
                  <p className="text-sm text-orange-600 font-medium">
                    🔥 {Math.max(activity.maxParticipants - activity.currentParticipants, 0)} spots left
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Details</h3>
            <p className="text-gray-700 leading-relaxed">{activity.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {isInterested ? (
              <>
                <div className="flex gap-3">
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    disabled
                  >
                    ✓ Registered
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
                    onClick={onToggleInterest}
                  >
                    Cancel Booking
                  </Button>
                </div>
                <Button 
                  className="w-full bg-[#5661f6] hover:bg-[#4551e6]"
                  onClick={() => {
                    navigate(`/messages/activity-${activity.id}`);
                    onClose();
                  }}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat with Group
                </Button>
              </>
            ) : (
              <Button 
                className="w-full bg-[#5661f6] hover:bg-[#4551e6]"
                onClick={onToggleInterest}
              >
                Sign Up
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
