import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  AlertTriangle, 
  Eye, 
  Edit, 
  MoreHorizontal,
  MapPin,
  Calendar,
  User
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// todo: remove mock functionality
const mockIssues = [
  {
    id: "ISS-001",
    title: "Broken streetlight on Main Street",
    description: "Street light at intersection of Main St and Oak Ave is not functioning",
    status: "pending",
    priority: "high",
    department: "Public Works",
    reporter: "John Smith",
    location: "Main St & Oak Ave",
    reportedAt: "2024-01-15T10:30:00",
    assignedTo: "Mike Johnson",
    estimatedResolution: "2024-01-17T17:00:00"
  },
  {
    id: "ISS-002",
    title: "Pothole repair needed on Highway 45",
    description: "Large pothole causing vehicle damage near mile marker 12",
    status: "in-progress",
    priority: "medium",
    department: "Transportation",
    reporter: "Sarah Wilson",
    location: "Highway 45, Mile 12",
    reportedAt: "2024-01-14T14:15:00",
    assignedTo: "David Lee",
    estimatedResolution: "2024-01-20T12:00:00"
  },
  {
    id: "ISS-003",
    title: "Park bench vandalism in Central Park",
    description: "Multiple benches have been damaged with graffiti",
    status: "resolved",
    priority: "low",
    department: "Parks & Recreation",
    reporter: "Emily Davis",
    location: "Central Park, Section B",
    reportedAt: "2024-01-13T09:45:00",
    assignedTo: "Lisa Brown",
    estimatedResolution: "2024-01-15T16:00:00"
  },
  {
    id: "ISS-004",
    title: "Water main leak on Elm Street",
    description: "Significant water leak affecting multiple properties",
    status: "urgent",
    priority: "critical",
    department: "Public Works",
    reporter: "Robert Chen",
    location: "Elm Street, Block 400",
    reportedAt: "2024-01-15T08:20:00",
    assignedTo: "Tom Anderson",
    estimatedResolution: "2024-01-15T18:00:00"
  }
];

export default function IssueManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "destructive";
      case "in-progress": return "default";
      case "resolved": return "secondary";
      case "urgent": return "destructive";
      default: return "outline";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "destructive";
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "outline";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground" data-testid="text-page-title">
            Issue Management
          </h1>
          <p className="text-muted-foreground" data-testid="text-page-subtitle">
            Track, assign, and manage citizen-reported issues
          </p>
        </div>
        <Button 
          data-testid="button-create-issue"
          onClick={() => console.log('Create new issue clicked')}
        >
          Create New Issue
        </Button>
      </div>

      {/* Filters */}
      <Card data-testid="card-filters">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search issues..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  console.log('Search query:', e.target.value);
                }}
                data-testid="input-search-issues"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger data-testid="select-status-filter">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger data-testid="select-priority-filter">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger data-testid="select-department-filter">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="public-works">Public Works</SelectItem>
                <SelectItem value="transportation">Transportation</SelectItem>
                <SelectItem value="parks-recreation">Parks & Recreation</SelectItem>
                <SelectItem value="sanitation">Sanitation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Issues Table */}
      <Card data-testid="card-issues-table">
        <CardHeader>
          <CardTitle>Issues ({mockIssues.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Issue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Reported</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockIssues.map((issue) => (
                <TableRow 
                  key={issue.id} 
                  className="hover-elevate cursor-pointer"
                  data-testid={`row-issue-${issue.id}`}
                  onClick={() => console.log(`Issue ${issue.id} row clicked`)}
                >
                  <TableCell>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                        <span data-testid={`text-issue-title-${issue.id}`}>
                          {issue.title}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {issue.id}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(issue.status)} data-testid={`badge-status-${issue.id}`}>
                      {issue.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPriorityColor(issue.priority)} data-testid={`badge-priority-${issue.id}`}>
                      {issue.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{issue.department}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span>{issue.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span>{formatDate(issue.reportedAt)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <span>{issue.assignedTo}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          data-testid={`button-actions-${issue.id}`}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log(`View issue ${issue.id}`);
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log(`Edit issue ${issue.id}`);
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Issue
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}