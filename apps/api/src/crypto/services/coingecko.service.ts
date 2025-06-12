import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class CoinGeckoService {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.coingecko.com/api/v3';

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('COINGECKO_API_KEY');
  }

  async getPrice(coinId: string): Promise<number> {
    try {
      const response = await axios.get(`${this.baseUrl}/simple/price`, {
        params: {
          ids: coinId,
          vs_currencies: 'usd',
          x_cg_demo_api_key: this.apiKey,
        },
      });

      return response.data[coinId].usd;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch cryptocurrency price',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async getCoinList(): Promise<any[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/coins/list`, {
        params: {
          x_cg_demo_api_key: this.apiKey,
        },
      });

      return response.data as any[];
    } catch (error) {
      throw new HttpException(
        'Failed to fetch cryptocurrency list',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async getCoinData(coinId: string): Promise<any> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/coins/${coinId}`,
        {
          params: {
            localization: false,
            tickers: false,
            market_data: true,
            community_data: false,
            developer_data: false,
            sparkline: false,
            x_cg_demo_api_key: this.apiKey,
          },
        },
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch cryptocurrency data',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
} 