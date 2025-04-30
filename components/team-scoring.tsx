"use client"

import { useState } from "react"
import { PlusCircle, MinusCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TeamScoring() {
  const [teams, setTeams] = useState([
    { id: 1, name: "Team 1", score: 0 },
    { id: 2, name: "Team 2", score: 0 },
  ])

  const addTeam = () => {
    const newId = Math.max(0, ...teams.map((t) => t.id)) + 1
    setTeams([...teams, { id: newId, name: `Team ${newId}`, score: 0 }])
  }

  const removeTeam = (id) => {
    setTeams(teams.filter((team) => team.id !== id))
  }

  const updateTeamName = (id, name) => {
    setTeams(teams.map((team) => (team.id === id ? { ...team, name } : team)))
  }

  const updateScore = (id, amount) => {
    setTeams(teams.map((team) => (team.id === id ? { ...team, score: team.score + amount } : team)))
  }

  return (
    <Card>
      <CardHeader className="p-3 sm:p-4">
        <CardTitle className="flex justify-between items-center text-base sm:text-lg">
          <span>Team Scores</span>
          <Button size="sm" variant="outline" onClick={addTeam}>
            <PlusCircle className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Add Team</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-4">
        <div className="space-y-3 sm:space-y-4">
          {teams.map((team) => (
            <div key={team.id} className="border rounded-md p-2 sm:p-3">
              <div className="flex justify-between items-center mb-2">
                <Input
                  value={team.name}
                  onChange={(e) => updateTeamName(team.id, e.target.value)}
                  className="max-w-[120px] sm:max-w-[150px] text-sm sm:text-base h-8 sm:h-10"
                />
                <Button variant="ghost" size="sm" onClick={() => removeTeam(team.id)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xl sm:text-2xl font-bold">${team.score}</div>
                <div className="flex space-x-1 sm:space-x-2">
                  <Button variant="outline" size="sm" onClick={() => updateScore(team.id, -200)}>
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => updateScore(team.id, 200)}>
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
