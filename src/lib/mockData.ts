import type { CryptoBalance, Transaction, CryptoMarketInfo, AddressEntry, NotificationMessage } from './types';

export const mockCryptoBalances: CryptoBalance[] = [
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', balance: 0.5, usdValue: 30000, iconAiHint: "3d bitcoin coin" },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', balance: 10, usdValue: 18000, iconAiHint: "3d ethereum coin" },
  { id: 'sol', name: 'Solana', symbol: 'SOL', balance: 150, usdValue: 6000, iconAiHint: "3d solana coin" },
  { id: 'bep', name: 'BePay Token', symbol: 'BEP', balance: 10000, usdValue: 1000, iconAiHint: "3d abstract coin" },
];

export const mockTransactions: Transaction[] = [
  { id: '1', type: 'receive', cryptoSymbol: 'BTC', amount: 0.1, usdValue: 6000, date: new Date(Date.now() - 86400000 * 1).toISOString(), status: 'completed', description: 'From external wallet' },
  { id: '2', type: 'send', cryptoSymbol: 'ETH', amount: 2, usdValue: 3600, date: new Date(Date.now() - 86400000 * 2).toISOString(), status: 'completed', address: '0x123...abc', description: 'Payment for service' },
  { id: '3', type: 'swap', cryptoSymbol: 'SOL', amount: 50, usdValue: 2000, date: new Date(Date.now() - 86400000 * 3).toISOString(), status: 'pending', description: 'Swapped for BEP' },
  { id: '4', type: 'stake', cryptoSymbol: 'BEP', amount: 5000, usdValue: 500, date: new Date(Date.now() - 86400000 * 5).toISOString(), status: 'completed', description: 'Staked for 12 months' },
  { id: '5', type: 'receive', cryptoSymbol: 'ETH', amount: 0.5, usdValue: 900, date: new Date(Date.now() - 86400000 * 7).toISOString(), status: 'failed', description: 'Airdrop claim' },
];

const generateHistoricalData = (days: number, initialPrice: number): { date: string, price: number }[] => {
  const data = [];
  let price = initialPrice;
  for (let i = days -1; i >=0; i--) {
    data.push({
      date: new Date(Date.now() - 86400000 * i).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: parseFloat(price.toFixed(2)),
    });
    price = price * (1 + (Math.random() - 0.48) / 20); // Simulate price fluctuation
  }
  return data;
}

export const mockMarketData: CryptoMarketInfo[] = [
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', price: 60000, change24h: 2.5, marketCap: 1200000000000, iconAiHint: "3d bitcoin coin", historicalData: generateHistoricalData(30, 58000) },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', price: 1800, change24h: -1.2, marketCap: 216000000000, iconAiHint: "3d ethereum coin", historicalData: generateHistoricalData(30, 1850) },
  { id: 'sol', name: 'Solana', symbol: 'SOL', price: 40, change24h: 5.1, marketCap: 16000000000, iconAiHint: "3d solana coin", historicalData: generateHistoricalData(30, 38) },
  { id: 'bep', name: 'BePay Token', symbol: 'BEP', price: 0.1, change24h: 10.0, marketCap: 1000000, iconAiHint: "3d abstract coin", historicalData: generateHistoricalData(30, 0.09) },
];

export const mockAddressBook: AddressEntry[] = [
  { id: '1', name: 'Alice (BTC)', address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', cryptoSymbol: 'BTC' },
  { id: '2', name: 'Bob (ETH)', address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', cryptoSymbol: 'ETH' },
  { id: '3', name: 'Exchange (SOL)', address: 'So11111111111111111111111111111111111111112', cryptoSymbol: 'SOL', memo: 'Primary Exchange Account' },
];

export const mockNotifications: NotificationMessage[] = [
  { id: '1', title: 'Security Alert', message: 'Unusual login attempt detected from a new device.', timestamp: new Date(Date.now() - 3600000 * 1).toISOString(), read: false, type: 'warning' },
  { id: '2', title: 'Transaction Success', message: 'Your transfer of 0.1 BTC is complete.', timestamp: new Date(Date.now() - 3600000 * 3).toISOString(), read: true, type: 'success' },
  { id: '3', title: 'Price Alert: BEP', message: 'BEP has increased by 10% in the last 24 hours.', timestamp: new Date(Date.now() - 3600000 * 5).toISOString(), read: false, type: 'info' },
  { id: '4', title: 'Staking Reward', message: 'You have received 5 BEP as staking reward.', timestamp: new Date(Date.now() - 86400000 * 1).toISOString(), read: true, type: 'success' },
];
