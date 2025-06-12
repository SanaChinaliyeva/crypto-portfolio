import { Module } from '@nestjs/common';
import { CoinGeckoService } from './services/coingecko.service';

@Module({
  providers: [CoinGeckoService],
  exports: [CoinGeckoService],
})
export class CryptoModule {} 