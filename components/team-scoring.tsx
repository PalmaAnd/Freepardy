"use client";

import { PlusCircle, MinusCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGameData } from "@/hooks/use-game-data";

export default function TeamScoring() {
    const { teams, setTeams, updateTeamScore } = useGameData();

    const addTeam = () => {
        const newId = Math.max(0, ...teams.map((t) => t.id)) + 1;
        setTeams([...teams, { id: newId, name: `Team ${newId}`, score: 0 }]);
    };

    const removeTeam = (id: number) => {
        setTeams(teams.filter((team) => team.id !== id));
    };

    const updateTeamName = (id: number, name: string) => {
        setTeams(
            teams.map((team) => (team.id === id ? { ...team, name } : team))
        );
    };

    const handleUpdateScore = (id: number, amount: number) => {
        updateTeamScore(id, amount);
    };

    return (
        <Card className="bg-blue-900/40 border-blue-500/30 backdrop-blur-md shadow-2xl">
            <CardHeader className="p-3 sm:p-4 border-b border-blue-500/20">
                <CardTitle className="flex justify-between items-center text-base sm:text-lg italic uppercase tracking-widest text-blue-200">
                    <span>Scoreboard</span>
                    <Button size="sm" variant="outline" onClick={addTeam} className="border-blue-400 text-blue-200 hover:bg-blue-800 hover:text-white">
                        <PlusCircle className="h-4 w-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Add Team</span>
                        <span className="sm:hidden">Add</span>
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4">
                <div className="space-y-4 sm:space-y-6">
                    {teams.map((team) => (
                        <div
                            key={team.id}
                            className="bg-blue-950/60 border border-blue-500/30 rounded-lg p-3 sm:p-4 shadow-inner"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <Input
                                    value={team.name}
                                    onChange={(e) =>
                                        updateTeamName(team.id, e.target.value)
                                    }
                                    className="max-w-[120px] sm:max-w-[150px] text-sm sm:text-base h-8 sm:h-9 bg-blue-900/50 border-blue-500/30 text-blue-100 font-bold italic uppercase focus-visible:ring-yellow-500"
                                />
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    disabled={teams.length === 1}
                                    onClick={() => removeTeam(team.id)}
                                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20 h-8 w-8 p-0"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="text-3xl sm:text-4xl font-black italic tracking-tighter text-yellow-500 gold-glow">
                                    ${team.score}
                                </div>
                                <div className="flex space-x-1 sm:space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            handleUpdateScore(team.id, -200)
                                        }
                                        className="border-blue-500/50 text-blue-300 hover:bg-blue-800 h-8 w-8 sm:h-9 sm:w-9 p-0"
                                    >
                                        <MinusCircle className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            handleUpdateScore(team.id, 200)
                                        }
                                        className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-900/20 h-8 w-8 sm:h-9 sm:w-9 p-0"
                                    >
                                        <PlusCircle className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
