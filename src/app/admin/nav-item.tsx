'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface NavItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isMobile?: boolean;
}

export default function NavItem({ href, icon: Icon, label, isMobile = false }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href.includes(pathname) && pathname !== '/admin/dashboard');

  const commonClasses = "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";
  const mobileClasses = "mx-[-0.65rem] gap-4 text-base";
  const activeClasses = "bg-muted text-primary";

  return (
    <Link
      href={href}
      className={cn(
        commonClasses,
        isMobile && mobileClasses,
        isActive && activeClasses,
      )}
    >
      <Icon className={cn("h-4 w-4", isMobile && "h-5 w-5")} />
      {label}
    </Link>
  );
}
