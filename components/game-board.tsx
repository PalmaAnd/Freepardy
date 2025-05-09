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
    const { gameData, markQuestionAsUsed } = useGameData();
    const [currentQuestion, setCurrentQuestion] = useState<{
        categoryTitle: string;
        value: number;
        used: boolean;
        question: string;
        answer: string;
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

        setCurrentQuestion({
            categoryTitle: category.title,
            value: question.value,
            question: question.question,
            answer: question.answer,
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
    const numQuestions = gameData.categories[0]?.questions.length || 5;

    if (showFinalJeopardy) {
        return <FinalJeopardy onFinish={endFinalJeopardy} />;
    }

    return (
        <div className="w-full">
            <div className="overflow-x-auto pb-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="min-w-max"
                >
                    {/* Categories Row */}
                    <div className="grid grid-cols-5 gap-1 sm:gap-2 mb-1 sm:mb-2">
                        {gameData.categories.map((category, index) => (
                            <Card
                                key={category.id || index}
                                className="bg-blue-700 text-white"
                            >
                                <CardContent className="p-2 sm:p-4 text-center font-bold">
                                    <h3 className="text-xs sm:text-sm md:text-base lg:text-lg truncate">
                                        {category.title}
                                    </h3>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Questions Grid */}
                    <div className="grid grid-cols-5 gap-1 sm:gap-2">
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
                <div className="mt-6 text-center">
                    <Button
                        onClick={startFinalJeopardy}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white"
                    >
                        Start Final Jeopardy
                    </Button>
                </div>
            )}

            {currentQuestion && (
                <QuestionModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    question={currentQuestion}
                />
            )}
        </div>
    );
}
