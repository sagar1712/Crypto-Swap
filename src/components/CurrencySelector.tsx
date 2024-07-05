import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check, ChevronDown } from 'lucide-react';
import React from 'react';

const currencies = [
  { symbol: 'BTC', name: 'Bitcoin' },
  { symbol: 'ETH', name: 'Ethereum' },
  { symbol: 'USD', name: 'Tether' },
  { symbol: 'ALGO', name: 'Algorand' },
  { symbol: 'DOT', name: 'Polkadot' },
  { symbol: 'UNI', name: 'Uniswap' },
  { symbol: 'COMP', name: 'Compound' },
];

interface CurrencySelectorProps {
  selectedCurrency: string;
  onSelectCurrency: (currency: string) => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ selectedCurrency, onSelectCurrency }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="currency" className="w-[130px] justify-between">
          {selectedCurrency}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[130px] bg-black text-white">
        {currencies.map((currency) => (
          <DropdownMenuItem key={currency.symbol} onSelect={() => onSelectCurrency(currency.symbol)} className="">
            <Check className={`mr-2 h-4 w-4 ${selectedCurrency === currency.symbol ? 'opacity-100' : 'opacity-0'}`} />
            {currency.symbol}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencySelector;
