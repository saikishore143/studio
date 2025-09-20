'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export function MainNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {NAV_LINKS.map((link) => (
        <SidebarMenuItem key={link.href}>
          <Link href={link.href}>
            <SidebarMenuButton
              isActive={pathname === link.href}
              tooltip={link.label}
            >
              <link.icon />
              <span>{link.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
