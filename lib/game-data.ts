import { v4 as uuidv4 } from "uuid";

export interface Question {
    id: string;
    value: number;
    question: string;
    questionImage?: string;
    answer: string;
    answerImage?: string;
    used: boolean;
}

export interface Category {
    id: string;
    title: string;
    questions: Question[];
}

export interface GameSettings {
    timerEnabled: boolean;
    timerDuration: number;
    finalJeopardyCategory: string;
    finalJeopardyQuestion: string;
    finalJeopardyQuestionImage?: string;
    finalJeopardyAnswer: string;
    finalJeopardyAnswerImage?: string;
}

export interface GameData {
    categories: Category[];
    settings: GameSettings;
}

export interface Team {
    id: number;
    name: string;
    score: number;
}

export const GAME_DATA_STORAGE_KEY = "jeopardyGameData";
export const TEAM_STORAGE_KEY = "jeopardyTeams";

const defaultSettings: GameSettings = {
    timerEnabled: true,
    timerDuration: 15,
    finalJeopardyCategory: "Famous Quotes",
    finalJeopardyQuestion:
        "This Shakespeare character said, 'To be, or not to be: that is the question'",
    finalJeopardyAnswer: "Who is Hamlet?",
};

const defaultCategories = [
    {
        title: "Science",
        questions: [
            {
                value: 200,
                question: "This force pulls objects toward the Earth",
                answer: "What is gravity?",
            },
            {
                value: 400,
                question: "The chemical symbol for gold",
                answer: "What is Au?",
            },
            {
                value: 600,
                question: "The closest planet to the Sun",
                answer: "What is Mercury?",
            },
            {
                value: 800,
                question:
                    "The process by which plants make food using sunlight",
                answer: "What is photosynthesis?",
            },
            {
                value: 1000,
                question:
                    "This scientist developed the theory of relativity",
                answer: "Who is Albert Einstein?",
            },
        ],
    },
    {
        title: "History",
        questions: [
            {
                value: 200,
                question: "Year the Declaration of Independence was signed",
                answer: "What is 1776?",
            },
            {
                value: 400,
                question:
                    "This Egyptian queen was known for her relationship with Mark Antony",
                answer: "Who is Cleopatra?",
            },
            {
                value: 600,
                question: "The Berlin Wall fell in this year",
                answer: "What is 1989?",
            },
            {
                value: 800,
                question:
                    "This U.S. President delivered the Gettysburg Address",
                answer: "Who is Abraham Lincoln?",
            },
            {
                value: 1000,
                question:
                    "The ancient city that was destroyed by Mount Vesuvius",
                answer: "What is Pompeii?",
            },
        ],
    },
    {
        title: "Pop Culture",
        questions: [
            {
                value: 200,
                question: "This 'King of Pop' sang 'Thriller'",
                answer: "Who is Michael Jackson?",
            },
            {
                value: 400,
                question:
                    "The number of films in the original Star Wars trilogy",
                answer: "What is 3?",
            },
            {
                value: 600,
                question:
                    "This TV show features characters named Ross, Rachel, and Joey",
                answer: "What is Friends?",
            },
            {
                value: 800,
                question: "This superhero is known as the 'Man of Steel'",
                answer: "Who is Superman?",
            },
            {
                value: 1000,
                question: "The artist who painted 'Starry Night'",
                answer: "Who is Vincent van Gogh?",
            },
        ],
    },
    {
        title: "Geography",
        questions: [
            {
                value: 200,
                question: "The largest ocean on Earth",
                answer: "What is the Pacific Ocean?",
            },
            {
                value: 400,
                question:
                    "This country is known as the 'Land of the Rising Sun'",
                answer: "What is Japan?",
            },
            {
                value: 600,
                question: "The longest river in the world",
                answer: "What is the Nile?",
            },
            {
                value: 800,
                question: "This mountain is the tallest in the world",
                answer: "What is Mount Everest?",
            },
            {
                value: 1000,
                question: "The capital city of Australia",
                answer: "What is Canberra?",
            },
        ],
    },
    {
        title: "Sports",
        questions: [
            {
                value: 200,
                question: "The number of players on a standard soccer team",
                answer: "What is 11?",
            },
            {
                value: 400,
                question: "This sport uses a shuttlecock",
                answer: "What is badminton?",
            },
            {
                value: 600,
                question: "The city that hosted the 2016 Summer Olympics",
                answer: "What is Rio de Janeiro?",
            },
            {
                value: 800,
                question:
                    "The number of points scored for a touchdown in American football",
                answer: "What is 6?",
            },
            {
                value: 1000,
                question: "This boxer was known as 'The Greatest'",
                answer: "Who is Muhammad Ali?",
            },
        ],
    },
];

