"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useGameData } from "@/hooks/use-game-data";

interface QuestionModalProps {
    isOpen: boolean;
    onClose: () => void;
    question: {
        categoryTitle: string;
        value: number;
        question: string;
        answer: string;
    };
}

export default function QuestionModal({
    isOpen,
    onClose,
    question,
}: QuestionModalProps) {
    const { gameSettings } = useGameData();
    const [showAnswer, setShowAnswer] = useState(false);
    const [timeLeft, setTimeLeft] = useState(gameSettings?.timerDuration || 15);
    const [timerActive, setTimerActive] = useState(false);
    const [timerExpired, setTimerExpired] = useState(false);

    // Start timer when modal opens
    useEffect(() => {
        if (isOpen && gameSettings?.timerEnabled) {
            setTimeLeft(gameSettings.timerDuration);
            setTimerActive(true);
            setTimerExpired(false);
        }
        return () => {
            setTimerActive(false);
        };
    }, [isOpen, gameSettings]);

    // Timer countdown
    useEffect(() => {
        let timer;
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
        // Optional: Play a sound effect here
    };

    const handleClose = () => {
        setShowAnswer(false);
        setTimerActive(false);
        onClose();
    };

    // Calculate progress percentage
    const progressPercentage =
        (timeLeft / (gameSettings?.timerDuration || 15)) * 100;

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md md:max-w-lg bg-white border shadow-lg rounded-lg p-6 max-h-[90vh] overflow-y-auto">
                <DialogHeader className="pb-4 border-b">
                    <DialogTitle className="text-center text-xl font-bold">
                        {question.categoryTitle} - ${question.value}
                    </DialogTitle>
                </DialogHeader>

                <div className="py-6">
                    {gameSettings?.timerEnabled && (
                        <div className="py-6">
                            {gameSettings?.timerEnabled && (
                                <div className="mb-6">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium">
                                            Time remaining
                                        </span>
                                        <span
                                            className={`font-medium ${
                                                timeLeft < 10
                                                    ? "text-red-500 font-bold"
                                                    : ""
                                            }`}
                                        >
                                            {timeLeft} seconds
                                        </span>
                                    </div>
                                    <div className="relative h-2 bg-gray-200 rounded">
                                        <motion.div
                                            className="absolute top-0 left-0 h-full bg-blue-500 rounded"
                                            initial={{ width: "100%" }}
                                            animate={{
                                                width: `${progressPercentage}%`,
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                ease: "linear",
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="mb-8 text-center text-lg md:text-xl font-medium p-4 bg-blue-50 rounded-lg">
                        {question.question}
                    </div>

                    <AnimatePresence>
                        {showAnswer ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="mb-6 text-center font-bold text-green-600 text-lg md:text-xl p-4 bg-green-50 rounded-lg"
                            >
                                {question.answer}
                            </motion.div>
                        ) : timerExpired ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mb-6 text-center"
                            >
                                <p className="text-red-500 mb-4 font-bold">
                                    Time's up!
                                </p>
                                <Button
                                    onClick={handleShowAnswer}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                                >
                                    Show Answer
                                </Button>
                            </motion.div>
                        ) : (
                            <div className="flex justify-center mb-6">
                                <Button
                                    onClick={handleShowAnswer}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                                >
                                    Show Answer
                                </Button>
                            </div>
                        )}
                    </AnimatePresence>

                    <div className="flex justify-end mt-4 pt-4 border-t">
                        <Button
                            variant="outline"
                            onClick={handleClose}
                            className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium py-2 px-4 rounded"
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
