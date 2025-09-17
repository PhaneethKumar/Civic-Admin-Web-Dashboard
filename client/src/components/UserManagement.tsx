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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  UserPlus, 
  Edit, 
  MoreHorizontal, 
  Shield,
  Mail,
  Phone,
  Calendar,
  Building2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import adminAvatar from "@assets/generated_images/Admin_user_avatar_86941985.png";

// todo: remove mock functionality
const mockUsers = [
  {
    id: "user-001",
    name: "John Doe",
    email: "john.doe@city.gov",
    phone: "+1 (555) 123-4567",
    role: "Administrator",
    department: "Municipal Administration",
    status: "active",
    lastLogin: "2024-01-15T14:30:00",
    permissions: ["full-access", "user-management", "reports"]
  },
  {
    id: "user-002", 
    name: "Mike Johnson",
    email: "mike.johnson@city.gov",
    phone: "+1 (555) 234-5678",
    role: "Department Head",
    department: "Public Works",
    status: "active",
    lastLogin: "2024-01-15T09:15:00",
    permissions: ["department-access", "issue-assignment"]
  },
  {
    id: "user-003",
    name: "Sarah Wilson",
    email: "sarah.wilson@city.gov", 
    phone: "+1 (555) 345-6789",
    role: "Staff Member",
    department: "Transportation",
    status: "active",
    lastLogin: "2024-01-14T16:45:00",
    permissions: ["issue-management"]
  },
  {
    id: "user-004",
    name: "David Lee",
    email: "david.lee@city.gov",
    phone: "+1 (555) 456-7890", 
    role: "Department Head",
    department: "Transportation",
    status: "inactive",
    lastLogin: "2024-01-10T11:20:00",
    permissions: ["department-access", "issue-assignment"]
  }
];

// todo: remove mock functionality
const mockRoles = [
  { value: "administrator", label: "Administrator", description: "Full system access" },
  { value: "department-head", label: "Department Head", description: "Manage department issues" },
  { value: "staff-member", label: "Staff Member", description: "Handle assigned issues" },
  { value: "viewer", label: "Viewer", description: "Read-only access" }
];

// todo: remove mock functionality
const mockDepartments = [
  "Municipal Administration",
  "Public Works", 
  "Transportation",
  "Parks & Recreation",
  "Sanitation",
  "Planning & Development"
];

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "secondary";
      case "inactive": return "outline";
      case "suspended": return "destructive";
      default: return "outline";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Administrator": return "default";
      case "Department Head": return "secondary";
      case "Staff Member": return "outline";
      default: return "outline";
    }
  };

  const formatLastLogin = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground" data-testid="text-page-title">
            User Management
          </h1>
          <p className="text-muted-foreground" data-testid="text-page-subtitle">
            Manage municipal staff accounts, roles, and permissions
          </p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-user">
              <UserPlus className="mr-2 h-4 w-4" />
              Add New User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
              <DialogDescription>
                Add a new municipal staff member to the system.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" className="col-span-3" data-testid="input-user-name" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input id="email" type="email" className="col-span-3" data-testid="input-user-email" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">Phone</Label>
                <Input id="phone" className="col-span-3" data-testid="input-user-phone" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">Role</Label>
                <Select defaultValue="">
                  <SelectTrigger className="col-span-3" data-testid="select-user-role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockRoles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="department" className="text-right">Department</Label>
                <Select defaultValue="">
                  <SelectTrigger className="col-span-3" data-testid="select-user-department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockDepartments.map((dept) => (
                      <SelectItem key={dept} value={dept.toLowerCase().replace(/\s+/g, '-')}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsCreateDialogOpen(false)}
                data-testid="button-cancel-user"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  console.log('Creating new user');
                  setIsCreateDialogOpen(false);
                }}
                data-testid="button-save-user"
              >
                Create User
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card data-testid="card-user-filters">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search & Filter Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search users..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  console.log('Search query:', e.target.value);
                }}
                data-testid="input-search-users"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger data-testid="select-status-filter">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>

            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger data-testid="select-department-filter">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {mockDepartments.map((dept) => (
                  <SelectItem key={dept} value={dept.toLowerCase().replace(/\s+/g, '-')}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card data-testid="card-users-table">
        <CardHeader>
          <CardTitle>Municipal Staff ({mockUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((user) => (
                <TableRow 
                  key={user.id} 
                  className="hover-elevate"
                  data-testid={`row-user-${user.id}`}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={adminAvatar} alt={user.name} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium" data-testid={`text-user-name-${user.id}`}>
                          {user.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {user.id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <Badge variant={getRoleColor(user.role)} data-testid={`badge-role-${user.id}`}>
                        {user.role}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{user.department}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(user.status)} data-testid={`badge-status-${user.id}`}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatLastLogin(user.lastLogin)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span>{user.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          data-testid={`button-actions-${user.id}`}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          onClick={() => console.log(`Edit user ${user.id}`)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => console.log(`Reset password for ${user.id}`)}
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => console.log(`Toggle status for ${user.id}`)}
                          className={user.status === 'active' ? 'text-red-600' : 'text-green-600'}
                        >
                          {user.status === 'active' ? 'Deactivate' : 'Activate'}
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

      {/* Role Permissions Overview */}
      <Card data-testid="card-role-permissions">
        <CardHeader>
          <CardTitle>Role Permissions Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockRoles.map((role) => (
              <div 
                key={role.value}
                className="p-4 border rounded-lg hover-elevate cursor-pointer"
                data-testid={`card-role-${role.value}`}
                onClick={() => console.log(`View role details: ${role.label}`)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="font-medium">{role.label}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {role.description}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  View Permissions
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}