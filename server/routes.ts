import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertIssueSchema, 
  insertUserSchema, 
  insertDepartmentSchema,
  insertIssueCommentSchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Issue Management API
  
  // Get all issues with optional filtering
  app.get("/api/issues", async (req, res) => {
    try {
      const { 
        status, 
        priority, 
        departmentId, 
        assignedToId, 
        search, 
        limit = 50, 
        offset = 0 
      } = req.query;

      const filters = {
        status: status as string,
        priority: priority as string,
        departmentId: departmentId ? parseInt(departmentId as string) : undefined,
        assignedToId: assignedToId ? parseInt(assignedToId as string) : undefined,
        search: search as string,
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
      };

      const issues = await storage.getAllIssues(filters);
      res.json(issues);
    } catch (error) {
      console.error("Error fetching issues:", error);
      res.status(500).json({ error: "Failed to fetch issues" });
    }
  });

  // Get single issue by ID
  app.get("/api/issues/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const issue = await storage.getIssue(id);
      
      if (!issue) {
        return res.status(404).json({ error: "Issue not found" });
      }
      
      res.json(issue);
    } catch (error) {
      console.error("Error fetching issue:", error);
      res.status(500).json({ error: "Failed to fetch issue" });
    }
  });

  // Create new issue
  app.post("/api/issues", async (req, res) => {
    try {
      const result = insertIssueSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: "Invalid issue data", 
          details: result.error.issues 
        });
      }

      const issue = await storage.createIssue(result.data);
      res.status(201).json(issue);
    } catch (error) {
      console.error("Error creating issue:", error);
      res.status(500).json({ error: "Failed to create issue" });
    }
  });

  // Update issue
  app.put("/api/issues/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const result = insertIssueSchema.partial().safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: "Invalid issue data", 
          details: result.error.issues 
        });
      }

      const issue = await storage.updateIssue(id, result.data);
      
      if (!issue) {
        return res.status(404).json({ error: "Issue not found" });
      }
      
      res.json(issue);
    } catch (error) {
      console.error("Error updating issue:", error);
      res.status(500).json({ error: "Failed to update issue" });
    }
  });

  // Assign issue to user and department
  app.post("/api/issues/:id/assign", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { assignedToId, departmentId } = req.body;
      
      if (!assignedToId || !departmentId) {
        return res.status(400).json({ 
          error: "Both assignedToId and departmentId are required" 
        });
      }

      const issue = await storage.assignIssue(id, assignedToId, departmentId);
      
      if (!issue) {
        return res.status(404).json({ error: "Issue not found" });
      }
      
      res.json(issue);
    } catch (error) {
      console.error("Error assigning issue:", error);
      res.status(500).json({ error: "Failed to assign issue" });
    }
  });

  // Get unassigned issues
  app.get("/api/issues/unassigned", async (req, res) => {
    try {
      const issues = await storage.getUnassignedIssues();
      res.json(issues);
    } catch (error) {
      console.error("Error fetching unassigned issues:", error);
      res.status(500).json({ error: "Failed to fetch unassigned issues" });
    }
  });

  // Issue Comments API
  
  // Get comments for an issue
  app.get("/api/issues/:id/comments", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const comments = await storage.getIssueComments(id);
      res.json(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ error: "Failed to fetch comments" });
    }
  });

  // Add comment to issue
  app.post("/api/issues/:id/comments", async (req, res) => {
    try {
      const issueId = parseInt(req.params.id);
      const result = insertIssueCommentSchema.safeParse({
        ...req.body,
        issueId
      });
      
      if (!result.success) {
        return res.status(400).json({ 
          error: "Invalid comment data", 
          details: result.error.issues 
        });
      }

      const comment = await storage.createIssueComment(result.data);
      res.status(201).json(comment);
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).json({ error: "Failed to create comment" });
    }
  });

  // Department Management API
  
  // Get all departments
  app.get("/api/departments", async (req, res) => {
    try {
      const departments = await storage.getAllDepartments();
      res.json(departments);
    } catch (error) {
      console.error("Error fetching departments:", error);
      res.status(500).json({ error: "Failed to fetch departments" });
    }
  });

  // Get departments with workload statistics
  app.get("/api/departments/stats", async (req, res) => {
    try {
      const departments = await storage.getDepartmentsWithStats();
      res.json(departments);
    } catch (error) {
      console.error("Error fetching department stats:", error);
      res.status(500).json({ error: "Failed to fetch department statistics" });
    }
  });

  // Get single department
  app.get("/api/departments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const department = await storage.getDepartment(id);
      
      if (!department) {
        return res.status(404).json({ error: "Department not found" });
      }
      
      res.json(department);
    } catch (error) {
      console.error("Error fetching department:", error);
      res.status(500).json({ error: "Failed to fetch department" });
    }
  });

  // Create new department
  app.post("/api/departments", async (req, res) => {
    try {
      const result = insertDepartmentSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: "Invalid department data", 
          details: result.error.issues 
        });
      }

      const department = await storage.createDepartment(result.data);
      res.status(201).json(department);
    } catch (error) {
      console.error("Error creating department:", error);
      res.status(500).json({ error: "Failed to create department" });
    }
  });

  // Update department
  app.put("/api/departments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const result = insertDepartmentSchema.partial().safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: "Invalid department data", 
          details: result.error.issues 
        });
      }

      const department = await storage.updateDepartment(id, result.data);
      
      if (!department) {
        return res.status(404).json({ error: "Department not found" });
      }
      
      res.json(department);
    } catch (error) {
      console.error("Error updating department:", error);
      res.status(500).json({ error: "Failed to update department" });
    }
  });

  // User Management API
  
  // Get all users
  app.get("/api/users", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  // Get single user
  app.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUserWithDepartment(id);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  // Create new user
  app.post("/api/users", async (req, res) => {
    try {
      const result = insertUserSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: "Invalid user data", 
          details: result.error.issues 
        });
      }

      const user = await storage.createUser(result.data);
      res.status(201).json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  // Update user
  app.put("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const result = insertUserSchema.partial().safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: "Invalid user data", 
          details: result.error.issues 
        });
      }

      const user = await storage.updateUser(id, result.data);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Failed to update user" });
    }
  });

  // Analytics API
  
  // Get general issue statistics
  app.get("/api/analytics/stats", async (req, res) => {
    try {
      const stats = await storage.getIssueStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  // Get issues by department
  app.get("/api/analytics/issues-by-department", async (req, res) => {
    try {
      const data = await storage.getIssuesByDepartment();
      res.json(data);
    } catch (error) {
      console.error("Error fetching department analytics:", error);
      res.status(500).json({ error: "Failed to fetch department analytics" });
    }
  });

  // Get issues trend over time
  app.get("/api/analytics/issues-trend", async (req, res) => {
    try {
      const days = parseInt(req.query.days as string) || 30;
      const data = await storage.getIssuesTrend(days);
      res.json(data);
    } catch (error) {
      console.error("Error fetching trend analytics:", error);
      res.status(500).json({ error: "Failed to fetch trend analytics" });
    }
  });

  // Test endpoint to seed initial data
  app.post("/api/seed", async (req, res) => {
    try {
      // Create some initial departments
      const depts = await Promise.all([
        storage.createDepartment({
          name: "Public Works",
          head: "Mike Johnson",
          staff: 12,
          specialties: ["Infrastructure", "Utilities", "Street Maintenance"]
        }),
        storage.createDepartment({
          name: "Transportation",
          head: "David Lee", 
          staff: 8,
          specialties: ["Roads", "Traffic Signals", "Parking"]
        }),
        storage.createDepartment({
          name: "Parks & Recreation",
          head: "Lisa Brown",
          staff: 6,
          specialties: ["Parks", "Recreation Centers", "Green Spaces"]
        }),
        storage.createDepartment({
          name: "Sanitation",
          head: "Tom Wilson",
          staff: 10,
          specialties: ["Waste Collection", "Recycling", "Street Cleaning"]
        })
      ]);

      // Create some initial users
      const users = await Promise.all([
        storage.createUser({
          name: "John Doe",
          email: "john.doe@city.gov",
          phone: "+1 (555) 123-4567",
          role: "administrator",
          departmentId: depts[0].id,
          permissions: ["full-access", "user-management", "reports"]
        }),
        storage.createUser({
          name: "Mike Johnson",
          email: "mike.johnson@city.gov",
          phone: "+1 (555) 234-5678",
          role: "department-head",
          departmentId: depts[0].id,
          permissions: ["department-access", "issue-assignment"]
        }),
        storage.createUser({
          name: "David Lee",
          email: "david.lee@city.gov",
          phone: "+1 (555) 345-6789",
          role: "department-head",
          departmentId: depts[1].id,
          permissions: ["department-access", "issue-assignment"]
        })
      ]);

      // Create some sample issues
      const issues = await Promise.all([
        storage.createIssue({
          title: "Broken streetlight on Main Street",
          description: "Street light at intersection of Main St and Oak Ave is not functioning",
          status: "pending",
          priority: "high",
          location: "Main St & Oak Ave",
          reporterName: "John Smith",
          reporterEmail: "john.smith@email.com",
          reporterPhone: "+1 (555) 111-2222"
        }),
        storage.createIssue({
          title: "Pothole repair needed on Highway 45",
          description: "Large pothole causing vehicle damage near mile marker 12",
          status: "in-progress",
          priority: "medium",
          location: "Highway 45, Mile 12",
          reporterName: "Sarah Wilson",
          reporterEmail: "sarah.wilson@email.com",
          departmentId: depts[1].id,
          assignedToId: users[2].id
        }),
        storage.createIssue({
          title: "Park bench vandalism in Central Park",
          description: "Multiple benches have been damaged with graffiti",
          status: "resolved",
          priority: "low",
          location: "Central Park, Section B",
          reporterName: "Emily Davis",
          reporterEmail: "emily.davis@email.com",
          departmentId: depts[2].id,
          resolvedAt: new Date()
        })
      ]);

      res.json({ 
        message: "Sample data created successfully",
        departments: depts.length,
        users: users.length,
        issues: issues.length
      });
    } catch (error) {
      console.error("Error seeding data:", error);
      res.status(500).json({ error: "Failed to seed data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}