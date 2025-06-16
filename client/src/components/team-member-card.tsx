import { Card, CardContent } from "@/components/ui/card";
import { GaugeMeter } from "@/components/gauge-meter";
import type { TeamMember } from "@shared/schema";

interface TeamMemberCardProps {
  member: TeamMember;
  isCurrentUser?: boolean;
}

export function TeamMemberCard({ member, isCurrentUser }: TeamMemberCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getEmojiForRole = (role: string) => {
    const roleEmojis: { [key: string]: string } = {
      'manager': '👨‍💼',
      'developer': '👨‍💻',
      'designer': '🎨',
      'engineer': '⚙️',
      'qa': '🔍',
      'devops': '🔧',
      'product': '📱',
      'marketing': '📈',
      'sales': '💼',
      'hr': '👥'
    };
    
    const lowerRole = role.toLowerCase();
    for (const [key, emoji] of Object.entries(roleEmojis)) {
      if (lowerRole.includes(key)) return emoji;
    }
    return '👤';
  };

  const getStatusEmoji = (level: number) => {
    if (level <= 3) return '😌';
    if (level <= 6) return '😐';
    return '😰';
  };

  const formatLastUpdate = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - new Date(date).getTime()) / 1000 / 60);
    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  };

  const getStressBackground = (level: number, isCurrentUser: boolean) => {
    if (isCurrentUser) {
      if (level <= 3) return 'from-green-100 to-green-200 border-green-400';
      if (level <= 6) return 'from-yellow-100 to-yellow-200 border-yellow-400';
      return 'from-red-100 to-red-200 border-red-400';
    } else {
      if (level <= 3) return 'from-green-50 to-green-100 border-green-300';
      if (level <= 6) return 'from-yellow-50 to-yellow-100 border-yellow-300';
      return 'from-red-50 to-red-100 border-red-300';
    }
  };

  return (
    <Card className={`bg-gradient-to-br ${getStressBackground(member.stressLevel, isCurrentUser)} border-2 hover:shadow-lg transition-all duration-300 ${
      isCurrentUser ? 'shadow-lg' : 'shadow-sm'
    }`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">
              {getEmojiForRole(member.role)}
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 flex items-center space-x-2">
                <span>{member.name}</span>
                {isCurrentUser && <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">You!</span>}
              </h3>
              <p className="text-sm text-slate-600">{member.role}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <GaugeMeter value={member.stressLevel} size="medium" />
          
          <div className="text-center">
            <div className="text-xs text-slate-500 mb-1">
              Last updated {formatLastUpdate(member.lastUpdate)}
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-lg">{getStatusEmoji(member.stressLevel)}</span>
              <span className="text-sm font-medium text-slate-600">
                {member.stressLevel <= 3 ? 'Feeling good' : 
                 member.stressLevel <= 6 ? 'Manageable' : 
                 'Needs support'}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
