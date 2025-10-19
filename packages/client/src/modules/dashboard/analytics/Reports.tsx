import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Download, Filter, BarChart3, LineChart, PieChart, Users, Clock } from 'lucide-react';
import { DatePickerWithRange } from '@/components/date-range-picker';
import { DateRange } from 'react-day-picker';

// Mock data - replace with actual API calls
const mockReportData = {
  pageViews: [
    { date: '2023-06-01', views: 1234 },
    { date: '2023-06-02', views: 1456 },
    { date: '2023-06-03', views: 1345 },
    { date: '2023-06-04', views: 1678 },
    { date: '2023-06-05', views: 1890 },
  ],
  topPages: [
    { page: '/blog/intro-to-react', views: 1200, visitors: 980, avgTime: '2:45' },
    { page: '/blog/nextjs-13', views: 980, visitors: 845, avgTime: '3:12' },
    { page: '/blog/typescript-tips', views: 876, visitors: 712, avgTime: '2:58' },
  ],
  trafficSources: {
    direct: 45,
    search: 30,
    social: 15,
    referral: 10,
  },
  devices: {
    desktop: 65,
    mobile: 30,
    tablet: 5,
  },
};

const Reports = () => {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2023, 5, 1),
    to: new Date(2023, 5, 30),
  });
  const [, setReportType] = useState('overview');
  const [metric, setMetric] = useState('views');
  const [timeRange, setTimeRange] = useState('7d');

  const handleExport = (format: 'csv' | 'pdf' | 'excel') => {
    // Implement export functionality
    console.log(`Exporting report as ${format}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics Reports</h1>
          <p className="text-muted-foreground">
            Detailed analytics and insights about your blog's performance
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <DatePickerWithRange className="w-full md:w-[300px]" />
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full md:w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="w-full md:w-auto">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" onValueChange={setReportType} className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <TabsList>
            <TabsTrigger value="overview">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="traffic">
              <LineChart className="h-4 w-4 mr-2" />
              Traffic
            </TabsTrigger>
            <TabsTrigger value="content">
              <PieChart className="h-4 w-4 mr-2" />
              Content
            </TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <Select value={metric} onValueChange={setMetric}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="views">Page Views</SelectItem>
                <SelectItem value="visitors">Unique Visitors</SelectItem>
                <SelectItem value="sessions">Sessions</SelectItem>
                <SelectItem value="duration">Avg. Duration</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={() => handleExport('csv')}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24,589</div>
                <p className="text-xs text-muted-foreground">+12.3% from last period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18,234</div>
                <p className="text-xs text-muted-foreground">+8.7% from last period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2m 45s</div>
                <p className="text-xs text-muted-foreground">+15.2% from last period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42.3%</div>
                <p className="text-xs text-muted-foreground">-3.1% from last period</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Page Views</CardTitle>
              <CardDescription>Daily page views over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center bg-muted/50 rounded-lg">
              <p className="text-muted-foreground">Page views chart will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Where your visitors are coming from</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center bg-muted/50 rounded-lg">
                <p className="text-muted-foreground">Traffic sources chart will be displayed here</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Devices</CardTitle>
                <CardDescription>Devices used by your visitors</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center bg-muted/50 rounded-lg">
                <p className="text-muted-foreground">Devices chart will be displayed here</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
              <CardDescription>Most viewed pages on your blog</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {mockReportData.topPages.map((page) => (
                  <div key={page.page} className="flex items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{page.page}</p>
                      <p className="text-sm text-muted-foreground">
                        {page.views} views • {page.visitors} visitors • {page.avgTime} avg. time
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      {Math.round((page.views / 2000) * 100)}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;