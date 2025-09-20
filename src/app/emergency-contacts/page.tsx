'use client';

import { useState } from 'react';
import { PlusCircle, User, Phone, Heart } from 'lucide-react';
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
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name is required.' }),
  phone: z.string().min(5, { message: 'A valid phone number is required.' }),
  relationship: z.string().min(2, { message: 'Relationship is required.' }),
});

type ContactFormValues = z.infer<typeof contactSchema>;
type Contact = ContactFormValues & { id: number; avatar: string };

const initialContacts: Contact[] = [
  {
    id: 1,
    name: 'Jane Doe',
    phone: '555-123-4567',
    relationship: 'Spouse',
    avatar: 'https://picsum.photos/seed/contact1/40/40',
  },
  {
    id: 2,
    name: 'Dr. Smith',
    phone: '555-987-6543',
    relationship: 'Primary Doctor',
    avatar: 'https://picsum.photos/seed/contact2/40/40',
  },
  {
    id: 3,
    name: 'John Doe',
    phone: '555-555-5555',
    relationship: 'Parent',
    avatar: 'https://picsum.photos/seed/contact3/40/40',
  },
];

export default function EmergencyContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', phone: '', relationship: '' },
  });

  function onSubmit(values: ContactFormValues) {
    const newContact: Contact = {
      ...values,
      id: Date.now(),
      avatar: `https://picsum.photos/seed/${Date.now()}/40/40`,
    };
    setContacts((prev) => [...prev, newContact]);
    form.reset();
    setDialogOpen(false);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Emergency Contacts
          </h1>
          <p className="mt-2 text-muted-foreground">
            Quick access to your important contacts.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Contact</DialogTitle>
              <DialogDescription>
                Fill in the details for your emergency contact.
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
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Jane Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 555-123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="relationship"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relationship</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Spouse" {...field} />
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
                  <Button type="submit">Save Contact</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {contacts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact) => (
            <Card
              key={contact.id}
              className="transition-all hover:shadow-lg"
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback>
                      {contact.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{contact.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                 <a href={`tel:${contact.phone}`} className="w-full">
                    <Button variant="outline" className="w-full">
                        <Phone className="mr-2 h-4 w-4" />
                        {contact.phone}
                    </Button>
                 </a>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed bg-card p-12 text-center">
          <User className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No Contacts Saved</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            Add your first emergency contact to get started.
          </p>
          <Button onClick={() => setDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Contact
          </Button>
        </div>
      )}
    </div>
  );
}
