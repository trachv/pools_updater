import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class UniswapService {
  constructor(private configService: ConfigService) {}

  async updatePoolsInfo() {
    const pools = await this.getAllPossiblePools();
    console.log(pools);
  }

  async getAllPossiblePools() {
    const pools = [];
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
                feeTier
                liquidity
                sqrtPrice
                tick
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

  async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
