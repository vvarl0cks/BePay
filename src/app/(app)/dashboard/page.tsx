import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { mockCryptoBalances } from '@/lib/mockData';
import type { CryptoBalance } from '@/lib/types';
import { DollarSign, TrendingUp, Wallet, LayoutDashboard } from 'lucide-react';
import Image from 'next/image';

const BalanceCard: React.FC<{ balance: CryptoBalance }> = ({ balance }) => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/90 backdrop-blur-sm hover:bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium text-foreground/90">{balance.name} ({balance.symbol})</CardTitle>
        <Image 
          src={`https://placehold.co/40x40.png?text=${balance.symbol}`} 
          alt={`${balance.name} icon`}
          width={40}
          height={40}
          className="rounded-full"
          data-ai-hint={balance.iconAiHint || `crypto ${balance.symbol} icon`}
        />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-primary">
          {balance.balance.toLocaleString()} {balance.symbol}
        </div>
        <p className="text-xs text-muted-foreground pt-1">
          ~ ${balance.usdValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
        </p>
      </CardContent>
    </Card>
  );
};

export default function DashboardPage() {
  const totalUsdValue = mockCryptoBalances.reduce((sum, b) => sum + b.usdValue, 0);

  return (
    <div>
      <PageHeader title="Dashboard" description="Overview of your crypto assets." icon={LayoutDashboard} />
      
      <Card className="mb-6 shadow-md bg-gradient-to-r from-primary/10 to-accent/10">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Wallet className="h-6 w-6 text-primary"/>
            Total Portfolio Value
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-primary">
            ${totalUsdValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-sm text-muted-foreground mt-1">Across {mockCryptoBalances.length} assets</p>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold text-foreground mb-4">Your Balances</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockCryptoBalances.map((balance) => (
          <BalanceCard key={balance.id} balance={balance} />
        ))}
      </div>
      
      <Card className="mt-8 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-accent"/> Quick Actions
          </CardTitle>
          <CardDescription>Perform common actions quickly.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Placeholder for quick action buttons */}
          <Button variant="outline" className="w-full">Send</Button>
          <Button variant="outline" className="w-full">Receive</Button>
          <Button variant="outline" className="w-full">Swap</Button>
          <Button variant="outline" className="w-full">Buy/Sell</Button>
        </CardContent>
      </Card>
    </div>
  );
}

// Needed for ShadCN Button to be used above
import { Button } from '@/components/ui/button';
