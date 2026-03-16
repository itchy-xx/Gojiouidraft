import React from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { ActivityCard } from '../components/ActivityCard';
import { Button } from '../components/ui/button';
import { Plus, Calendar, UserPlus, UserMinus, MousePointer, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { Card } from '../components/ui/card';

export const OrganiserActivitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const { activities, currentUser, setSelectedActivity } = useApp();
  
  // Filter activities
  const organisedActivities = activities.filter(a => a.organiserId === currentUser?.id);

  const handleActivityClick = (activity: any) => {
    setSelectedActivity(activity);
    navigate(`/activity/${activity.id}`);
  };

  // Analytics data - Mock data for demo purposes
  const totalParticipants = organisedActivities.reduce((sum, a) => sum + a.currentParticipants, 0);
  const dropOffs = organisedActivities.reduce((sum, a) => sum + (Math.floor(Math.random() * 20) + 5), 0);
  const eventClicks = totalParticipants + dropOffs; // Event Clicks = Sign-ups + Drop-offs

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
      <div className="flex items-center justify-between">
        <div>
          <h1>Organiser Activity</h1>
          <p className="text-muted-foreground mt-2">
            {organisedActivities.length} event{organisedActivities.length !== 1 ? 's' : ''} organized
          </p>
        </div>
        <Button onClick={() => navigate('/activity/create')}>
          <Plus className="h-4 w-4 mr-2" />
          Create Activity
        </Button>
      </div>

      {/* Analytics Overview */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Analytics Overview</h2>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Event Clicks</p>
                <p className="text-3xl font-bold mt-2">{eventClicks}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <MousePointer className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Sign-ups</p>
                <p className="text-3xl font-bold mt-2">{totalParticipants}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <UserPlus className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Drop-offs</p>
                <p className="text-3xl font-bold mt-2">{dropOffs}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                <UserMinus className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Organized Events */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Events You've Organized ({organisedActivities.length})</h2>
        {organisedActivities.length === 0 ? (
          <div className="text-center py-12 bg-accent/50 rounded-lg">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground mb-4">
              No organized activities yet
            </p>
            <Button onClick={() => navigate('/activity/create')}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Activity
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {organisedActivities.map((activity, index) => (
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