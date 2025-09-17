import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header";
import { ThemeToggle } from "@/components/ThemeToggle";
import DashboardOverview from "@/components/DashboardOverview";
import IssueManagement from "@/components/IssueManagement";
import DepartmentAssignment from "@/components/DepartmentAssignment";
import ReportsAnalytics from "@/components/ReportsAnalytics";
import UserManagement from "@/components/UserManagement";
import Settings from "@/components/Settings";
import HelpSupport from "@/components/HelpSupport";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={DashboardOverview} />
      <Route path="/issues" component={IssueManagement} />
      <Route path="/departments" component={DepartmentAssignment} />
      <Route path="/reports" component={ReportsAnalytics} />
      <Route path="/users" component={UserManagement} />
      <Route path="/settings" component={Settings} />
      <Route path="/help" component={HelpSupport} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  // Custom sidebar width for administrative dashboard
  const style = {
    "--sidebar-width": "20rem",       // 320px for better content
    "--sidebar-width-icon": "4rem",   // default icon width
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <SidebarProvider style={style as React.CSSProperties}>
            <div className="flex h-screen w-full">
              <AppSidebar />
              <div className="flex flex-col flex-1">
                <header className="flex items-center justify-between p-4 border-b bg-background">
                  <Header onSearch={(query) => console.log('Global search:', query)} />
                  <ThemeToggle />
                </header>
                <main className="flex-1 overflow-auto bg-background">
                  <Router />
                </main>
              </div>
            </div>
          </SidebarProvider>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
