'use server';
/**
 * @fileOverview Generates study materials for a given topic.
 *
 * - generateStudyMaterials - A function that generates study materials for a given topic.
 * - GenerateStudyMaterialsInput - The input type for the generateStudyMaterials function.
 * - GenerateStudyMaterialsOutput - The return type for the generateStudyMaterials function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {search} from '@/services/search';

const GenerateStudyMaterialsInputSchema = z.object({
  topic: z.string().describe('The topic to generate study materials for.'),
});
export type GenerateStudyMaterialsInput = z.infer<typeof GenerateStudyMaterialsInputSchema>;

const GenerateStudyMaterialsOutputSchema = z.object({
  keyConcepts: z.string().describe('Key concepts related to the topic.'),
  detailedDescriptions: z.string().describe('Detailed descriptions of the key concepts.'),
  diagrams: z.string().describe('Descriptions of diagrams related to the topic.'),
  quiz: z.string().describe('A quiz to test knowledge of the topic.'),
  flashcards: z.string().describe('Flashcards for the topic.'),
});
export type GenerateStudyMaterialsOutput = z.infer<typeof GenerateStudyMaterialsOutputSchema>;

export async function generateStudyMaterials(input: GenerateStudyMaterialsInput): Promise<GenerateStudyMaterialsOutput> {
  return generateStudyMaterialsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStudyMaterialsPrompt',
  input: {
    schema: z.object({
      topic: z.string().describe('The topic to generate study materials for.'),
      searchResults: z.string().describe('Search results related to the topic'),
    }),
  },
  output: {
    schema: z.object({
      keyConcepts: z.string().describe('Key concepts related to the topic.'),
      detailedDescriptions: z.string().describe('Detailed descriptions of the key concepts.'),
      diagrams: z.string().describe('Descriptions of diagrams related to the topic.'),
      quiz: z.string().describe('A quiz to test knowledge of the topic.'),
      flashcards: z.string().describe('Flashcards for the topic.'),
    }),
  },
  prompt: `You are an AI study assistant. Generate key concepts, detailed descriptions, diagrams, a quiz, and flashcards for the following topic:

Topic: {{{topic}}}

Here are some search results related to the topic:

{{searchResults}}

Key Concepts:

Detailed Descriptions:

Diagrams:

Quiz:

Flashcards: Create at least 10 flashcards. The flashcards should follow the format "term: definition".`,
});

const generateStudyMaterialsFlow = ai.defineFlow<
  typeof GenerateStudyMaterialsInputSchema,
  typeof GenerateStudyMaterialsOutputSchema
>({
  name: 'generateStudyMaterialsFlow',
  inputSchema: GenerateStudyMaterialsInputSchema,
  outputSchema: GenerateStudyMaterialsOutputSchema,
}, async input => {
  const searchResults = await search(input.topic);
  const searchResultsString = JSON.stringify(searchResults.map(result => result.content));
  const {output} = await prompt({
    topic: input.topic,
    searchResults: searchResultsString,
  });
  return output!;
});
