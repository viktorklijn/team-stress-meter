import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Save, Gauge } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { GaugeMeter } from "@/components/gauge-meter";
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
        title: "Updated! 🎯",
        description: "Your stress level has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Oops! 😅",
        description: "Failed to update stress level. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleUpdateStress = () => {
    updateStressMutation.mutate(stressLevel);
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

  if (!currentUser) {
    return (
      <Card className="bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-300">
        <CardContent className="p-6 text-center">
          <div className="text-4xl mb-3">🤔</div>
          <h2 className="text-lg font-semibold text-slate-700">
            Select yourself first!
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Choose your name below to update your stress level
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <Gauge className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                How are you feeling today? 🌟
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Update your stress meter, {currentUser.name}!
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
          {/* Gauge Display */}
          <div className="flex-shrink-0">
            <GaugeMeter value={stressLevel} size="large" />
          </div>

          {/* Controls */}
          <div className="flex-1 space-y-6 w-full">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-slate-700">
                <span className="flex items-center space-x-1">
                  <span>😌</span>
                  <span>Chill</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span>😐</span>
                  <span>Busy</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span>😰</span>
                  <span>Overwhelmed</span>
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
                  style={{
                    background: 'linear-gradient(to right, #86efac 0%, #fde047 50%, #f87171 100%)'
                  }}
                />

                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  {Array.from({ length: 10 }, (_, i) => (
                    <span key={i + 1} className="w-4 text-center">{i + 1}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
              <Button
                onClick={handleUpdateStress}
                disabled={updateStressMutation.isPending || stressLevel === currentUser.stressLevel}
                className="px-6 py-3 bg-blue-500 text-white hover:bg-blue-600 transition-colors font-medium"
                size="lg"
              >
                <Save className="w-5 h-5 mr-2" />
                {updateStressMutation.isPending ? "Updating... ⏳" : "Update My Status! 🚀"}
              </Button>
              <span className="text-xs text-slate-600 text-center">
                Last updated: {formatLastUpdate(currentUser.lastUpdate)} ⏰
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
