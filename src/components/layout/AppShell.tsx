'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, Sun, Moon } from 'lucide-react'; // Added Sun/Moon for theme toggle
import { mainNavItems } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { AnimatedLoader } from '@/components/AnimatedLoader';

// BePay logo (simple text or SVG)
const BePayLogo = () => (
  <Link href="/dashboard" className="flex items-center gap-2 group">
    <div 
      className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xl shadow-md group-hover:scale-105 group-hover:shadow-lg transition-all duration-200"
      data-ai-hint="3d app logo"
    >
      B
    </div>
    <span className="font-headline text-2xl font-bold text-foreground group-hover:text-primary transition-colors">BePay</span>
  </Link>
);

interface NavLinksProps {
  onLinkClick?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ onLinkClick }) => {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1.5">
      {mainNavItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          onClick={onLinkClick}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-150 ease-in-out",
            "hover:text-primary hover:bg-primary/10",
            pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href)) 
              ? "bg-primary/15 text-primary font-semibold shadow-sm" 
              : "hover:bg-accent/5",
            "group"
          )}
        >
          <item.icon 
            className={cn(
              "h-5 w-5 group-hover:scale-110 transition-transform", 
              (pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))) ? "text-primary" : ""
            )} 
          />
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // For theme toggle hydration safety
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setIsMounted(true);
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    } else {
      // Default to light theme or system preference if desired
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [pathname]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  if (!isMounted) { // Prevent rendering theme toggle until client-side hydration
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
        <AnimatedLoader />
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen w-full flex flex-col lg:flex-row bg-background transition-colors duration-300", theme)}>
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col lg:w-64 border-r border-border bg-card/80 backdrop-blur-sm p-4 transition-all duration-300 ease-in-out shadow-sm">
        <div className="mb-8 mt-2">
          <BePayLogo />
        </div>
        <div className="flex-grow">
          <NavLinks />
        </div>
        <Button onClick={toggleTheme} variant="ghost" size="sm" className="mt-auto w-full justify-start gap-2 text-muted-foreground hover:text-primary">
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
      </aside>

      {/* Mobile Header & Sheet Menu */}
      <header className="lg:hidden sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-card/80 backdrop-blur-sm px-4 shadow-sm sm:px-6">
        <BePayLogo />
        <div className="flex items-center gap-2">
          <Button onClick={toggleTheme} variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs bg-card p-0 flex flex-col">
              <div className="flex items-center justify-between p-4 border-b">
                  <BePayLogo />
                  <Button variant="ghost" size="icon" onClick={closeMobileMenu}>
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                  </Button>
              </div>
              <div className="flex-grow p-4">
                <NavLinks onLinkClick={closeMobileMenu} />
              </div>
               <Button onClick={toggleTheme} variant="ghost" size="sm" className="m-4 mt-auto w-[calc(100%-2rem)] justify-start gap-2 text-muted-foreground hover:text-primary">
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto relative">
        {isLoading && (
          <div className="absolute inset-0 z-[50] flex items-center justify-center bg-background/30 backdrop-blur-sm">
            <AnimatedLoader />
          </div>
        )}
        <div className={cn(isLoading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0', 'transition-all duration-300 ease-out')}>
          {children}
        </div>
      </main>
    </div>
  );
}
