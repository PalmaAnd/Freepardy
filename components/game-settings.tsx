"use client";

import { useState } from "react";
import { Settings, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useGameData } from "@/hooks/use-game-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GameSettings() {
    const { gameSettings, updateGameSettings, updateFinalJeopardy, resetGame } =
        useGameData();
    const [isOpen, setIsOpen] = useState(false);
    const [timerDuration, setTimerDuration] = useState(
        gameSettings.timerDuration
    );
    const [timerEnabled, setTimerEnabled] = useState(gameSettings.timerEnabled);
    const [finalCategory, setFinalCategory] = useState(
        gameSettings.finalJeopardyCategory
    );
    const [finalQuestion, setFinalQuestion] = useState(
        gameSettings.finalJeopardyQuestion
    );
    const [finalAnswer, setFinalAnswer] = useState(
        gameSettings.finalJeopardyAnswer
    );
    const [finalQuestionImage, setFinalQuestionImage] = useState(
        gameSettings.finalJeopardyQuestionImage || ""
    );
    const [finalAnswerImage, setFinalAnswerImage] = useState(
        gameSettings.finalJeopardyAnswerImage || ""
    );

    const openSettings = () => {
        setTimerDuration(gameSettings.timerDuration);
        setTimerEnabled(gameSettings.timerEnabled);
        setFinalCategory(gameSettings.finalJeopardyCategory);
        setFinalQuestion(gameSettings.finalJeopardyQuestion);
        setFinalAnswer(gameSettings.finalJeopardyAnswer);
        setFinalQuestionImage(gameSettings.finalJeopardyQuestionImage || "");
        setFinalAnswerImage(gameSettings.finalJeopardyAnswerImage || "");
        setIsOpen(true);
    };

    const handleSaveSettings = () => {
        updateGameSettings({
            timerEnabled,
            timerDuration: Number.parseInt(timerDuration.toString()) || 15,
        });

        updateFinalJeopardy(
            finalCategory,
            finalQuestion,
            finalAnswer,
            finalQuestionImage,
            finalAnswerImage
        );

        setIsOpen(false);
    };

    const handleResetGame = () => {
        if (
            confirm(
                "Are you sure you want to reset the game? All progress will be lost."
            )
        ) {
            resetGame();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="default"
                    size="sm"
                    className="sm:size-default"
                    onClick={openSettings}
                >
                    <Settings className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Settings</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-blue-950 border-blue-500/30 text-blue-100 shadow-[0_0_30px_rgba(37,99,235,0.2)]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-yellow-500 gold-glow italic uppercase tracking-tighter">Game Settings</DialogTitle>
                    <DialogDescription className="sr-only">
                        Configure timer and Final Jeopardy settings
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="timer">
                    <TabsList className="grid grid-cols-3 mb-4 bg-blue-900/50">
                        <TabsTrigger value="timer" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Timer</TabsTrigger>
                        <TabsTrigger value="final" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Final Jeopardy</TabsTrigger>
                        <TabsTrigger value="game" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Game</TabsTrigger>
                    </TabsList>

                    <TabsContent value="timer" className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="timer-switch" className="text-blue-200">
                                    Enable Timer
                                </Label>
                                <div className="text-sm text-blue-400">
                                    Set a time limit for answering questions
                                </div>
                            </div>
                            <Switch
                                id="timer-switch"
                                checked={timerEnabled}
                                onCheckedChange={setTimerEnabled}
                                className="data-[state=checked]:bg-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="timer-duration" className="text-blue-200">
                                Timer Duration (seconds)
                            </Label>
                            <Input
                                id="timer-duration"
                                type="number"
                                value={timerDuration}
                                onChange={(e) =>
                                    setTimerDuration(Number(e.target.value))
                                }
                                min={5}
                                max={120}
                                disabled={!timerEnabled}
                                className="bg-blue-900/50 border-blue-500/30 text-blue-100 focus-visible:ring-yellow-500"
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="final" className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="final-category" className="text-blue-200">
                                Final Jeopardy Category
                            </Label>
                            <Input
                                id="final-category"
                                value={finalCategory}
                                onChange={(e) =>
                                    setFinalCategory(e.target.value)
                                }
                                className="bg-blue-900/50 border-blue-500/30 text-blue-100 focus-visible:ring-yellow-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="final-question" className="text-blue-200">
                                Final Jeopardy Question
                            </Label>
                            <Textarea
                                id="final-question"
                                value={finalQuestion}
                                onChange={(e) =>
                                    setFinalQuestion(e.target.value)
                                }
                                rows={3}
                                className="bg-blue-900/50 border-blue-500/30 text-blue-100 focus-visible:ring-yellow-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="final-question-image" className="text-blue-200">
                                Question Image URL (optional)
                            </Label>
                            <Input
                                id="final-question-image"
                                value={finalQuestionImage}
                                onChange={(e) => setFinalQuestionImage(e.target.value)}
                                placeholder="/images/final-q.png or https://..."
                                className="bg-blue-900/50 border-blue-500/30 text-blue-100 focus-visible:ring-yellow-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="final-answer" className="text-blue-200">
                                Final Jeopardy Answer
                            </Label>
                            <Input
                                id="final-answer"
                                value={finalAnswer}
                                onChange={(e) => setFinalAnswer(e.target.value)}
                                className="bg-blue-900/50 border-blue-500/30 text-blue-100 focus-visible:ring-yellow-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="final-answer-image" className="text-blue-200">
                                Answer Image URL (optional)
                            </Label>
                            <Input
                                id="final-answer-image"
                                value={finalAnswerImage}
                                onChange={(e) => setFinalAnswerImage(e.target.value)}
                                placeholder="/images/final-a.png or https://..."
                                className="bg-blue-900/50 border-blue-500/30 text-blue-100 focus-visible:ring-yellow-500"
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="game" className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-blue-200">Reset Game</Label>
                            <div className="text-sm text-blue-400 mb-2">
                                Reset all questions to unused state
                            </div>
                            <Button
                                variant="destructive"
                                onClick={handleResetGame}
                                className="w-full bg-red-900/50 hover:bg-red-800 text-red-100 border border-red-500/30"
                            >
                                <RotateCcw className="h-4 w-4 mr-2" />
                                Reset Game
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>

                <div className="flex justify-end mt-4">
                    <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                        Save Settings
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
