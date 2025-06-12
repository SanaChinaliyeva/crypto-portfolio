import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portfolio } from './entities/portfolio.entity';
import { PortfolioHolding } from './entities/portfolio-holding.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Portfolio, PortfolioHolding])],
  providers: [],
  exports: [TypeOrmModule],
})
export class PortfoliosModule {} 