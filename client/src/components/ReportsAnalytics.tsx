import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  Area,
  AreaChart
} from "recharts";
import { 
  Download, 
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Building2
} from "lucide-react";

// todo: remove mock functionality
const mockPerformanceData = [
  { month: "Jan", reported: 120, resolved: 98, pending: 22 },
  { month: "Feb", reported: 98, resolved: 105, pending: 15 },
  { month: "Mar", reported: 156, resolved: 134, pending: 37 },
  { month: "Apr", reported: 134, resolved: 145, pending: 26 },
  { month: "May", reported: 187, resolved: 169, pending: 44 },
  { month: "Jun", reported: 165, resolved: 178, pending: 31 }
];

// todo: remove mock functionality
const mockDepartmentPerformance = [
  { name: "Public Works", resolved: 145, avgTime: 3.2, satisfaction: 4.2 },
  { name: "Transportation", resolved: 89, avgTime: 2.8, satisfaction: 4.5 },
  { name: "Parks & Rec", resolved: 67, avgTime: 1.5, satisfaction: 4.7 },
  { name: "Sanitation", resolved: 156, avgTime: 1.2, satisfaction: 4.3 }
];

// todo: remove mock functionality
const mockIssueTypes = [
  { name: "Road Maintenance", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Public Safety", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Utilities", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Parks", value: 15, color: "hsl(var(--chart-4))" },
  { name: "Other", value: 5, color: "hsl(var(--chart-5))" }
];

// todo: remove mock functionality
const mockResolutionTrend = [
  { day: "Mon", resolved: 23, target: 25 },
  { day: "Tue", resolved: 31, target: 25 },
  { day: "Wed", resolved: 28, target: 25 },
  { day: "Thu", resolved: 35, target: 25 },
  { day: "Fri", resolved: 29, target: 25 },
  { day: "Sat", resolved: 18, target: 20 },
  { day: "Sun", resolved: 15, target: 20 }
];

export default function ReportsAnalytics() {
  const handleExport = (type: string) => {
    console.log(`Exporting ${type} report`);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground" data-testid="text-page-title">
            Reports & Analytics
          </h1>
          <p className="text-muted-foreground" data-testid="text-page-subtitle">
            Monitor performance metrics and generate insights
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="last-30-days">
            <SelectTrigger className="w-40" data-testid="select-time-period">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 Days</SelectItem>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            data-testid="button-export-report"
            onClick={() => handleExport('comprehensive')}
          >
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover-elevate" data-testid="card-kpi-resolution-rate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">94.2%</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+2.1%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-elevate" data-testid="card-kpi-avg-response">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">2.3 hrs</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 text-green-500" />
              <span className="text-green-500">-0.4 hrs</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-elevate" data-testid="card-kpi-citizen-satisfaction">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Citizen Satisfaction</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">4.4/5</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+0.2</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-elevate" data-testid="card-kpi-cost-per-issue">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost per Issue</CardTitle>
            <Building2 className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">$324</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 text-green-500" />
              <span className="text-green-500">-$12</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issue Resolution Trend */}
        <Card data-testid="card-resolution-trend">
          <CardHeader>
            <CardTitle>Issue Resolution Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mockPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Area 
                  type="monotone" 
                  dataKey="reported" 
                  stackId="1"
                  stroke="hsl(var(--chart-3))"
                  fill="hsl(var(--chart-3))"
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="resolved" 
                  stackId="2"
                  stroke="hsl(var(--chart-2))"
                  fill="hsl(var(--chart-2))"
                  fillOpacity={0.8}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Daily Resolution vs Target */}
        <Card data-testid="card-daily-performance">
          <CardHeader>
            <CardTitle>Daily Performance vs Target</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockResolutionTrend}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="day" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Line 
                  type="monotone" 
                  dataKey="resolved" 
                  stroke="hsl(var(--chart-1))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--chart-1))", r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="hsl(var(--chart-4))" 
                  strokeDasharray="5 5"
                  dot={{ fill: "hsl(var(--chart-4))", r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Performance */}
        <Card data-testid="card-department-performance">
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockDepartmentPerformance} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis type="number" className="text-muted-foreground" />
                <YAxis dataKey="name" type="category" className="text-muted-foreground" width={100} />
                <Bar dataKey="resolved" fill="hsl(var(--chart-1))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Issue Type Distribution */}
        <Card data-testid="card-issue-distribution">
          <CardHeader>
            <CardTitle>Issue Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockIssueTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {mockIssueTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {mockIssueTypes.map((item) => (
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

      {/* Detailed Department Metrics */}
      <Card data-testid="card-detailed-metrics">
        <CardHeader>
          <CardTitle>Detailed Department Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Department</th>
                  <th className="text-right p-2">Issues Resolved</th>
                  <th className="text-right p-2">Avg Resolution Time</th>
                  <th className="text-right p-2">Satisfaction Score</th>
                  <th className="text-right p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockDepartmentPerformance.map((dept) => (
                  <tr key={dept.name} className="border-b hover-elevate">
                    <td className="p-2 font-medium">{dept.name}</td>
                    <td className="p-2 text-right">{dept.resolved}</td>
                    <td className="p-2 text-right">{dept.avgTime} days</td>
                    <td className="p-2 text-right">
                      <span className="font-medium text-green-600">
                        {dept.satisfaction}/5.0
                      </span>
                    </td>
                    <td className="p-2 text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        data-testid={`button-export-${dept.name.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={() => handleExport(dept.name)}
                      >
                        Export
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}