import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Home, Map, Calendar, MessageSquare, Settings, Bell, Search, Menu, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { motion, AnimatePresence } from 'motion/react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout, unreadMessageCount, unreadNotificationCount, filters, setFilters } = useApp();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { path: '/home', label: 'Home', icon: Home },
    { path: '/explore', label: 'Explore', icon: Map },
    { path: '/activity', label: 'Activity', icon: Calendar },
    { path: '/messages', label: 'Messages', icon: MessageSquare, badge: unreadMessageCount },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ ...filters, searchQuery });
    if (location.pathname !== '/explore') {
      navigate('/explore');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b bg-white shadow-sm">
        <div className="flex items-center justify-between h-16 px-6 gap-4">
          {/* Left: Logo + Mobile Menu */}
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden"
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            >
              {isMobileSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            
            <Link to="/home" className="flex items-center gap-2">
              <div className="text-[28px] font-bold" style={{ 
                background: 'linear-gradient(135deg, #5661f6 0%, #7c85ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em'
              }}>
                GoJio
              </div>
            </Link>
          </div>

          {/* Center: Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="search"
                placeholder="Search activities, places, events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-[#f5f5f7] border-0 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#5661f6]/20"
              />
            </div>
          </form>

          {/* Right: Notifications + Messages + Profile */}
          <div className="flex items-center gap-3">
            {/* Create Event Button for Organisers */}
            {currentUser?.isOrganiser && (
              <Button
                onClick={() => navigate('/activity/create')}
                className="hidden md:flex bg-[#5661f6] hover:bg-[#4551e6] h-10 rounded-full px-4"
              >
                <span className="text-xl mr-2">+</span>
                <span className="hidden lg:inline">Create Event</span>
              </Button>
            )}

            {/* Notifications */}
            <button
              onClick={() => navigate('/notifications')}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Bell className="h-5 w-5 text-gray-700" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-1 right-1 h-5 w-5 flex items-center justify-center bg-[#FF3D3D] text-white text-xs rounded-full">
                  {unreadNotificationCount > 9 ? '9+' : unreadNotificationCount}
                </span>
              )}
            </button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <img 
                    src={currentUser?.avatar} 
                    alt={currentUser?.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#5661f6]"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="font-semibold text-base">{currentUser?.name}</p>
                    <p className="text-xs text-gray-600">{currentUser?.email}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                      <span>📍</span>
                      <span>{currentUser?.neighbourhood}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input-background border-0"
              />
            </div>
          </form>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation - Desktop */}
        <aside className="hidden lg:block w-64 bg-white min-h-[calc(100vh-4rem)] sticky top-16 border-r">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    active 
                      ? 'bg-[#5661f6] text-white shadow-lg shadow-[#5661f6]/30' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-semibold ${
                      active ? 'bg-white text-[#5661f6]' : 'bg-[#FF3D3D] text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setIsMobileSidebarOpen(false)}
              />
              
              {/* Sidebar */}
              <motion.aside
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: 'tween', duration: 0.2 }}
                className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r z-50 lg:hidden"
              >
                <nav className="p-4 space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMobileSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          active 
                            ? 'bg-[#5661f6] text-white shadow-lg shadow-[#5661f6]/30' 
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                        {item.badge && item.badge > 0 && (
                          <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-semibold ${
                            active ? 'bg-white text-[#5661f6]' : 'bg-[#FF3D3D] text-white'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
};