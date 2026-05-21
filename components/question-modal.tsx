"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGameData } from "@/hooks/use-game-data";
import { cn } from "@/lib/utils";

interface QuestionModalProps {
    isOpen: boolean;
    onClose: () => void;
    question: {
        categoryTitle: string;
        value: number;
        question: string;
        answer: string;
    };
    isDailyDouble?: boolean;
}

export default function QuestionModal({
    isOpen,
    onClose,
    question,
    isDailyDouble = false,
}: QuestionModalProps) {
    const { gameSettings, teams, updateTeamScore } = useGameData();
    const [showAnswer, setShowAnswer] = useState(false);
    const [timeLeft, setTimeLeft] = useState(gameSettings?.timerDuration || 15);
    const [timerActive, setTimerActive] = useState(!!gameSettings?.timerEnabled && !isDailyDouble);
    const [timerExpired, setTimerExpired] = useState(false);
    const [awardedTeamIds, setAwardedTeamIds] = useState<Set<number>>(new Set());
    
    // Daily Double specific state
    const [isWagering, setIsWagering] = useState(isDailyDouble);
    const [wager, setWager] = useState(question.value);
    const [selectedTeamId, setSelectedTeamId] = useState<number | null>(teams.length > 0 ? teams[0].id : null);

    // Timer countdown
    useEffect(() => {
        let timer: string | number | NodeJS.Timeout | undefined;
        if (timerActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setTimerActive(false);
                        setTimerExpired(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [timerActive, timeLeft]);

    const handleShowAnswer = () => {
        setShowAnswer(true);
        setTimerActive(false);
    };

    const handleClose = () => {
        setShowAnswer(false);
        setTimerActive(false);
        setAwardedTeamIds(new Set());
        onClose();
    };

    const handleAwardPoints = (teamId: number) => {
        const valueToAdd = isDailyDouble ? wager : question.value;
        const isAwarded = awardedTeamIds.has(teamId);
        
        if (isAwarded) {
            updateTeamScore(teamId, -valueToAdd);
            const newAwarded = new Set(awardedTeamIds);
            newAwarded.delete(teamId);
            setAwardedTeamIds(newAwarded);
        } else {
            updateTeamScore(teamId, valueToAdd);
            setAwardedTeamIds(new Set([...awardedTeamIds, teamId]));
        }
    };

    const handleSubtractPoints = (e: React.MouseEvent, teamId: number) => {
        e.stopPropagation();
        const valueToSubtract = isDailyDouble ? wager : question.value;
        updateTeamScore(teamId, -valueToSubtract);
    };

    const handleConfirmWager = () => {
        setIsWagering(false);
        if (gameSettings.timerEnabled) {
            setTimerActive(true);
        }
    };

    // Calculate max wager
    const selectedTeam = teams.find(t => t.id === selectedTeamId);
    const maxWager = Math.max(selectedTeam?.score || 0, 1000);

    // Calculate progress percentage
    const progressPercentage =
        (timeLeft / (gameSettings?.timerDuration || 15)) * 100;

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md md:max-w-lg bg-blue-950 border-blue-500/30 text-blue-100 shadow-[0_0_50px_rgba(37,99,235,0.3)] p-6 max-h-[90vh] overflow-y-auto">
                <DialogHeader className="pb-4 border-b border-blue-500/20">
                    <DialogTitle className={cn(
                        "text-center text-xl font-black italic uppercase tracking-tighter",
                        isDailyDouble ? "text-yellow-500 gold-glow" : "text-blue-200"
                    )}>
                        {isDailyDouble ? "DAILY DOUBLE" : `${question.categoryTitle} - $${question.value}`}
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        {isDailyDouble ? "Daily Double wagering and question" : `Question for ${question.categoryTitle}`}
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6">
                    <AnimatePresence mode="wait">
                        {isWagering ? (
                            <motion.div
                                key="wagering"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1 }}
                                className="space-y-6 text-center"
                            >
                                <div className="text-4xl font-black text-yellow-500 gold-glow italic mb-4">
                                    DAILY DOUBLE
                                </div>
                                <div className="space-y-4 bg-blue-900/40 p-6 rounded-xl border border-blue-500/30">
                                    <div className="text-blue-200 font-bold uppercase tracking-widest text-sm">
                                        Select Team & Place Wager
                                    </div>
                                    
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {teams.map(team => (
                                            <Button
                                                key={team.id}
                                                variant={selectedTeamId === team.id ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => setSelectedTeamId(team.id)}
                                                className={cn(
                                                    "transition-all",
                                                    selectedTeamId === team.id ? "bg-blue-600 border-blue-400" : "border-blue-700 text-blue-300"
                                                )}
                                            >
                                                {team.name} (${team.score})
                                            </Button>
                                        ))}
                                    </div>

                                    <div className="relative max-w-[200px] mx-auto">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500 font-bold">$</span>
                                        <Input
                                            type="number"
                                            value={wager}
                                            onChange={(e) => setWager(Math.min(maxWager, Math.max(5, parseInt(e.target.value) || 0)))}
                                            className="bg-blue-950 border-blue-500/50 text-center text-2xl font-black text-yellow-500 gold-glow pl-8"
                                        />
                                    </div>
                                    <div className="text-xs text-blue-400 uppercase tracking-tighter">
                                        Min: $5 | Max: ${maxWager}
                                    </div>
                                </div>
                                <Button
                                    onClick={handleConfirmWager}
                                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-blue-950 font-black italic uppercase tracking-widest py-6"
                                >
                                    Reveal Clue
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="question-content"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-6"
                            >
                                {gameSettings?.timerEnabled && (
                                    <div className="mb-6">
                                        <div className="flex justify-between text-xs mb-1 uppercase tracking-widest text-blue-300">
                                            <span>Time remaining</span>
                                            <span className={cn(timeLeft < 10 ? "text-red-500 font-bold animate-pulse" : "text-blue-200")}>
                                                {timeLeft}s
                                            </span>
                                        </div>
                                        <div className="relative h-1.5 bg-blue-900/50 rounded-full overflow-hidden">
                                            <motion.div
                                                className="absolute top-0 left-0 h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                                initial={{ width: "100%" }}
                                                animate={{ width: `${progressPercentage}%` }}
                                                transition={{ duration: 0.5, ease: "linear" }}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="text-center text-xl md:text-2xl font-bold p-6 bg-blue-900/30 rounded-xl border border-blue-500/20 shadow-inner leading-relaxed">
                                    {question.question}
                                </div>

                                <AnimatePresence>
                                    {showAnswer ? (
                                        <div className="space-y-6">
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-center font-black text-yellow-500 text-xl md:text-2xl p-6 bg-blue-900/50 rounded-xl border border-yellow-500/30 gold-glow italic uppercase tracking-tight"
                                            >
                                                {question.answer}
                                            </motion.div>

                                            <div className="space-y-4">
                                                <h4 className="text-center text-xs font-black uppercase tracking-[0.2em] text-blue-400">
                                                    Award Points To:
                                                </h4>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                    {teams.map((team) => {
                                                        const isAwarded = awardedTeamIds.has(team.id);
                                                        const currentWager = isDailyDouble ? wager : question.value;
                                                        return (
                                                            <div key={team.id} className="flex gap-1">
                                                                <Button
                                                                    onClick={() => handleAwardPoints(team.id)}
                                                                    className={cn(
                                                                        "flex-grow transition-all duration-300 font-bold",
                                                                        isAwarded 
                                                                            ? "bg-green-600 hover:bg-green-700 text-white shadow-[0_0_15px_rgba(22,163,74,0.4)]" 
                                                                            : "bg-blue-900/40 hover:bg-blue-800/60 text-blue-200 border border-blue-500/20"
                                                                    )}
                                                                >
                                                                    {isAwarded && <span className="mr-2">✓</span>}
                                                                    {team.name} (+${currentWager})
                                                                </Button>
                                                                <Button
                                                                    variant="outline"
                                                                    size="icon"
                                                                    onClick={(e) => handleSubtractPoints(e, team.id)}
                                                                    className="border-red-500/30 text-red-400 hover:bg-red-950/50"
                                                                >
                                                                    -
                                                                </Button>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    ) : timerExpired ? (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-center space-y-4"
                                        >
                                            <p className="text-red-500 font-black italic uppercase tracking-widest text-2xl animate-bounce">
                                                Time&apos;s up!
                                            </p>
                                            <Button
                                                onClick={handleShowAnswer}
                                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg"
                                            >
                                                Show Answer
                                            </Button>
                                        </motion.div>
                                    ) : (
                                        <div className="flex justify-center">
                                            <Button
                                                onClick={handleShowAnswer}
                                                className="bg-blue-600 hover:bg-blue-700 text-white font-black italic uppercase tracking-widest py-6 px-12 rounded-lg shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all hover:scale-105 active:scale-95"
                                            >
                                                Show Answer
                                            </Button>
                                        </div>
                                    )}
                                </AnimatePresence>

                                <div className="flex justify-end mt-8 pt-4 border-t border-blue-500/20 gap-2">
                                    {showAnswer && (
                                        <Button
                                            onClick={handleClose}
                                            className="bg-blue-500 hover:bg-blue-600 text-white font-black italic uppercase tracking-widest px-8"
                                        >
                                            Done
                                        </Button>
                                    )}
                                    {!showAnswer && (
                                        <Button
                                            variant="ghost"
                                            onClick={handleClose}
                                            className="text-blue-400 hover:text-white hover:bg-blue-900/50 text-xs uppercase tracking-widest"
                                        >
                                            Close Without Scoring
                                        </Button>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </DialogContent>
        </Dialog>
    );
}
