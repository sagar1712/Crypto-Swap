'use client';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import getTrades from '@/lib/get-trades';
import React, { useEffect, useState } from 'react';

interface CryptoAsset {
  currency: string;
  total_trade_amount: number;
  last_24h_amount: number;
  previous_24h_amount: number;
  amount_change: string;
  percentage_change: string;
}

type SupportedCurrency = 'BTC' | 'DOGE' | 'ETH' | 'DOT' | 'UNI' | 'ALGO' | 'COMP';

const currencyIcons: Record<SupportedCurrency, string> = {
  BTC: './btc.svg',
  DOGE: './doge.svg',
  DOT: './dot.svg',
  ETH: './eth.svg',
  UNI: './uni.svg',
  ALGO: './algo.svg',
  COMP: './comp.png',
};

const getIconPath = (currency: SupportedCurrency): string => {
  return currencyIcons[currency] || './default.svg';
};

const CryptoTable: React.FC = () => {
  const [assets, setAssets] = useState<CryptoAsset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTrades();
        setAssets(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  // Filter out assets with 'USD' currency
  const filteredAssets = assets.filter((asset) => asset.currency !== 'USD');

  return (
    <div className="p-4 mx-48 bg-black/70 backdrop-blur-sm text-white rounded-lg border border-gray-700 w-3/4">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-700">
            <TableHead className="text-left text-white text-xl">ASSETS</TableHead>
            <TableHead className="text-right text-white text-xl">TOTAL TRADE (USD)</TableHead>
            <TableHead className="text-right text-white text-xl">24H %</TableHead>
            <TableHead className="text-right text-white text-xl">24H CHANGE</TableHead>
            <TableHead className="text-white"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAssets.map((asset) => (
            <TableRow key={asset.currency} className="border-b-0">
              <TableCell className="flex items-center space-x-2">
                <img
                  src={getIconPath(asset.currency as SupportedCurrency)}
                  alt={`${asset.currency} icon`}
                  className="w-16 h-16"
                />
                <span>{asset.currency}</span>
              </TableCell>
              <TableCell className="text-right">{asset.total_trade_amount}</TableCell>
              <TableCell
                className={`text-right ${asset.percentage_change.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
                {asset.percentage_change}
              </TableCell>
              <TableCell
                className={`text-right ${asset.amount_change.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
                {asset.amount_change}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" className="bg-green-500 text-white hover:bg-green-600">
                  Trade
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CryptoTable;
