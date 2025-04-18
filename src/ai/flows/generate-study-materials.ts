'use server';
/**
 * @fileOverview Generates study materials for a given topic or document content.
 *
 * - generateStudyMaterials - A function that generates study materials for a given topic or document.
 * - GenerateStudyMaterialsInput - The input type for the generateStudyMaterials function.
 * - GenerateStudyMaterialsOutput - The return type for the generateStudyMaterials function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {search} from '@/services/search';

const GenerateStudyMaterialsInputSchema = z.object({
  topic: z.string().optional().describe('The topic to generate study materials for.'),
  documentContent: z.string().optional().describe('The content of the document to generate study materials for.'),
}).refine(data => data.topic || data.documentContent, {
  message: "Either topic or documentContent must be provided.",
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
      topic: z.string().optional().describe('The topic to generate study materials for.'),
      documentContent: z.string().optional().describe('The content of the document to summarize.'),
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
  prompt: `You are an AI study assistant. Generate key concepts, detailed descriptions, diagrams, a quiz, and flashcards for the following topic or document content:

  {{#if topic}}
  Topic: {{{topic}}}
  {{else}}
  Document Content: {{{documentContent}}}
  {{/if}}

  Here are some search results related to the topic:

  {{searchResults}}

  Key Concepts:

  Detailed Descriptions:
  {{#if topic}}
    {{#eq topic "Mathematics"}}
      Include equations, and detailed steps if possible.
    {{/eq}}
  {{/if}}

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
  let searchResultsString = '';
  if (input.topic) {
    const searchResults = await search(input.topic);
    searchResultsString = JSON.stringify(searchResults.map(result => result.content));
  }

  const {output} = await prompt({
    topic: input.topic,
    documentContent: input.documentContent,
    searchResults: searchResultsString,
  });
  return output!;
});
