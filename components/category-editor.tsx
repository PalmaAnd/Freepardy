/* eslint-disable */
"use client";

import { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGameData } from "@/hooks/use-game-data";
import { v4 as uuidv4 } from "uuid";

export default function CategoryEditor() {
    const { gameData, setGameData } = useGameData();
    const [selectedCategory, setSelectedCategory] = useState<number | null>(
        null
    );
    const [selectedQuestion, setSelectedQuestion] = useState<number | null>(
        null
    );

    const addCategory = () => {
        const newCategory = {
            id: uuidv4(),
            title: "New Category",
            questions: Array(5)
                .fill(null)
                .map((_, i) => ({
                    id: uuidv4(),
                    value: (i + 1) * 200,
                    question: "",
                    answer: "",
                    used: false,
                })),
        };

        setGameData({
            ...gameData,
            categories: [...gameData.categories, newCategory],
        });

        setSelectedCategory(gameData.categories.length);
        setSelectedQuestion(0);
    };

    const updateCategory = (index: number, field: string, value: string) => {
        const updatedCategories = [...gameData.categories];
        updatedCategories[index] = {
            ...updatedCategories[index],
            [field]: value,
        };

        setGameData({
            ...gameData,
            categories: updatedCategories,
        });
    };

    const updateQuestion = (
        categoryIndex: number,
        questionIndex: number,
        field: string,
        value: string | number
    ) => {
        const updatedCategories = [...gameData.categories];
        updatedCategories[categoryIndex].questions[questionIndex] = {
            ...updatedCategories[categoryIndex].questions[questionIndex],
            [field]: value,
        };

        setGameData({
            ...gameData,
            categories: updatedCategories,
        });
    };

    const deleteCategory = (index: number) => {
        const updatedCategories = [...gameData.categories];
        updatedCategories.splice(index, 1);

        setGameData({
            ...gameData,
            categories: updatedCategories,
        });

        setSelectedCategory(null);
        setSelectedQuestion(null);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Categories List */}
            <div className="md:col-span-1">
                <div className="mb-4 flex justify-between items-center">
                    <h3 className="text-lg font-medium">Categories</h3>
                    <Button size="sm" onClick={addCategory}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add
                    </Button>
                </div>

                <div className="space-y-2">
                    {gameData.categories.map((category, index) => (
                        <div
                            key={category.id || index}
                            className={`p-3 rounded-md cursor-pointer flex justify-between items-center ${
                                selectedCategory === index
                                    ? "bg-blue-100 dark:bg-blue-900"
                                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                            }`}
                            onClick={() => {
                                setSelectedCategory(index);
                                setSelectedQuestion(0);
                            }}
                        >
                            <span className="truncate">{category.title}</span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteCategory(index);
                                }}
                            >
                                <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Category Editor */}
            <div className="md:col-span-2">
                {selectedCategory !== null ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <Input
                                    value={
                                        gameData.categories[selectedCategory]
                                            .title
                                    }
                                    onChange={(e) =>
                                        updateCategory(
                                            selectedCategory,
                                            "title",
                                            e.target.value
                                        )
                                    }
                                    className="font-bold text-lg"
                                />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex space-x-2">
                                    {gameData.categories[
                                        selectedCategory
                                    ].questions.map((_, qIndex) => (
                                        <Button
                                            key={qIndex}
                                            variant={
                                                selectedQuestion === qIndex
                                                    ? "default"
                                                    : "outline"
                                            }
                                            onClick={() =>
                                                setSelectedQuestion(qIndex)
                                            }
                                        >
                                            ${(qIndex + 1) * 200}
                                        </Button>
                                    ))}
                                </div>

                                {selectedQuestion !== null && (
                                    <div className="space-y-4 pt-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">
                                                Question
                                            </label>
                                            <Textarea
                                                value={
                                                    gameData.categories[
                                                        selectedCategory
                                                    ].questions[
                                                        selectedQuestion
                                                    ].question
                                                }
                                                onChange={(e) =>
                                                    updateQuestion(
                                                        selectedCategory,
                                                        selectedQuestion,
                                                        "question",
                                                        e.target.value
                                                    )
                                                }
                                                rows={3}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1">
                                                Answer
                                            </label>
                                            <Textarea
                                                value={
                                                    gameData.categories[
                                                        selectedCategory
                                                    ].questions[
                                                        selectedQuestion
                                                    ].answer
                                                }
                                                onChange={(e) =>
                                                    updateQuestion(
                                                        selectedCategory,
                                                        selectedQuestion,
                                                        "answer",
                                                        e.target.value
                                                    )
                                                }
                                                rows={2}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1">
                                                Value
                                            </label>
                                            <Input
                                                type="number"
                                                value={
                                                    gameData.categories[
                                                        selectedCategory
                                                    ].questions[
                                                        selectedQuestion
                                                    ].value
                                                }
                                                onChange={(e) =>
                                                    updateQuestion(
                                                        selectedCategory,
                                                        selectedQuestion,
                                                        "value",
                                                        Number.parseInt(
                                                            e.target.value
                                                        )
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">
                            Select a category to edit or create a new one
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
