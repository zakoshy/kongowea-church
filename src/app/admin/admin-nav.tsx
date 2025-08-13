'use client';

import Link from 'next/link';
import {
    LayoutDashboard,
    Wand2,
    Calendar,
    Users,
    Shield,
    Church,
    HeartHandshake
} from 'lucide-react';
import NavItem from './nav-item';

export default function AdminNav({ isMobile = false }: { isMobile?: boolean }) {
    const navItems = [
        { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { href: '/admin/dashboard/announcements', icon: Wand2, label: 'Announcements' },
        { href: '/admin/dashboard/events', icon: Calendar, label: 'Events' },
        { href: '/admin/dashboard/communities', icon: Users, label: 'Communities' },
        { href: '/admin/dashboard/prayer-groups', icon: HeartHandshake, label: 'Prayer Groups' },
        { href: '/admin/dashboard/team', icon: Shield, label: 'Team' },
    ];

    if (isMobile) {
        return (
            <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold mb-4"
                >
                  <Church className="h-6 w-6 text-primary" />
                  <span className="font-headline">Fatima Connect</span>
                </Link>
                {navItems.map((item) => (
                    <NavItem key={item.href} {...item} isMobile />
                ))}
            </nav>
        )
    }

    return (
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((item) => (
                <NavItem key={item.href} {...item} />
            ))}
        </nav>
    );
}
