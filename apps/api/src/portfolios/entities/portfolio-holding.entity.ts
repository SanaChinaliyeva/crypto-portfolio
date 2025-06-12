import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '@common/base.entity';
import { Portfolio } from './portfolio.entity';

@Entity('portfolio_holdings')
export class PortfolioHolding extends BaseEntity {
  @ManyToOne(() => Portfolio, (portfolio) => portfolio.holdings)
  portfolio: Portfolio;

  @Column()
  portfolioId: string;

  @Column()
  assetId: string;

  @Column({ type: 'decimal', precision: 18, scale: 8 })
  quantity: number;

  @Column({ type: 'decimal', precision: 18, scale: 8 })
  averageBuyPrice: number;

  @Column({ type: 'decimal', precision: 18, scale: 8 })
  currentValue: number;

  @Column({ type: 'decimal', precision: 18, scale: 8 })
  profitLoss: number;
} 