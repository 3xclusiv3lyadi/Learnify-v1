'use server';

/**
 * @fileOverview An AI agent that chats with the user via Gemini.
 *
 * - chatWithGemini - A function that handles the chat process.
 * - ChatWithGeminiInput - The input type for the chatWithGemini function.
 * - ChatWithGeminiOutput - The return type for the chatWithGemini function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ChatWithGeminiInputSchema = z.object({
  message: z.string().describe('The user\'s message to the chatbot.'),
});
export type ChatWithGeminiInput = z.infer<typeof ChatWithGeminiInputSchema>;

const ChatWithGeminiOutputSchema = z.object({
  response: z.string().describe('The chatbot\'s response to the user.'),
});
export type ChatWithGeminiOutput = z.infer<typeof ChatWithGeminiOutputSchema>;

export async function chatWithGemini(input: ChatWithGeminiInput): Promise<ChatWithGeminiOutput> {
  return chatWithGeminiFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatWithGeminiPrompt',
  input: {
    schema: z.object({
      message: z.string().describe('The user\'s message to the chatbot.'),
    }),
  },
  output: {
    schema: z.object({
      response: z.string().describe('The chatbot\'s response to the user.'),
    }),
  },
  prompt: `You are Learnify's AI chatbot, Pixie.  Respond to the following message from the user:

Message: {{{message}}}

Response:`,
});

const chatWithGeminiFlow = ai.defineFlow<
  typeof ChatWithGeminiInputSchema,
  typeof ChatWithGeminiOutputSchema
>({
  name: 'chatWithGeminiFlow',
  inputSchema: ChatWithGeminiInputSchema,
  outputSchema: ChatWithGeminiOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
