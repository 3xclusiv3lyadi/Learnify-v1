'use server';
/**
 * @fileOverview Generates quiz questions for a given topic.
 *
 * - generateQuiz - A function that generates quiz questions for a given topic.
 * - GenerateQuizInput - The input type for the generateQuiz function.
 * - GenerateQuizOutput - The return type for the generateQuiz function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateQuizInputSchema = z.object({
  topic: z.string().describe('The topic to generate quiz questions for.'),
});
export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

const GenerateQuizOutputSchema = z.object({
  quizQuestions: z.array(z.object({
    question: z.string().describe('The quiz question.'),
    options: z.array(z.string()).describe('The multiple-choice options for the question.'),
    correctAnswer: z.string().describe('The correct answer to the question.'),
  })).describe('The generated quiz questions.'),
});
export type GenerateQuizOutput = z.infer<typeof GenerateQuizOutputSchema>;

export async function generateQuiz(input: GenerateQuizInput): Promise<GenerateQuizOutput> {
  return generateQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  input: {
    schema: z.object({
      topic: z.string().describe('The topic to generate quiz questions for.'),
    }),
  },
  output: {
    schema: GenerateQuizOutputSchema,
  },
  prompt: `You are an AI quiz generator. Generate 5 multiple-choice quiz questions for the following topic:

Topic: {{{topic}}}

Each question should have 4 options, and clearly indicate the correct answer.

Output:`,
});

const generateQuizFlow = ai.defineFlow<
  typeof GenerateQuizInputSchema,
  typeof GenerateQuizOutputSchema
>({
  name: 'generateQuizFlow',
  inputSchema: GenerateQuizInputSchema,
  outputSchema: GenerateQuizOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
