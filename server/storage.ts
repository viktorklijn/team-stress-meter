import { teamMembers, type TeamMember, type InsertTeamMember } from "@shared/schema";

export interface IStorage {
  getAllTeamMembers(): Promise<TeamMember[]>;
  getTeamMember(id: number): Promise<TeamMember | undefined>;
  getTeamMemberByName(name: string): Promise<TeamMember | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  updateStressLevel(id: number, stressLevel: number): Promise<TeamMember | undefined>;
}

export class MemStorage implements IStorage {
  private teamMembers: Map<number, TeamMember>;
  private currentId: number;

  constructor() {
    this.teamMembers = new Map();
    this.currentId = 1;
    
    // Initialize with default team members
    this.initializeDefaultMembers();
  }

  private async initializeDefaultMembers() {
    const defaultMembers = [
      { name: 'Sarah Chen', role: 'Product Manager', stressLevel: 5 },
      { name: 'Mike Johnson', role: 'Frontend Developer', stressLevel: 3 },
      { name: 'Emma Smith', role: 'UX Designer', stressLevel: 5 },
      { name: 'David Lee', role: 'Backend Developer', stressLevel: 2 },
      { name: 'Anna Rodriguez', role: 'QA Engineer', stressLevel: 4 },
      { name: 'James Brown', role: 'DevOps Engineer', stressLevel: 6 }
    ];

    for (const member of defaultMembers) {
      await this.createTeamMember(member);
    }
  }

  async getAllTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values());
  }

  async getTeamMember(id: number): Promise<TeamMember | undefined> {
    return this.teamMembers.get(id);
  }

  async getTeamMemberByName(name: string): Promise<TeamMember | undefined> {
    return Array.from(this.teamMembers.values()).find(
      (member) => member.name === name,
    );
  }

  async createTeamMember(insertMember: InsertTeamMember): Promise<TeamMember> {
    const id = this.currentId++;
    const member: TeamMember = { 
      ...insertMember, 
      id,
      lastUpdate: new Date()
    };
    this.teamMembers.set(id, member);
    return member;
  }

  async updateStressLevel(id: number, stressLevel: number): Promise<TeamMember | undefined> {
    const member = this.teamMembers.get(id);
    if (!member) {
      return undefined;
    }

    const updatedMember: TeamMember = {
      ...member,
      stressLevel,
      lastUpdate: new Date()
    };

    this.teamMembers.set(id, updatedMember);
    return updatedMember;
  }
}

export const storage = new MemStorage();
