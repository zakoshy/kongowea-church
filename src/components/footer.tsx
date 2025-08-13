import Link from 'next/link';
import { Church, Facebook, Twitter, Instagram } from 'lucide-react';

export function AppFooter() {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/events', label: 'Events' },
    { href: '/communities', label: 'Communities' },
    { href: '/prayer-groups', label: 'Prayer Groups' },
    { href: '/team', label: 'Team' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/support', label: 'Support' },
  ];

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Church className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl font-headline">Fatima Connect</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Our Lady of Fatima Kongowea Church. A community of faith, hope, and love.
            </p>
          </div>
          <div className="md:col-span-1">
            <h3 className="font-headline font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-1">
            <h3 className="font-headline font-semibold mb-4">Admin</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/admin/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <h3 className="font-headline font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram /></Link>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Our Lady of Fatima Kongowea Church. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
