import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  neighbourhood: string;
  isOrganiser: boolean;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  startTime: string;
  endTime: string;
  location: string;
  neighbourhood: string;
  coordinates: { lat: number; lng: number };
  organiserId: string;
  organiserName: string;
  organiserAvatar: string;
  maxParticipants: number;
  currentParticipants: number;
  imageUrl: string;
  tags: string[];
  interestedUsers: string[];
  popularityRank?: number;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
}

export interface Notification {
  id: string;
  type: 'connection' | 'activity' | 'message' | 'interest';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  userId?: string;
  activityId?: string;
}

export interface FilterState {
  category: string;
  neighbourhood: string;
  date: string;
  searchQuery: string;
}

interface AppContextType {
  // Auth
  currentUser: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (name: string, email: string, password: string, neighbourhood: string) => void;
  
  // Activities
  activities: Activity[];
  addActivity: (activity: Omit<Activity, 'id' | 'organiserId' | 'organiserName' | 'organiserAvatar' | 'interestedUsers' | 'currentParticipants'>) => void;
  updateActivity: (id: string, updates: Partial<Activity>) => void;
  deleteActivity: (id: string) => void;
  toggleInterest: (activityId: string) => void;
  
  // Filters
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  
  // Messages
  conversations: Conversation[];
  messages: Message[];
  sendMessage: (conversationId: string, content: string) => void;
  markConversationAsRead: (conversationId: string) => void;
  getMessagesForConversation: (conversationId: string) => Message[];
  unreadMessageCount: number;
  
  // Notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  unreadNotificationCount: number;
  
