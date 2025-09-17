import { pgTable, text, serial, timestamp, integer, boolean, pgEnum, varchar } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Enums
export const issueStatusEnum = pgEnum("issue_status", ["pending", "in-progress", "resolved", "urgent"]);
export const issuePriorityEnum = pgEnum("issue_priority", ["low", "medium", "high", "critical"]);
export const userRoleEnum = pgEnum("user_role", ["administrator", "department-head", "staff-member", "viewer"]);
export const userStatusEnum = pgEnum("user_status", ["active", "inactive", "suspended"]);

// Tables
export const departments = pgTable("departments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  head: text("head").notNull(),
  staff: integer("staff").notNull().default(1),
  specialties: text("specialties").array().notNull().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  role: userRoleEnum("role").notNull(),
  status: userStatusEnum("status").notNull().default("active"),
  departmentId: integer("department_id").references(() => departments.id),
  permissions: text("permissions").array().notNull().default([]),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const issues = pgTable("issues", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  status: issueStatusEnum("status").notNull().default("pending"),
  priority: issuePriorityEnum("priority").notNull().default("medium"),
  location: text("location").notNull(),
  reporterName: text("reporter_name").notNull(),
  reporterEmail: text("reporter_email"),
  reporterPhone: text("reporter_phone"),
  assignedToId: integer("assigned_to_id").references(() => users.id),
  departmentId: integer("department_id").references(() => departments.id),
  estimatedResolution: timestamp("estimated_resolution"),
  resolvedAt: timestamp("resolved_at"),
  notes: text("notes"),
  attachments: text("attachments").array().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const issueComments = pgTable("issue_comments", {
  id: serial("id").primaryKey(),
  issueId: integer("issue_id").references(() => issues.id).notNull(),
  userId: integer("user_id").references(() => users.id).notNull(),
  comment: text("comment").notNull(),
  isInternal: boolean("is_internal").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const departmentsRelations = relations(departments, ({ many }) => ({
  users: many(users),
  issues: many(issues),
}));

export const usersRelations = relations(users, ({ one, many }) => ({
  department: one(departments, {
    fields: [users.departmentId],
    references: [departments.id],
  }),
  assignedIssues: many(issues),
  comments: many(issueComments),
}));

export const issuesRelations = relations(issues, ({ one, many }) => ({
  assignedTo: one(users, {
    fields: [issues.assignedToId],
    references: [users.id],
  }),
  department: one(departments, {
    fields: [issues.departmentId],
    references: [departments.id],
  }),
  comments: many(issueComments),
}));

export const issueCommentsRelations = relations(issueComments, ({ one }) => ({
  issue: one(issues, {
    fields: [issueComments.issueId],
    references: [issues.id],
  }),
  user: one(users, {
    fields: [issueComments.userId],
    references: [users.id],
  }),
}));

// Zod schemas for validation
export const insertDepartmentSchema = createInsertSchema(departments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastLogin: true,
});

export const insertIssueSchema = createInsertSchema(issues).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  resolvedAt: true,
});

export const insertIssueCommentSchema = createInsertSchema(issueComments).omit({
  id: true,
  createdAt: true,
});

// Types
export type Department = typeof departments.$inferSelect;
export type InsertDepartment = z.infer<typeof insertDepartmentSchema>;

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Issue = typeof issues.$inferSelect;
export type InsertIssue = z.infer<typeof insertIssueSchema>;

export type IssueComment = typeof issueComments.$inferSelect;
export type InsertIssueComment = z.infer<typeof insertIssueCommentSchema>;

// Extended types with relations
export type IssueWithRelations = Issue & {
  assignedTo?: User | null;
  department?: Department | null;
  comments?: IssueComment[];
};

export type UserWithDepartment = User & {
  department?: Department | null;
};

export type DepartmentWithStats = Department & {
  activeIssues?: number;
  avgResolutionTime?: string;
  workload?: number;
};