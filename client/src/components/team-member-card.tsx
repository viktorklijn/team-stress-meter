import { Card, CardContent } from "@/components/ui/card";
import type { TeamMember } from "@shared/schema";

interface TeamMemberCardProps {
  member: TeamMember;
  isCurrentUser?: boolean;
}

export function TeamMemberCard({ member, isCurrentUser }: TeamMemberCardProps) {
  const getStressColor = (level: number) => {
    if (level <= 3) return "stress-low";
    if (level <= 6) return "stress-medium";
    return "stress-high";
  };

  const getStressBadge = (level: number) => {
    if (level <= 3) return { text: "Low", class: "bg-green-100 text-green-700" };
    if (level <= 6) return { text: "Moderate", class: "bg-amber-100 text-amber-700" };
    return { text: "High", class: "bg-red-100 text-red-700" };
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-blue-100 text-blue-600",
      "bg-green-100 text-green-600",
      "bg-purple-100 text-purple-600",
      "bg-indigo-100 text-indigo-600",
      "bg-pink-100 text-pink-600",
      "bg-orange-100 text-orange-600",
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  const formatLastUpdate = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - new Date(date).getTime()) / 1000 / 60);
    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  };

  const stressPercentage = (member.stressLevel / 10) * 100;
  const stressColor = getStressColor(member.stressLevel);
  const badge = getStressBadge(member.stressLevel);

  return (
    <Card className="bg-white shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getAvatarColor(member.name)}`}>
              <span className="text-sm font-medium">
                {getInitials(member.name)}
              </span>
            </div>
            <div>
              <h3 className="font-medium text-slate-900">{member.name}</h3>
              <p className="text-xs text-slate-500">{member.role}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full bg-${stressColor}`}></div>
            {isCurrentUser && <span className="text-xs text-slate-500">You</span>}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Stress Level</span>
            <span className={`text-lg font-semibold ${stressColor}`}>
              {member.stressLevel}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div
              className={`bg-${stressColor} h-3 rounded-full transition-all duration-300`}
              style={{ width: `${stressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-500">
              Updated {formatLastUpdate(member.lastUpdate)}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${badge.class}`}>
              {badge.text}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
