'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { AlertTriangle, Bot, Loader2, Sparkles } from 'lucide-react';

import { checkSymptoms, type FormState } from '@/app/symptom-checker/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from './ui/separator';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Analyze Symptoms
        </>
      )}
    </Button>
  );
}

export function SymptomCheckerClient() {
  const initialState: FormState = null;
  const [state, formAction] = useFormState(checkSymptoms, initialState);

  return (
    <div className="space-y-8">
      <form action={formAction} className="space-y-4">
        <Textarea
          name="symptoms"
          placeholder="e.g., 'I have a sore throat, headache, and a slight fever for two days.'"
          rows={5}
          required
          className="resize-none"
        />
        <SubmitButton />
      </form>

      {state && (
        <Card className="overflow-hidden">
          <CardHeader className="bg-muted/30">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-6 w-6" />
              AI Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {!state.analysis ? (
               <Alert variant="destructive">
                 <AlertTriangle className="h-4 w-4" />
                 <AlertTitle>Analysis Failed</AlertTitle>
                 <AlertDescription>{state.message}</AlertDescription>
               </Alert>
            ) : (
              <div className="space-y-6">
                <Alert variant="default" className="border-accent bg-accent/20">
                  <AlertTriangle className="h-4 w-4 text-accent-foreground" />
                  <AlertTitle className="font-semibold text-accent-foreground">Medical Attention Suggestion</AlertTitle>
                  <AlertDescription className="text-accent-foreground/90">
                    {state.analysis.attentionSuggestion}
                  </AlertDescription>
                </Alert>

                <Separator />
                
                <div>
                  <h3 className="mb-4 text-lg font-semibold">Possible Conditions</h3>
                  <div className="space-y-4">
                    {state.analysis.possibleConditions.map((condition) => (
                      <div key={condition.name}>
                        <div className="mb-1 flex justify-between text-sm">
                          <p className="font-medium">{condition.name}</p>
                          <p className="text-muted-foreground">{Math.round(condition.confidence * 100)}% Confidence</p>
                        </div>
                        <Progress value={condition.confidence * 100} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
