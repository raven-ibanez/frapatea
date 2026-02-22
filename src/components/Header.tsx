import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useSiteSettings } from '../hooks/useSiteSettings';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount, onCartClick, onMenuClick }) => {
  const { siteSettings, loading } = useSiteSettings();

  return (
    <header className="sticky top-0 z-50 bg-frapatea-dark/95 backdrop-blur-md border-b border-frapatea-border shadow-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo + Brand */}
          <button
            onClick={onMenuClick}
            className="flex items-center space-x-3 group"
          >
            {loading ? (
              <div className="w-10 h-10 bg-frapatea-surface rounded-full animate-pulse" />
            ) : (
              <div className="relative">
                <img
                  src={siteSettings?.site_logo || '/logo.jpg'}
                  alt={siteSettings?.site_name || 'Frapatea'}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-frapatea-pink group-hover:ring-frapatea-pink-light transition-all duration-300 shadow-pink"
                  onError={(e) => { e.currentTarget.src = '/logo.jpg'; }}
                />
                <div className="absolute inset-0 rounded-full bg-frapatea-pink/10 group-hover:bg-frapatea-pink/20 transition-all duration-300" />
              </div>
            )}

            <div className="flex flex-col items-start">
              <span className="text-xl font-outfit font-bold text-gradient-pink leading-none tracking-wide">
                frapatea
              </span>
              <span className="text-xs text-frapatea-muted font-inter leading-none tracking-widest uppercase mt-0.5">
                Sip. Enjoy. Repeat.
              </span>
            </div>
          </button>

          {/* Cart Button */}
          <button
            onClick={onCartClick}
            className="relative p-2.5 bg-frapatea-surface hover:bg-frapatea-border text-frapatea-muted hover:text-frapatea-pink rounded-full transition-all duration-200 border border-frapatea-border hover:border-frapatea-pink"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-frapatea-pink text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-bounce-gentle shadow-pink">
                {cartItemsCount}
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  );
};

export default Header;