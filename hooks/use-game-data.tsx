"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
    createDefaultGameData,
    GAME_DATA_STORAGE_KEY,
    normalizeGameData,
    type GameData,
    type GameSettings,
} from "@/lib/game-data";

// Create context
const GameDataContext = createContext<
    | {
          gameData: GameData;
          gameSettings: GameSettings;
          setGameData: (data: GameData) => void;
          resetGame: () => void;
          markQuestionAsUsed: (
              categoryIndex: number,
              questionIndex: number
          ) => void;
          updateGameSettings: (settings: Partial<GameSettings>) => void;
          updateFinalJeopardy: (
              category: string,
              question: string,
              answer: string
          ) => void;
      }
    | undefined
>(undefined);

// Provider component
export function GameDataProvider({ children }: { children: ReactNode }) {
    const [gameData, setGameDataState] = useState<GameData>(() => {
        if (typeof window === "undefined") {
            return createDefaultGameData();
        }

        const savedData = window.localStorage.getItem(GAME_DATA_STORAGE_KEY);
        if (!savedData) {
            return createDefaultGameData();
        }

        try {
            return normalizeGameData(JSON.parse(savedData));
        } catch (error) {
            console.error("Failed to parse saved game data:", error);
            return createDefaultGameData();
        }
    });

    const setGameData = (data: GameData) => {
        setGameDataState(normalizeGameData(data));
    };

    // Save game data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(GAME_DATA_STORAGE_KEY, JSON.stringify(gameData));
    }, [gameData]);

    // Reset game (mark all questions as unused)
    const resetGame = () => {
        const resetData = {
            ...gameData,
            categories: gameData.categories.map((category) => ({
                ...category,
                questions: category.questions.map((question) => ({
                    ...question,
                    used: false,
                })),
            })),
        };
        setGameData(resetData);
    };

    // Mark a question as used
    const markQuestionAsUsed = (
        categoryIndex: number,
        questionIndex: number
    ) => {
        const category = gameData.categories[categoryIndex];
        const question = category?.questions[questionIndex];
        if (question) {
            const updatedCategories = gameData.categories.map(
                (currentCategory, currentCategoryIndex) => ({
                    ...currentCategory,
                    questions: currentCategory.questions.map(
                        (currentQuestion, currentQuestionIndex) =>
                            currentCategoryIndex === categoryIndex &&
                            currentQuestionIndex === questionIndex
                                ? { ...currentQuestion, used: true }
                                : currentQuestion
                    ),
                })
            );

            setGameDataState({
                ...gameData,
                categories: updatedCategories,
            });
        }
    };

    // Update game settings
    const updateGameSettings = (settings: Partial<GameSettings>) => {
        setGameData({
            ...gameData,
            settings: {
                ...gameData.settings,
                ...settings,
            },
        });
    };

    // Update Final Jeopardy
    const updateFinalJeopardy = (
        category: string,
        question: string,
        answer: string
    ) => {
        setGameData({
            ...gameData,
            settings: {
                ...gameData.settings,
                finalJeopardyCategory: category,
                finalJeopardyQuestion: question,
                finalJeopardyAnswer: answer,
            },
        });
    };

    return (
        <GameDataContext.Provider
            value={{
                gameData,
                gameSettings: gameData.settings,
                setGameData,
                resetGame,
                markQuestionAsUsed,
                updateGameSettings,
                updateFinalJeopardy,
            }}
        >
            {children}
        </GameDataContext.Provider>
    );
}

// Hook to use the game data context
export function useGameData() {
    const context = useContext(GameDataContext);
    if (context === undefined) {
        throw new Error("useGameData must be used within a GameDataProvider");
    }
    return context;
}
