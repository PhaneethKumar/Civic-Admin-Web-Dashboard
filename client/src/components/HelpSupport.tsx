import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  HelpCircle, 
  BookOpen, 
  MessageCircle, 
  Phone,
  Mail,
  Video,
  FileText,
  Search,
  ExternalLink
} from "lucide-react";

// todo: remove mock functionality
const mockFAQs = [
  {
    id: "faq-1",
    question: "How do I assign an issue to a specific department?",
    answer: "Navigate to the Issue Management section, select the issue you want to assign, and use the dropdown menu in the Actions column to choose the appropriate department. You can also use the Department Assignment page for bulk assignments."
  },
  {
    id: "faq-2",
    question: "What do the different priority levels mean?",
    answer: "Priority levels help determine response urgency: Critical (immediate response required), High (response within 2 hours), Medium (response within 24 hours), and Low (response within 3 business days)."
  },
  {
    id: "faq-3",
    question: "How can I generate reports for specific time periods?",
    answer: "Go to Reports & Analytics, select your desired time period from the dropdown menu, and choose the report type. You can export reports as PDF or Excel files using the Export button."
  },
  {
    id: "faq-4",
    question: "Can citizens track the status of their reported issues?",
    answer: "Yes, when citizens report issues through the public portal, they receive a tracking number. They can use this number on the public website to check their issue status in real-time."
  },
  {
    id: "faq-5",
    question: "How do I reset a user's password?",
    answer: "In User Management, find the user account, click the actions menu (three dots), and select 'Reset Password'. The user will receive an email with instructions to set a new password."
  }
];

// todo: remove mock functionality
const mockResources = [
  {
    title: "User Manual",
    description: "Complete guide to using the civic issue resolution system",
    type: "documentation",
    icon: BookOpen,
    link: "#"
  },
  {
    title: "Video Tutorials",
    description: "Step-by-step video guides for common tasks",
    type: "video",
    icon: Video,
    link: "#"
  },
  {
    title: "API Documentation",
    description: "Technical documentation for system integration",
    type: "technical",
    icon: FileText,
    link: "#"
  },
  {
    title: "Best Practices Guide",
    description: "Recommended workflows and municipal guidelines",
    type: "guide",
    icon: HelpCircle,
    link: "#"
  }
];

export default function HelpSupport() {
  const handleSupportRequest = () => {
    console.log('Support request submitted');
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground" data-testid="text-page-title">
          Help & Support
        </h1>
        <p className="text-muted-foreground" data-testid="text-page-subtitle">
          Find answers, documentation, and get assistance with the system
        </p>
      </div>

      {/* Quick Help */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover-elevate cursor-pointer" data-testid="card-quick-help-chat">
          <CardHeader className="text-center">
            <MessageCircle className="h-8 w-8 mx-auto text-blue-500 mb-2" />
            <CardTitle>Live Chat</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Get instant help from our support team
            </p>
            <Button 
              className="w-full"
              onClick={() => console.log('Starting live chat')}
              data-testid="button-start-chat"
            >
              Start Chat
            </Button>
          </CardContent>
        </Card>

        <Card className="hover-elevate cursor-pointer" data-testid="card-quick-help-phone">
          <CardHeader className="text-center">
            <Phone className="h-8 w-8 mx-auto text-green-500 mb-2" />
            <CardTitle>Phone Support</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Call our support hotline
            </p>
            <p className="font-medium text-lg mb-4">1-800-MUNICIPAL</p>
            <p className="text-xs text-muted-foreground">
              Mon-Fri 8AM-6PM EST
            </p>
          </CardContent>
        </Card>

        <Card className="hover-elevate cursor-pointer" data-testid="card-quick-help-email">
          <CardHeader className="text-center">
            <Mail className="h-8 w-8 mx-auto text-purple-500 mb-2" />
            <CardTitle>Email Support</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Send us a detailed message
            </p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => console.log('Opening email form')}
              data-testid="button-email-support"
            >
              Send Email
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Frequently Asked Questions */}
      <Card data-testid="card-faq">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search FAQ..."
                className="pl-10"
                data-testid="input-search-faq"
                onChange={(e) => console.log('FAQ search:', e.target.value)}
              />
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {mockFAQs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger 
                  className="text-left"
                  data-testid={`accordion-trigger-${faq.id}`}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent data-testid={`accordion-content-${faq.id}`}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Documentation & Resources */}
      <Card data-testid="card-resources">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Documentation & Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockResources.map((resource) => (
              <div 
                key={resource.title}
                className="flex items-center gap-4 p-4 border rounded-lg hover-elevate cursor-pointer"
                data-testid={`card-resource-${resource.title.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => console.log(`Opening resource: ${resource.title}`)}
              >
                <resource.icon className="h-8 w-8 text-primary" />
                <div className="flex-1">
                  <h3 className="font-medium">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Support Form */}
      <Card data-testid="card-contact-form">
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            handleSupportRequest();
          }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="support-name">Name</Label>
                <Input 
                  id="support-name"
                  placeholder="Your full name"
                  data-testid="input-support-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="support-email">Email</Label>
                <Input 
                  id="support-email"
                  type="email"
                  placeholder="your.email@city.gov"
                  data-testid="input-support-email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="support-subject">Subject</Label>
              <Input 
                id="support-subject"
                placeholder="Brief description of your issue"
                data-testid="input-support-subject"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="support-category">Category</Label>
              <select 
                id="support-category"
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
                data-testid="select-support-category"
              >
                <option value="">Select a category</option>
                <option value="technical">Technical Issue</option>
                <option value="account">Account Access</option>
                <option value="training">Training Request</option>
                <option value="feature">Feature Request</option>
                <option value="bug">Bug Report</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="support-message">Message</Label>
              <Textarea 
                id="support-message"
                placeholder="Please describe your issue in detail..."
                className="min-h-[120px]"
                data-testid="textarea-support-message"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline"
                data-testid="button-clear-form"
                onClick={() => console.log('Clearing form')}
              >
                Clear
              </Button>
              <Button 
                type="submit"
                data-testid="button-submit-support"
              >
                Submit Request
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card data-testid="card-system-status">
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Dashboard Service</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-green-600 font-medium">Operational</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Issue Management</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-green-600 font-medium">Operational</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Notification Service</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-green-600 font-medium">Operational</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Public Portal</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span className="text-sm text-yellow-600 font-medium">Maintenance</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Last updated: January 15, 2024 at 2:30 PM EST
            </p>
            <Button 
              variant="ghost" 
              className="p-0 h-auto text-sm"
              data-testid="button-status-page"
              onClick={() => console.log('Opening status page')}
            >
              View detailed status page
              <ExternalLink className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}