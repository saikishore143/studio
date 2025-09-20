// SymptomChecker_SuggestWhenToSeekAttention story implementation.
'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting when a user should seek medical attention based on their symptoms.
 *
 * - suggestWhenToSeekAttention - A function that takes a list of symptoms and suggests when to seek medical attention.
 * - SuggestWhenToSeekAttentionInput - The input type for the suggestWhenToSeekAttention function, which is a list of symptoms.
 * - SuggestWhenToSeekAttentionOutput - The output type for the suggestWhenToSeekAttention function, which includes a suggestion on when to seek medical attention.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestWhenToSeekAttentionInputSchema = z.object({
  symptoms: z.string().describe('A comma-separated list of symptoms the user is experiencing.'),
  possibleConditions: z.string().describe('A comma-separated list of possible conditions based on the symptoms.'),
});
export type SuggestWhenToSeekAttentionInput = z.infer<typeof SuggestWhenToSeekAttentionInputSchema>;

const SuggestWhenToSeekAttentionOutputSchema = z.object({
  suggestion: z.string().describe('A suggestion on when the user should seek medical attention based on their symptoms and possible conditions.'),
});
export type SuggestWhenToSeekAttentionOutput = z.infer<typeof SuggestWhenToSeekAttentionOutputSchema>;

export async function suggestWhenToSeekAttention(input: SuggestWhenToSeekAttentionInput): Promise<SuggestWhenToSeekAttentionOutput> {
  return suggestWhenToSeekAttentionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestWhenToSeekAttentionPrompt',
  input: {
    schema: SuggestWhenToSeekAttentionInputSchema,
  },
  output: {
    schema: SuggestWhenToSeekAttentionOutputSchema,
  },
  prompt: `Given the following symptoms: {{{symptoms}}}, and the possible conditions: {{{possibleConditions}}}, suggest when the user should seek medical attention. Be specific and provide clear guidance. Return the suggestion in a single sentence.
`,
});

const suggestWhenToSeekAttentionFlow = ai.defineFlow({
    name: 'suggestWhenToSeekAttentionFlow',
    inputSchema: SuggestWhenToSeekAttentionInputSchema,
    outputSchema: SuggestWhenToSeekAttentionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
