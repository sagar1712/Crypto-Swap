import { Input } from '@/components/ui/input';
import React from 'react';
import CurrencySelector from './CurrencySelector';

interface InputBoxProps {
  side: 'left' | 'right';
  value: string;
  usdValue: string;
  balance: string;
  selectedCurrency: string;
  onInputChange: (value: string) => void;
  onCurrencySelect: (currency: string) => void;
}

const InputBox: React.FC<InputBoxProps> = ({
  side,
  value,
  usdValue,
  balance,
  selectedCurrency,
  onInputChange,
  onCurrencySelect,
}) => {
  return (
    <div
      className={`${
        side === 'left' ? 'rounded-l-md' : 'rounded-r-md'
      } bg-[#1E1E1E] p-4 flex justify-between items-center w-1/2`}>
      <div>
        <Input
          type="number"
          value={value}
          onChange={(e) => onInputChange(e.target.value)}
          className="text-3xl ml-4 font-bold bg-transparent border-none w-32"
        />
        <p className="ml-8 text-gray-500">${usdValue}</p>
      </div>
      <div className="flex flex-col justify-between text-sm mr-8">
        <CurrencySelector selectedCurrency={selectedCurrency} onSelectCurrency={onCurrencySelect} />
        <span className="mt-2">
          Balance: <span className="text-blue-400">{balance}</span>
        </span>
      </div>
    </div>
  );
};

export default InputBox;
