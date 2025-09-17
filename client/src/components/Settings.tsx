import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Palette,
  Building2,
  Mail,
  Globe,
  Save,
  Upload
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: false,
    weeklyReports: true,
    criticalIssuesOnly: false
  });

  const [systemSettings, setSystemSettings] = useState({
    municipalName: "City of Springfield",
    contactEmail: "admin@springfield.gov",
    timezone: "america/new_york",
    language: "english",
    autoAssignment: true,
    publicReporting: true
  });

  const handleSave = (section: string) => {
    console.log(`Saving ${section} settings`);
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground" data-testid="text-page-title">
          Settings & Configuration
        </h1>
        <p className="text-muted-foreground" data-testid="text-page-subtitle">
          Configure system settings and municipal preferences
        </p>
      </div>

      {/* Municipal Information */}
      <Card data-testid="card-municipal-info">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Municipal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="municipal-name">Municipal Name</Label>
              <Input 
                id="municipal-name"
                value={systemSettings.municipalName}
                onChange={(e) => setSystemSettings(prev => ({ ...prev, municipalName: e.target.value }))}
                data-testid="input-municipal-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Contact Email</Label>
              <Input 
                id="contact-email"
                type="email"
                value={systemSettings.contactEmail}
                onChange={(e) => setSystemSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                data-testid="input-contact-email"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={systemSettings.timezone} onValueChange={(value) => setSystemSettings(prev => ({ ...prev, timezone: value }))}>
                <SelectTrigger data-testid="select-timezone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="america/new_york">Eastern Time (ET)</SelectItem>
                  <SelectItem value="america/chicago">Central Time (CT)</SelectItem>
                  <SelectItem value="america/denver">Mountain Time (MT)</SelectItem>
                  <SelectItem value="america/los_angeles">Pacific Time (PT)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">System Language</Label>
              <Select value={systemSettings.language} onValueChange={(value) => setSystemSettings(prev => ({ ...prev, language: value }))}>
                <SelectTrigger data-testid="select-language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="municipal-description">Municipal Description</Label>
            <Textarea 
              id="municipal-description"
              placeholder="Brief description of your municipality..."
              className="min-h-[100px]"
              data-testid="textarea-municipal-description"
            />
          </div>

          <Button 
            onClick={() => handleSave('municipal-info')}
            data-testid="button-save-municipal-info"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Municipal Information
          </Button>
        </CardContent>
      </Card>

      {/* System Preferences */}
      <Card data-testid="card-system-preferences">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            System Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-Assignment</Label>
              <p className="text-sm text-muted-foreground">
                Automatically assign issues to departments based on type
              </p>
            </div>
            <Switch 
              checked={systemSettings.autoAssignment}
              onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, autoAssignment: checked }))}
              data-testid="switch-auto-assignment"
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Public Issue Reporting</Label>
              <p className="text-sm text-muted-foreground">
                Allow citizens to report issues through public portal
              </p>
            </div>
            <Switch 
              checked={systemSettings.publicReporting}
              onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, publicReporting: checked }))}
              data-testid="switch-public-reporting"
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Default Issue Priority</Label>
            <Select defaultValue="medium">
              <SelectTrigger className="w-full" data-testid="select-default-priority">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Auto-Resolution Timeout</Label>
            <Select defaultValue="30">
              <SelectTrigger className="w-full" data-testid="select-auto-resolution">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="14">14 days</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="60">60 days</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={() => handleSave('system-preferences')}
            data-testid="button-save-system-preferences"
          >
            <Save className="mr-2 h-4 w-4" />
            Save System Preferences
          </Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card data-testid="card-notification-settings">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Receive email notifications for new issues
              </p>
            </div>
            <Switch 
              checked={notifications.emailAlerts}
              onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, emailAlerts: checked }))}
              data-testid="switch-email-alerts"
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Browser push notifications for urgent issues
              </p>
            </div>
            <Switch 
              checked={notifications.pushNotifications}
              onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, pushNotifications: checked }))}
              data-testid="switch-push-notifications"
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Weekly Reports</Label>
              <p className="text-sm text-muted-foreground">
                Weekly summary reports via email
              </p>
            </div>
            <Switch 
              checked={notifications.weeklyReports}
              onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, weeklyReports: checked }))}
              data-testid="switch-weekly-reports"
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Critical Issues Only</Label>
              <p className="text-sm text-muted-foreground">
                Only notify for high priority and critical issues
              </p>
            </div>
            <Switch 
              checked={notifications.criticalIssuesOnly}
              onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, criticalIssuesOnly: checked }))}
              data-testid="switch-critical-only"
            />
          </div>

          <Button 
            onClick={() => handleSave('notifications')}
            data-testid="button-save-notifications"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Notification Settings
          </Button>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card data-testid="card-appearance">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Theme</Label>
            <Select defaultValue="system">
              <SelectTrigger data-testid="select-theme">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System Default</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Municipal Logo</Label>
            <div className="flex items-center gap-4">
              <Button variant="outline" data-testid="button-upload-logo">
                <Upload className="mr-2 h-4 w-4" />
                Upload New Logo
              </Button>
              <span className="text-sm text-muted-foreground">
                Recommended: 256x256px PNG or SVG
              </span>
            </div>
          </div>

          <Button 
            onClick={() => handleSave('appearance')}
            data-testid="button-save-appearance"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Appearance Settings
          </Button>
        </CardContent>
      </Card>

      {/* Security */}
      <Card data-testid="card-security">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Session Timeout</Label>
            <Select defaultValue="30">
              <SelectTrigger data-testid="select-session-timeout">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="240">4 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Require 2FA for all administrative accounts
              </p>
            </div>
            <Switch defaultChecked data-testid="switch-two-factor" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Password Complexity</Label>
              <p className="text-sm text-muted-foreground">
                Enforce strong password requirements
              </p>
            </div>
            <Switch defaultChecked data-testid="switch-password-complexity" />
          </div>

          <Button 
            onClick={() => handleSave('security')}
            data-testid="button-save-security"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Security Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}