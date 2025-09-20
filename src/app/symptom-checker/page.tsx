import { SymptomCheckerClient } from '@/components/symptom-checker-client';

export default function SymptomCheckerPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Symptom Checker</h1>
        <p className="mt-2 text-muted-foreground">
          Describe your symptoms below, and our AI will provide potential insights. 
          <strong className="font-semibold text-destructive"> This is not a medical diagnosis.</strong> Always consult a healthcare professional for medical advice.
        </p>
      </div>
      <SymptomCheckerClient />
    </div>
  );
}
