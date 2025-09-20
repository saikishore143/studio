import Link from 'next/link';
import {
  ArrowRight,
  BellRing,
  HeartPulse,
  History,
  MapPin,
  Stethoscope,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { HealthTipCard } from '@/components/health-tip-card';

const features = [
  {
    title: 'Symptom Checker',
    description: 'Get AI-powered insights on your symptoms.',
    icon: Stethoscope,
    href: '/symptom-checker',
    color: 'text-blue-500',
  },
  {
    title: 'Medication Reminders',
    description: 'Never miss a dose again.',
    icon: BellRing,
    href: '/medication-reminder',
    color: 'text-green-500',
  },
  {
    title: 'Nearby Healthcare',
    description: 'Find clinics and hospitals near you.',
    icon: MapPin,
    href: '/nearby-services',
    color: 'text-purple-500',
  },
  {
    title: 'Emergency Contacts',
    description: 'Quick access to your saved contacts.',
    icon: HeartPulse,
    href: '/emergency-contacts',
    color: 'text-red-500',
  },
  {
    title: 'Patient History',
    description: 'Track your health journey.',
    icon: History,
    href: '/patient-history',
    color: 'text-yellow-500',
  },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome to HealthAssist AI
        </h1>
        <p className="text-muted-foreground">
          Your personal AI-powered health companion.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <HealthTipCard />
        </div>
        <Card className="md:col-span-2 lg:col-span-2">
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
            <CardDescription>
              Explore the features that help you manage your health.
            </CardDescription>
          </CardHeader>
          <div className="grid grid-cols-1 gap-4 p-6 pt-0 sm:grid-cols-2">
            {features.map((feature) => (
              <Link href={feature.href} key={feature.href}>
                <div className="group flex items-center justify-between rounded-lg border p-4 transition-all hover:bg-card/90 hover:shadow-md">
                  <div className="flex items-center gap-4">
                    <feature.icon
                      className={`h-8 w-8 shrink-0 ${feature.color}`}
                    />
                    <div>
                      <p className="font-semibold">{feature.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
