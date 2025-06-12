export interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  priceChangePercentage24h: number;
  image: string;
}

export interface Portfolio {
  id: string;
  userId: string;
  name: string;
  holdings: PortfolioHolding[];
  totalValue: number;
  totalProfitLoss: number;
}

export interface PortfolioHolding {
  id: string;
  portfolioId: string;
  assetId: string;
  quantity: number;
  averageBuyPrice: number;
  currentValue: number;
  profitLoss: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  portfolios: Portfolio[];
} 