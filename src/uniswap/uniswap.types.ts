export interface uniswapPool {
  id: string;
  token0: uniswapToken;
  token1: uniswapToken;
}

interface uniswapToken {
  id: string;
  symbol: string;
}
