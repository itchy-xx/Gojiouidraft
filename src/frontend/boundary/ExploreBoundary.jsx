import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { ActivityCard } from '../components/ActivityCard';
import { MapView } from '../components/MapView';
import { ActivityDetailPanel } from '../components/ActivityDetailPanel';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Filter, MapIcon, List, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
const categories = ['All', 'Sports', 'Food', 'Social', 'Community', 'Arts', 'Education'];
const neighbourhoods = [
    'All', 'Tiong Bahru', 'Toa Payoh', 'Marine Parade', 'Chinatown', 'Bugis',
    'Orchard', 'Clementi', 'Tampines', 'Jurong', 'Bedok',
];
export const ExplorePage = () => {
    const navigate = useNavigate();
    const { activities, filters, setFilters, currentUser, toggleInterest, setSelectedActivity } = useApp();
    const [view, setView] = useState('map');
    const [showFilters, setShowFilters] = useState(false);
    const [localSelectedActivity, setLocalSelectedActivity] = useState(null);
    const [showDetailPanel, setShowDetailPanel] = useState(false);
    const cardRefs = useRef({});
    // Apply filters
    const filteredActivities = activities.filter(activity => {
        if (filters.category !== 'All' && activity.category !== filters.category)
            return false;
        if (filters.neighbourhood !== 'All' && activity.neighbourhood !== filters.neighbourhood)
            return false;
        if (filters.searchQuery && !activity.title.toLowerCase().includes(filters.searchQuery.toLowerCase()))
            return false;
        return true;
    });
    const handleActivitySelect = (activity) => {
        setLocalSelectedActivity(activity);
        // In list view, scroll to the card
        if (view === 'list' && cardRefs.current[activity.id]) {
            cardRefs.current[activity.id]?.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    };
    const handleActivityClick = (activity) => {
        setLocalSelectedActivity(activity);
        setShowDetailPanel(true);
    };
    const handleViewDetails = (activity) => {
        setSelectedActivity(activity);
        navigate(`/activity/${activity.id}`);
    };
    const getCategoryColor = (category) => {
        const colors = {
            'Sports': 'bg-orange-500',
            'Food': 'bg-red-500',
            'Social': 'bg-blue-500',
            'Community': 'bg-green-500',
            'Arts': 'bg-purple-500',
            'Culture': 'bg-pink-500',
        };
        return colors[category] || 'bg-gray-500';
    };
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    };
    return (<div className="h-[calc(100vh-4rem)] flex">
      {/* Sidebar with Activities List - Wider */}
      <div className="w-[420px] bg-white border-r flex flex-col">
        {/* Header */}
        <div className="p-4 border-b space-y-3">
          <div>
            <h2 className="text-lg font-semibold">Activities Near You</h2>
            <p className="text-sm text-gray-600">{filteredActivities.length} activities found</p>
          </div>
          
          {/* View Toggle */}
          <div className="flex gap-2">
            <button onClick={() => setView('map')} className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg transition-colors ${view === 'map'
            ? 'bg-[#5661f6] text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              <MapIcon className="h-4 w-4"/>
              <span className="text-sm font-medium">Map</span>
            </button>
            <button onClick={() => setView('list')} className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg transition-colors ${view === 'list'
            ? 'bg-[#5661f6] text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              <List className="h-4 w-4"/>
              <span className="text-sm font-medium">List</span>
            </button>
          </div>

          {/* Filter Toggle */}
          <button onClick={() => setShowFilters(!showFilters)} className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
            <Filter className="h-4 w-4"/>
            <span className="text-sm font-medium">{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
          </button>

          {/* Filters */}
          <AnimatePresence>
            {showFilters && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-3 overflow-hidden">
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">Category</label>
                  <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (<SelectItem key={cat} value={cat}>{cat}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">Neighbourhood</label>
                  <Select value={filters.neighbourhood} onValueChange={(value) => setFilters({ ...filters, neighbourhood: value })}>
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {neighbourhoods.map((n) => (<SelectItem key={n} value={n}>{n}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" size="sm" className="w-full" onClick={() => setFilters({ category: 'All', neighbourhood: 'All', date: 'All', searchQuery: '' })}>
                  <X className="h-3 w-3 mr-2"/>
                  Clear Filters
                </Button>
              </motion.div>)}
          </AnimatePresence>
        </div>

        {/* Activities List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredActivities.length === 0 ? (<div className="text-center py-12">
              <p className="text-sm text-gray-500">No activities found</p>
            </div>) : (filteredActivities.map((activity) => (<div key={activity.id} ref={(el) => { cardRefs.current[activity.id] = el; }} onClick={() => handleActivityClick(activity)} onMouseEnter={() => setLocalSelectedActivity(activity)} className={`bg-white border rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-md ${localSelectedActivity?.id === activity.id ? 'ring-2 ring-[#5661f6] shadow-md' : ''}`}>
                {/* Image */}
                <div className="h-48 overflow-hidden relative">
                  <img src={activity.imageUrl} alt={activity.title} className="w-full h-full object-cover"/>
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(activity.category)}`}>
                      {activity.category}
                    </span>
                  </div>
                  {Math.max(activity.maxParticipants - activity.currentParticipants, 0) <= 5 && (<div className="absolute top-3 right-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500 text-white">
                        {Math.max(activity.maxParticipants - activity.currentParticipants, 0)} spots left
                      </span>
                    </div>)}
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-base line-clamp-2">{activity.title}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">📅</span>
                      <span>{formatDate(activity.date)}</span>
                      <span className="mx-1">•</span>
                      <span>{activity.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">📍</span>
                      <span className="line-clamp-1">{activity.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">👥</span>
                      <span className="font-semibold">{activity.currentParticipants}/{activity.maxParticipants} going</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <p className="text-xs text-gray-500">Organised by {activity.organiserName}</p>
                  </div>
                </div>
              </div>)))}
        </div>
      </div>

      {/* Content Area - Map or List */}
      <div className="flex-1 overflow-hidden bg-[#f5f5f7]">
        {view === 'map' ? (<MapView activities={filteredActivities} selectedActivity={localSelectedActivity} onSelectActivity={handleActivitySelect} onViewDetails={handleViewDetails}/>) : (<div className="h-full overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
              {filteredActivities.length === 0 ? (<div className="text-center py-12 bg-white rounded-2xl">
                  <p className="text-gray-500">No activities found</p>
                  <Button variant="outline" className="mt-4" onClick={() => setFilters({ category: 'All', neighbourhood: 'All', date: 'All', searchQuery: '' })}>
                    Clear Filters
                  </Button>
                </div>) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredActivities.map((activity, index) => (<motion.div key={activity.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * index }} ref={(el) => { cardRefs.current[activity.id] = el; }}>
                      <ActivityCard activity={activity} onSelect={() => handleActivityClick(activity)} isSelected={localSelectedActivity?.id === activity.id} isInterested={activity.interestedUsers.includes(currentUser?.id || '')} onToggleInterest={() => toggleInterest(activity.id)}/>
                    </motion.div>))}
                </div>)}
            </div>
          </div>)}
      </div>

      {/* Activity Detail Panel */}
      {showDetailPanel && localSelectedActivity && (<ActivityDetailPanel activity={localSelectedActivity} isInterested={localSelectedActivity.interestedUsers.includes(currentUser?.id || '')} onToggleInterest={() => {
                toggleInterest(localSelectedActivity.id);
                // Update local selected activity
                const updated = activities.find(a => a.id === localSelectedActivity.id);
                if (updated)
                    setLocalSelectedActivity(updated);
            }} onClose={() => setShowDetailPanel(false)} currentUserId={currentUser?.id || ''}/>)}
    </div>);
};
