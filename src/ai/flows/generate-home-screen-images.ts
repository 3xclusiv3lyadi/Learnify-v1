'use server';

/**
 * @fileOverview Generates AI images for the home screen featuring students and subjects.
 *
 * - generateHomeScreenImages - A function that generates images for the home screen.
 * - GenerateHomeScreenImagesInput - The input type for the generateHomeScreenImages function.
 * - GenerateHomeScreenImagesOutput - The return type for the generateHomeScreenImages function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateHomeScreenImagesInputSchema = z.object({
  subjects: z
    .array(z.string())
    .describe(
      'A list of subjects to generate images for (e.g., Physics, Chemistry, Computer Science).'
    ),
});
export type GenerateHomeScreenImagesInput = z.infer<
  typeof GenerateHomeScreenImagesInputSchema
>;

const GenerateHomeScreenImagesOutputSchema = z.object({
  imageUrls: z.record(z.string()).describe('A map of subject to image URL.'),
});
export type GenerateHomeScreenImagesOutput = z.infer<
  typeof GenerateHomeScreenImagesOutputSchema
>;

export async function generateHomeScreenImages(
  input: GenerateHomeScreenImagesInput
): Promise<GenerateHomeScreenImagesOutput> {
  return generateHomeScreenImagesFlow(input);
}

const generateImagePrompt = ai.definePrompt({
  name: 'generateImagePrompt',
  input: {
    schema: z.object({
      subject: z.string().describe('The subject to generate an image for.'),
    }),
  },
  output: {
    schema: z.object({
      imageUrl: z.string().describe('The URL of the generated image.'),
    }),
  },
  prompt: `Generate a visually appealing image of students studying {{subject}}. The image should be suitable for use on the home screen of a study app. Return the URL of the image.

Output:
`,
});

const generateHomeScreenImagesFlow = ai.defineFlow<
  typeof GenerateHomeScreenImagesInputSchema,
  typeof GenerateHomeScreenImagesOutputSchema
>(
  {
    name: 'generateHomeScreenImagesFlow',
    inputSchema: GenerateHomeScreenImagesInputSchema,
    outputSchema: GenerateHomeScreenImagesOutputSchema,
  },
  async input => {
    const imageUrls: Record<string, string> = {};
    for (const subject of input.subjects) {
      const {output} = await generateImagePrompt({subject});
      imageUrls[subject] = output!.imageUrl;
    }

    return {imageUrls};
  }
);

