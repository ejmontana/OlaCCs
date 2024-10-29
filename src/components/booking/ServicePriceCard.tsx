import React from 'react';
import { Clock, DollarSign } from 'lucide-react';

interface ServicePriceCardProps {
  id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
  selected: boolean;
  onSelect: (id: string) => void;
}

export default function ServicePriceCard({
  id,
  name,
  price,
  duration,
  description,
  selected,
  onSelect,
}: ServicePriceCardProps) {
  return (
    <div
      className={`
        relative p-6 rounded-lg transition-all cursor-pointer
        ${selected 
          ? 'bg-brand-brown text-white shadow-lg scale-105' 
          : 'bg-white hover:shadow-md border border-brand-cream'
        }
      `}
      onClick={() => onSelect(id)}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className={`text-lg font-serif ${selected ? 'text-white' : 'text-brand-brown'}`}>
          {name}
        </h3>
        <div className={`text-xl font-semibold ${selected ? 'text-white' : 'text-brand-brown'}`}>
          ${price}
        </div>
      </div>
      
      <p className={`text-sm mb-4 ${selected ? 'text-white/90' : 'text-gray-600'}`}>
        {description}
      </p>
      
      <div className="flex items-center gap-4">
        <div className={`flex items-center gap-1 text-sm ${selected ? 'text-white/90' : 'text-gray-600'}`}>
          <Clock className="h-4 w-4" />
          {duration} min
        </div>
      </div>
      
      {selected && (
        <div className="absolute -top-2 -right-2 bg-green-500 text-white p-1 rounded-full">
          <DollarSign className="h-4 w-4" />
        </div>
      )}
    </div>
  );
}