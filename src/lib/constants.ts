import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, ListChecks, TrendingUp, BookUser, Bell, QrCodeIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const mainNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Transactions', href: '/transactions', icon: ListChecks },
  { label: 'Market Trends', href: '/market', icon: TrendingUp },
  { label: 'Address Book', href: '/address-book', icon: BookUser },
  { label: 'Notifications', href: '/notifications', icon: Bell },
  { label: 'Share Address', href: '/share-address', icon: QrCodeIcon },
];
