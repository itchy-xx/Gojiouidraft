import React from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Users, TrendingUp, ArrowRight, Calendar } from 'lucide-react';
import { Card } from '../components/ui/card';

export const MyActivitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const { activities, currentUser } = useApp();
  
  // Filter activities
  const organisedActivities = activities.filter(a => a.organiserId === currentUser?.id);
  const interestedActivities = activities.filter(a => a.interestedUsers.includes(currentUser?.id || ''));

  return (
    <div className="max-w-[1400px] mx-auto p-4 space-y-6">
      {/* Header */}
      <div>
        <h1>My Activities</h1>
        <p className="text-muted-foreground mt-2">
          Manage your activities and events
        </p>
      </div>

      {/* Activity Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Participant Activity Card */}
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigate('/activity/participant')}>
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Participant Activity</h2>
          <p className="text-muted-foreground text-sm mb-4">
            View events you've joined and manage your participation
          </p>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">
              {interestedActivities.length} event{interestedActivities.length !== 1 ? 's' : ''} joined
            </span>
          </div>
        </Card>

        {/* Organiser Activity Card */}
        {currentUser?.isOrganiser && (
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigate('/activity/organiser')}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Organiser Activity</h2>
            <p className="text-muted-foreground text-sm mb-4">
              Manage your organized events and view analytics
            </p>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {organisedActivities.length} event{organisedActivities.length !== 1 ? 's' : ''} organized
              </span>
            </div>
          </Card>
        )}
      </div>

      {/* Quick Actions */}
      <div className="pt-4">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">QUICK ACTIONS</h3>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => navigate('/explore')}>
            Explore Activities
          </Button>
          {currentUser?.isOrganiser && (
            <Button onClick={() => navigate('/activity/create')}>
              Create New Activity
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};