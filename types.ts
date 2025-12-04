export enum QuestionType {
  MCQ = 'Multiple Choice',
  SUBJECTIVE = 'Subjective',
  CODING = 'Coding Problem',
  CASE_STUDY = 'Case Study',
  TRUE_FALSE = 'True/False'
}

export enum BloomLevel {
  REMEMBER = 'Remember',
  UNDERSTAND = 'Understand',
  APPLY = 'Apply',
  ANALYZE = 'Analyze',
  EVALUATE = 'Evaluate',
  CREATE = 'Create'
}

export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard'
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  difficulty: Difficulty;
  bloomLevel: BloomLevel;
  marks: number;
  options?: string[]; // For MCQ
  answer?: string; // Model answer
  starterCode?: string; // For Coding
  tags: string[];
}

export interface PaperConfiguration {
  subject: string;
  topics: string[];
  bloomDistribution: BloomLevel[];
  difficultyDist: { easy: number; medium: number; hard: number };
  questionTypes: QuestionType[];
  totalMarks: number;
  variantCount: number;
}

export interface GeneratedPaper {
  id: string;
  title: string;
  questions: Question[];
  createdAt: string;
  config: PaperConfiguration;
}

export interface AIResponseSchema {
  questions: {
    text: string;
    type: string;
    difficulty: string;
    bloomLevel: string;
    marks: number;
    options?: string[];
    answer: string;
    starterCode?: string;
  }[];
}