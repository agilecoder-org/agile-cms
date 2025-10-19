import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, RefreshCw, Shield, Mail, Bell, Trash2, Zap } from 'lucide-react';

const AnalyticsSettings = () => {
  const [settings, setSettings] = useState({
    // Data Collection
    enableAnalytics: true,
    anonymizeIp: true,
    respectDoNotTrack: true,
    // Notifications
    emailReports: true,
    emailFrequency: 'weekly',
    emailRecipients: ['admin@example.com'],
    // Data Retention
    retentionPeriod: 26, // months
    autoDeleteOldData: true,
    // Integrations
    googleAnalyticsId: '',
    facebookPixelId: '',
    customTrackingCode: '',
  });

  const [newEmail, setNewEmail] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      // Show success message
    }, 1000);
  };

  const handleReset = () => {
    // Reset to default settings
  };

  const addEmailRecipient = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEmail && !settings.emailRecipients.includes(newEmail)) {
      setSettings({
        ...settings,
        emailRecipients: [...settings.emailRecipients, newEmail]
      });
      setNewEmail('');
    }
  };

  const removeEmailRecipient = (email: string) => {
    setSettings({
      ...settings,
      emailRecipients: settings.emailRecipients.filter(e => e !== email)
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics Settings</h2>
          <p className="text-muted-foreground">
            Configure your analytics preferences and data collection settings
          </p>
        </div>
        <div className="space-x-2">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset to Defaults
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="data-collection" className="space-y-4">
        <TabsList>
          <TabsTrigger value="data-collection">
            <Shield className="mr-2 h-4 w-4" />
            Data Collection
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="data-retention">
            <Trash2 className="mr-2 h-4 w-4" />
            Data Retention
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Zap className="mr-2 h-4 w-4" />
            Integrations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="data-collection">
          <Card>
            <CardHeader>
              <CardTitle>Data Collection</CardTitle>
              <CardDescription>
                Control what data is collected from your visitors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <div>
                  <Label htmlFor="enable-analytics">Enable Analytics</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable or disable all analytics tracking
                  </p>
                </div>
                <Switch
                  id="enable-analytics"
                  checked={settings.enableAnalytics}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, enableAnalytics: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <div>
                  <Label htmlFor="anonymize-ip">Anonymize IP Addresses</Label>
                  <p className="text-sm text-muted-foreground">
                    Anonymize visitor IP addresses for privacy compliance
                  </p>
                </div>
                <Switch
                  id="anonymize-ip"
                  checked={settings.anonymizeIp}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, anonymizeIp: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <div>
                  <Label htmlFor="respect-dnt">Respect Do Not Track</Label>
                  <p className="text-sm text-muted-foreground">
                    Honor the browser's Do Not Track setting
                  </p>
                </div>
                <Switch
                  id="respect-dnt"
                  checked={settings.respectDoNotTrack}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, respectDoNotTrack: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Configure email reports and notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Email Recipients</Label>
                  <form onSubmit={addEmailRecipient} className="flex space-x-2">
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      className="w-64"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                    <Button type="submit" size="sm">
                      Add
                    </Button>
                  </form>
                </div>
                <div className="space-y-2">
                  {settings.emailRecipients.map((email) => (
                    <div key={email} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{email}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEmailRecipient(email)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label>Email Frequency</Label>
                <div className="grid grid-cols-3 gap-4">
                  {['daily', 'weekly', 'monthly'].map((freq) => (
                    <Button
                      key={freq}
                      variant={settings.emailFrequency === freq ? 'default' : 'outline'}
                      onClick={() => setSettings({ ...settings, emailFrequency: freq })}
                      className="capitalize"
                    >
                      {freq}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data-retention">
          <Card>
            <CardHeader>
              <CardTitle>Data Retention</CardTitle>
              <CardDescription>
                Configure how long analytics data is stored
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="retention-period">
                  Data Retention Period: {settings.retentionPeriod} months
                </Label>
                <Input
                  id="retention-period"
                  type="range"
                  min="1"
                  max="60"
                  value={settings.retentionPeriod}
                  onChange={(e) =>
                    setSettings({ ...settings, retentionPeriod: parseInt(e.target.value, 10) })
                  }
                />
                <p className="text-sm text-muted-foreground">
                  How long to keep analytics data before automatic deletion
                </p>
              </div>

              <div className="flex items-center justify-between space-x-2">
                <div>
                  <Label htmlFor="auto-delete">Auto-delete Old Data</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically delete data older than the retention period
                  </p>
                </div>
                <Switch
                  id="auto-delete"
                  checked={settings.autoDeleteOldData}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, autoDeleteOldData: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Third-party Integrations</CardTitle>
              <CardDescription>
                Connect with other analytics and marketing tools
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="ga-id">Google Analytics Tracking ID</Label>
                <Input
                  id="ga-id"
                  placeholder="UA-XXXXXXXXX-X"
                  value={settings.googleAnalyticsId}
                  onChange={(e) =>
                    setSettings({ ...settings, googleAnalyticsId: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fb-pixel">Facebook Pixel ID</Label>
                <Input
                  id="fb-pixel"
                  placeholder="123456789012345"
                  value={settings.facebookPixelId}
                  onChange={(e) =>
                    setSettings({ ...settings, facebookPixelId: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-code">Custom Tracking Code</Label>
                <textarea
                  id="custom-code"
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Paste your custom tracking code here..."
                  value={settings.customTrackingCode}
                  onChange={(e) =>
                    setSettings({ ...settings, customTrackingCode: e.target.value })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsSettings;