import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus, BarChart3 } from "lucide-react";
import type { TeamMember } from "@shared/schema";

interface TeamSummaryProps {
  members: TeamMember[];
}

export function TeamSummary({ members }: TeamSummaryProps) {
  const stats = members.reduce(
    (acc, member) => {
      if (member.stressLevel <= 3) {
        acc.lowStress++;
      } else if (member.stressLevel <= 6) {
        acc.moderateStress++;
      } else {
        acc.highStress++;
      }
      acc.totalStress += member.stressLevel;
      return acc;
    },
    { lowStress: 0, moderateStress: 0, highStress: 0, totalStress: 0 }
  );

  const total = members.length;
  const averageStress = total > 0 ? (stats.totalStress / total).toFixed(1) : 0;
  const lowPercentage = total > 0 ? (stats.lowStress / total) * 100 : 0;
  const moderatePercentage = total > 0 ? (stats.moderateStress / total) * 100 : 0;
  const highPercentage = total > 0 ? (stats.highStress / total) * 100 : 0;

  const getTeamMood = () => {
    if (parseFloat(averageStress.toString()) <= 3) return { emoji: '😌', text: 'Team is doing great!', color: 'text-green-600' };
    if (parseFloat(averageStress.toString()) <= 6) return { emoji: '😐', text: 'Team is managing well', color: 'text-yellow-600' };
    return { emoji: '😰', text: 'Team needs support', color: 'text-red-600' };
  };

  const teamMood = getTeamMood();

  return (
    <Card className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Team Dashboard</h3>
              <p className="text-sm text-slate-600">Real-time stress overview</p>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-1">{teamMood.emoji}</div>
            <div className={`text-sm font-medium ${teamMood.color}`}>
              {teamMood.text}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {stats.lowStress}
            </div>
            <div className="text-sm text-green-700 mb-2">Feeling Good</div>
            <div className="text-2xl">😌</div>
            <div className="w-full bg-green-200 rounded-full h-2 mt-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${lowPercentage}%` }}
              ></div>
            </div>
            <div className="text-xs text-green-600 mt-1">{Math.round(lowPercentage)}%</div>
          </div>

          <div className="text-center p-4 bg-yellow-50 rounded-xl border border-yellow-200">
            <div className="text-3xl font-bold text-yellow-600 mb-1">
              {stats.moderateStress}
            </div>
            <div className="text-sm text-yellow-700 mb-2">Managing</div>
            <div className="text-2xl">😐</div>
            <div className="w-full bg-yellow-200 rounded-full h-2 mt-2">
              <div
                className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${moderatePercentage}%` }}
              ></div>
            </div>
            <div className="text-xs text-yellow-600 mt-1">{Math.round(moderatePercentage)}%</div>
          </div>

          <div className="text-center p-4 bg-red-50 rounded-xl border border-red-200">
            <div className="text-3xl font-bold text-red-600 mb-1">
              {stats.highStress}
            </div>
            <div className="text-sm text-red-700 mb-2">Needs Help</div>
            <div className="text-2xl">😰</div>
            <div className="w-full bg-red-200 rounded-full h-2 mt-2">
              <div
                className="bg-red-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${highPercentage}%` }}
              ></div>
            </div>
            <div className="text-xs text-red-600 mt-1">{Math.round(highPercentage)}%</div>
          </div>

          <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {averageStress}
            </div>
            <div className="text-sm text-blue-700 mb-2">Team Average</div>
            <div className="text-2xl">📊</div>
            <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(parseFloat(averageStress.toString()) / 10) * 100}%` }}
              ></div>
            </div>
            <div className="text-xs text-blue-600 mt-1">out of 10</div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-6 text-sm text-slate-600">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live updates</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>{total} team members</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
