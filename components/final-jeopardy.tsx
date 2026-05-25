"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useGameData } from "@/hooks/use-game-data";

interface FinalJeopardyProps {
    onFinish: () => void;
}

export default function FinalJeopardy({ onFinish }: FinalJeopardyProps) {
    const { gameSettings, teams, setTeams } = useGameData();
    const [stage, setStage] = useState<
        "category" | "wager" | "question" | "answer" | "results"
    >("category");
    const [wagers, setWagers] = useState<Record<number, number>>({});
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [correctAnswers, setCorrectAnswers] = useState<
        Record<number, boolean>
    >({});
    const [timeLeft, setTimeLeft] = useState(60);
    const [timerActive, setTimerActive] = useState(false);

    // Timer effect
    useEffect(() => {
        let timer: string | number | NodeJS.Timeout | undefined;
        if (timerActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setTimerActive(false);
                        if (stage === "question") {
                            setStage("answer");
                        }
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [timerActive, timeLeft, stage]);

    const handleWagerChange = (teamId: number, value: string) => {
        const team = teams.find((currentTeam) => currentTeam.id === teamId);
        const limit = team ? (team.score > 0 ? team.score : 1000) : 1000;
        const parsedValue = Number.parseInt(value, 10) || 0;
        const numValue = Math.max(0, Math.min(parsedValue, limit));
        setWagers((prev) => ({
            ...prev,
            [teamId]: numValue,
        }));
    };

    const handleAnswerChange = (teamId: number, value: string) => {
        setAnswers((prev) => ({
            ...prev,
            [teamId]: value,
        }));
    };

    const handleCorrectAnswer = (teamId: number, isCorrect: boolean) => {
        setCorrectAnswers((prev) => ({
            ...prev,
            [teamId]: isCorrect,
        }));
    };

    const moveToNextStage = () => {
        if (stage === "category") {
            setStage("wager");
        } else if (stage === "wager") {
            setStage("question");
            setTimeLeft(60);
            setTimerActive(true);
        } else if (stage === "question") {
            setStage("answer");
        } else if (stage === "answer") {
            setStage("results");
        } else if (stage === "results") {
            // Update team scores based on wagers and correct answers
            const updatedTeams = teams.map((team) => {
                const isCorrect = correctAnswers[team.id] || false;
                const wager = wagers[team.id] || 0;
                return {
                    ...team,
                    score: team.score + (isCorrect ? wager : -wager),
                };
            });

            // Update teams in context
            setTeams(updatedTeams);

            // Return to the main game
            onFinish();
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <Card className="bg-blue-700 text-white mb-6">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl sm:text-3xl">
                        Final Jeopardy!
                    </CardTitle>
                </CardHeader>
            </Card>

            {teams.length === 0 && (
                <Card className="mb-6">
                    <CardContent className="py-8 text-center space-y-4">
                        <p>Add at least one team before starting Final Jeopardy.</p>
                        <Button onClick={onFinish}>Back to Game Board</Button>
                    </CardContent>
                </Card>
            )}

            <AnimatePresence mode="wait">
                {teams.length > 0 && stage === "category" && (
                    <motion.div
                        key="category"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle className="text-center">
                                    The Category Is...
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <h2 className="text-2xl font-bold mb-8">
                                    {gameSettings.finalJeopardyCategory}
                                </h2>
                                <Button onClick={moveToNextStage}>
                                    Place Your Wagers
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {stage === "wager" && (
                    <motion.div
                        key="wager"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle className="text-center">
                                    Place Your Wagers
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {teams.map((team) => (
                                        <div
                                            key={team.id}
                                            className="flex items-center justify-between"
                                        >
                                            <div>
                                                <span className="font-medium">
                                                    {team.name}
                                                </span>
                                                <span className="text-sm text-gray-500 ml-2">
                                                    Current: ${team.score}
                                                </span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="mr-2">$</span>
                                                <Input
                                                    type="number"
                                                    value={
                                                        wagers[team.id] || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleWagerChange(
                                                            team.id,
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-24 sm:w-32"
                                                    min={0}
                                                    max={
                                                        team.score > 0
                                                            ? team.score
                                                            : 1000
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 text-center">
                                    <Button onClick={moveToNextStage}>
                                        See The Question
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {stage === "question" && (
                    <motion.div
                        key="question"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle className="text-center">
                                    Final Jeopardy Question
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {timerActive && (
                                    <div className="mb-4">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>Time remaining</span>
                                            <span
                                                className={
                                                    timeLeft < 10
                                                        ? "text-red-500 font-bold"
                                                        : ""
                                                }
                                            >
                                                {timeLeft} seconds
                                            </span>
                                        </div>
                                        <Progress
                                            value={(timeLeft / 60) * 100}
                                            className="h-2"
                                        />
                                    </div>
                                )}

                                <div className="text-center space-y-4 mb-8">
                                    {gameSettings.finalJeopardyQuestionImage && (
                                        <div className="relative w-full max-h-[30vh] flex justify-center overflow-hidden rounded-lg border border-blue-500/20">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img 
                                                src={gameSettings.finalJeopardyQuestionImage} 
                                                alt="Final Question Image" 
                                                className="max-w-full h-auto object-contain"
                                            />
                                        </div>
                                    )}
                                    <div className="text-xl sm:text-2xl font-medium p-4">
                                        {gameSettings.finalJeopardyQuestion}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {teams.map((team) => (
                                        <div
                                            key={team.id}
                                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
                                        >
                                            <label
                                                htmlFor={`answer-${team.id}`}
                                                className="font-medium mb-1 sm:mb-0"
                                            >
                                                {team.name} Answer:
                                            </label>
                                            <Input
                                                id={`answer-${team.id}`}
                                                value={answers[team.id] || ""}
                                                onChange={(e) =>
                                                    handleAnswerChange(
                                                        team.id,
                                                        e.target.value
                                                    )
                                                }
                                                className="sm:w-2/3"
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 text-center">
                                    <Button
                                        onClick={moveToNextStage}
                                        disabled={timerActive}
                                    >
                                        {timerActive
                                            ? `Wait ${timeLeft}s`
                                            : "Reveal Answer"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {stage === "answer" && (
                    <motion.div
                        key="answer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle className="text-center">
                                    The Correct Answer Is...
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center space-y-4 mb-8">
                                    {gameSettings.finalJeopardyAnswerImage && (
                                        <div className="relative w-full max-h-[30vh] flex justify-center overflow-hidden rounded-lg border border-green-500/20">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img 
                                                src={gameSettings.finalJeopardyAnswerImage} 
                                                alt="Final Answer Image" 
                                                className="max-w-full h-auto object-contain"
                                            />
                                        </div>
                                    )}
                                    <div className="text-2xl font-bold p-4 text-green-600">
                                        {gameSettings.finalJeopardyAnswer}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {teams.map((team) => (
                                        <div
                                            key={team.id}
                                            className="border p-3 rounded-md"
                                        >
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-medium">
                                                    {team.name}
                                                </span>
                                                <span>
                                                    Wager: $
                                                    {wagers[team.id] || 0}
                                                </span>
                                            </div>
                                            <div className="mb-3">
                                                <div className="text-sm text-gray-500">
                                                    Their Answer:
                                                </div>
                                                <div className="font-medium">
                                                    {answers[team.id] ||
                                                        "(No answer provided)"}
                                                </div>
                                            </div>
                                            <div className="flex justify-end space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-red-500 text-red-500 hover:bg-red-50"
                                                    onClick={() =>
                                                        handleCorrectAnswer(
                                                            team.id,
                                                            false
                                                        )
                                                    }
                                                >
                                                    Incorrect
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-green-500 text-green-500 hover:bg-green-50"
                                                    onClick={() =>
                                                        handleCorrectAnswer(
                                                            team.id,
                                                            true
                                                        )
                                                    }
                                                >
                                                    Correct
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 text-center">
                                    <Button onClick={moveToNextStage}>
                                        Show Results
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {stage === "results" && (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle className="text-center">
                                    Final Scores
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {teams.map((team) => {
                                        const isCorrect =
                                            correctAnswers[team.id] || false;
                                        const wager = wagers[team.id] || 0;
                                        const newScore =
                                            team.score +
                                            (isCorrect ? wager : -wager);

                                        return (
                                            <div
                                                key={team.id}
                                                className="border p-3 rounded-md"
                                            >
                                                <div className="flex justify-between items-center">
                                                    <span className="font-medium">
                                                        {team.name}
                                                    </span>
                                                    <div>
                                                        <span className="text-sm text-gray-500 mr-2">
                                                            ${team.score}
                                                        </span>
                                                        <span
                                                            className={
                                                                isCorrect
                                                                    ? "text-green-500"
                                                                    : "text-red-500"
                                                            }
                                                        >
                                                            {isCorrect
                                                                ? "+"
                                                                : "-"}
                                                            ${wager}
                                                        </span>
                                                        <span className="font-bold ml-2">
                                                            ${newScore}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-8 text-center">
                                    <Button onClick={moveToNextStage}>
                                        Return to Game
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
