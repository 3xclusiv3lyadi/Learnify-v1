'use client';

import {Icons} from '@/components/icons';
import {usePathname} from 'next/navigation';
import Link from 'next/link';

const navItems = [
  {
    href: '/',
    icon: Icons.home,
    label: 'Home',
  },
  {
    href: '/login',
    icon: Icons.login,
    label: 'Login/Signup',
  },
  {
    href: '/leaderboard',
    icon: Icons.leaderboard,
    label: 'Leaderboard',
  },
  {
    href: '/search',
    icon: Icons.search,
    label: 'Search',
  },
  {
    href: '/profile',
    icon: Icons.user,
    label: 'Profile',
  },
];

export const PersistentNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-secondary/80 backdrop-blur-md border-t border-muted z-50">
      <ul className="flex justify-around items-center p-4">
        {navItems.map(item => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`flex flex-col items-center justify-center ${
                pathname === item.href
                  ? 'text-primary'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              <item.icon className="h-6 w-6 mb-1" style={{ color: '#101211' }} />
              <span className="text-xs" style={{ color: '#101211' }}>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

