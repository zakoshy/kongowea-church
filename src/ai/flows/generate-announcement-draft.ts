'use server';
/**
 * @fileOverview AI-powered tool to auto-generate initial drafts for church announcements based on simple user prompts.
 *
 * - generateAnnouncementDraft - A function that handles the announcement generation process.
 * - GenerateAnnouncementDraftInput - The input type for the generateAnnouncementDraft function.
 * - GenerateAnnouncementDraftOutput - The return type for the generateAnnouncementDraft function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAnnouncementDraftInputSchema = z.object({
  prompt: z.string().describe('A prompt describing the announcement to be generated.'),
});
export type GenerateAnnouncementDraftInput = z.infer<typeof GenerateAnnouncementDraftInputSchema>;

const GenerateAnnouncementDraftOutputSchema = z.object({
  draft: z.string().describe('The generated announcement draft.'),
});
export type GenerateAnnouncementDraftOutput = z.infer<typeof GenerateAnnouncementDraftOutputSchema>;

export async function generateAnnouncementDraft(input: GenerateAnnouncementDraftInput): Promise<GenerateAnnouncementDraftOutput> {
  return generateAnnouncementDraftFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAnnouncementDraftPrompt',
  input: {schema: GenerateAnnouncementDraftInputSchema},
  output: {schema: GenerateAnnouncementDraftOutputSchema},
  prompt: `You are an AI assistant specialized in drafting announcements for Our Lady of Fatima Kongowea Church.  Please generate a draft announcement based on the following prompt: {{{prompt}}}`,
});

const generateAnnouncementDraftFlow = ai.defineFlow(
  {
    name: 'generateAnnouncementDraftFlow',
    inputSchema: GenerateAnnouncementDraftInputSchema,
    outputSchema: GenerateAnnouncementDraftOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
