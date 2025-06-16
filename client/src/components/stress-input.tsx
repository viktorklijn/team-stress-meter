import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Save, Smile, Meh, Frown } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { TeamMember } from "@shared/schema";

interface StressInputProps {
  currentUser?: TeamMember;
}

export function StressInput({ currentUser }: StressInputProps) {
  const [stressLevel, setStressLevel] = useState(currentUser?.stressLevel || 5);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateStressMutation = useMutation({
    mutationFn: async (level: number) => {
      if (!currentUser) throw new Error("No current user");
      const response = await apiRequest(
        "PATCH",
        `/api/team-members/${currentUser.id}/stress`,
        { stressLevel: level }
      );
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/team-members"] });
      toast({
        title: "Stress level updated",
        description: "Your stress level has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update stress level. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleUpdateStress = () => {
    updateStressMutation.mutate(stressLevel);
  };

  const getStressColor = (level: number) => {
    if (level <= 3) return "text-green-600";
    if (level <= 6) return "text-amber-600";
    return "text-red-600";
  };

  const formatLastUpdate = (date?: Date) => {
    if (!date) return "Never";
    const now = new Date();
    const diff = Math.floor((now.getTime() - new Date(date).getTime()) / 1000 / 60);
    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  };

  return (
    <Card className="bg-white shadow-sm border border-slate-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              How are you feeling today?
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Update your current stress level
            </p>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${getStressColor(stressLevel)}`}>
              {stressLevel}
            </div>
            <div className="text-xs text-slate-500">Current Level</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span className="flex items-center space-x-1">
              <Smile className="w-4 h-4 text-green-600" />
              <span>Low Stress</span>
            </span>
            <span className="flex items-center space-x-1">
              <Meh className="w-4 h-4 text-amber-600" />
              <span>Moderate</span>
            </span>
            <span className="flex items-center space-x-1">
              <Frown className="w-4 h-4 text-red-600" />
              <span>High Stress</span>
            </span>
          </div>

          <div className="relative">
            <input
              type="range"
              min="1"
              max="10"
              value={stressLevel}
              onChange={(e) => setStressLevel(parseInt(e.target.value))}
              className="stress-slider"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-2">
              {Array.from({ length: 10 }, (_, i) => (
                <span key={i + 1}>{i + 1}</span>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Button
              onClick={handleUpdateStress}
              disabled={updateStressMutation.isPending || !currentUser}
              className="px-4 py-2 bg-indigo-500 text-white hover:bg-indigo-600 transition-colors font-medium text-sm"
            >
              <Save className="w-4 h-4 mr-2" />
              {updateStressMutation.isPending ? "Updating..." : "Update Status"}
            </Button>
            <span className="text-xs text-slate-500">
              Last updated: {formatLastUpdate(currentUser?.lastUpdate)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
