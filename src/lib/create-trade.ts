const createTrade = async (initialCurrency: string, exchangedCurrency: string, tradeAmount: number) => {
  const response = await fetch('/api/create-trade', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ initialCurrency, exchangedCurrency, tradeAmount }),
  });

  if (!response.ok) {
    throw new Error('Failed to create trade');
  }

  return response.json();
};

export default createTrade;
