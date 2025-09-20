import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const patientHistory = [
  {
    id: 'appt-001',
    date: '2023-10-26',
    doctor: 'Dr. Evelyn Reed',
    reason: 'Annual Check-up',
    diagnosis: 'Normal',
    notes:
      'All vitals are stable. Encouraged to maintain current lifestyle with balanced diet and regular exercise. No new prescriptions needed.',
  },
  {
    id: 'appt-002',
    date: '2023-07-15',
    doctor: 'Dr. Ben Carter',
    reason: 'Sprained Ankle',
    diagnosis: 'Minor Sprain',
    notes:
      'Advised RICE protocol (Rest, Ice, Compression, Elevation). Prescribed over-the-counter pain relievers as needed. Follow-up if pain persists after 2 weeks.',
  },
  {
    id: 'appt-003',
    date: '2023-03-01',
    doctor: 'Dr. Olivia Chen',
    reason: 'Allergy Consultation',
    diagnosis: 'Seasonal Allergies',
    notes:
      'Prescribed antihistamines to be taken as needed during high-pollen seasons. Discussed potential for allergy shots if symptoms worsen.',
  },
  {
    id: 'appt-004',
    date: '2022-10-25',
    doctor: 'Dr. Evelyn Reed',
    reason: 'Annual Check-up',
    diagnosis: 'Normal',
    notes: 'Routine check-up, all clear. Blood work results are excellent.',
  },
  {
    id: 'appt-005',
    date: '2022-06-20',
    doctor: 'Dr. Samuel Jones',
    reason: 'Persistent Cough',
    diagnosis: 'Bronchitis',
    notes:
      'Prescribed a course of antibiotics and recommended use of a humidifier. Symptoms expected to resolve within 7-10 days.',
  },
];

export default function PatientHistoryPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Patient History</h1>
        <p className="mt-2 text-muted-foreground">
          A comprehensive record of your past medical appointments and
          consultations.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appointment Records</CardTitle>
          <CardDescription>
            Review details from your previous medical visits.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Date</TableHead>
                  <TableHead className="w-[180px]">Doctor</TableHead>
                  <TableHead>Reason for Visit</TableHead>
                  <TableHead className="w-[150px]">Diagnosis</TableHead>
                  <TableHead className="hidden lg:table-cell">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patientHistory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.date}</TableCell>
                    <TableCell>{item.doctor}</TableCell>
                    <TableCell>{item.reason}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.diagnosis === 'Normal' ? 'secondary' : 'default'
                        }
                      >
                        {item.diagnosis}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden max-w-sm truncate lg:table-cell">
                      {item.notes}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
