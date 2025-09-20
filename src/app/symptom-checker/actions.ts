'use server';

import { z } from 'zod';
import { symptomCheckerConditions } from '@/ai/flows/symptom-checker-conditions';
import { suggestWhenToSeekAttention } from '@/ai/flows/symptom-checker-attention';

const schema = z.object({
  symptoms: z.string().min(10, { message: 'Please describe your symptoms in more detail.' }),
});

export type FormState = {
  message: string;
  analysis?: {
    possibleConditions: {
      name: string;
      confidence: number;
    }[];
    attentionSuggestion: string;
  };
} | null;

export async function checkSymptoms(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const validatedFields = schema.safeParse({
      symptoms: formData.get('symptoms'),
    });

    if (!validatedFields.success) {
      return {
        message: 'Please describe your symptoms in at least 10 characters.',
      };
    }
    
    const symptoms = validatedFields.data.symptoms;

    const conditionsResult = await symptomCheckerConditions({ symptoms });
    
    if (!conditionsResult || !conditionsResult.possibleConditions || conditionsResult.possibleConditions.length === 0) {
      return { message: 'Could not analyze symptoms. Please try again with a different description.' };
    }

    const attentionResult = await suggestWhenToSeekAttention({
      symptoms: symptoms,
      possibleConditions: conditionsResult.possibleConditions.join(', '),
    });

    const possibleConditions = conditionsResult.possibleConditions.map((condition, index) => ({
      name: condition,
      confidence: conditionsResult.confidenceScores[index] || 0,
    })).sort((a, b) => b.confidence - a.confidence);

    return {
      message: 'Analysis complete.',
      analysis: {
        possibleConditions,
        attentionSuggestion: attentionResult.suggestion,
      },
    };

  } catch (error) {
    console.error(error);
    return { message: 'An unexpected error occurred. Please try again later.' };
  }
}
