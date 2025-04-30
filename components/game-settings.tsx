"use client"

import { useState } from "react"
import { Settings, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useGameData } from "@/hooks/use-game-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GameSettings() {
  const { gameSettings, updateGameSettings, updateFinalJeopardy, resetGame } = useGameData()
  const [isOpen, setIsOpen] = useState(false)
  const [timerDuration, setTimerDuration] = useState(gameSettings.timerDuration)
  const [timerEnabled, setTimerEnabled] = useState(gameSettings.timerEnabled)
  const [finalCategory, setFinalCategory] = useState(gameSettings.finalJeopardyCategory)
  const [finalQuestion, setFinalQuestion] = useState(gameSettings.finalJeopardyQuestion)
  const [finalAnswer, setFinalAnswer] = useState(gameSettings.finalJeopardyAnswer)

  const handleSaveSettings = () => {
    updateGameSettings({
      timerEnabled,
      timerDuration: Number.parseInt(timerDuration) || 30,
    })

    updateFinalJeopardy(finalCategory, finalQuestion, finalAnswer)

    setIsOpen(false)
  }

  const handleResetGame = () => {
    if (confirm("Are you sure you want to reset the game? All progress will be lost.")) {
      resetGame()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="sm:size-default">
          <Settings className="h-4 w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Game Settings</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="timer">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="timer">Timer</TabsTrigger>
            <TabsTrigger value="final">Final Jeopardy</TabsTrigger>
            <TabsTrigger value="game">Game</TabsTrigger>
          </TabsList>

          <TabsContent value="timer" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="timer-switch">Enable Timer</Label>
                <div className="text-sm text-muted-foreground">Set a time limit for answering questions</div>
              </div>
              <Switch id="timer-switch" checked={timerEnabled} onCheckedChange={setTimerEnabled} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timer-duration">Timer Duration (seconds)</Label>
              <Input
                id="timer-duration"
                type="number"
                value={timerDuration}
                onChange={(e) => setTimerDuration(e.target.value)}
                min={5}
                max={120}
                disabled={!timerEnabled}
              />
            </div>
          </TabsContent>

          <TabsContent value="final" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="final-category">Final Jeopardy Category</Label>
              <Input id="final-category" value={finalCategory} onChange={(e) => setFinalCategory(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="final-question">Final Jeopardy Question</Label>
              <Textarea
                id="final-question"
                value={finalQuestion}
                onChange={(e) => setFinalQuestion(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="final-answer">Final Jeopardy Answer</Label>
              <Input id="final-answer" value={finalAnswer} onChange={(e) => setFinalAnswer(e.target.value)} />
            </div>
          </TabsContent>

          <TabsContent value="game" className="space-y-4">
            <div className="space-y-2">
              <Label>Reset Game</Label>
              <div className="text-sm text-muted-foreground mb-2">Reset all questions to unused state</div>
              <Button variant="destructive" onClick={handleResetGame}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Game
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-4">
          <Button onClick={handleSaveSettings}>Save Settings</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
