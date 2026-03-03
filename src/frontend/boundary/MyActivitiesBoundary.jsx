import React from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { ActivityCard } from '../components/ActivityCard';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Plus, Calendar, TrendingUp, Users } from 'lucide-react';
import { motion } from 'motion/react';
export const MyActivitiesPage = () => {
    const navigate = useNavigate();
    const { activities, currentUser, toggleInterest, setSelectedActivity } = useApp();
    // Filter activities
    const organisedActivities = activities.filter(a => a.organiserId === currentUser?.id);
    const interestedActivities = activities.filter(a => a.interestedUsers.includes(currentUser?.id || ''));
    const handleActivityClick = (activity) => {
        setSelectedActivity(activity);
        navigate(`/activity/${activity.id}`);
    };
    return (<div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>My Activities</h1>
          <p className="text-muted-foreground">
            Manage your organized and interested activities
          </p>
        </div>
        {currentUser?.isOrganiser && (<Button onClick={() => navigate('/activity/create')}>
            <Plus className="h-4 w-4 mr-2"/>
            Create Activity
          </Button>)}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-foreground/80">Organized</p>
                <p className="text-3xl font-bold mt-1">{organisedActivities.length}</p>
              </div>
              <Calendar className="h-12 w-12 opacity-50"/>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80">Interested</p>
                <p className="text-3xl font-bold mt-1">{interestedActivities.length}</p>
              </div>
              <TrendingUp className="h-12 w-12 opacity-50"/>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80">Total Participants</p>
                <p className="text-3xl font-bold mt-1">
                  {organisedActivities.reduce((sum, a) => sum + a.currentParticipants, 0)}
                </p>
              </div>
              <Users className="h-12 w-12 opacity-50"/>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="organized" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="organized">
            Organized ({organisedActivities.length})
          </TabsTrigger>
          <TabsTrigger value="interested">
            Interested ({interestedActivities.length})
          </TabsTrigger>
        </TabsList>

        {/* Organized Activities */}
        <TabsContent value="organized" className="space-y-6">
          {organisedActivities.length === 0 ? (<div className="text-center py-12 bg-accent/50 rounded-lg">
              <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4"/>
              <h3>No organized activities yet</h3>
              <p className="text-muted-foreground mt-2">
                Start organizing activities to bring your community together
              </p>
              <Button onClick={() => navigate('/activity/create')} className="mt-4">
                <Plus className="h-4 w-4 mr-2"/>
                Create Your First Activity
              </Button>
            </div>) : (<>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  Activities you've organized
                </p>
                <Button variant="outline" size="sm" onClick={() => navigate('/activity/analytics')}>
                  <TrendingUp className="h-4 w-4 mr-2"/>
                  View Analytics
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {organisedActivities.map((activity, index) => (<motion.div key={activity.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * index }}>
                    <ActivityCard activity={activity} onSelect={() => handleActivityClick(activity)} showInterestButton={false}/>
                  </motion.div>))}
              </div>
            </>)}
        </TabsContent>

        {/* Interested Activities */}
        <TabsContent value="interested" className="space-y-6">
          {interestedActivities.length === 0 ? (<div className="text-center py-12 bg-accent/50 rounded-lg">
              <TrendingUp className="h-16 w-16 mx-auto text-muted-foreground mb-4"/>
              <h3>No interested activities yet</h3>
              <p className="text-muted-foreground mt-2">
                Explore activities and express your interest to connect with neighbours
              </p>
              <Button onClick={() => navigate('/explore')} variant="outline" className="mt-4">
                Explore Activities
              </Button>
            </div>) : (<>
              <p className="text-muted-foreground">
                Activities you're interested in joining
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {interestedActivities.map((activity, index) => (<motion.div key={activity.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * index }}>
                    <ActivityCard activity={activity} onSelect={() => handleActivityClick(activity)} isInterested={true} onToggleInterest={() => toggleInterest(activity.id)}/>
                  </motion.div>))}
              </div>
            </>)}
        </TabsContent>
      </Tabs>
    </div>);
};
