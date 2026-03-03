import React from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, TrendingUp, Users, Calendar, Target } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';
export const AnalyticsPage = () => {
    const navigate = useNavigate();
    const { activities, currentUser } = useApp();
    const organisedActivities = activities.filter(a => a.organiserId === currentUser?.id);
    // Analytics data
    const totalParticipants = organisedActivities.reduce((sum, a) => sum + a.currentParticipants, 0);
    const averageParticipants = organisedActivities.length > 0
        ? Math.round(totalParticipants / organisedActivities.length)
        : 0;
    const totalCapacity = organisedActivities.reduce((sum, a) => sum + a.maxParticipants, 0);
    const fillRate = totalCapacity > 0 ? Math.round((totalParticipants / totalCapacity) * 100) : 0;
    // Category distribution
    const categoryData = organisedActivities.reduce((acc, activity) => {
        const existing = acc.find(item => item.name === activity.category);
        if (existing) {
            existing.value += 1;
        }
        else {
            acc.push({ name: activity.category, value: 1 });
        }
        return acc;
    }, []);
    // Participants over time (mock data)
    const timeData = [
        { month: 'Jan', participants: 15 },
        { month: 'Feb', participants: 28 },
        { month: 'Mar', participants: totalParticipants },
    ];
    // Activities by neighbourhood
    const neighbourhoodData = organisedActivities.reduce((acc, activity) => {
        const existing = acc.find(item => item.neighbourhood === activity.neighbourhood);
        if (existing) {
            existing.activities += 1;
            existing.participants += activity.currentParticipants;
        }
        else {
            acc.push({
                neighbourhood: activity.neighbourhood,
                activities: 1,
                participants: activity.currentParticipants
            });
        }
        return acc;
    }, []);
    const COLORS = ['#5661F6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
    return (<div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/activity/my-activities')}>
          <ArrowLeft className="h-5 w-5"/>
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Activities</p>
                <p className="text-3xl font-bold mt-1">{organisedActivities.length}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary"/>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Participants</p>
                <p className="text-3xl font-bold mt-1">{totalParticipants}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600"/>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Avg Participants</p>
                <p className="text-3xl font-bold mt-1">{averageParticipants}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-orange-600"/>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Fill Rate</p>
                <p className="text-3xl font-bold mt-1">{fillRate}%</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Target className="h-6 w-6 text-purple-600"/>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Participants Over Time */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="p-6">
            <h3 className="mb-4">Participants Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
                <XAxis dataKey="month" stroke="#888"/>
                <YAxis stroke="#888"/>
                <Tooltip />
                <Line type="monotone" dataKey="participants" stroke="#5661F6" strokeWidth={2} dot={{ fill: '#5661F6', r: 4 }}/>
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Category Distribution */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="p-6">
            <h3 className="mb-4">Activities by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={100} fill="#8884d8" dataKey="value">
                  {categoryData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Neighbourhood Performance */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="mb-4">Performance by Neighbourhood</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={neighbourhoodData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
                <XAxis dataKey="neighbourhood" stroke="#888"/>
                <YAxis stroke="#888"/>
                <Tooltip />
                <Legend />
                <Bar dataKey="activities" fill="#5661F6" name="Activities"/>
                <Bar dataKey="participants" fill="#10b981" name="Participants"/>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      {/* Top Performing Activities */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
        <Card className="p-6">
          <h3 className="mb-4">Top Performing Activities</h3>
          <div className="space-y-3">
            {organisedActivities
            .sort((a, b) => b.currentParticipants - a.currentParticipants)
            .slice(0, 5)
            .map((activity, index) => (<div key={activity.id} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg hover:bg-accent transition-colors cursor-pointer" onClick={() => navigate(`/activity/${activity.id}`)}>
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <img src={activity.imageUrl} alt={activity.title} className="w-12 h-12 rounded object-cover"/>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{activity.currentParticipants}</p>
                    <p className="text-xs text-muted-foreground">participants</p>
                  </div>
                </div>))}
          </div>
        </Card>
      </motion.div>
    </div>);
};
