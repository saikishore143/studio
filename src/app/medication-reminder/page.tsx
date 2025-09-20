'use client';

import { useState } from 'react';
import { PlusCircle, Pill, Clock, Calendar } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const reminderSchema = z.object({
  name: z.string().min(2, { message: 'Medication name is required.' }),
  dosage: z.string().min(1, { message: 'Dosage is required.' }),
  schedule: z.string().min(1, { message: 'Schedule is required.' }),
});

type ReminderFormValues = z.infer<typeof reminderSchema>;

type Reminder = ReminderFormValues & { id: number; image: string };

const initialReminders: Reminder[] = [
  {
    id: 1,
    name: 'Lisinopril',
    dosage: '10mg',
    schedule: 'Once daily in the morning',
    image: PlaceHolderImages.find(p => p.id === 'pills1')?.imageUrl || '',
  },
  {
    id: 2,
    name: 'Metformin',
    dosage: '500mg',
    schedule: 'Twice daily with meals',
    image: PlaceHolderImages.find(p => p.id === 'pills2')?.imageUrl || '',
  },
];

export default function MedicationReminderPage() {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const form = useForm<ReminderFormValues>({
    resolver: zodResolver(reminderSchema),
    defaultValues: { name: '', dosage: '', schedule: '' },
  });

  function onSubmit(values: ReminderFormValues) {
    const newReminder: Reminder = {
      ...values,
      id: Date.now(),
      image: PlaceHolderImages.find(p => p.id === 'pills3')?.imageUrl || '',
    };
    setReminders((prev) => [...prev, newReminder]);
    form.reset();
    setDialogOpen(false);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Medication Reminders
          </h1>
          <p className="mt-2 text-muted-foreground">
            Stay on top of your medication schedule.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Reminder
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Medication Reminder</DialogTitle>
              <DialogDescription>
                Fill in the details of your medication.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medication Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Ibuprofen" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dosage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dosage</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 200mg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="schedule"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Schedule</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Twice daily after meals"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save Reminder</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {reminders.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reminders.map((reminder) => (
            <Card
              key={reminder.id}
              className="flex flex-col overflow-hidden transition-all hover:shadow-lg"
            >
              <CardHeader>
                <div className="relative h-40 w-full">
                  <Image
                    src={reminder.image}
                    alt={reminder.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-t-lg object-cover"
                    data-ai-hint="pills medicine"
                  />
                </div>
                <CardTitle className="pt-4">{reminder.name}</CardTitle>
                <CardDescription>
                  <Badge variant="secondary">{reminder.dosage}</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{reminder.schedule}</span>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/30 p-4">
                <Button variant="outline" size="sm" className="w-full">
                  Edit
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed bg-card p-12 text-center">
          <Pill className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No Reminders Yet</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            Add your first medication to get started.
          </p>
          <Button onClick={() => setDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Reminder
          </Button>
        </div>
      )}
    </div>
  );
}
