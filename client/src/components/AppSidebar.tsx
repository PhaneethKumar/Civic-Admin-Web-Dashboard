import {
  BarChart3,
  Building2,
  FileText,
  HelpCircle,
  Home,
  Settings,
  Users,
  AlertTriangle,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLocation } from "wouter";

const navigationItems = [
  {
    title: "Dashboard Overview",
    url: "/",
    icon: Home,
    description: "Main dashboard and statistics",
  },
  {
    title: "Issue Management",
    url: "/issues",
    icon: AlertTriangle,
    description: "Manage and track citizen issues",
  },
  {
    title: "Department Assignment",
    url: "/departments",
    icon: Building2,
    description: "Assign issues to departments",
  },
  {
    title: "Reports & Analytics",
    url: "/reports",
    icon: BarChart3,
    description: "View performance metrics",
  },
  {
    title: "User Management",
    url: "/users",
    icon: Users,
    description: "Manage municipal staff",
  },
  {
    title: "Settings & Configuration",
    url: "/settings",
    icon: Settings,
    description: "System configuration",
  },
  {
    title: "Help & Support",
    url: "/help",
    icon: HelpCircle,
    description: "Documentation and support",
  },
];

export function AppSidebar() {
  const [location, setLocation] = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location === item.url}
                    data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <a 
                      href={item.url}
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(`Navigating to ${item.title}`);
                        setLocation(item.url);
                      }}
                      className="flex items-center gap-3"
                    >
                      <item.icon className="h-4 w-4" />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{item.title}</span>
                        <span className="text-xs text-muted-foreground hidden xl:block">
                          {item.description}
                        </span>
                      </div>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}