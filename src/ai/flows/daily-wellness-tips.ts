'use server';

/**
 * @fileOverview AI-powered daily health and wellness tips generator.
 *
 * - generateDailyWellnessTips - A function that generates daily health and wellness tips.
 * - GenerateDailyWellnessTipsInput - The input type for the generateDailyWellnessTips function.
 * - GenerateDailyWellnessTipsOutput - The return type for the generateDailyWellnessTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDailyWellnessTipsInputSchema = z.object({
  userPreferences: z
    .string()
    .optional()
    .describe('Optional preferences of the user to personalize tips.'),
});
export type GenerateDailyWellnessTipsInput = z.infer<
  typeof GenerateDailyWellnessTipsInputSchema
>;

const GenerateDailyWellnessTipsOutputSchema = z.object({
  tip: z.string().describe('A daily health and wellness tip.'),
  citation: z
    .string()
    .optional()
    .describe('Source or citation for the wellness tip.'),
});
export type GenerateDailyWellnessTipsOutput = z.infer<
  typeof GenerateDailyWellnessTipsOutputSchema
>;

export async function generateDailyWellnessTips(
  input: GenerateDailyWellnessTipsInput
): Promise<GenerateDailyWellnessTipsOutput> {
  return generateDailyWellnessTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dailyWellnessTipPrompt',
  input: {schema: GenerateDailyWellnessTipsInputSchema},
  output: {schema: GenerateDailyWellnessTipsOutputSchema},
  prompt: `You are a wellness expert providing daily health and wellness tips.

  Generate a concise and actionable health and wellness tip for the user.
  Include a citation if the tip is based on a specific study or recommendation.

  {{#if userPreferences}}
  The user has the following preferences: {{{userPreferences}}}
  Please generate tips that are relevant to these preferences.
  {{/if}}
  `,
});

const generateDailyWellnessTipsFlow = ai.defineFlow(
  {
    name: 'generateDailyWellnessTipsFlow',
    inputSchema: GenerateDailyWellnessTipsInputSchema,
    outputSchema: GenerateDailyWellnessTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
