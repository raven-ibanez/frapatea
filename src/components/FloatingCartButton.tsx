import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface FloatingCartButtonProps {
  itemCount: number;
  onCartClick: () => void;
}

const FloatingCartButton: React.FC<FloatingCartButtonProps> = ({ itemCount, onCartClick }) => {
  if (itemCount === 0) return null;

  return (
    <button
      onClick={onCartClick}
      className="fixed bottom-6 right-6 btn-pink p-4 rounded-full shadow-pink-lg hover:shadow-pink z-40 md:hidden glow-pink transition-all duration-300"
    >
      <div className="relative">
        <ShoppingCart className="h-6 w-6 text-white" />
        <span className="absolute -top-2 -right-2 bg-frapatea-black text-frapatea-pink text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold border border-frapatea-pink">
          {itemCount}
        </span>
      </div>
    </button>
  );
};

export default FloatingCartButton;