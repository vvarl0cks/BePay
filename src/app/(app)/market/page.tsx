'use client'

import * as React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { mockMarketData } from '@/lib/mockData';
import type { CryptoMarketInfo, MarketDataPoint } from '@/lib/types';
import { TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button'; // Import Button

const chartConfigBase = {
  price: {
    label: "Price (USD)",
    color: "hsl(var(--primary))",
  },
};

const MarketTrendChart: React.FC<{ data: MarketDataPoint[], cryptoSymbol: string }> = ({ data, cryptoSymbol }) => {
  if (!data || data.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No historical data available for {cryptoSymbol}.</div>;
  }

  return (
    <ChartContainer config={chartConfigBase} className="h-[200px] w-full">
      <LineChart data={data} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border)/0.5)" />
        <XAxis 
          dataKey="date" 
          tickLine={false} 
          axisLine={false} 
          tickMargin={8} 
          tickFormatter={(value) => value.slice(0,6)} // Shorten date display
          className="text-xs"
        />
        <YAxis 
          tickLine={false} 
          axisLine={false} 
          tickMargin={8} 
          tickFormatter={(value) => `$${value.toLocaleString()}`}
          className="text-xs"
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" hideLabel />}
        />
        <Line
          dataKey="price"
          type="monotone"
          stroke="var(--color-price)"
          strokeWidth={2.5}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
};


export default function MarketPage() {
  const [selectedCrypto, setSelectedCrypto] = React.useState<CryptoMarketInfo | null>(mockMarketData[0]);

  return (
    <div>
      <PageHeader 
        title="Market Trends" 
        description="Stay updated with the latest cryptocurrency market movements." 
        icon={TrendingUp}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Crypto List and Details */}
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle>Cryptocurrencies</CardTitle>
            <CardDescription>Select a crypto to view details.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[600px] overflow-y-auto">
            {mockMarketData.map((crypto) => (
              <button
                key={crypto.id}
                onClick={() => setSelectedCrypto(crypto)}
                className={cn(
                  "flex items-center justify-between w-full px-4 py-3 hover:bg-muted/50 transition-colors text-left",
                  selectedCrypto?.id === crypto.id && "bg-accent/20"
                )}
              >
                <div className="flex items-center gap-3">
                  <Image 
                    src={`https://placehold.co/32x32.png?text=${crypto.symbol}`} 
                    alt={`${crypto.name} icon`}
                    width={32}
                    height={32}
                    className="rounded-full"
                    data-ai-hint={crypto.iconAiHint || `crypto ${crypto.symbol} icon`}
                  />
                  <div>
                    <p className="font-semibold text-foreground">{crypto.name} ({crypto.symbol})</p>
                    <p className="text-xs text-muted-foreground">${crypto.price.toLocaleString()}</p>
                  </div>
                </div>
                <div className={cn(
                    "text-sm font-medium flex items-center",
                    crypto.change24h >= 0 ? "text-green-500" : "text-red-500"
                  )}>
                  {crypto.change24h >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                  {Math.abs(crypto.change24h)}%
                </div>
              </button>
            ))}
            </div>
          </CardContent>
        </Card>

        {/* Selected Crypto Chart and Info */}
        {selectedCrypto && (
          <Card className="lg:col-span-2 shadow-xl">
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Image 
                      src={`https://placehold.co/40x40.png?text=${selectedCrypto.symbol}`} 
                      alt={`${selectedCrypto.name} icon`}
                      width={40}
                      height={40}
                      className="rounded-full"
                      data-ai-hint={selectedCrypto.iconAiHint || `crypto ${selectedCrypto.symbol} icon`}
                    />
                  {selectedCrypto.name} ({selectedCrypto.symbol})
                </CardTitle>
                <CardDescription>Price trend over the last 30 days.</CardDescription>
              </div>
              <Button variant="outline" size="sm">Trade</Button>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="text-4xl font-bold text-primary">${selectedCrypto.price.toLocaleString()}</p>
                <p className={cn(
                    "text-md font-medium flex items-center mt-1",
                    selectedCrypto.change24h >= 0 ? "text-green-500" : "text-red-500"
                  )}>
                  {selectedCrypto.change24h >= 0 ? <ArrowUp className="h-5 w-5 mr-1" /> : <ArrowDown className="h-5 w-5 mr-1" />}
                  {selectedCrypto.change24h.toFixed(2)}% (24h)
                </p>
              </div>
              <MarketTrendChart data={selectedCrypto.historicalData || []} cryptoSymbol={selectedCrypto.symbol} />
            </CardContent>
            <CardFooter className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="text-muted-foreground">Market Cap</p>
                    <p className="font-semibold text-foreground">${selectedCrypto.marketCap.toLocaleString()}</p>
                </div>
                 {/* Add more stats here e.g. Volume, Circulating Supply */}
                 <div>
                    <p className="text-muted-foreground">24h Volume</p>
                    <p className="font-semibold text-foreground">${(selectedCrypto.marketCap / (Math.random()*20 + 30)).toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                </div>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
