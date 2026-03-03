import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Calendar, Clock, MapPin, Users, ArrowLeft, MessageSquare, Edit, Trash } from 'lucide-react';
import { motion } from 'motion/react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from '../components/ui/alert-dialog';
export const ActivityDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { activities, currentUser, toggleInterest, deleteActivity, conversations, addNotification } = useApp();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showInterestList, setShowInterestList] = useState(false);
    
    const activity = activities.find(a => a.id === id);
    if (!activity) {
        return (<div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-muted-foreground">Activity not found</p>
          <Button onClick={() => navigate('/home')} className="mt-4">
            Go Home
          </Button>
        </div>
      </div>);
    }
    const isInterested = activity.interestedUsers.includes(currentUser?.id || '');
    const isOrganiser = activity.organiserId === currentUser?.id;
    const spotsLeft = activity.maxParticipants - activity.currentParticipants;
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-SG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };
    const handleToggleInterest = () => {
        toggleInterest(activity.id);
        if (!isInterested) {
            setShowInterestList(true);
            // Notify organiser
            addNotification({
                type: 'interest',
                title: 'New Interest',
                message: `${currentUser?.name} is interested in ${activity.title}`,
                activityId: activity.id,
            });
        }
    };
    const handleDelete = () => {
        deleteActivity(activity.id);
        navigate('/home');
    };
    const handleConnect = (userId) => {
        // Check if conversation exists
        const existingConv = conversations.find(c => c.participantId === userId);
        if (existingConv) {
            navigate(`/messages/${existingConv.id}`);
        }
        else {
            // In real app, create conversation
            navigate('/messages');
        }
    };
    // Mock interested users for demo
    const interestedUsersData = [
        { id: 'user-3', name: 'Jennifer Koh', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
        { id: 'user-4', name: 'Priya Kumar', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
        { id: 'user-5', name: 'Wei Jie', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
    ];
    return (<div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft className="h-4 w-4"/>
          Back
        </Button>

        {/* Hero Image */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative h-96 rounded-xl overflow-hidden">
          <img src={activity.imageUrl} alt={activity.title} className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"/>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <Badge className="mb-3 bg-white text-foreground">
              {activity.category}
            </Badge>
            <h1 className="text-4xl font-bold mb-2">{activity.title}</h1>
            <div className="flex items-center gap-2">
              <img src={activity.organiserAvatar} alt={activity.organiserName} className="w-10 h-10 rounded-full border-2 border-white"/>
              <span className="font-medium">Organised by {activity.organiserName}</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Details Card */}
            <Card className="p-6 space-y-4">
              <div>
                <h2>Details</h2>
                <p className="text-muted-foreground mt-2">{activity.description}</p>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary"/>
                  <div>
                    <p className="font-medium">{formatDate(activity.date)}</p>
                    <p className="text-sm text-muted-foreground">Date</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary"/>
                  <div>
                    <p className="font-medium">{activity.time}</p>
                    <p className="text-sm text-muted-foreground">Time</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary"/>
                  <div>
                    <p className="font-medium">{activity.location}</p>
                    <p className="text-sm text-muted-foreground">{activity.neighbourhood}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary"/>
                  <div>
                    <p className="font-medium">
                      {activity.currentParticipants} / {activity.maxParticipants} participants
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {spotsLeft > 0 ? `${spotsLeft} spot${spotsLeft !== 1 ? 's' : ''} left` : 'Full'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {activity.tags.length > 0 && (<>
                  <Separator />
                  <div className="flex flex-wrap gap-2">
                    {activity.tags.map(tag => (<Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>))}
                  </div>
                </>)}
            </Card>

            {/* Interested Users (shown after expressing interest) */}
            {isInterested && (<motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                <Card className="p-6 space-y-4">
                  <h3>Connect with Neighbours</h3>
                  <p className="text-muted-foreground">
                    Other people interested in this activity:
                  </p>
                  <div className="space-y-3">
                    {interestedUsersData.slice(0, 3).map(user => (<div key={user.id} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover"/>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">From your neighbourhood</p>
                          </div>
                        </div>
                        <Button size="sm" onClick={() => handleConnect(user.id)}>
                          <MessageSquare className="h-4 w-4 mr-2"/>
                          Connect
                        </Button>
                      </div>))}
                  </div>
                </Card>
              </motion.div>)}
          </div>

          {/* Action Sidebar */}
          <div className="space-y-4">
            {/* Interest Button */}
            <Card className="p-6 space-y-4">
              {isOrganiser ? (<>
                  <h3>Organiser Options</h3>
                  <div className="space-y-3">
                    <Button onClick={() => navigate(`/activity/edit/${activity.id}`)} className="w-full" variant="outline">
                      <Edit className="h-4 w-4 mr-2"/>
                      Edit Activity
                    </Button>
                    <Button onClick={() => setShowDeleteDialog(true)} className="w-full" variant="destructive">
                      <Trash className="h-4 w-4 mr-2"/>
                      Delete Activity
                    </Button>
                    <Button onClick={() => navigate('/activity/analytics')} className="w-full" variant="outline">
                      View Analytics
                    </Button>
                  </div>
                </>) : (<>
                  <h3>Join This Activity</h3>
                  <div className="space-y-3">
                    {isInterested ? (<>
                        <Button className="w-full bg-green-600 hover:bg-green-700" disabled>
                          ✓ Registered
                        </Button>
                        <Button variant="outline" className="w-full border-red-500 text-red-500 hover:bg-red-50" onClick={handleToggleInterest}>
                          Cancel Booking
                        </Button>
                        <Button className="w-full bg-[#5661f6] hover:bg-[#4551e6]" onClick={() => navigate(`/messages/activity-${activity.id}`)}>
                          <MessageSquare className="h-4 w-4 mr-2"/>
                          Chat with Group
                        </Button>
                      </>) : (<Button className="w-full bg-[#5661f6] hover:bg-[#4551e6]" onClick={handleToggleInterest} disabled={spotsLeft === 0}>
                        {spotsLeft === 0 ? 'Full' : 'Sign Up'}
                      </Button>)}
                  </div>
                  
                  {spotsLeft > 0 && spotsLeft <= 5 && (<div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-sm text-orange-800">
                      🔥 Only {spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} left!
                    </div>)}
                </>)}
            </Card>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Activity?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{activity.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>);
};
