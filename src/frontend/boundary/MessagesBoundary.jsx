import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Users, MessageCircle, User } from 'lucide-react';
export const MessagesPage = () => {
    const navigate = useNavigate();
    const { conversations, activities, currentUser } = useApp();
    const [activeTab, setActiveTab] = useState('all');
    // Group conversations by activity ID
    const groupChats = activities
        .filter(activity => activity.interestedUsers.includes(currentUser?.id || ''))
        .map(activity => ({
        id: `activity-${activity.id}`,
        activityId: activity.id,
        title: activity.title,
        image: activity.imageUrl,
        type: 'group',
        participants: activity.currentParticipants,
        lastMessage: `Group chat for ${activity.title}`,
        lastMessageTime: new Date(),
        unread: false,
    }));
    // Private conversations
    const privateChats = conversations.map(conv => ({
        ...conv,
        type: 'private',
    }));
    // All chats combined
    const allChats = [...groupChats, ...privateChats];
    const filteredChats = activeTab === 'all'
        ? allChats
        : activeTab === 'groups'
            ? groupChats
            : privateChats;
    const formatTime = (date) => {
        const now = new Date();
        const diff = now.getTime() - new Date(date).getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        if (hours < 24) {
            return new Date(date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        }
        else {
            return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
        }
    };
    return (<div className="bg-[#f5f5f7] min-h-screen">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-sm text-gray-600">
            {filteredChats.length} {activeTab === 'groups' ? 'group' : activeTab === 'private' ? 'private' : ''} conversation{filteredChats.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="all">
              <MessageCircle className="h-4 w-4 mr-2"/>
              All ({allChats.length})
            </TabsTrigger>
            <TabsTrigger value="private">
              <User className="h-4 w-4 mr-2"/>
              Private ({privateChats.length})
            </TabsTrigger>
            <TabsTrigger value="groups">
              <Users className="h-4 w-4 mr-2"/>
              Groups ({groupChats.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            {filteredChats.length === 0 ? (<div className="bg-white rounded-2xl p-12 text-center">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-lg font-semibold mb-2">No {activeTab === 'groups' ? 'group' : activeTab === 'private' ? 'private' : ''} messages yet</h3>
                <p className="text-gray-600 mb-4">
                  {activeTab === 'groups'
                ? 'Join an activity to start chatting with the group!'
                : 'Connect with neighbours through activities to start chatting!'}
                </p>
                <Button onClick={() => navigate('/explore')} className="bg-[#5661f6] hover:bg-[#4551e6]">
                  Explore Activities
                </Button>
              </div>) : (<div className="space-y-2">
                {filteredChats.map((chat) => (<div key={chat.id} onClick={() => navigate(`/messages/${chat.id}`)} className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer flex items-center gap-4">
                    {/* Avatar/Image */}
                    <div className="relative">
                      <img src={chat.type === 'group' ? chat.image : chat.participantAvatar} alt={chat.type === 'group' ? chat.title : chat.participantName} className="w-16 h-16 rounded-full object-cover"/>
                      {chat.type === 'group' && (<div className="absolute -bottom-1 -right-1 bg-[#5661f6] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                          <Users className="h-3 w-3"/>
                        </div>)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <h3 className="font-semibold line-clamp-1">
                            {chat.type === 'group' ? chat.title : chat.participantName}
                          </h3>
                          {chat.type === 'group' && (<p className="text-xs text-gray-500">
                              {chat.participants} members
                            </p>)}
                        </div>
                        <span className="text-xs text-gray-500 flex-shrink-0">
                          {formatTime(chat.lastMessageTime)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 line-clamp-1">
                          {chat.lastMessage}
                        </p>
                        {chat.unread && (<div className="flex-shrink-0 ml-2">
                            <span className="bg-[#5661f6] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                              New
                            </span>
                          </div>)}
                      </div>
                    </div>
                  </div>))}
              </div>)}
          </TabsContent>
        </Tabs>
      </div>
    </div>);
};
