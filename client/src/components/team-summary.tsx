import { Card, CardContent } from "@/components/ui/card";
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
      return acc;
    },
    { lowStress: 0, moderateStress: 0, highStress: 0 }
  );

  const total = members.length;
  const lowPercentage = total > 0 ? (stats.lowStress / total) * 100 : 0;
  const moderatePercentage = total > 0 ? (stats.moderateStress / total) * 100 : 0;
  const highPercentage = total > 0 ? (stats.highStress / total) * 100 : 0;

  return (
    <Card className="bg-white shadow-sm border border-slate-200">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Team Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold stress-low mb-1">
              {stats.lowStress}
            </div>
            <div className="text-sm text-slate-600">Low Stress</div>
            <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
              <div
                className="bg-stress-low h-2 rounded-full transition-all duration-300"
                style={{ width: `${lowPercentage}%` }}
              ></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold stress-medium mb-1">
              {stats.moderateStress}
            </div>
            <div className="text-sm text-slate-600">Moderate Stress</div>
            <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
              <div
                className="bg-stress-medium h-2 rounded-full transition-all duration-300"
                style={{ width: `${moderatePercentage}%` }}
              ></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold stress-high mb-1">
              {stats.highStress}
            </div>
            <div className="text-sm text-slate-600">High Stress</div>
            <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
              <div
                className="bg-stress-high h-2 rounded-full transition-all duration-300"
                style={{ width: `${highPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
