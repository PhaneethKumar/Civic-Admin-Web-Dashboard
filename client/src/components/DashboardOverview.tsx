import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Users,
  Building2,
  FileText,
  ArrowRight
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

// todo: remove mock functionality
const mockMetrics = [
  {
    title: "Total Issues",
    value: "1,234",
    change: "+12%",
    trend: "up",
    icon: FileText,
    color: "chart-1"
  },
  {
    title: "Pending Issues",
    value: "287",
    change: "-8%",
    trend: "down",
    icon: Clock,
    color: "chart-3"
  },
  {
    title: "Resolved Today",
    value: "42",
    change: "+15%",
    trend: "up",
    icon: CheckCircle,
    color: "chart-2"
  },
  {
    title: "Active Departments",
    value: "8",
    change: "0%",
    trend: "neutral",
    icon: Building2,
    color: "chart-4"
  }
];

// todo: remove mock functionality
const mockIssuesData = [
  { month: "Jan", issues: 120 },
  { month: "Feb", issues: 98 },
  { month: "Mar", issues: 156 },
  { month: "Apr", issues: 134 },
  { month: "May", issues: 187 },
  { month: "Jun", issues: 165 }
];

// todo: remove mock functionality
const mockResolutionData = [
  { name: "Public Works", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Sanitation", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Parks & Rec", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Transportation", value: 15, color: "hsl(var(--chart-4))" },
  { name: "Other", value: 5, color: "hsl(var(--chart-5))" }
];

// todo: remove mock functionality
const mockRecentIssues = [
  {
    id: "ISS-001",
    title: "Broken streetlight on Main St",
    status: "pending",
    priority: "high",
    department: "Public Works",
    reportedAt: "2 hours ago"
  },
  {
    id: "ISS-002", 
    title: "Pothole repair needed",
    status: "in-progress",
    priority: "medium",
    department: "Transportation",
    reportedAt: "4 hours ago"
  },
  {
    id: "ISS-003",
    title: "Park bench vandalism",
    status: "resolved",
    priority: "low",
    department: "Parks & Recreation",
    reportedAt: "1 day ago"
  }
];

export default function DashboardOverview() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "destructive";
      case "in-progress": return "default";
      case "resolved": return "secondary";
      default: return "outline";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground" data-testid="text-page-title">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground" data-testid="text-page-subtitle">
          Monitor civic issues and municipal operations in real-time
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockMetrics.map((metric) => (
          <Card key={metric.title} className="hover-elevate" data-testid={`card-metric-${metric.title.toLowerCase().replace(/\s+/g, '-')}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid={`text-metric-value-${metric.title.toLowerCase().replace(/\s+/g, '-')}`}>
                {metric.value}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className={`h-3 w-3 ${metric.trend === 'up' ? 'text-green-500' : metric.trend === 'down' ? 'text-red-500' : 'text-muted-foreground'}`} />
                <span className={metric.trend === 'up' ? 'text-green-500' : metric.trend === 'down' ? 'text-red-500' : 'text-muted-foreground'}>
                  {metric.change}
                </span>
                <span>from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issues Trend Chart */}
        <Card data-testid="card-issues-trend">
          <CardHeader>
            <CardTitle>Issues Reported (Last 6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockIssuesData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Bar dataKey="issues" fill="hsl(var(--chart-1))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card data-testid="card-department-distribution">
          <CardHeader>
            <CardTitle>Issues by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockResolutionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {mockResolutionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {mockResolutionData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Issues */}
      <Card data-testid="card-recent-issues">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Issues</CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            data-testid="button-view-all-issues"
            onClick={() => console.log('View all issues clicked')}
          >
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRecentIssues.map((issue) => (
              <div 
                key={issue.id} 
                className="flex items-center justify-between p-4 border rounded-lg hover-elevate cursor-pointer"
                data-testid={`card-issue-${issue.id}`}
                onClick={() => console.log(`Issue ${issue.id} clicked`)}
              >
                <div className="flex items-center gap-4">
                  <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium" data-testid={`text-issue-title-${issue.id}`}>
                        {issue.title}
                      </span>
                      <Badge variant={getPriorityColor(issue.priority)}>
                        {issue.priority}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <span>{issue.id}</span>
                      <span>•</span>
                      <span>{issue.department}</span>
                      <span>•</span>
                      <span>{issue.reportedAt}</span>
                    </div>
                  </div>
                </div>
                <Badge variant={getStatusColor(issue.status)} data-testid={`badge-status-${issue.id}`}>
                  {issue.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card data-testid="card-quick-actions">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center gap-2"
              data-testid="button-create-issue"
              onClick={() => console.log('Create new issue clicked')}
            >
              <AlertTriangle className="h-6 w-6" />
              <div className="text-center">
                <div className="font-medium">Create New Issue</div>
                <div className="text-xs text-muted-foreground">Report a new civic issue</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center gap-2"
              data-testid="button-assign-department"
              onClick={() => console.log('Assign to department clicked')}
            >
              <Building2 className="h-6 w-6" />
              <div className="text-center">
                <div className="font-medium">Assign to Department</div>
                <div className="text-xs text-muted-foreground">Route issues efficiently</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center gap-2"
              data-testid="button-generate-report"
              onClick={() => console.log('Generate report clicked')}
            >
              <FileText className="h-6 w-6" />
              <div className="text-center">
                <div className="font-medium">Generate Report</div>
                <div className="text-xs text-muted-foreground">Export analytics data</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}