'use server';
/**
 * @fileOverview Symptom checker flow that provides possible conditions based on user input.
 *
 * - symptomCheckerConditions - A function that takes user symptoms and returns a list of possible conditions.
 * - SymptomCheckerConditionsInput - The input type for the symptomCheckerConditions function.
 * - SymptomCheckerConditionsOutput - The return type for the symptomCheckerConditions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SymptomCheckerConditionsInputSchema = z.object({
  symptoms: z
    .string()
    .describe('A comma-separated list of symptoms experienced by the user.'),
});
export type SymptomCheckerConditionsInput = z.infer<
  typeof SymptomCheckerConditionsInputSchema
>;

const SymptomCheckerConditionsOutputSchema = z.object({
  possibleConditions: z
    .array(z.string())
    .describe('A list of possible medical conditions based on the symptoms.'),
  confidenceScores: z
    .array(z.number())
    .describe(
      'A list of confidence scores (0-1) corresponding to each condition.'
    ),
  nextSteps: z
    .string()
    .describe(
      'Suggested next steps, including when to seek medical attention.'
    ),
});
export type SymptomCheckerConditionsOutput = z.infer<
  typeof SymptomCheckerConditionsOutputSchema
>;

export async function symptomCheckerConditions(
  input: SymptomCheckerConditionsInput
): Promise<SymptomCheckerConditionsOutput> {
  return symptomCheckerConditionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'symptomCheckerConditionsPrompt',
  input: {schema: SymptomCheckerConditionsInputSchema},
  output: {schema: SymptomCheckerConditionsOutputSchema},
  prompt: `You are an AI health assistant. A user will provide a list of symptoms, and you will provide a list of possible conditions, confidence scores (between 0 and 1), and suggest when to seek medical attention.

Symptoms: {{{symptoms}}}

Format your response as a JSON object with 'possibleConditions', 'confidenceScores', and 'nextSteps' fields. Make sure possibleConditions and confidenceScores are arrays of the same length.`,
});

const symptomCheckerConditionsFlow = ai.defineFlow(
  {
    name: 'symptomCheckerConditionsFlow',
    inputSchema: SymptomCheckerConditionsInputSchema,
    outputSchema: SymptomCheckerConditionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
