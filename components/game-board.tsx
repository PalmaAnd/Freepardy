"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useGameData } from "@/hooks/use-game-data";
import QuestionCell from "@/components/question-cell";
import QuestionModal from "@/components/question-modal";
import FinalJeopardy from "@/components/final-jeopardy";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GameBoard() {
    const { gameData, markQuestionAsUsed, dailyDoubleId } = useGameData();
    const [currentQuestion, setCurrentQuestion] = useState<{
        id: string;
        categoryTitle: string;
        value: number;
        used: boolean;
        question: string;
        questionImage?: string;
        answer: string;
        answerImage?: string;
        categoryIndex: number;
        questionIndex: number;
    } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showFinalJeopardy, setShowFinalJeopardy] = useState(false);

    const handleQuestionClick = (
        categoryIndex: number,
        questionIndex: number
    ) => {
        const category = gameData.categories[categoryIndex];
        const question = category.questions[questionIndex];
        if (!question || question.used) {
            return;
        }

        setCurrentQuestion({
            id: question.id,
            categoryTitle: category.title,
            value: question.value,
            question: question.question,
            questionImage: question.questionImage,
            answer: question.answer,
            answerImage: question.answerImage,
            used: question.used,
            categoryIndex,
            questionIndex,
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        if (currentQuestion) {
            markQuestionAsUsed(
                currentQuestion.categoryIndex,
                currentQuestion.questionIndex
            );
        }
    };

    const startFinalJeopardy = () => {
        setShowFinalJeopardy(true);
    };

    const endFinalJeopardy = () => {
        setShowFinalJeopardy(false);
    };

    // Check if all questions have been used
    const allQuestionsUsed = gameData.categories.every((category) =>
        category.questions.every((question) => question.used)
    );

    // Default values if no categories exist
    const numQuestions = Math.max(
        1,
        ...gameData.categories.map((category) => category.questions.length)
    );
    const columnStyle = {
        gridTemplateColumns: `repeat(${Math.max(gameData.categories.length, 1)}, minmax(0, 1fr))`,
    };

    if (showFinalJeopardy) {
        return <FinalJeopardy onFinish={endFinalJeopardy} />;
    }

    return (
        <div className="w-full">
            <div className="overflow-x-auto pb-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {/* Categories Row */}
                    <div
                        className="grid gap-2 sm:gap-4 mb-2 sm:mb-4"
                        style={columnStyle}
                    >
                        {gameData.categories.map((category, index) => (
                            <Card
                                key={category.id || index}
                                className="bg-blue-900 border-b-4 border-b-yellow-500 border-x-blue-700 border-t-blue-700 shadow-xl"
                            >
                                <CardContent className="p-2 sm:p-4 text-center font-black italic uppercase tracking-tighter">
                                    <h3 className="text-[10px] sm:text-xs md:text-sm lg:text-lg truncate text-blue-100 gold-glow">
                                        {category.title}
                                    </h3>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Questions Grid */}
                    <div className="grid gap-2 sm:gap-4" style={columnStyle}>
                        {Array.from({ length: numQuestions }).map(
                            (_, questionIndex) => (
                                <React.Fragment key={questionIndex}>
                                    {gameData.categories.map(
                                        (category, categoryIndex) => {
                                            const question =
                                                category.questions[
                                                    questionIndex
                                                ];
                                            return (
                                                <QuestionCell
                                                    key={`${categoryIndex}-${questionIndex}`}
                                                    value={
                                                        question?.value ||
                                                        (questionIndex + 1) *
                                                            200
                                                    }
                                                    used={
                                                        question?.used || false
                                                    }
                                                    disabled={!question}
                                                    onClick={() =>
                                                        handleQuestionClick(
                                                            categoryIndex,
                                                            questionIndex
                                                        )
                                                    }
                                                />
                                            );
                                        }
                                    )}
                                </React.Fragment>
                            )
                        )}
                    </div>
                </motion.div>
            </div>

            {allQuestionsUsed && !showFinalJeopardy && (
                <div className="mt-8 text-center">
                    <Button
                        onClick={startFinalJeopardy}
                        className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-black italic uppercase tracking-widest px-8 py-6 text-xl rounded-none border-4 border-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.5)] transition-all hover:scale-105"
                    >
                        Start Final Jeopardy
                    </Button>
                </div>
            )}

            {currentQuestion && (
                <QuestionModal
                    key={`${currentQuestion.categoryIndex}-${currentQuestion.questionIndex}`}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    question={currentQuestion}
                    isDailyDouble={currentQuestion.id === dailyDoubleId}
                />
            )}
        </div>
    );
}
