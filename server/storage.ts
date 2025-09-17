import { 
  users, 
  departments, 
  issues, 
  issueComments,
  type User, 
  type InsertUser,
  type Department,
  type InsertDepartment,
  type Issue,
  type InsertIssue,
  type IssueComment,
  type InsertIssueComment,
  type IssueWithRelations,
  type UserWithDepartment,
  type DepartmentWithStats
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc, count, sql, and, or, ilike } from "drizzle-orm";

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserWithDepartment(id: number): Promise<UserWithDepartment | undefined>;
  getAllUsers(): Promise<UserWithDepartment[]>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<InsertUser>): Promise<User | undefined>;
  
  // Department management
  getDepartment(id: number): Promise<Department | undefined>;
  getAllDepartments(): Promise<Department[]>;
  getDepartmentsWithStats(): Promise<DepartmentWithStats[]>;
  createDepartment(department: InsertDepartment): Promise<Department>;
  updateDepartment(id: number, updates: Partial<InsertDepartment>): Promise<Department | undefined>;
  
  // Issue management
  getIssue(id: number): Promise<IssueWithRelations | undefined>;
  getAllIssues(filters?: {
    status?: string;
    priority?: string;
    departmentId?: number;
    assignedToId?: number;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<IssueWithRelations[]>;
  getUnassignedIssues(): Promise<IssueWithRelations[]>;
  createIssue(issue: InsertIssue): Promise<Issue>;
  updateIssue(id: number, updates: Partial<InsertIssue>): Promise<Issue | undefined>;
  assignIssue(issueId: number, assignedToId: number, departmentId: number): Promise<Issue | undefined>;
  
  // Issue comments
  getIssueComments(issueId: number): Promise<IssueComment[]>;
  createIssueComment(comment: InsertIssueComment): Promise<IssueComment>;
  
  // Analytics
  getIssueStats(): Promise<{
    totalIssues: number;
    pendingIssues: number;
    resolvedIssues: number;
    avgResolutionTime: number;
  }>;
  getIssuesByDepartment(): Promise<Array<{
    departmentName: string;
    issueCount: number;
  }>>;
  getIssuesTrend(days: number): Promise<Array<{
    date: string;
    reported: number;
    resolved: number;
  }>>;
}

export class DatabaseStorage implements IStorage {
  // User management
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async getUserWithDepartment(id: number): Promise<UserWithDepartment | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .leftJoin(departments, eq(users.departmentId, departments.id))
      .where(eq(users.id, id));
    
    if (!user) return undefined;
    
    return {
      ...user.users,
      department: user.departments || null,
    };
  }

  async getAllUsers(): Promise<UserWithDepartment[]> {
    const result = await db
      .select()
      .from(users)
      .leftJoin(departments, eq(users.departmentId, departments.id))
      .orderBy(asc(users.name));

    return result.map(row => ({
      ...row.users,
      department: row.departments || null,
    }));
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: number, updates: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  // Department management
  async getDepartment(id: number): Promise<Department | undefined> {
    const [department] = await db.select().from(departments).where(eq(departments.id, id));
    return department || undefined;
  }

  async getAllDepartments(): Promise<Department[]> {
    return await db.select().from(departments).orderBy(asc(departments.name));
  }

  async getDepartmentsWithStats(): Promise<DepartmentWithStats[]> {
    const result = await db
      .select({
        id: departments.id,
        name: departments.name,
        head: departments.head,
        staff: departments.staff,
        specialties: departments.specialties,
        createdAt: departments.createdAt,
        updatedAt: departments.updatedAt,
        activeIssues: count(issues.id),
      })
      .from(departments)
      .leftJoin(issues, and(
        eq(departments.id, issues.departmentId),
        or(eq(issues.status, 'pending'), eq(issues.status, 'in-progress'))
      ))
      .groupBy(departments.id)
      .orderBy(asc(departments.name));

    return result.map(dept => ({
      id: dept.id,
      name: dept.name,
      head: dept.head,
      staff: dept.staff,
      specialties: dept.specialties,
      createdAt: dept.createdAt,
      updatedAt: dept.updatedAt,
      activeIssues: Number(dept.activeIssues) || 0,
      avgResolutionTime: "2.5 days", // TODO: Calculate from actual data
      workload: Math.min((Number(dept.activeIssues || 0) / dept.staff) * 20, 100), // Simple formula
    }));
  }

  async createDepartment(insertDepartment: InsertDepartment): Promise<Department> {
    const [department] = await db
      .insert(departments)
      .values(insertDepartment)
      .returning();
    return department;
  }

  async updateDepartment(id: number, updates: Partial<InsertDepartment>): Promise<Department | undefined> {
    const [department] = await db
      .update(departments)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(departments.id, id))
      .returning();
    return department || undefined;
  }

  // Issue management
  async getIssue(id: number): Promise<IssueWithRelations | undefined> {
    const [result] = await db
      .select()
      .from(issues)
      .leftJoin(users, eq(issues.assignedToId, users.id))
      .leftJoin(departments, eq(issues.departmentId, departments.id))
      .where(eq(issues.id, id));

    if (!result) return undefined;

    return {
      ...result.issues,
      assignedTo: result.users || null,
      department: result.departments || null,
    };
  }

  async getAllIssues(filters?: {
    status?: string;
    priority?: string;
    departmentId?: number;
    assignedToId?: number;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<IssueWithRelations[]> {
    let query = db
      .select()
      .from(issues)
      .leftJoin(users, eq(issues.assignedToId, users.id))
      .leftJoin(departments, eq(issues.departmentId, departments.id))
      .$dynamic();

    const conditions = [];

    if (filters?.status) {
      conditions.push(eq(issues.status, filters.status as any));
    }
    if (filters?.priority) {
      conditions.push(eq(issues.priority, filters.priority as any));
    }
    if (filters?.departmentId) {
      conditions.push(eq(issues.departmentId, filters.departmentId));
    }
    if (filters?.assignedToId) {
      conditions.push(eq(issues.assignedToId, filters.assignedToId));
    }
    if (filters?.search) {
      conditions.push(
        or(
          ilike(issues.title, `%${filters.search}%`),
          ilike(issues.description, `%${filters.search}%`),
          ilike(issues.location, `%${filters.search}%`)
        )
      );
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    query = query.orderBy(desc(issues.createdAt));

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }
    if (filters?.offset) {
      query = query.offset(filters.offset);
    }

    const result = await query;

    return result.map(row => ({
      ...row.issues,
      assignedTo: row.users || null,
      department: row.departments || null,
    }));
  }

  async getUnassignedIssues(): Promise<IssueWithRelations[]> {
    const result = await db
      .select()
      .from(issues)
      .leftJoin(departments, eq(issues.departmentId, departments.id))
      .where(sql`${issues.assignedToId} IS NULL`)
      .orderBy(desc(issues.createdAt));

    return result.map(row => ({
      ...row.issues,
      assignedTo: null,
      department: row.departments || null,
    }));
  }

  async createIssue(insertIssue: InsertIssue): Promise<Issue> {
    const [issue] = await db
      .insert(issues)
      .values(insertIssue)
      .returning();
    return issue;
  }

  async updateIssue(id: number, updates: Partial<InsertIssue>): Promise<Issue | undefined> {
    const [issue] = await db
      .update(issues)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(issues.id, id))
      .returning();
    return issue || undefined;
  }

  async assignIssue(issueId: number, assignedToId: number, departmentId: number): Promise<Issue | undefined> {
    const [issue] = await db
      .update(issues)
      .set({ 
        assignedToId, 
        departmentId, 
        status: 'in-progress',
        updatedAt: new Date() 
      })
      .where(eq(issues.id, issueId))
      .returning();
    return issue || undefined;
  }

  // Issue comments
  async getIssueComments(issueId: number): Promise<IssueComment[]> {
    return await db
      .select()
      .from(issueComments)
      .where(eq(issueComments.issueId, issueId))
      .orderBy(asc(issueComments.createdAt));
  }

  async createIssueComment(insertComment: InsertIssueComment): Promise<IssueComment> {
    const [comment] = await db
      .insert(issueComments)
      .values(insertComment)
      .returning();
    return comment;
  }

  // Analytics
  async getIssueStats(): Promise<{
    totalIssues: number;
    pendingIssues: number;
    resolvedIssues: number;
    avgResolutionTime: number;
  }> {
    const [stats] = await db
      .select({
        totalIssues: count(issues.id),
        pendingIssues: count(sql`CASE WHEN ${issues.status} IN ('pending', 'urgent') THEN 1 END`),
        resolvedIssues: count(sql`CASE WHEN ${issues.status} = 'resolved' THEN 1 END`),
      })
      .from(issues);

    return {
      totalIssues: stats.totalIssues,
      pendingIssues: stats.pendingIssues,
      resolvedIssues: stats.resolvedIssues,
      avgResolutionTime: 2.3, // TODO: Calculate from actual resolution times
    };
  }

  async getIssuesByDepartment(): Promise<Array<{
    departmentName: string;
    issueCount: number;
  }>> {
    const result = await db
      .select({
        departmentName: departments.name,
        issueCount: count(issues.id),
      })
      .from(departments)
      .leftJoin(issues, eq(departments.id, issues.departmentId))
      .groupBy(departments.id, departments.name)
      .orderBy(desc(count(issues.id)));

    return result;
  }

  async getIssuesTrend(days: number): Promise<Array<{
    date: string;
    reported: number;
    resolved: number;
  }>> {
    // This is a simplified implementation - in production you'd want more sophisticated date handling
    const result = await db
      .select({
        date: sql<string>`DATE(${issues.createdAt})`,
        reported: count(issues.id),
        resolved: count(sql`CASE WHEN ${issues.status} = 'resolved' THEN 1 END`),
      })
      .from(issues)
      .where(sql`${issues.createdAt} >= NOW() - INTERVAL '${days} days'`)
      .groupBy(sql`DATE(${issues.createdAt})`)
      .orderBy(sql`DATE(${issues.createdAt})`);

    return result;
  }
}

export const storage = new DatabaseStorage();