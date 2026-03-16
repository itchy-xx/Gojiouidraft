import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Activity } from '../context/AppContext';
import { motion } from 'motion/react';

interface ActivityCardProps {
  activity: Activity;
  onSelect?: () => void;
  isSelected?: boolean;
  showInterestButton?: boolean;
  isInterested?: boolean;
  onToggleInterest?: () => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  onSelect,
  isSelected = false,
  showInterestButton = true,
  isInterested = false,
  onToggleInterest,
}) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-SG', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const formatTime = (timeStr: string) => {
    // Convert 24-hour time to 12-hour format
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${period}`;
  };

  const formatDateTimeRange = () => {
    const date = formatDate(activity.date);
    const start = formatTime(activity.startTime);
    const end = formatTime(activity.endTime);
    return `${date} • ${start} – ${end}`;
  };

  const spotsLeft = activity.maxParticipants - activity.currentParticipants;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className={`overflow-hidden cursor-pointer transition-all ${
          isSelected ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
        }`}
        onClick={onSelect}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-muted">
          <img 
            src={activity.imageUrl} 
            alt={activity.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <Badge className="bg-white text-foreground shadow-sm">
              {activity.category}
            </Badge>
          </div>
          {spotsLeft <= 3 && spotsLeft > 0 && (
            <div className="absolute top-3 right-3">
              <Badge variant="destructive" className="shadow-sm">
                {spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} left
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <h3 className="line-clamp-2 min-h-[3rem]">{activity.title}</h3>

          {/* Meta Info */}
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <span>{formatDateTimeRange()}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{activity.neighbourhood}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 flex-shrink-0" />
              <span>
                {activity.currentParticipants}/{activity.maxParticipants} going
              </span>
            </div>
          </div>

          {/* Organiser */}
          <div className="flex items-center gap-2 pt-2 border-t">
            <img 
              src={activity.organiserAvatar} 
              alt={activity.organiserName}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm truncate">
                Organised by <span className="font-medium">{activity.organiserName}</span>
              </p>
            </div>
          </div>

          {/* Interest Button */}
          {showInterestButton && onToggleInterest && (
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                onToggleInterest();
              }}
              variant={isInterested ? "default" : "outline"}
              className="w-full"
            >
              {isInterested ? 'Interested ✓' : 'I\'m Interested'}
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
};