import React from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, TrendingUp, Users, Calendar, Eye, MousePointer, UserPlus, UserMinus } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';

export const AnalyticsPage = () => {
  const navigate = useNavigate();
  const { activities, currentUser } = useApp();

  const organisedActivities = activities.filter(a => a.organiserId === currentUser?.id);

  // Analytics data - Mock data for demo purposes
  const eventViews = organisedActivities.reduce((sum, a) => sum + (Math.floor(Math.random() * 50) + 20), 0);
  const eventClicks = organisedActivities.reduce((sum, a) => sum + (Math.floor(Math.random() * 30) + 10), 0);
  const totalParticipants = organisedActivities.reduce((sum, a) => sum + a.currentParticipants, 0);
  const dropOffs = eventViews - eventClicks;

  // Participant trends over time (mock data)
  const participantTrends = [
    { month: 'Jan', views: 45, clicks: 32, signups: 15 },
    { month: 'Feb', views: 78, clicks: 54, signups: 28 },
    { month: 'Mar', views: eventViews, clicks: eventClicks, signups: totalParticipants },
  ];

  // Activity performance data
  const activityPerformance = organisedActivities.map((activity, index) => ({
    id: activity.id,
    name: activity.title.length > 20 ? activity.title.substring(0, 20) + '...' : activity.title,
    views: Math.floor(Math.random() * 50) + 20,
    clicks: Math.floor(Math.random() * 30) + 10,
    signups: activity.currentParticipants,
  })).slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/activity/my-activities')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1>Organiser Analytics</h1>
          <p className="text-muted-foreground">
            Insights about your organized activities
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Event Views</p>
                <p className="text-3xl font-bold mt-1">{eventViews}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Eye className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Event Clicks</p>
                <p className="text-3xl font-bold mt-1">{eventClicks}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <MousePointer className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Event Sign-ups</p>
                <p className="text-3xl font-bold mt-1">{totalParticipants}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <UserPlus className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Drop-offs</p>
                <p className="text-3xl font-bold mt-1">{dropOffs}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                <UserMinus className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="p-6">
            <h3 className="mb-4">Engagement Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={participantTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#5661F6" 
                  strokeWidth={2}
                  name="Views"
                  dot={{ fill: '#5661F6', r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="clicks" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Clicks"
                  dot={{ fill: '#3b82f6', r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="signups" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Sign-ups"
                  dot={{ fill: '#10b981', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Activity Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <Card className="p-6">
            <h3 className="mb-4">Activity Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activityPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Legend />
                <Bar dataKey="views" fill="#5661F6" name="Views" />
                <Bar dataKey="clicks" fill="#3b82f6" name="Clicks" />
                <Bar dataKey="signups" fill="#10b981" name="Sign-ups" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      {/* Top Performing Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="p-6">
          <h3 className="mb-4">Top Performing Activities</h3>
          <div className="space-y-3">
            {organisedActivities
              .sort((a, b) => b.currentParticipants - a.currentParticipants)
              .slice(0, 5)
              .map((activity, index) => (
                <div 
                  key={activity.id}
                  className="flex items-center justify-between p-3 bg-accent/50 rounded-lg hover:bg-accent transition-colors cursor-pointer"
                  onClick={() => navigate(`/activity/${activity.id}`)}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <img 
                      src={activity.imageUrl}
                      alt={activity.title}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{activity.currentParticipants}</p>
                    <p className="text-xs text-muted-foreground">participants</p>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};