import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

interface QueryResult {
  currency: string;
  total_trade_amount: bigint;
  last_24h_amount: bigint;
  previous_24h_amount: bigint;
  amount_change: bigint;
  percentage_change: number | null;
}

interface SerializedQueryResult {
  currency: string;
  total_trade_amount: string;
  last_24h_amount: string;
  previous_24h_amount: string;
  amount_change: string;
  percentage_change: string | null;
}

export async function GET() {
  try {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const fortyEightHoursAgo = new Date(twentyFourHoursAgo.getTime() - 24 * 60 * 60 * 1000);

    const result = await prisma.$queryRaw<QueryResult[]>`
      WITH combined_trades AS (
  SELECT "initialCurrency" AS currency, "tradeAmount" AS trade_amount, "created_at"
  FROM "Exchange"
  UNION ALL
  SELECT "exchangedCurrency", "tradeAmount", "created_at"
  FROM "Exchange"
),
currency_totals AS (
  SELECT currency, SUM(trade_amount) AS total_trade_amount
  FROM combined_trades
  GROUP BY currency
),
last_24h_trades AS (
  SELECT currency, SUM(trade_amount) AS last_24h_amount
  FROM combined_trades
  WHERE "created_at" >= ${twentyFourHoursAgo}
  GROUP BY currency
),
previous_24h_trades AS (
  SELECT currency, SUM(trade_amount) AS previous_24h_amount
  FROM combined_trades
  WHERE "created_at" >= ${fortyEightHoursAgo} AND "created_at" < ${twentyFourHoursAgo}
  GROUP BY currency
)
SELECT 
  ct.currency,
  ct.total_trade_amount,
  COALESCE(l.last_24h_amount, 0) AS last_24h_amount,
  COALESCE(p.previous_24h_amount, 0) AS previous_24h_amount,
  COALESCE(l.last_24h_amount, 0) - COALESCE(p.previous_24h_amount, 0) AS amount_change,
  CASE
    WHEN COALESCE(p.previous_24h_amount, 0) = 0 THEN NULL
    ELSE (COALESCE(l.last_24h_amount, 0) - COALESCE(p.previous_24h_amount, 0)) * 100.0 / COALESCE(p.previous_24h_amount, 1)
  END AS percentage_change
FROM currency_totals ct
LEFT JOIN last_24h_trades l ON ct.currency = l.currency
LEFT JOIN previous_24h_trades p ON ct.currency = p.currency
WHERE ct.currency != 'USD'
ORDER BY ct.total_trade_amount DESC`;

    const serializedResult: SerializedQueryResult[] = result.map((row) => ({
      currency: row.currency,
      total_trade_amount: row.total_trade_amount.toString(),
      last_24h_amount: row.last_24h_amount.toString(),
      previous_24h_amount: row.previous_24h_amount.toString(),
      amount_change: row.amount_change.toString(),
      percentage_change: row.percentage_change !== null ? row.percentage_change.toString() : null,
    }));

    return NextResponse.json(serializedResult);
  } catch (error) {
    console.error('Error in GET /api/createTrade:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
