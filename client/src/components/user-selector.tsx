import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, User, Users } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { TeamMember, InsertTeamMember } from "@shared/schema";

interface UserSelectorProps {
  teamMembers: TeamMember[];
  currentUser?: TeamMember;
  onUserSelect: (user: TeamMember) => void;
}

export function UserSelector({ teamMembers, currentUser, onUserSelect }: UserSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createMemberMutation = useMutation({
    mutationFn: async (member: InsertTeamMember) => {
      const response = await apiRequest("POST", "/api/team-members", member);
      return response.json();
    },
    onSuccess: (newMember: TeamMember) => {
      queryClient.invalidateQueries({ queryKey: ["/api/team-members"] });
      onUserSelect(newMember);
      setNewMemberName("");
      setNewMemberRole("");
      setIsOpen(false);
      toast({
        title: "Welcome! 👋",
        description: `${newMember.name} has been added to the team.`,
      });
    },
    onError: () => {
      toast({
        title: "Error 😞",
        description: "Failed to add team member. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleCreateMember = () => {
    if (!newMemberName.trim() || !newMemberRole.trim()) {
      toast({
        title: "Missing info 📝",
        description: "Please enter both name and role.",
        variant: "destructive",
      });
      return;
    }

    createMemberMutation.mutate({
      name: newMemberName.trim(),
      role: newMemberRole.trim(),
      stressLevel: 5
    });
  };

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

  return (
    <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Who are you? 🤔
              </h2>
              <p className="text-sm text-slate-600">
                Select yourself or join the team
              </p>
            </div>
          </div>
        </div>

        {currentUser && (
          <div className="mb-4 p-3 bg-white rounded-lg border-2 border-green-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-green-600">
                  {getInitials(currentUser.name)}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">
                  Currently: {currentUser.name} ✅
                </p>
                <p className="text-xs text-slate-500">{currentUser.role}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          {teamMembers.map((member) => (
            <Button
              key={member.id}
              variant={currentUser?.id === member.id ? "default" : "outline"}
              onClick={() => onUserSelect(member)}
              className="h-auto p-3 flex flex-col items-center space-y-2"
            >
              <div className="text-2xl">{getEmojiForRole(member.role)}</div>
              <div className="text-center">
                <div className="text-xs font-medium truncate max-w-[80px]">
                  {member.name}
                </div>
                <div className="text-xs text-slate-500 truncate max-w-[80px]">
                  {member.role}
                </div>
              </div>
            </Button>
          ))}
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full border-dashed border-2 border-indigo-300 text-indigo-600 hover:bg-indigo-50">
              <Plus className="w-4 h-4 mr-2" />
              Add yourself to the team 🚀
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Join the Team! 🎉</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Your Name 📛</Label>
                <Input
                  id="name"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="role">Your Role 💼</Label>
                <Input
                  id="role"
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value)}
                  placeholder="e.g. Frontend Developer"
                  className="mt-1"
                />
              </div>
              <Button
                onClick={handleCreateMember}
                disabled={createMemberMutation.isPending}
                className="w-full"
              >
                {createMemberMutation.isPending ? "Adding... ⏳" : "Join Team! 🎊"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}