  // Selected Activity (for detail view)
  selectedActivity: Activity | null;
  setSelectedActivity: (activity: Activity | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Auth State
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: 'user-1',
    name: 'Sarah Tan',
    email: 'sarah.tan@example.sg',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    neighbourhood: 'Tiong Bahru',
    isOrganiser: true,
  });

  // Activities State
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 'act-1',
      title: 'Weekend Morning Jog at East Coast Park',
      description: 'Join us for a refreshing morning jog along the scenic East Coast Park! Perfect for all fitness levels. We\'ll start at the NTUC shelter and do a 5km route.',
      category: 'Sports',
      date: '2026-03-07',
      time: '07:00',
      startTime: '07:00',
      endTime: '08:00',
      location: 'East Coast Park, NTUC Shelter',
      neighbourhood: 'Marine Parade',
      coordinates: { lat: 1.3010, lng: 103.9122 },
      organiserId: 'user-2',
      organiserName: 'Marcus Lim',
      organiserAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      maxParticipants: 15,
      currentParticipants: 8,
      imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800',
      tags: ['running', 'fitness', 'morning'],
      interestedUsers: [],
    },
    {
      id: 'act-2',
      title: 'Community Gardening @ Tiong Bahru',
      description: 'Help beautify our neighbourhood! Bring gloves and we\'ll provide plants and tools. Great for families and kids.',
      category: 'Community',
      date: '2026-03-08',
      time: '16:00',
      startTime: '16:00',
      endTime: '18:00',
      location: 'Tiong Bahru Community Garden',
      neighbourhood: 'Tiong Bahru',
      coordinates: { lat: 1.2860, lng: 103.8268 },
      organiserId: 'user-1',
      organiserName: 'Sarah Tan',
      organiserAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      maxParticipants: 20,
      currentParticipants: 12,
      imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800',
      tags: ['gardening', 'community', 'family-friendly'],
      interestedUsers: ['user-3'],
    },
    {
      id: 'act-3',
      title: 'Badminton Session - Beginners Welcome',
      description: 'Casual badminton games at our neighbourhood court. All skill levels welcome! Just bring your racket.',
      category: 'Sports',
      date: '2026-03-06',
      time: '19:00',
      startTime: '19:00',
      endTime: '21:00',
      location: 'Toa Payoh Sports Hall',
      neighbourhood: 'Toa Payoh',
      coordinates: { lat: 1.3344, lng: 103.8497 },
      organiserId: 'user-4',
      organiserName: 'Priya Kumar',
      organiserAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      maxParticipants: 12,
      currentParticipants: 7,
      imageUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800',
      tags: ['badminton', 'sports', 'indoor'],
      interestedUsers: [],
    },
    {
      id: 'act-4',
      title: 'Hawker Food Tour - Chinatown Edition',
      description: 'Explore the best hawker food in Chinatown! I\'ll share hidden gems and local favourites. Come hungry!',
      category: 'Food',
      date: '2026-03-09',
      time: '18:30',
      startTime: '18:30',
      endTime: '20:30',
      location: 'Chinatown Complex Food Centre',
      neighbourhood: 'Chinatown',
      coordinates: { lat: 1.2820, lng: 103.8439 },
      organiserId: 'user-5',
      organiserName: 'Wei Jie',
      organiserAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      maxParticipants: 10,
      currentParticipants: 6,
      imageUrl: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800',
      tags: ['food', 'culture', 'walking'],
      interestedUsers: [],
    },
    {
      id: 'act-5',
      title: 'Board Games Night at Café',
      description: 'Chill board games session at a cozy café. We have Catan, Ticket to Ride, Codenames, and more!',
      category: 'Social',
      date: '2026-03-10',
      time: '20:00',
      startTime: '20:00',
      endTime: '22:00',
      location: 'The Board Room Café, Bugis',
      neighbourhood: 'Bugis',
      coordinates: { lat: 1.3002, lng: 103.8557 },
      organiserId: 'user-6',
      organiserName: 'Alex Wong',
      organiserAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      maxParticipants: 8,
      currentParticipants: 5,
      imageUrl: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800',
      tags: ['games', 'social', 'indoor'],
      interestedUsers: [],
    },
  ]);

  // Filters State
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    neighbourhood: 'All',
    date: 'All',
    searchQuery: '',
  });

  // Messages State
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 'conv-1',
      participantId: 'user-2',
      participantName: 'Marcus Lim',
      participantAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      lastMessage: 'See you at 7am tomorrow!',
      lastMessageTime: new Date(2026, 2, 1, 15, 30),
      unreadCount: 0,
    },
    {
      id: 'conv-2',
      participantId: 'user-3',
      participantName: 'Jennifer Koh',
      participantAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      lastMessage: 'Thanks for organizing the gardening session!',
      lastMessageTime: new Date(2026, 2, 1, 12, 15),
      unreadCount: 2,
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      conversationId: 'conv-1',
      senderId: 'user-2',
      senderName: 'Marcus Lim',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      content: 'Hey! Are you joining the jog this weekend?',
      timestamp: new Date(2026, 2, 1, 14, 20),
      read: true,
    },
    {
      id: 'msg-2',
      conversationId: 'conv-1',
      senderId: 'user-1',
      senderName: 'Sarah Tan',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      content: 'Yes! Looking forward to it.',
      timestamp: new Date(2026, 2, 1, 14, 25),
      read: true,
    },
    {
      id: 'msg-3',
      conversationId: 'conv-1',
      senderId: 'user-2',
      senderName: 'Marcus Lim',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      content: 'See you at 7am tomorrow!',
      timestamp: new Date(2026, 2, 1, 15, 30),
      read: true,
    },
  ]);

  // Notifications State
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'notif-1',
      type: 'interest',
      title: 'New Interest',
      message: 'Jennifer Koh is interested in your Community Gardening event',
      timestamp: new Date(2026, 2, 1, 10, 30),
      read: false,
      activityId: 'act-2',
    },
    {
      id: 'notif-2',
      type: 'activity',
      title: 'Event Update',
      message: 'Weekend Morning Jog has been updated',
      timestamp: new Date(2026, 2, 1, 9, 15),
      read: false,
      activityId: 'act-1',
    },
  ]);

  // Selected Activity
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  // Auth Actions - Memoized with useCallback
  const login = useCallback((email: string, password: string) => {
    setCurrentUser({
      id: 'user-1',
      name: 'Sarah Tan',
      email,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      neighbourhood: 'Tiong Bahru',
      isOrganiser: true,
    });
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const register = useCallback((name: string, email: string, password: string, neighbourhood: string) => {
    setCurrentUser({
      id: `user-${Date.now()}`,
      name,
      email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      neighbourhood,
      isOrganiser: false,
    });
  }, []);

  // Activity Actions - Memoized with useCallback
  const addActivity = useCallback((activity: Omit<Activity, 'id' | 'organiserId' | 'organiserName' | 'organiserAvatar' | 'interestedUsers' | 'currentParticipants'>) => {
    setCurrentUser(prevUser => {
      if (!prevUser) return prevUser;
      
      const newActivity: Activity = {
        ...activity,
        id: `act-${Date.now()}`,
        organiserId: prevUser.id,
        organiserName: prevUser.name,
        organiserAvatar: prevUser.avatar,
        interestedUsers: [],
        currentParticipants: 0,
      };
      
      setActivities(prev => [newActivity, ...prev]);
      setNotifications(prev => [{
        id: `notif-${Date.now()}`,
        type: 'activity' as const,
        title: 'Event Created',
        message: `Your event "${activity.title}" has been created successfully`,
        activityId: newActivity.id,
        timestamp: new Date(),
        read: false,
      }, ...prev]);
      
      return prevUser;
    });
  }, []);

  const updateActivity = useCallback((id: string, updates: Partial<Activity>) => {
    setActivities(prev => prev.map(act => 
      act.id === id ? { ...act, ...updates } : act
    ));
  }, []);

  const deleteActivity = useCallback((id: string) => {
    setActivities(prev => prev.filter(act => act.id !== id));
  }, []);

  const toggleInterest = useCallback((activityId: string) => {
    setCurrentUser(prevUser => {
      if (!prevUser) return prevUser;
      
      setActivities(prev => prev.map(act => {
        if (act.id === activityId) {
          const isInterested = act.interestedUsers.includes(prevUser.id);
          return {
            ...act,
            interestedUsers: isInterested 
              ? act.interestedUsers.filter(id => id !== prevUser.id)
              : [...act.interestedUsers, prevUser.id],
            currentParticipants: isInterested 
              ? act.currentParticipants - 1 
              : act.currentParticipants + 1,
          };
        }
        return act;
      }));
      
      return prevUser;
    });
  }, []);

  // Message Actions - Memoized with useCallback
  const sendMessage = useCallback((conversationId: string, content: string) => {
    setCurrentUser(prevUser => {
      if (!prevUser) return prevUser;
      
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        conversationId,
        senderId: prevUser.id,
        senderName: prevUser.name,
        senderAvatar: prevUser.avatar,
        content,
        timestamp: new Date(),
        read: false,
      };
      
      setMessages(prev => [...prev, newMessage]);
      setConversations(prev => prev.map(conv => 
        conv.id === conversationId 
          ? { ...conv, lastMessage: content, lastMessageTime: new Date() }
          : conv
      ));
      
      return prevUser;
    });
  }, []);

  const markConversationAsRead = useCallback((conversationId: string) => {
    setConversations(prev => prev.map(conv =>
      conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
    ));
  }, []);

  const getMessagesForConversation = useCallback((conversationId: string) => {
    return messages.filter(msg => msg.conversationId === conversationId);
  }, [messages]);

  // Notification Actions - Memoized with useCallback
  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      timestamp: new Date(),
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);
  }, []);

  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  }, []);

  const markAllNotificationsAsRead = useCallback(() => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  }, []);

  // Computed values
  const unreadMessageCount = useMemo(() => 
    conversations.reduce((sum, conv) => sum + conv.unreadCount, 0),
    [conversations]
  );

  const unreadNotificationCount = useMemo(() => 
    notifications.filter(n => !n.read).length,
    [notifications]
  );

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    currentUser,
    login,
    logout,
    register,
    activities,
    addActivity,
    updateActivity,
    deleteActivity,
    toggleInterest,
    filters,
    setFilters,
    conversations,
    messages,
    sendMessage,
    markConversationAsRead,
    getMessagesForConversation,
    unreadMessageCount,
    notifications,
    addNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    unreadNotificationCount,
    selectedActivity,
    setSelectedActivity,
  }), [
    currentUser,
    login,
    logout,
    register,
    activities,
    addActivity,
    updateActivity,
    deleteActivity,
    toggleInterest,
    filters,
    conversations,
    messages,
    sendMessage,
    markConversationAsRead,
    getMessagesForConversation,
    unreadMessageCount,
    notifications,
    addNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    unreadNotificationCount,
    selectedActivity,
  ]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};