import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Gauge } from "lucide-react";
import { StressInput } from "@/components/stress-input";
import { TeamMemberCard } from "@/components/team-member-card";
import { TeamSummary } from "@/components/team-summary";
import { UserSelector } from "@/components/user-selector";
import type { TeamMember } from "@shared/schema";

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState<TeamMember | undefined>();
  
  const {
    data: teamMembers = [],
    isLoading,
    error,
  } = useQuery<TeamMember[]>({
    queryKey: ["/api/team-members"],
  });

  const handleUserSelect = (user: TeamMember) => {
    setCurrentUser(user);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Gauge className="text-white w-4 h-4" />
                </div>
                <h1 className="text-xl font-semibold text-white">
                  Team Stress Meters 🚗💨
                </h1>
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-slate-600">
            <div className="text-4xl mb-4">⏳</div>
            <div>Loading your team dashboard...</div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Gauge className="text-white w-4 h-4" />
                </div>
                <h1 className="text-xl font-semibold text-white">
                  Team Stress Meters 🚗💨
                </h1>
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="text-4xl mb-4">😞</div>
            <div className="text-red-600">
              Error loading team data. Please refresh the page.
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Gauge className="text-white w-4 h-4" />
              </div>
              <h1 className="text-xl font-semibold text-white">
                Team Stress Meters 🚗💨
              </h1>
            </div>
            <div className="text-white text-sm">
              {teamMembers.length} team members 👥
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* User Selection */}
        <UserSelector 
          teamMembers={teamMembers} 
          currentUser={currentUser}
          onUserSelect={handleUserSelect}
        />

        {/* Personal Stress Input */}
        <StressInput currentUser={currentUser} />

        {/* Team Summary */}
        <TeamSummary members={teamMembers} />

        {/* Team Dashboard */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Team Stress Meters 🎛️
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Real-time stress levels for all team members
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live updates</span>
            </div>
          </div>

          {/* Team Member Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                isCurrentUser={member.id === currentUser?.id}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
