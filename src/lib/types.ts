export interface CryptoBalance {
  id: string;
  name: string;
  symbol: string;
  balance: number;
  usdValue: number;
  iconUrl?: string; // For 3D icons or token images
  iconAiHint?: string;
}

export type TransactionType = 'send' | 'receive' | 'swap' | 'stake';

export interface Transaction {
  id: string;
  type: TransactionType;
  cryptoSymbol: string;
  amount: number;
  usdValue: number;
  date: string; // ISO string
  status: 'completed' | 'pending' | 'failed';
  address?: string; // From/To address
  description?: string;
}

export interface MarketDataPoint {
  date: string; // or number (timestamp)
  price: number;
}

export interface CryptoMarketInfo {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number; // Percentage change
  marketCap: number;
  iconUrl?: string;
  iconAiHint?: string;
  historicalData?: MarketDataPoint[];
}

export interface AddressEntry {
  id: string;
  name: string;
  address: string;
  cryptoSymbol: string;
  memo?: string;
}

export interface NotificationMessage {
  id: string;
  title: string;
  message: string;
  timestamp: string; // ISO string
  read: boolean;
  type: 'info' | 'warning' | 'error' | 'success';
}
