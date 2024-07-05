// pages/api/createTrade.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { initialCurrency, exchangedCurrency, tradeAmount } = await req.json();
  try {
    const newTrade = await prisma.exchange.create({
      data: { initialCurrency, exchangedCurrency, tradeAmount },
    });
    return NextResponse.json(newTrade);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
