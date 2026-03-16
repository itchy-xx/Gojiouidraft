import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

const categories = ['Sports', 'Food', 'Social', 'Community', 'Arts', 'Education'];
const neighbourhoods = [
  'Tiong Bahru', 'Toa Payoh', 'Marine Parade', 'Chinatown', 'Bugis',
  'Orchard', 'Clementi', 'Tampines', 'Jurong', 'Bedok', 'Serangoon',
];

export const EditActivityPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activities, updateActivity, currentUser } = useApp();

  const activity = activities.find(a => a.id === id);

  const [formData, setFormData] = useState({
    title: activity?.title || '',
    description: activity?.description || '',
    category: activity?.category || 'Sports',
    date: activity?.date || '',
    startTime: activity?.startTime || '',
    endTime: activity?.endTime || '',
    location: activity?.location || '',
    neighbourhood: activity?.neighbourhood || 'Tiong Bahru',
    maxParticipants: activity?.maxParticipants || 10,
    imageUrl: activity?.imageUrl || '',
    tags: activity?.tags || [] as string[],
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData({ ...formData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!activity) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-muted-foreground">Activity not found</p>
          <Button onClick={() => navigate('/home')} className="mt-4">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  if (activity.organiserId !== currentUser?.id) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-muted-foreground">You don't have permission to edit this activity</p>
          <Button onClick={() => navigate(`/activity/${id}`)} className="mt-4">
            Back to Activity
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateActivity(activity.id, {
      ...formData,
      maxParticipants: Number(formData.maxParticipants),
    });

    toast.success('Activity updated successfully!');
    navigate(`/activity/${activity.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(`/activity/${id}`)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1>Edit Activity</h1>
          <p className="text-muted-foreground">
            Update your activity details
          </p>
        </div>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Activity Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="bg-input-background"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                required
                className="bg-input-background resize-none"
              />
            </div>

            {/* Category & Max Participants */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="bg-input-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxParticipants">Max Participants *</Label>
                <Input
                  id="maxParticipants"
                  type="number"
                  min={activity.currentParticipants}
                  max="100"
                  value={formData.maxParticipants}
                  onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) })}
                  required
                  className="bg-input-background"
                />
                <p className="text-xs text-muted-foreground">
                  Current participants: {activity.currentParticipants}
                </p>
              </div>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="bg-input-background"
              />
            </div>

            {/* Start Time & End Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time *</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  required
                  className="bg-input-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">End Time *</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  required
                  className="bg-input-background"
                />
              </div>
            </div>

            {/* Location & Neighbourhood */}
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                className="bg-input-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="neighbourhood">Neighbourhood *</Label>
              <Select 
                value={formData.neighbourhood} 
                onValueChange={(value) => setFormData({ ...formData, neighbourhood: value })}
              >
                <SelectTrigger className="bg-input-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {neighbourhoods.map((n) => (
                    <SelectItem key={n} value={n}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="imageFile">Activity Image</Label>
              <Input
                id="imageFile"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="bg-input-background"
              />
              {(imagePreview || formData.imageUrl) && (
                <div className="mt-2">
                  <img 
                    src={imagePreview || formData.imageUrl} 
                    alt="Preview" 
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/activity/${id}`)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Save Changes
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};