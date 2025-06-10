import Link from 'next/link';
import Image from 'next/image'; // Added import for Image
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10 p-6 text-center selection:bg-primary/20">
      <div className="mb-10">
        <Image
          src="/bepay.png" 
          alt="BePay Logo"
          width={144} 
          height={144} 
          className="rounded-3xl shadow-2xl transform transition-all hover:scale-105 hover:shadow-primary/40"
          data-ai-hint="app logo" 
          priority // Add priority if it's LCP
        />
      </div>
      <h1 className="font-headline text-5xl md:text-7xl font-bold text-foreground mb-6">
        Welcome to <span className="text-primary drop-shadow-sm">BePay</span>
      </h1>
      <p className="text-muted-foreground text-lg md:text-xl max-w-xl mb-12">
        Your secure, simple, and stylish crypto wallet. Manage digital assets with ease and confidence in our pastel-themed PWA.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <Link href="/dashboard">
          <Button size="lg" className="font-semibold text-base px-8 py-6 shadow-lg hover:shadow-primary/30 transition-all group w-full sm:w-auto transform hover:-translate-y-0.5">
            Go to Dashboard
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
        <Button size="lg" variant="outline" className="font-semibold text-base px-8 py-6 shadow-lg hover:shadow-accent/20 transition-all group w-full sm:w-auto  transform hover:-translate-y-0.5">
            <ShieldCheck className="mr-2 h-5 w-5 text-primary" />
            Learn More
        </Button>
      </div>
      <footer className="absolute bottom-8 text-muted-foreground text-sm">
        BePay &copy; {new Date().getFullYear()} - Secure Crypto Management.
      </footer>
    </div>
  );
}
