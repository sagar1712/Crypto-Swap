interface CryptoAsset {
  currency: string;
  total_trade_amount: number;
  last_24h_amount: number;
  previous_24h_amount: number;
  amount_change: string;
  percentage_change: string;
}
interface SerializedExchange {
  currency: string;
  total_trade_amount: string;
  last_24h_amount: string;
  previous_24h_amount: string;
  amount_change: string;
  percentage_change: string | null;
}

const getTrades = async (): Promise<CryptoAsset[]> => {
  const response = await fetch('/api/get-trades', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch trades: ${response.statusText}`);
  }

  const data: SerializedExchange[] = await response.json();

  return data.map((trade) => ({
    currency: trade.currency,
    total_trade_amount: Number(trade.total_trade_amount),
    last_24h_amount: Number(trade.last_24h_amount),
    previous_24h_amount: Number(trade.previous_24h_amount),
    amount_change: trade.amount_change,
    percentage_change: trade.percentage_change !== null ? trade.percentage_change : '0',
  }));
};

export default getTrades;
