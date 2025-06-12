import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '@common/base.entity';
import { User } from '@users/entities/user.entity';
import { PortfolioHolding } from './portfolio-holding.entity';

@Entity('portfolios')
export class Portfolio extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.portfolios)
  user: User;

  @Column()
  userId: string;

  @OneToMany(() => PortfolioHolding, (holding) => holding.portfolio)
  holdings: PortfolioHolding[];

  @Column({ type: 'decimal', precision: 18, scale: 8, default: 0 })
  totalValue: number;

  @Column({ type: 'decimal', precision: 18, scale: 8, default: 0 })
  totalProfitLoss: number;
} 