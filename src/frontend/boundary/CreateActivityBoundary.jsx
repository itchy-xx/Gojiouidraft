import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ArrowLeft, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
const categories = ['Sports', 'Food', 'Social', 'Community', 'Arts', 'Education'];
const neighbourhoods = [
    'Tiong Bahru', 'Toa Payoh', 'Marine Parade', 'Chinatown', 'Bugis',
    'Orchard', 'Clementi', 'Tampines', 'Jurong', 'Bedok', 'Serangoon',
];
// Sample coordinates for neighbourhoods
const neighbourhoodCoords = {
    'Tiong Bahru': { lat: 1.2860, lng: 103.8268 },
    'Toa Payoh': { lat: 1.3344, lng: 103.8497 },
    'Marine Parade': { lat: 1.3010, lng: 103.9122 },
    'Chinatown': { lat: 1.2820, lng: 103.8439 },
    'Bugis': { lat: 1.3002, lng: 103.8557 },
    'Orchard': { lat: 1.3048, lng: 103.8318 },
    'Clementi': { lat: 1.3162, lng: 103.7649 },
    'Tampines': { lat: 1.3496, lng: 103.9568 },
    'Jurong': { lat: 1.3329, lng: 103.7436 },
    'Bedok': { lat: 1.3236, lng: 103.9273 },
    'Serangoon': { lat: 1.3554, lng: 103.8679 },
};
export const CreateActivityPage = () => {
    const navigate = useNavigate();
    const { addActivity, currentUser } = useApp();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Sports',
        date: '',
        time: '',
        location: '',
        neighbourhood: currentUser?.neighbourhood || 'Tiong Bahru',
        maxParticipants: 10,
        imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800',
        tags: [],
    });
    const [tagInput, setTagInput] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const coords = neighbourhoodCoords[formData.neighbourhood] || { lat: 1.3521, lng: 103.8198 };
        addActivity({
            ...formData,
            coordinates: coords,
            maxParticipants: Number(formData.maxParticipants),
        });
        toast.success('Activity created successfully!');
        navigate('/home');
    };
    const addTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
            setTagInput('');
        }
    };
    const removeTag = (tag) => {
        setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
    };
    return (<div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5"/>
        </Button>
        <div>
          <h1>Create Activity</h1>
          <p className="text-muted-foreground">
            Organize a new neighbourhood event
          </p>
        </div>
      </div>

      {/* Form */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Activity Title *</Label>
              <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Weekend Morning Jog" required className="bg-input-background"/>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Describe your activity..." rows={4} required className="bg-input-background resize-none"/>
            </div>

            {/* Category & Max Participants */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger className="bg-input-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (<SelectItem key={cat} value={cat}>{cat}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxParticipants">Max Participants *</Label>
                <Input id="maxParticipants" type="number" min="2" max="100" value={formData.maxParticipants} onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) })} required className="bg-input-background"/>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input id="date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required className="bg-input-background"/>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time *</Label>
                <Input id="time" type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} required className="bg-input-background"/>
              </div>
            </div>

            {/* Location & Neighbourhood */}
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input id="location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="e.g. East Coast Park, NTUC Shelter" required className="bg-input-background"/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="neighbourhood">Neighbourhood *</Label>
              <Select value={formData.neighbourhood} onValueChange={(value) => setFormData({ ...formData, neighbourhood: value })}>
                <SelectTrigger className="bg-input-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {neighbourhoods.map((n) => (<SelectItem key={n} value={n}>{n}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input id="imageUrl" type="url" value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} placeholder="https://..." className="bg-input-background"/>
              {formData.imageUrl && (<div className="mt-2">
                  <img src={formData.imageUrl} alt="Preview" className="w-full h-48 object-cover rounded-lg" onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800';
            }}/>
                </div>)}
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (optional)</Label>
              <div className="flex gap-2">
                <Input id="tags" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addTag();
            }
        }} placeholder="Add a tag..." className="bg-input-background"/>
                <Button type="button" onClick={addTag} variant="outline">
                  <Plus className="h-4 w-4"/>
                </Button>
              </div>
              {formData.tags.length > 0 && (<div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map(tag => (<div key={tag} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="hover:text-primary/70">
                        ×
                      </button>
                    </div>))}
                </div>)}
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => navigate(-1)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Create Activity
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>);
};
