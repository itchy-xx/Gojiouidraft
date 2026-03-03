import React from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Bell, Check } from 'lucide-react';
import { motion } from 'motion/react';
export const NotificationsPage = () => {
    const navigate = useNavigate();
    const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useApp();
    const formatTime = (date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        if (minutes < 1)
            return 'Just now';
        if (minutes < 60)
            return `${minutes}m ago`;
        if (hours < 24)
            return `${hours}h ago`;
        return `${days}d ago`;
    };
    const handleNotificationClick = (notification) => {
        markNotificationAsRead(notification.id);
        if (notification.activityId) {
            navigate(`/activity/${notification.activityId}`);
        }
        else if (notification.actionUrl) {
            navigate(notification.actionUrl);
        }
    };
    const getIcon = (type) => {
        switch (type) {
            case 'connection': return '🤝';
            case 'activity': return '📅';
            case 'message': return '💬';
            case 'interest': return '⭐';
            default: return '🔔';
        }
    };
    return (<div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Notifications</h1>
          <p className="text-muted-foreground">
            {notifications.filter(n => !n.read).length} unread notification{notifications.filter(n => !n.read).length !== 1 ? 's' : ''}
          </p>
        </div>
        {notifications.some(n => !n.read) && (<Button variant="outline" onClick={markAllNotificationsAsRead}>
            <Check className="h-4 w-4 mr-2"/>
            Mark all as read
          </Button>)}
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {notifications.length === 0 ? (<Card className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Bell className="h-8 w-8 text-muted-foreground"/>
            </div>
            <h3>No notifications yet</h3>
            <p className="text-muted-foreground mt-2">
              We'll notify you when something important happens
            </p>
          </Card>) : (notifications.map((notification, index) => (<motion.div key={notification.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * index }}>
              <Card className={`p-4 cursor-pointer transition-all hover:shadow-md ${!notification.read ? 'bg-primary/5 border-primary/20' : ''}`} onClick={() => handleNotificationClick(notification)}>
                <div className="flex gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${!notification.read ? 'bg-primary/10' : 'bg-muted'}`}>
                      {getIcon(notification.type)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="font-medium">{notification.title}</p>
                        <p className="text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                      </div>
                      {!notification.read && (<div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"/>)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {formatTime(notification.timestamp)}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>)))}
      </div>
    </div>);
};
