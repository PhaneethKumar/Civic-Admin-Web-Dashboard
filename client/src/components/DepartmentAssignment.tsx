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
  Building2, 
  Users, 
  ArrowRight, 
  Search,
  AlertTriangle,
  Clock,
  CheckCircle,
  User
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

// todo: remove mock functionality
const mockDepartments = [
  {
    id: "dept-001",
    name: "Public Works",
    head: "Mike Johnson",
    staff: 12,
    activeIssues: 15,
    avgResolutionTime: "3.2 days",
    workload: 75,
    specialties: ["Infrastructure", "Utilities", "Street Maintenance"]
  },
  {
    id: "dept-002", 
    name: "Transportation",
    head: "David Lee",
    staff: 8,
    activeIssues: 9,
    avgResolutionTime: "2.8 days",
    workload: 60,
    specialties: ["Roads", "Traffic Signals", "Parking"]
  },
  {
    id: "dept-003",
    name: "Parks & Recreation",
    head: "Lisa Brown",
    staff: 6,
    activeIssues: 4,
    avgResolutionTime: "1.5 days",
    workload: 40,
    specialties: ["Parks", "Recreation Centers", "Green Spaces"]
  },
  {
    id: "dept-004",
    name: "Sanitation",
    head: "Tom Wilson",
    staff: 10,
    activeIssues: 12,
    avgResolutionTime: "1.2 days",
    workload: 80,
    specialties: ["Waste Collection", "Recycling", "Street Cleaning"]
  }
];

// todo: remove mock functionality
const mockUnassignedIssues = [
  {
    id: "ISS-005",
    title: "Damaged traffic signal at Oak Avenue",
    priority: "high",
    type: "Traffic Infrastructure",
    location: "Oak Ave & 3rd St",
    reportedAt: "2024-01-15T11:30:00",
    suggestedDepartment: "Transportation"
  },
  {
    id: "ISS-006",
    title: "Overflowing trash bin in downtown area", 
    priority: "medium",
    type: "Waste Management",
    location: "Downtown Plaza",
    reportedAt: "2024-01-15T09:15:00",
    suggestedDepartment: "Sanitation"
  },
  {
    id: "ISS-007",
    title: "Playground equipment needs repair",
    priority: "low",
    type: "Recreation Facilities",
    location: "Riverside Park",
    reportedAt: "2024-01-14T16:45:00",
    suggestedDepartment: "Parks & Recreation"
  }
];

export default function DepartmentAssignment() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const getWorkloadColor = (workload: number) => {
    if (workload >= 80) return "text-red-500";
    if (workload >= 60) return "text-yellow-500";
    return "text-green-500";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "outline";
    }
  };

  const assignIssue = (issueId: string, departmentId: string) => {
    console.log(`Assigning issue ${issueId} to department ${departmentId}`);
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground" data-testid="text-page-title">
          Department Assignment
        </h1>
        <p className="text-muted-foreground" data-testid="text-page-subtitle">
          Route issues to appropriate municipal departments efficiently
        </p>
      </div>

      {/* Department Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockDepartments.map((dept) => (
          <Card 
            key={dept.id} 
            className="hover-elevate cursor-pointer"
            data-testid={`card-department-${dept.id}`}
            onClick={() => console.log(`Department ${dept.name} clicked`)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Building2 className="h-5 w-5 text-primary" />
                {dept.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{dept.head}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <div className="text-muted-foreground">Staff</div>
                  <div className="font-medium">{dept.staff}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Active Issues</div>
                  <div className="font-medium">{dept.activeIssues}</div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Workload</span>
                  <span className={`font-medium ${getWorkloadColor(dept.workload)}`}>
                    {dept.workload}%
                  </span>
                </div>
                <Progress value={dept.workload} className="h-2" />
              </div>

              <div className="text-sm">
                <div className="text-muted-foreground mb-1">Avg Resolution</div>
                <div className="font-medium">{dept.avgResolutionTime}</div>
              </div>

              <div className="flex flex-wrap gap-1">
                {dept.specialties.slice(0, 2).map((specialty) => (
                  <Badge key={specialty} variant="outline" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
                {dept.specialties.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{dept.specialties.length - 2}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Unassigned Issues */}
      <Card data-testid="card-unassigned-issues">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Unassigned Issues ({mockUnassignedIssues.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockUnassignedIssues.map((issue) => (
              <div 
                key={issue.id}
                className="flex items-center justify-between p-4 border rounded-lg hover-elevate"
                data-testid={`card-unassigned-issue-${issue.id}`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium" data-testid={`text-issue-title-${issue.id}`}>
                        {issue.title}
                      </span>
                      <Badge variant={getPriorityColor(issue.priority)}>
                        {issue.priority}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-4">
                      <span>{issue.id}</span>
                      <span>•</span>
                      <span>{issue.type}</span>
                      <span>•</span>
                      <span>{issue.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-sm text-muted-foreground text-right">
                    <div>Suggested:</div>
                    <div className="font-medium text-foreground">
                      {issue.suggestedDepartment}
                    </div>
                  </div>
                  
                  <Select 
                    onValueChange={(value) => assignIssue(issue.id, value)}
                    defaultValue=""
                  >
                    <SelectTrigger 
                      className="w-40"
                      data-testid={`select-assign-${issue.id}`}
                    >
                      <SelectValue placeholder="Assign to..." />
                    </SelectTrigger>
                    <SelectContent>
                      {mockDepartments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button 
                    size="sm"
                    data-testid={`button-quick-assign-${issue.id}`}
                    onClick={() => {
                      const suggestedDept = mockDepartments.find(d => d.name === issue.suggestedDepartment);
                      if (suggestedDept) {
                        assignIssue(issue.id, suggestedDept.id);
                      }
                    }}
                  >
                    Quick Assign
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Assignment Rules */}
      <Card data-testid="card-assignment-rules">
        <CardHeader>
          <CardTitle>Smart Assignment Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <div className="font-medium">Workload Balancing</div>
                <div className="text-sm text-muted-foreground">
                  Distribute issues based on current capacity
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Clock className="h-5 w-5 text-blue-500" />
              <div>
                <div className="font-medium">Priority Routing</div>
                <div className="text-sm text-muted-foreground">
                  High priority issues get immediate attention
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Building2 className="h-5 w-5 text-purple-500" />
              <div>
                <div className="font-medium">Specialty Matching</div>
                <div className="text-sm text-muted-foreground">
                  Match issues to department expertise
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}