import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, FileText, Users, Eye, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const StatsCard = ({ title, value, icon: Icon, trend, trendType }: { title: string; value: string; icon: React.ElementType; trend?: string; trendType?: 'up' | 'down' }) => (
  <Card className="flex-1">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {trend && (
        <p className={`text-xs ${trendType === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trend} {trendType === 'up' ? '↑' : '↓'} from last month
        </p>
      )}
    </CardContent>
  </Card>
);

const RecentActivityItem = ({ title, date, type }: { title: string; date: string; type: 'published' | 'updated' | 'comment' }) => {
  const getIcon = () => {
    switch (type) {
      case 'published':
        return <FileText className="h-4 w-4 text-green-500" />;
      case 'updated':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'comment':
        return <MessageSquare className="h-4 w-4 text-purple-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-2">
        {getIcon()}
        <span className="text-sm font-medium">{title}</span>
      </div>
      <span className="text-xs text-muted-foreground">{date}</span>
    </div>
  );
};

const QuickAction = ({ title, description, icon: Icon, onClick }: { title: string; description: string; icon: React.ElementType; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-accent transition-colors text-center h-full"
  >
    <Icon className="h-6 w-6 mb-2 text-primary" />
    <h3 className="font-medium">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </button>
);

const Dashboard = () => {
  const navigate = useNavigate();

  const recentActivities = [
    { id: 1, title: 'Getting Started with Next.js', date: '2 hours ago', type: 'published' as const },
    { id: 2, title: 'New comment on "State Management in React"', date: '5 hours ago', type: 'comment' as const },
    { id: 3, title: 'Updated "Authentication in Next.js"', date: '1 day ago', type: 'updated' as const },
    { id: 4, title: 'New comment on "TypeScript Best Practices"', date: '2 days ago', type: 'comment' as const },
    { id: 5, title: 'Published "CSS Grid Layouts"', date: '3 days ago', type: 'published' as const },
  ];

  const quickActions = [
    {
      title: 'New Post',
      description: 'Create a new blog post',
      icon: FileText,
      onClick: () => navigate('/dashboard/blog/new')
    },
    {
      title: 'View Analytics',
      description: 'Check your blog performance',
      icon: Eye,
      onClick: () => navigate('/dashboard/analytics')
    },
    {
      title: 'Manage Users',
      description: 'Add or remove team members',
      icon: Users,
      onClick: () => navigate('/dashboard/team')
    },
    {
      title: 'Schedule',
      description: 'Plan your content calendar',
      icon: Calendar,
      onClick: () => navigate('/dashboard/calendar')
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your blog.</p>
        </div>
        <Button onClick={() => navigate('/dashboard/blog/new')}>
          New Post
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Posts" 
          value="24" 
          icon={FileText} 
          trend="12%" 
          trendType="up" 
        />
        <StatsCard 
          title="Total Views" 
          value="1,234" 
          icon={Eye} 
          trend="8.1%" 
          trendType="up" 
        />
        <StatsCard 
          title="Comments" 
          value="42" 
          icon={MessageSquare} 
          trend="3.2%" 
          trendType="down" 
        />
        <StatsCard 
          title="Avg. Time on Page" 
          value="2m 34s" 
          icon={Clock} 
          trend="12.5%" 
          trendType="up" 
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id}>
                  <RecentActivityItem 
                    title={activity.title}
                    date={activity.date}
                    type={activity.type}
                  />
                  {activity.id !== recentActivities.length && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <QuickAction
                  key={index}
                  title={action.title}
                  description={action.description}
                  icon={action.icon}
                  onClick={action.onClick}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Popular Posts</CardTitle>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { title: 'Getting Started with Next.js', views: '1,234', comments: '42', published: '2 days ago' },
              { title: 'State Management in React', views: '987', comments: '31', published: '1 week ago' },
              { title: 'TypeScript Best Practices', views: '765', comments: '24', published: '2 weeks ago' },
            ].map((post, index) => (
              <div key={index} className="flex items-center justify-between p-4 hover:bg-accent/50 rounded-lg transition-colors">
                <div>
                  <h3 className="font-medium">{post.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                    <span>{post.views} views</span>
                    <span>•</span>
                    <span>{post.comments} comments</span>
                    <span>•</span>
                    <span>Published {post.published}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
