"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";
import { v4 as uuidv4 } from "uuid";

// Define the game data structure
interface Question {
    id: string;
    value: number;
    question: string;
    answer: string;
    used: boolean;
}

interface Category {
    id: string;
    title: string;
    questions: Question[];
}

interface GameSettings {
    timerEnabled: boolean;
    timerDuration: number;
    finalJeopardyCategory: string;
    finalJeopardyQuestion: string;
    finalJeopardyAnswer: string;
}

interface GameData {
    categories: Category[];
    settings: GameSettings;
}

// Default game data
const defaultGameData: GameData = {
    categories: [
        {
            id: uuidv4(),
            title: "Science",
            questions: [
                {
                    id: uuidv4(),
                    value: 200,
                    question: "This force pulls objects toward the Earth",
                    answer: "What is gravity?",
                    used: false,
                },
                {
                    id: uuidv4(),
                    value: 400,
                    question: "The chemical symbol for gold",
                    answer: "What is Au?",
                    used: false,
                },
                {
                    id: uuidv4(),
                    value: 600,
                    question: "The closest planet to the Sun",
                    answer: "What is Mercury?",
                    used: false,
                },
                {
                    id: uuidv4(),
                    value: 800,
                    question:
                        "The process by which plants make food using sunlight",
                    answer: "What is photosynthesis?",
                    used: false,
                },
                {
                    id: uuidv4(),
                    value: 1000,
                    question:
                        "This scientist developed the theory of relativity",
                    answer: "Who is Albert Einstein?",
                    used: false,
                },
            ],
        },
        {
            id: uuidv4(),
            title: "History",
            questions: [
                {
                    id: uuidv4(),
                    value: 200,
                    question: "Year the Declaration of Independence was signed",
                    answer: "What is 1776?",
                    used: false,
                },
                {
                    id: uuidv4(),
                    value: 400,
                    question:
                        "This Egyptian queen was known for her relationship with Mark Antony",
                    answer: "Who is Cleopatra?",
                    used: false,
                },
                {
                    id: uuidv4(),
                    value: 600,
                    question: "The Berlin Wall fell in this year",
                    answer: "What is 1989?",
                    used: false,
                },
                {
                    id: uuidv4(),
                    value: 800,
                    question:
                        "This U.S. President delivered the Gettysburg Address",
                    answer: "Who is Abraham Lincoln?",
                    used: false,
                },
                {
                    id: uuidv4(),
                    value: 1000,
                    question:
                        "The ancient city that was destroyed by Mount Vesuvius",
                    answer: "What is Pompeii?",
                    used: false,
                },
            ],
        },
        {
            id: uuidv4(),
            title: "Pop Culture",
            questions: [
                {
                    id: uuidv4(),
                    value: 200,
                    question: "This 'King of Pop' sang 'Thriller'",
                    answer: "Who is Michael Jackson?",
                    used: false,
                },
                {
                    id: uuidv4(),
                    value: 400,
                    question:
                        "The number of films in the original Star Wars trilogy",
                    answer: "What is 3?",
                    used: false,
                },
                {
                    id: uuidv4(),
                    value: 600,
                    question:
                        "This TV show features characters named Ross, Rachel, and Joey",
                    answer: "What is Friends?",
                    used: false,
                },
                {
                    id: uuidv4(),
                    value: 800,
                    question: "This superhero is known as the 'Man of Steel'",
                    answer: "Who is Superman?",
                    used: false,
                },
                {
                    id: uuidv4(),
                    value: 1000,
                    question: "The artist who painted 'Starry Night'",
                    answer: "Who is Vincent van Gogh?",
                    used: false,
                },
            ],
        },
        {
            id: uuidv4(),
            title: "Geography",
            questions: [
                {
                    id: uuidv4(),
                    value: 200,
                    question: "The largest ocean on Earth",
                    answer: "What is the Pacific Ocean?",
                    used: false,
                },
                {
                    id: uuidv4(),
                    value: 400,
                    question:
                        "This country is known as the 'Land of the Rising Sun'",
                    answer: "What is Japan?",
                    used: false,
                },
                {
                    id: uuidv4(),
                    value: 600,
                    question: "The longest river in the world",
                    answer: "What is the Nile?",
                    used: false,
                },
                {
                    id: uuidv4(),
                    value: 800,
                    question: "This mountain is the tallest in the world",
                    answer: "What is Mount Everest?",
                    used: false,
                },
                {
                    id: uuidv4(),
                    value: 1000,
                    question: "The capital city of Australia",
                    answer: "What is Canberra?",
                    used: false,
                },
            ],
        },
        {
            id: uuidv4(),
            title: "Sports",
            questions: [
                {
                    id: uuidv4(),
                    value: 200,
                    question: "The number of players on a standard soccer team",
                    answer: "What is 11?",
                    used: false,
                },
                {
                    id: uuidv4(),
                    value: 400,
                    question: "This sport uses a shuttlecock",
                    answer: "What is badminton?",
                    used: false,
                },
                {
                    id: uuidv4(),
                    value: 600,
                    question: "The city that hosted the 2016 Summer Olympics",
                    answer: "What is Rio de Janeiro?",
                    used: false,
                },
                {
                    id: uuidv4(),
                    value: 800,
                    question:
                        "The number of points scored for a touchdown in American football",
                    answer: "What is 6?",
                    used: false,
                },
                {
                    id: uuidv4(),
                    value: 1000,
                    question: "This boxer was known as 'The Greatest'",
                    answer: "Who is Muhammad Ali?",
                    used: false,
                },
            ],
        },
    ],
    settings: {
        timerEnabled: true,
        timerDuration: 15,
        finalJeopardyCategory: "Famous Quotes",
        finalJeopardyQuestion:
            "This Shakespeare character said, 'To be, or not to be: that is the question'",
        finalJeopardyAnswer: "Who is Hamlet?",
    },
};

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
    const [gameData, setGameData] = useState<GameData>(defaultGameData);

    // Load game data from localStorage on initial render
    useEffect(() => {
        const savedData = localStorage.getItem("jeopardyGameData");
        if (savedData) {
            try {
                setGameData(JSON.parse(savedData));
            } catch (error) {
                console.error("Failed to parse saved game data:", error);
            }
        }
    }, []);

    // Save game data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("jeopardyGameData", JSON.stringify(gameData));
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
        const updatedCategories = [...gameData.categories];
        if (updatedCategories[categoryIndex]?.questions[questionIndex]) {
            updatedCategories[categoryIndex].questions[questionIndex].used =
                true;
            setGameData({
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
