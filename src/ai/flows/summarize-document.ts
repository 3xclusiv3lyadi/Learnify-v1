'use server';
/**
 * @fileOverview Summarizes a document, identifies key concepts, generates internal links, and creates quizzes and flashcards.
 *
 * - summarizeDocument - A function that handles the document summarization process.
 * - SummarizeDocumentInput - The input type for the summarizeDocument function.
 * - SummarizeDocumentOutput - The return type for the summarizeDocument function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {SearchResult, processDocument} from '@/services/search';

const SummarizeDocumentInputSchema = z.object({
  file: z.any().refine(file => file instanceof File, {message: 'Must be a file'}),
});

export type SummarizeDocumentInput = z.infer<typeof SummarizeDocumentInputSchema>;

const SummarizeDocumentOutputSchema = z.object({
  summary: z.string().describe('A summary of the document.'),
  keyConcepts: z.array(z.string()).describe('Key concepts identified in the document.'),
  internalLinks: z.array(z.object({
    concept: z.string().describe('The concept being linked to.'),
    description: z.string().describe('A detailed description of the concept.'),
  })).describe('Internal links to detailed descriptions and diagrams.'),
  quizQuestions: z.array(z.string()).describe('Quiz questions generated from the document.'),
  flashcards: z.array(z.object({
    front: z.string().describe('The front of the flashcard.'),
    back: z.string().describe('The back of the flashcard.'),
  })).describe('Flashcards generated from the document.'),
});

export type SummarizeDocumentOutput = z.infer<typeof SummarizeDocumentOutputSchema>;

export async function summarizeDocument(input: SummarizeDocumentInput): Promise<SummarizeDocumentOutput> {
  return summarizeDocumentFlow(input);
}

const summarizeDocumentPrompt = ai.definePrompt({
  name: 'summarizeDocumentPrompt',
  input: {
    schema: z.object({
      documentContent: z.string().describe('The content of the document to summarize.'),
    }),
  },
  output: {
    schema: SummarizeDocumentOutputSchema,
  },
  prompt: `You are an AI assistant that helps students learn from documents.

  Summarize the key concepts in the following document. Create internal links to detailed descriptions and diagrams for each concept. Generate quiz questions and flashcards to help the student learn the material.

  Document Content:
  {{documentContent}}

  Your response should include:
  - A summary of the document.
  - A list of key concepts.
  - Internal links to detailed descriptions and diagrams for each concept.
  - Quiz questions.
  - Flashcards.
  Follow the schema for output.`, // Ensure output matches schema
});

const summarizeDocumentFlow = ai.defineFlow<
  typeof SummarizeDocumentInputSchema,
  typeof SummarizeDocumentOutputSchema
>({
  name: 'summarizeDocumentFlow',
  inputSchema: SummarizeDocumentInputSchema,
  outputSchema: SummarizeDocumentOutputSchema,
}, async input => {
  const searchResult: SearchResult = await processDocument(input.file);
  const {output} = await summarizeDocumentPrompt({
    documentContent: searchResult.content,
  });
  return output!;
});

