import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import React from 'react';

interface CryptoAsset {
  icon: string;
  name: string;
  lastTrade: string;
  change24h: string;
  changeAmount24h: string;
}

const assets: CryptoAsset[] = [
  {
    icon: '/btc.svg',
    name: 'BTC/USD',
    lastTrade: '$63,000.00',
    change24h: '-2.21%',
    changeAmount24h: '-$1,426.18',
  },
  {
    icon: '/eth.svg',
    name: 'ETH/USD',
    lastTrade: '$3,408.90',
    change24h: '-0.33%',
    changeAmount24h: '-$11.20',
  },
  {
    icon: '/doge.svg',
    name: 'DOGE/USD',
    lastTrade: '$0.15',
    change24h: '+15.75%',
    changeAmount24h: '$0.02',
  },
];

const CryptoTable: React.FC = () => {
  return (
    <div className="p-4 mx-48 bg-black/70 backdrop-blur-sm text-white rounded-lg border border-gray-700 w-3/4">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-700">
            <TableHead className="text-left text-white text-xl">
              ASSETS
            </TableHead>
            <TableHead className="text-right text-white text-xl">
              LAST TRADE
            </TableHead>
            <TableHead className="text-right text-white text-xl">
              24H %
            </TableHead>
            <TableHead className="text-right text-white text-xl">
              24H CHANGE
            </TableHead>
            <TableHead className="text-white"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.map((asset) => (
            <TableRow key={asset.name} className="border-b-0">
              <TableCell className="flex items-center space-x-2">
                <img src={asset.icon} alt={`${asset.name} icon`} className="w-16 h-16" />
                <span>{asset.name}</span>
              </TableCell>
              <TableCell className="text-right">{asset.lastTrade}</TableCell>
              <TableCell
                className={`text-right ${
                  asset.change24h.startsWith('-')
                    ? 'text-red-500'
                    : 'text-green-500'
                }`}
              >
                {asset.change24h}
              </TableCell>
              <TableCell
                className={`text-right ${
                  asset.changeAmount24h.startsWith('-')
                    ? 'text-red-500'
                    : 'text-green-500'
                }`}
              >
                {asset.changeAmount24h}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-green-500 text-white hover:bg-green-600"
                >
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