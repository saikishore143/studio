import { History } from 'lucide-react';

export default function PatientHistoryPage() {
  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col items-center justify-center rounded-lg bg-card text-center">
      <History className="h-16 w-16 text-muted-foreground" />
      <h1 className="mt-6 text-2xl font-semibold">
        Patient History Coming Soon
      </h1>
      <p className="mt-2 max-w-sm text-muted-foreground">
        We are working on a feature to help you track your medical history, appointments, and reports all in one place. Stay tuned!
      </p>
    </div>
  );
}
