import { Search, Bell, Settings, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import municipalLogo from "@assets/generated_images/Municipal_authority_logo_db9c5f0b.png";
import adminAvatar from "@assets/generated_images/Admin_user_avatar_86941985.png";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-background">
      <div className="flex items-center gap-4">
        <SidebarTrigger data-testid="button-sidebar-toggle" />
        <div className="flex items-center gap-3">
          <img 
            src={municipalLogo} 
            alt="Municipal Authority Logo" 
            className="h-10 w-10"
            data-testid="img-municipal-logo"
          />
          <div>
            <h1 className="text-lg font-semibold text-foreground" data-testid="text-system-title">
              Civic Issue Resolution System
            </h1>
            <p className="text-sm text-muted-foreground" data-testid="text-system-subtitle">
              Administrative Dashboard
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search issues, cases, or departments..."
            className="pl-10"
            data-testid="input-search"
            onChange={(e) => {
              console.log('Search query:', e.target.value);
              onSearch?.(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
          data-testid="button-notifications"
          onClick={() => console.log('Notifications clicked')}
        >
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
            3
          </Badge>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center gap-2 hover-elevate"
              data-testid="button-user-menu"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={adminAvatar} alt="Admin User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline text-sm font-medium">John Doe</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel data-testid="text-user-info">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Municipal Administrator</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              data-testid="button-profile"
              onClick={() => console.log('Profile clicked')}
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem 
              data-testid="button-settings"
              onClick={() => console.log('Settings clicked')}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              data-testid="button-logout"
              onClick={() => console.log('Logout clicked')}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}