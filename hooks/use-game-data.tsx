"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
    createDefaultGameData,
    createDefaultTeams,
    GAME_DATA_STORAGE_KEY,
    normalizeGameData,
    normalizeTeams,
    TEAM_STORAGE_KEY,
    type GameData,
    type GameSettings,
    type Team,
} from "@/lib/game-data";

// Create context
const GameDataContext = createContext<
    | {
          gameData: GameData;
          gameSettings: GameSettings;
          teams: Team[];
          setGameData: (data: GameData) => void;
          setTeams: (teams: Team[]) => void;
          resetGame: () => void;
          markQuestionAsUsed: (
              categoryIndex: number,
              questionIndex: number
          ) => void;
          updateGameSettings: (settings: Partial<GameSettings>) => void;
          updateFinalJeopardy: (
              category: string,
              question: string,
              answer: string,
              questionImage?: string,
              answerImage?: string
          ) => void;
          updateTeamScore: (teamId: number, amount: number) => void;
          dailyDoubleId: string | null;
      }
    | undefined
>(undefined);

// Provider component
export function GameDataProvider({ children }: { children: ReactNode }) {
    const [hasMounted, setHasMounted] = useState(false);
    const [gameData, setGameDataState] = useState<GameData>(createDefaultGameData());
    const [teams, setTeamsState] = useState<Team[]>(createDefaultTeams());
    const [dailyDoubleId, setDailyDoubleId] = useState<string | null>(null);

    // Load data from localStorage on mount
    useEffect(() => {
        const savedData = window.localStorage.getItem(GAME_DATA_STORAGE_KEY);
        if (savedData) {
            try {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setGameDataState(normalizeGameData(JSON.parse(savedData)));
            } catch (error) {
                console.error("Failed to parse saved game data:", error);
            }
        }

        const savedTeams = window.localStorage.getItem(TEAM_STORAGE_KEY);
        if (savedTeams) {
            try {
                setTeamsState(normalizeTeams(JSON.parse(savedTeams)));
            } catch (error) {
                console.error("Failed to parse saved team data:", error);
            }
        }

        const savedDailyDouble = window.localStorage.getItem("jeopardyDailyDoubleId");
        if (savedDailyDouble) {
            setDailyDoubleId(savedDailyDouble);
        }

        setHasMounted(true);
    }, []);

    const setGameData = (data: GameData) => {
        setGameDataState(normalizeGameData(data));
    };

    const setTeams = (newTeams: Team[]) => {
        setTeamsState(normalizeTeams(newTeams));
    };

    // Save game data to localStorage whenever it changes
    useEffect(() => {
        if (hasMounted) {
            localStorage.setItem(GAME_DATA_STORAGE_KEY, JSON.stringify(gameData));
        }
    }, [gameData, hasMounted]);

    // Save teams to localStorage whenever they change
    useEffect(() => {
        if (hasMounted) {
            localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(teams));
        }
    }, [teams, hasMounted]);

    // Save daily double ID to localStorage
    useEffect(() => {
        if (hasMounted && dailyDoubleId) {
            localStorage.setItem("jeopardyDailyDoubleId", dailyDoubleId);
        }
    }, [dailyDoubleId, hasMounted]);

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

        // Assign a new random Daily Double
        const allQuestionIds: string[] = [];
        resetData.categories.forEach((category) => {
            category.questions.forEach((question) => {
                if (question.id) {
                    allQuestionIds.push(question.id);
                }
            });
        });

        if (allQuestionIds.length > 0) {
            const randomIndex = Math.floor(Math.random() * allQuestionIds.length);
            setDailyDoubleId(allQuestionIds[randomIndex]);
        }
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
        answer: string,
        questionImage?: string,
        answerImage?: string
    ) => {
        setGameData({
            ...gameData,
            settings: {
                ...gameData.settings,
                finalJeopardyCategory: category,
                finalJeopardyQuestion: question,
                finalJeopardyAnswer: answer,
                finalJeopardyQuestionImage: questionImage,
                finalJeopardyAnswerImage: answerImage,
            },
        });
    };

    const updateTeamScore = (teamId: number, amount: number) => {
        setTeamsState((currentTeams) =>
            currentTeams.map((team) =>
                team.id === teamId
                    ? { ...team, score: team.score + amount }
                    : team
            )
        );
    };

    return (
        <GameDataContext.Provider
            value={{
                gameData,
                gameSettings: gameData.settings,
                teams,
                setGameData,
                setTeams,
                resetGame,
                markQuestionAsUsed,
                updateGameSettings,
                updateFinalJeopardy,
                updateTeamScore,
                dailyDoubleId,
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
