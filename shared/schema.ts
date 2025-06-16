import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  stressLevel: integer("stress_level").notNull().default(1),
  lastUpdate: timestamp("last_update").notNull().defaultNow(),
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({
  id: true,
  lastUpdate: true,
});

export const updateStressLevelSchema = z.object({
  stressLevel: z.number().min(1).max(10),
});

export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type TeamMember = typeof teamMembers.$inferSelect;
export type UpdateStressLevel = z.infer<typeof updateStressLevelSchema>;
