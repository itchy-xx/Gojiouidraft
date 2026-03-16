import React from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { ActivityCard } from '../components/ActivityCard';
import { Button } from '../components/ui/button';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export const ParticipantActivitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const { activities, currentUser, toggleInterest, setSelectedActivity } = useApp();
  
  // Filter activities
  const interestedActivities = activities.filter(a => a.interestedUsers.includes(currentUser?.id || ''));
  
  // Split interested activities into upcoming and past
  const now = new Date();
  const upcomingEvents = interestedActivities.filter(a => {
    const eventDate = new Date(a.date);
    return eventDate >= now;
  });
  
  const pastEvents = interestedActivities.filter(a => {
    const eventDate = new Date(a.date);
    return eventDate < now;
  });

  const handleActivityClick = (activity: any) => {
    setSelectedActivity(activity);
    navigate(`/activity/${activity.id}`);
  };

  return (
    <div className="max-w-[1400px] mx-auto p-4 space-y-6">
      {/* Back Button */}
      <div>
        <Button 
          variant="ghost" 
          onClick={() => navigate('/activity')}
          className="mb-2 -ml-3"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to My Activities
        </Button>
      </div>

      {/* Header */}
      <div>
        <h1>Participant Activity</h1>
        <p className="text-muted-foreground mt-2">
          {interestedActivities.length} event{interestedActivities.length !== 1 ? 's' : ''} you've joined
        </p>
      </div>

      {/* Upcoming Events */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Upcoming Events ({upcomingEvents.length})</h2>
        {upcomingEvents.length === 0 ? (
          <div className="text-center py-12 bg-accent/50 rounded-lg">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground mb-4">
              No upcoming events. Explore activities to join!
            </p>
            <Button onClick={() => navigate('/explore')} variant="outline">
              Explore Activities
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingEvents.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <ActivityCard
                  activity={activity}
                  onSelect={() => handleActivityClick(activity)}
                  isInterested={true}
                  onToggleInterest={() => toggleInterest(activity.id)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Past Events */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Past Events ({pastEvents.length})</h2>
        {pastEvents.length === 0 ? (
          <div className="text-center py-12 bg-accent/50 rounded-lg">
            <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">
              No past events yet
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pastEvents.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <ActivityCard
                  activity={activity}
                  onSelect={() => handleActivityClick(activity)}
                  showInterestButton={false}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};