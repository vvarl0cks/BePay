import { PageHeader } from '@/components/PageHeader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { mockTransactions } from '@/lib/mockData';
import type { Transaction } from '@/lib/types';
import { ArrowDownLeft, ArrowUpRight, Repeat, ListChecks, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const TransactionIcon = ({ type }: { type: Transaction['type'] }) => {
  switch (type) {
    case 'receive': return <ArrowDownLeft className="h-5 w-5 text-green-500" />;
    case 'send': return <ArrowUpRight className="h-5 w-5 text-red-500" />;
    case 'swap': return <Repeat className="h-5 w-5 text-blue-500" />;
    case 'stake': return <CheckCircle className="h-5 w-5 text-purple-500" />; // Or another icon for stake
    default: return <ListChecks className="h-5 w-5 text-muted-foreground" />;
  }
};

const StatusIndicator = ({ status }: { status: Transaction['status']}) => {
  switch (status) {
    case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'pending': return <Clock className="h-5 w-5 text-yellow-500 animate-pulse" />;
    case 'failed': return <AlertCircle className="h-5 w-5 text-red-500" />;
    default: return null;
  }
}

export default function TransactionsPage() {
  return (
    <div>
      <PageHeader title="Transaction History" description="View your past transactions." icon={ListChecks} />
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
        <Table>
          <TableCaption>A list of your recent transactions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Type</TableHead>
              <TableHead>Asset</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Value (USD)</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTransactions.map((tx) => (
              <TableRow key={tx.id} className="hover:bg-muted/50 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <TransactionIcon type={tx.type} />
                    <span className="capitalize font-medium text-foreground/90 hidden md:inline">{tx.type}</span>
                  </div>
                </TableCell>
                <TableCell className="font-medium text-foreground">{tx.cryptoSymbol}</TableCell>
                <TableCell className={cn(
                  tx.type === 'receive' ? 'text-green-600 dark:text-green-400' : 
                  tx.type === 'send' ? 'text-red-600 dark:text-red-400' : 'text-foreground/80'
                )}>
                  {tx.type === 'receive' ? '+' : tx.type === 'send' ? '-' : ''}{tx.amount.toLocaleString()}
                </TableCell>
                <TableCell className="text-muted-foreground">${tx.usdValue.toLocaleString()}</TableCell>
                <TableCell className="text-muted-foreground">{format(new Date(tx.date), 'MMM dd, yyyy HH:mm')}</TableCell>
                <TableCell>
                  <Badge 
                    variant={tx.status === 'completed' ? 'default' : tx.status === 'pending' ? 'secondary' : 'destructive'}
                    className={cn(
                      "capitalize flex items-center gap-1.5 w-fit",
                      tx.status === 'completed' && 'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100 border-green-300 dark:border-green-600',
                      tx.status === 'pending' && 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100 border-yellow-300 dark:border-yellow-600',
                      tx.status === 'failed' && 'bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100 border-red-300 dark:border-red-600'
                    )}
                  >
                    <StatusIndicator status={tx.status} />
                    {tx.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// Needed for ShadCN Button to be used above
import { Button } from '@/components/ui/button';
