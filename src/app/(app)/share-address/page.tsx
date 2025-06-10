'use client';

import * as React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockCryptoBalances, mockAddressBook } from '@/lib/mockData'; // Using mockAddressBook to get an address
import type { CryptoBalance } from '@/lib/types';
import { QrCodeIcon, Copy, Check, Share2 } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

export default function ShareAddressPage() {
  const [selectedCrypto, setSelectedCrypto] = React.useState<CryptoBalance | null>(mockCryptoBalances[0] || null);
  const [myAddress, setMyAddress] = React.useState<string>('');
  const [copied, setCopied] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    if (selectedCrypto) {
      // Simulate fetching/generating an address for the selected crypto
      // For demo, pick a mock address or generate a pseudo one
      const existing = mockAddressBook.find(a => a.cryptoSymbol === selectedCrypto.symbol);
      if (existing) {
        setMyAddress(existing.address);
      } else {
        // Generate a placeholder address if none found for that crypto symbol
        setMyAddress(`mock_${selectedCrypto.symbol.toLowerCase()}_address_${Date.now().toString().slice(-6)}`);
      }
    }
  }, [selectedCrypto]);

  const handleCryptoChange = (symbol: string) => {
    const crypto = mockCryptoBalances.find(c => c.symbol === symbol);
    setSelectedCrypto(crypto || null);
  };

  const copyToClipboard = () => {
    if (myAddress) {
      navigator.clipboard.writeText(myAddress);
      setCopied(true);
      toast({ title: "Copied!", description: "Address copied to clipboard." });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareAddress = async () => {
    if (navigator.share && myAddress) {
      try {
        await navigator.share({
          title: `My ${selectedCrypto?.name} Address`,
          text: `Here's my ${selectedCrypto?.name} (${selectedCrypto?.symbol}) address: ${myAddress}`,
        });
        toast({ title: "Shared!", description: "Address shared successfully." });
      } catch (error) {
        toast({ title: "Share Failed", description: "Could not share the address.", variant: "destructive" });
      }
    } else {
      // Fallback for browsers that don't support navigator.share
      copyToClipboard();
      toast({ title: "Copied!", description: "Sharing not supported, address copied instead." });
    }
  };


  return (
    <div>
      <PageHeader 
        title="Share Address" 
        description="Easily share your cryptocurrency address." 
        icon={QrCodeIcon}
      />

      <Card className="max-w-md mx-auto shadow-xl">
        <CardHeader>
          <CardTitle>Receive Crypto</CardTitle>
          <CardDescription>Select an asset to generate your address and QR code.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="crypto-select" className="mb-2 block text-sm font-medium">Select Asset</Label>
            <Select 
              value={selectedCrypto?.symbol} 
              onValueChange={handleCryptoChange}
            >
              <SelectTrigger id="crypto-select">
                <SelectValue placeholder="Choose an asset" />
              </SelectTrigger>
              <SelectContent>
                {mockCryptoBalances.map((crypto) => (
                  <SelectItem key={crypto.id} value={crypto.symbol}>
                    <div className="flex items-center gap-2">
                       <Image 
                          src={`https://placehold.co/20x20.png?text=${crypto.symbol}`} 
                          alt={`${crypto.name} icon`}
                          width={20}
                          height={20}
                          className="rounded-full"
                          data-ai-hint={crypto.iconAiHint || `crypto ${crypto.symbol} icon`}
                        />
                      {crypto.name} ({crypto.symbol})
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedCrypto && myAddress && (
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Scan QR code for {selectedCrypto.name} ({selectedCrypto.symbol}) address:</p>
                <div className="bg-card p-4 inline-block rounded-lg shadow-inner border border-border">
                    <Image 
                        src={`https://placehold.co/256x256.png?text=${selectedCrypto.symbol}+QR`} 
                        alt={`QR code for ${selectedCrypto.name} address`}
                        width={256}
                        height={256}
                        className="rounded-md"
                        data-ai-hint="qr code crypto address"
                    />
                </div>
              </div>
              
              <div>
                <Label htmlFor="crypto-address" className="mb-2 block text-sm font-medium">Your {selectedCrypto.name} Address</Label>
                <div className="flex items-center gap-2">
                  <Input id="crypto-address" value={myAddress} readOnly className="font-mono text-xs"/>
                  <Button variant="outline" size="icon" onClick={copyToClipboard} aria-label="Copy address">
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button onClick={shareAddress} className="w-full shadow-md hover:shadow-lg transition-shadow">
                <Share2 className="mr-2 h-4 w-4" /> Share Address
              </Button>
            </div>
          )}
          {!selectedCrypto && (
            <p className="text-center text-muted-foreground py-8">Please select an asset to view address.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