const defaultTeams: Team[] = [
    { id: 1, name: "Team 1", score: 0 },
    { id: 2, name: "Team 2", score: 0 },
];

export function createDefaultTeams(): Team[] {
    return defaultTeams.map((team) => ({ ...team }));
}

export function createDefaultGameData(): GameData {
    return {
        categories: defaultCategories.map((category) => ({
            id: uuidv4(),
            title: category.title,
            questions: category.questions.map((question) => ({
                id: uuidv4(),
                value: question.value,
                question: question.question,
                answer: question.answer,
                used: false,
            })),
        })),
        settings: { ...defaultSettings },
    };
}

export function normalizeGameData(input: unknown): GameData {
    const source = input as Partial<GameData> | undefined;
    const categories = Array.isArray(source?.categories)
        ? source.categories
        : [];

    const normalizedCategories = categories
        .map((category, categoryIndex) =>
            normalizeCategory(category, categoryIndex)
        )
        .filter((category): category is Category => category.questions.length > 0);

    return {
        categories:
            normalizedCategories.length > 0
                ? normalizedCategories
                : createDefaultGameData().categories,
        settings: normalizeSettings(source?.settings),
    };
}

export function normalizeTeams(input: unknown): Team[] {
    const source = Array.isArray(input) ? input : [];
    const teams = source
        .map((team, index) => normalizeTeam(team, index))
        .filter((team): team is Team => team !== null);

    return teams.length > 0 ? teams : createDefaultTeams();
}

function normalizeCategory(input: unknown, categoryIndex: number): Category {
    const source = input as Partial<Category> | undefined;
    const questions = Array.isArray(source?.questions) ? source.questions : [];

    return {
        id: typeof source?.id === "string" && source.id ? source.id : uuidv4(),
        title:
            typeof source?.title === "string" && source.title.trim()
                ? source.title.trim()
                : `Category ${categoryIndex + 1}`,
        questions: questions.map((question, questionIndex) =>
            normalizeQuestion(question, questionIndex)
        ),
    };
}

function normalizeQuestion(input: unknown, questionIndex: number): Question {
    const source = input as Partial<Question> | undefined;
    const fallbackValue = (questionIndex + 1) * 200;
    const value =
        typeof source?.value === "number" && Number.isFinite(source.value)
            ? source.value
            : fallbackValue;

    return {
        id: typeof source?.id === "string" && source.id ? source.id : uuidv4(),
        value,
        question: typeof source?.question === "string" ? source.question : "",
        questionImage: typeof source?.questionImage === "string" ? source.questionImage : undefined,
        answer: typeof source?.answer === "string" ? source.answer : "",
        answerImage: typeof source?.answerImage === "string" ? source.answerImage : undefined,
        used: Boolean(source?.used),
    };
}

function normalizeSettings(input: Partial<GameSettings> | undefined): GameSettings {
    const timerDuration =
        typeof input?.timerDuration === "number" &&
        Number.isFinite(input.timerDuration) &&
        input.timerDuration > 0
            ? input.timerDuration
            : defaultSettings.timerDuration;

    return {
        timerEnabled:
            typeof input?.timerEnabled === "boolean"
                ? input.timerEnabled
                : defaultSettings.timerEnabled,
        timerDuration,
        finalJeopardyCategory:
            typeof input?.finalJeopardyCategory === "string" &&
            input.finalJeopardyCategory.trim()
                ? input.finalJeopardyCategory
                : defaultSettings.finalJeopardyCategory,
        finalJeopardyQuestion:
            typeof input?.finalJeopardyQuestion === "string" &&
            input.finalJeopardyQuestion.trim()
                ? input.finalJeopardyQuestion
                : defaultSettings.finalJeopardyQuestion,
        finalJeopardyQuestionImage: 
            typeof input?.finalJeopardyQuestionImage === "string" ? input.finalJeopardyQuestionImage : undefined,
        finalJeopardyAnswer:
            typeof input?.finalJeopardyAnswer === "string" &&
            input.finalJeopardyAnswer.trim()
                ? input.finalJeopardyAnswer
                : defaultSettings.finalJeopardyAnswer,
        finalJeopardyAnswerImage:
            typeof input?.finalJeopardyAnswerImage === "string" ? input.finalJeopardyAnswerImage : undefined,
    };
}

function normalizeTeam(input: unknown, index: number): Team | null {
    const source = input as Partial<Team> | undefined;
    const name = typeof source?.name === "string" ? source.name.trim() : "";
    if (!name) {
        return null;
    }

    const score =
        typeof source?.score === "number" && Number.isFinite(source.score)
            ? source.score
            : 0;
    const id =
        typeof source?.id === "number" && Number.isFinite(source.id)
            ? source.id
            : index + 1;

    return {
        id,
        name,
        score,
    };
}
