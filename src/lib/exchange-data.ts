import { db } from './db';

const exchangeData = async (initialCurrency: string, exchangedCurrency: string, tradeAmount: number) => {
  console.log(initialCurrency, exchangedCurrency, tradeAmount)

  const newTrade = await db.exchange.create({
    data: {
        initialCurrency,
        exchangedCurrency,
        tradeAmount,
    },
  });
  console.log(newTrade)
  return newTrade;
};

export default exchangeData;;
