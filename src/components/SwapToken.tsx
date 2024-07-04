'use client'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import exchangeData from '@/lib/exchange-data';
import { Settings } from 'lucide-react';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import InputBox from './InputBox';

const API_KEY = 'YOUR_CRYPTOCOMPARE_API_KEY'; // Replace with your actual API key

const SwapTokens: React.FC = () => {
  const [leftCurrency, setLeftCurrency] = useState('BTC');
  const [rightCurrency, setRightCurrency] = useState('ETH');
  const [leftValue, setLeftValue] = useState('');
  const [rightValue, setRightValue] = useState('');
  const [usdValue, setUsdValue] = useState('0.00');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  const fetchExchangeRate = useCallback(async () => {
    try {
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${leftCurrency},${rightCurrency}&tsyms=${rightCurrency},USD&api_key=${API_KEY}`
      );
      const data = await response.json();
      const rate = data.RAW[leftCurrency][rightCurrency].PRICE;
      const leftUsdRate = data.RAW[leftCurrency].USD.PRICE;
      const rightUsdRate = data.RAW[rightCurrency].USD.PRICE;
      setExchangeRate(rate);
      return { rate, leftUsdRate, rightUsdRate };
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
      return null;
    }
  }, [leftCurrency, rightCurrency]);

  useEffect(() => {
    fetchExchangeRate().then(() => {
      updateValues(leftValue, true);
    });
  }, [fetchExchangeRate, leftValue]);

  const updateValues = useCallback(
    async (amount: string, isLeft: boolean) => {
      const { rate, leftUsdRate, rightUsdRate } = await fetchExchangeRate() || {};
      if (!rate || !leftUsdRate || !rightUsdRate) return;

      const numericAmount = parseFloat(amount) || 0;

      if (isLeft) {
        setLeftValue(amount);
        const rightAmount = (numericAmount * rate).toFixed(8);
        setRightValue(rightAmount);
        const usd = (numericAmount * leftUsdRate).toFixed(2);
        setUsdValue(usd);
      } else {
        setRightValue(amount);
        const leftAmount = (numericAmount / rate).toFixed(8);
        setLeftValue(leftAmount);
        const usd = (numericAmount * rightUsdRate).toFixed(2);
        setUsdValue(usd);
      }
    },
    [fetchExchangeRate]
  );

  const handleLeftInputChange = (value: string) => {
    updateValues(value, true);
  };

  const handleRightInputChange = (value: string) => {
    updateValues(value, false);
  };

  const handleLeftCurrencySelect = (currency: string) => {
    setLeftCurrency(currency);
    updateValues(leftValue, true);
  };

  const handleRightCurrencySelect = (currency: string) => {
    setRightCurrency(currency);
    updateValues(rightValue, false);
  };

  const handleSwap = () => {
    setLeftCurrency(rightCurrency);
    setRightCurrency(leftCurrency);
    setLeftValue(rightValue);
    setRightValue(leftValue);
    // We don't need to update USD value here as it will be updated in the useEffect
  };

  const handleSwapTokens = async () => {
    try {
      const tradeAmount = parseFloat(usdValue);
      if (isNaN(tradeAmount)) {
        console.error('Invalid trade amount');
        return;
      }
      const result = await exchangeData(leftCurrency, rightCurrency, tradeAmount);
      toast.success('Trade recorded successfully!');
      console.log('Trade recorded:', result);
    } catch (error) {
      toast.error('Failed to record trade. Please try again.');
      console.error('Error recording trade:', error);
    }
  };

  return (
    <div className="w-3/4 pb-32">
      <Card className="flex flex-col border-gray-800 bg-black text-white">
        <CardHeader className="flex flex-1 flex-row justify-between items-center w-full">
          <CardTitle>SWAP TOKENS</CardTitle>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4 w-full">
          <div className="flex flex-row w-full relative items-center justify-center gap-x-1">
            <InputBox
              side="left"
              value={leftValue}
              usdValue={usdValue}
              balance="24,240"
              selectedCurrency={leftCurrency}
              onInputChange={handleLeftInputChange}
              onCurrencySelect={handleLeftCurrencySelect}
            />
            <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
              <Button 
                className="h-14 w-14 rounded-full bg-black hover:bg-black"
                onClick={handleSwap}
              >
                <Image src="/swap.svg" alt="swap" fill className="p-2.5" />
              </Button>
            </div>
            <InputBox
              side="right"
              value={rightValue}
              usdValue={usdValue}
              balance="24,240"
              selectedCurrency={rightCurrency}
              onInputChange={handleRightInputChange}
              onCurrencySelect={handleRightCurrencySelect}
            />
          </div>
          <Button
            variant="custom"
            className="bg-purple-600 hover:bg-purple-700"
            onClick={handleSwapTokens}
          >
            SWAP TOKENS
          </Button>
          <div className="flex w-full justify-between text-sm">
            <div className="flex flex-col">
              <span>
                1 {leftCurrency} = {exchangeRate?.toFixed(4) || '...'} {rightCurrency}
              </span>
              <span className="text-blue-500">Free exchange</span>
            </div>
            <div className="text-right text-xs text-gray-500">
              Updates in 4s
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SwapTokens;