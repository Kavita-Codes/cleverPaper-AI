import { GoogleGenAI, Type } from "@google/genai";
import { PaperConfiguration, Question, QuestionType, Difficulty, BloomLevel } from '../types';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateExamPaper = async (config: PaperConfiguration): Promise<Question[]> => {
  const modelId = "gemini-2.5-flash"; // Efficient for structured tasks
  
  const prompt = `
    Act as an expert academic exam creator.
    Create a question paper for the subject: "${config.subject}".
    Topics covered: ${config.topics.join(', ')}.
    
    Requirements:
    - Total Marks: ${config.totalMarks}
    - Difficulty Distribution: ${config.difficultyDist.easy}% Easy, ${config.difficultyDist.medium}% Medium, ${config.difficultyDist.hard}% Hard.
    - Question Types to include: ${config.questionTypes.join(', ')}.
    - Bloom's Taxonomy Levels to focus on: ${config.bloomDistribution.join(', ')}.
    
    Ensure questions are unique, academic, and non-repetitive.
    For MCQs, provide 4 options.
    For Coding, provide a starter code snippet if applicable.
    Provide a concise model answer for the answer key.
    
    Return the output strictly as a JSON array of objects fitting the schema.
  `;

  // Define the expected schema for strict JSON generation
  const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        text: { type: Type.STRING, description: "The question text" },
        type: { type: Type.STRING, description: "One of: Multiple Choice, Subjective, Coding Problem, Case Study, True/False" },
        difficulty: { type: Type.STRING, description: "Easy, Medium, or Hard" },
        bloomLevel: { type: Type.STRING, description: "Bloom level (e.g., Remember, Apply)" },
        marks: { type: Type.INTEGER, description: "Marks allocated" },
        options: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING },
          description: "Options for MCQs (empty if not MCQ)"
        },
        answer: { type: Type.STRING, description: "Correct answer or model solution" },
        starterCode: { type: Type.STRING, description: "Initial code block for coding questions (optional)" }
      },
      required: ["text", "type", "difficulty", "bloomLevel", "marks", "answer"],
    },
  };

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7, // Creativity balanced with structure
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const rawQuestions = JSON.parse(text);

    // Map raw response to internal Question interface with IDs
    const questions: Question[] = rawQuestions.map((q: any, index: number) => ({
      id: `q-${Date.now()}-${index}`,
      text: q.text,
      type: mapType(q.type),
      difficulty: mapDifficulty(q.difficulty),
      bloomLevel: mapBloom(q.bloomLevel),
      marks: q.marks,
      options: q.options || [],
      answer: q.answer,
      starterCode: q.starterCode,
      tags: [config.subject, q.difficulty]
    }));

    return questions;

  } catch (error) {
    console.error("AI Generation Failed:", error);
    throw error;
  }
};

// Helper mappers to ensure type safety if AI returns slightly off strings
const mapType = (t: string): QuestionType => {
  if (t.toLowerCase().includes('multiple')) return QuestionType.MCQ;
  if (t.toLowerCase().includes('coding')) return QuestionType.CODING;
  if (t.toLowerCase().includes('case')) return QuestionType.CASE_STUDY;
  if (t.toLowerCase().includes('true')) return QuestionType.TRUE_FALSE;
  return QuestionType.SUBJECTIVE;
};

const mapDifficulty = (d: string): Difficulty => {
  const lower = d.toLowerCase();
  if (lower.includes('easy')) return Difficulty.EASY;
  if (lower.includes('hard')) return Difficulty.HARD;
  return Difficulty.MEDIUM;
};

const mapBloom = (b: string): BloomLevel => {
  // Simplified mapping, fallback to Understand
  const values = Object.values(BloomLevel);
  const found = values.find(v => b.toLowerCase().includes(v.toLowerCase()));
  return found || BloomLevel.UNDERSTAND;
};
