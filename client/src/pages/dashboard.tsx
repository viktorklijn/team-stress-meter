import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { StressInput } from "@/components/stress-input";
import { TeamMemberCard } from "@/components/team-member-card";
import { TeamSummary } from "@/components/team-summary";
import type { TeamMember } from "@shared/schema";

export default function Dashboard() {
  const {
    data: teamMembers = [],
    isLoading,
    error,
  } = useQuery<TeamMember[]>({
    queryKey: ["/api/team-members"],
  });

  // For demo purposes, assume the first member is the current user
  const currentUser = teamMembers[0];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white shadow-sm border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                  <Heart className="text-white w-4 h-4" />
                </div>
                <h1 className="text-xl font-semibold text-slate-900">
                  Team Stress Monitor
                </h1>
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">Loading...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white shadow-sm border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                  <Heart className="text-white w-4 h-4" />
                </div>
                <h1 className="text-xl font-semibold text-slate-900">
                  Team Stress Monitor
                </h1>
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-red-600">
            Error loading team data. Please refresh the page.
          </div>
        </main>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                <Heart className="text-white w-4 h-4" />
              </div>
              <h1 className="text-xl font-semibold text-slate-900">
                Team Stress Monitor
              </h1>
            </div>
            {currentUser && (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-slate-600">{currentUser.name}</span>
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-indigo-600">
                    {getInitials(currentUser.name)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Personal Stress Input */}
        <div className="mb-8">
          <StressInput currentUser={currentUser} />
        </div>

        {/* Team Dashboard */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Team Overview</h2>
              <p className="text-sm text-slate-600 mt-1">
                Current stress levels across the team
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live updates</span>
            </div>
          </div>

          {/* Team Member Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {teamMembers.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                isCurrentUser={member.id === currentUser?.id}
              />
            ))}
          </div>

          {/* Team Summary */}
          <TeamSummary members={teamMembers} />
        </div>
      </main>
    </div>
  );
}
