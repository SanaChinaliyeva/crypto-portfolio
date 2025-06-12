import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { CoinGeckoService } from './coingecko.service';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CoinGeckoService', () => {
  let service: CoinGeckoService;
  let configService: ConfigService;

  const mockConfigService = {
    get: jest.fn().mockReturnValue('mock-api-key'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoinGeckoService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<CoinGeckoService>(CoinGeckoService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPrice', () => {
    it('should return the price for a given coin', async () => {
      const mockPrice = 50000;
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          bitcoin: {
            usd: mockPrice,
          },
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          url: 'https://api.coingecko.com/api/v3/simple/price',
        },
      });

      const price = await service.getPrice('bitcoin');
      expect(price).toBe(mockPrice);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.coingecko.com/api/v3/simple/price',
        {
          params: {
            ids: 'bitcoin',
            vs_currencies: 'usd',
            x_cg_demo_api_key: 'mock-api-key',
          },
        },
      );
    });

    it('should throw HttpException when API call fails', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      await expect(service.getPrice('bitcoin')).rejects.toThrow(
        new HttpException(
          'Failed to fetch cryptocurrency price',
          HttpStatus.SERVICE_UNAVAILABLE,
        ),
      );
    });
  });

  describe('getCoinList', () => {
    it('should return the list of coins', async () => {
      const mockCoinList = [
        { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin' },
        { id: 'ethereum', symbol: 'eth', name: 'Ethereum' },
      ];
      mockedAxios.get.mockResolvedValueOnce({
        data: mockCoinList,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          url: 'https://api.coingecko.com/api/v3/coins/list',
        },
      });

      const coinList = await service.getCoinList();
      expect(coinList).toEqual(mockCoinList);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.coingecko.com/api/v3/coins/list',
        {
          params: {
            x_cg_demo_api_key: 'mock-api-key',
          },
        },
      );
    });

    it('should throw HttpException when API call fails', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      await expect(service.getCoinList()).rejects.toThrow(
        new HttpException(
          'Failed to fetch cryptocurrency list',
          HttpStatus.SERVICE_UNAVAILABLE,
        ),
      );
    });
  });

  describe('getCoinData', () => {
    it('should return detailed data for a given coin', async () => {
      const mockCoinData = {
        id: 'bitcoin',
        name: 'Bitcoin',
        market_data: {
          current_price: {
            usd: 50000,
          },
        },
      };
      mockedAxios.get.mockResolvedValueOnce({
        data: mockCoinData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          url: 'https://api.coingecko.com/api/v3/coins/bitcoin',
        },
      });

      const coinData = await service.getCoinData('bitcoin');
      expect(coinData).toEqual(mockCoinData);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.coingecko.com/api/v3/coins/bitcoin',
        {
          params: {
            localization: false,
            tickers: false,
            market_data: true,
            community_data: false,
            developer_data: false,
            sparkline: false,
            x_cg_demo_api_key: 'mock-api-key',
          },
        },
      );
    });

    it('should throw HttpException when API call fails', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      await expect(service.getCoinData('bitcoin')).rejects.toThrow(
        new HttpException(
          'Failed to fetch cryptocurrency data',
          HttpStatus.SERVICE_UNAVAILABLE,
        ),
      );
    });
  });
}); 