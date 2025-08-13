"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Church, Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/communities', label: 'Communities' },
  { href: '/team', label: 'Team' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/support', label: 'Support' },
];

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'transition-colors hover:text-primary',
        isActive ? 'text-primary font-semibold' : 'text-foreground/80'
      )}
    >
      {label}
    </Link>
  );
}

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Church className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block font-headline">Fatima Connect</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="hidden md:flex md:items-center md:space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 pt-8">
                  <Link href="/" className="mb-4 flex items-center space-x-2">
                    <Church className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline">Fatima Connect</span>
                  </Link>
                  {navLinks.map((link) => (
                     <Link
                        key={link.href}
                        href={link.href}
                        className="text-lg transition-colors hover:text-primary"
                      >
                       {link.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
