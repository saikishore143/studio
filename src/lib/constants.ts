import {
  BellRing,
  HeartPulse,
  History,
  LayoutDashboard,
  MapPin,
  Stethoscope,
} from 'lucide-react';

export const NAV_LINKS = [
  {
    href: '/',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/symptom-checker',
    label: 'Symptom Checker',
    icon: Stethoscope,
  },
  {
    href: '/medication-reminder',
    label: 'Medication Reminders',
    icon: BellRing,
  },
  {
    href: '/nearby-services',
    label: 'Nearby Healthcare',
    icon: MapPin,
  },
  {
    href: '/emergency-contacts',
    label: 'Emergency Contacts',
    icon: HeartPulse,
  },
  {
    href: '/patient-history',
    label: 'Patient History',
    icon: History,
  },
];
