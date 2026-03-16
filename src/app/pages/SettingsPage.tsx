import React from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { Switch } from '../components/ui/switch';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export const SettingsPage: React.FC = () => {
  const { currentUser } = useApp();

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1>Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-6 space-y-6">
          <div>
            <h3>Profile Information</h3>
            <p className="text-muted-foreground text-sm">
              Update your personal details
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <img 
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <Button variant="outline" size="sm">
                  Change Photo
                </Button>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG or GIF. Max size 5MB
                </p>
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                defaultValue={currentUser?.name}
                className="bg-input-background"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue={currentUser?.email}
                className="bg-input-background"
              />
            </div>

            {/* Neighbourhood */}
            <div className="space-y-2">
              <Label htmlFor="neighbourhood">Neighbourhood</Label>
              <Input
                id="neighbourhood"
                defaultValue={currentUser?.neighbourhood}
                className="bg-input-background"
              />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6 space-y-6">
          <div>
            <h3>Notifications</h3>
            <p className="text-muted-foreground text-sm">
              Manage your notification preferences
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">New Activity Alerts</p>
                <p className="text-sm text-muted-foreground">
                  Get notified when new activities are posted nearby
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Interest Notifications</p>
                <p className="text-sm text-muted-foreground">
                  When someone shows interest in your activity
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Message Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Get notified when you receive new messages
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Connection Requests</p>
                <p className="text-sm text-muted-foreground">
                  When neighbours want to connect with you
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Privacy Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6 space-y-6">
          <div>
            <h3>Privacy</h3>
            <p className="text-muted-foreground text-sm">
              Control your privacy settings
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Show Profile to Neighbours</p>
                <p className="text-sm text-muted-foreground">
                  Let people in your neighbourhood see your profile
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Activity History Visible</p>
                <p className="text-sm text-muted-foreground">
                  Show activities you've joined on your profile
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Save Button */}
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1">
          Reset to Default
        </Button>
        <Button onClick={handleSave} className="flex-1">
          Save Changes
        </Button>
      </div>
    </div>
  );
};
