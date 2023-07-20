import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { uniswapPool } from './uniswap.types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UniswapService {
  private readonly EXCHANGE_NAME = 'uniswap_v3';

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async updatePoolsInfo() {
    const pools = await this.getAllPossiblePools();
    await this.writePoolsToDb(pools);
  }

  async getAllPossiblePools(): Promise<uniswapPool[]> {
    const pools: uniswapPool[] = [];
    let hasNextPage = true;
    let skipCount = 0;
    const uniswapUrl = this.configService.get<string>(
      'UNISWAP_V3_SUBGRAPH_URL',
    );

    while (hasNextPage) {
      try {
        const response = await axios.post(uniswapUrl, {
          query: `
            {
              pools(first: 1000, skip: ${skipCount}) {
                id
                token0 { id symbol }
                token1 { id symbol }
              }
            }
          `,
        });

        const { data: responseData } = response.data;

        if (
          responseData &&
          responseData.pools &&
          responseData.pools.length > 0
        ) {
          console.info(`Fetched ${responseData.pools.length} pools`);
          pools.push(...responseData.pools);
          skipCount += 1000;
        } else {
          console.info('No more pools to fetch.');
          hasNextPage = false;
        }
      } catch (error) {
        console.error(
          'Error fetching pools from Uniswap V3 Subgraph:',
          error.message,
        );
        hasNextPage = false;
      }

      /**
       * or we can use other way like axiosRetry
       */
      await this.sleep(1000); // wait for 1 second before next request
    }

    return pools;
  }

  async writePoolsToDb(pools: uniswapPool[]) {
    try {
      const operations = pools.map((pool) =>
        this.prisma.pools.upsert({
          where: {
            exchange_pool: {
              exchange: this.EXCHANGE_NAME,
              pool: pool.id,
            },
          },
          update: {
            token0: JSON.stringify(pool.token0),
            token1: JSON.stringify(pool.token1),
          },
          create: {
            pool: pool.id,
            exchange: this.EXCHANGE_NAME,
            token0: JSON.stringify(pool.token0),
            token1: JSON.stringify(pool.token1),
          },
        }),
      );

      await this.prisma.$transaction(operations);
    } catch (error) {
      console.log('Error writing pools to db');
    }
  }

  async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
