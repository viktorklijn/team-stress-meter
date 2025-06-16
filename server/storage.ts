import { teamMembers, type TeamMember, type InsertTeamMember } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getAllTeamMembers(): Promise<TeamMember[]>;
  getTeamMember(id: number): Promise<TeamMember | undefined>;
  getTeamMemberByName(name: string): Promise<TeamMember | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  updateStressLevel(id: number, stressLevel: number): Promise<TeamMember | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getAllTeamMembers(): Promise<TeamMember[]> {
    return await db.select().from(teamMembers);
  }

  async getTeamMember(id: number): Promise<TeamMember | undefined> {
    const [member] = await db.select().from(teamMembers).where(eq(teamMembers.id, id));
    return member || undefined;
  }

  async getTeamMemberByName(name: string): Promise<TeamMember | undefined> {
    const [member] = await db.select().from(teamMembers).where(eq(teamMembers.name, name));
    return member || undefined;
  }

  async createTeamMember(insertMember: InsertTeamMember): Promise<TeamMember> {
    const [member] = await db
      .insert(teamMembers)
      .values({
        name: insertMember.name,
        role: insertMember.role,
        stressLevel: insertMember.stressLevel || 5
      })
      .returning();
    return member;
  }

  async updateStressLevel(id: number, stressLevel: number): Promise<TeamMember | undefined> {
    const [updatedMember] = await db
      .update(teamMembers)
      .set({ 
        stressLevel,
        lastUpdate: new Date()
      })
      .where(eq(teamMembers.id, id))
      .returning();
    return updatedMember || undefined;
  }
}

export const storage = new DatabaseStorage();
