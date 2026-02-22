import React from 'react';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  cartItems: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  onContinueShopping: () => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  updateQuantity,
  removeFromCart,
  clearCart,
  getTotalPrice,
  onContinueShopping,
  onCheckout,
}) => {
  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 bg-frapatea-surface border border-frapatea-border rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="h-10 w-10 text-frapatea-muted" />
        </div>
        <h2 className="text-2xl font-outfit font-bold text-white mb-2">Your cart is empty</h2>
        <p className="text-frapatea-muted font-inter mb-8">Add some delicious items to get started!</p>
        <button
          onClick={onContinueShopping}
          className="btn-pink px-8 py-3.5 rounded-full font-outfit font-semibold shadow-pink"
        >
          🧋 Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header row */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onContinueShopping}
          className="flex items-center gap-2 text-frapatea-muted hover:text-frapatea-pink transition-colors font-inter text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Continue Shopping</span>
        </button>
        <h1 className="text-2xl font-outfit font-bold text-white">Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-sm text-frapatea-muted hover:text-frapatea-pink transition-colors font-inter"
        >
          Clear All
        </button>
      </div>

      {/* Cart items */}
      <div className="bg-frapatea-card border border-frapatea-border rounded-2xl overflow-hidden mb-6">
        {cartItems.map((item, index) => (
          <div
            key={item.id}
            className={`p-5 ${index !== cartItems.length - 1 ? 'border-b border-frapatea-border' : ''}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-outfit font-semibold text-white truncate">{item.name}</h3>
                {item.selectedVariation && (
                  <p className="text-xs text-frapatea-muted mt-0.5">
                    Size: <span className="text-frapatea-pink-light">{item.selectedVariation.name}</span>
                  </p>
                )}
                {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                  <p className="text-xs text-frapatea-muted mt-0.5">
                    Add-ons: {item.selectedAddOns.map(a =>
                      a.quantity && a.quantity > 1 ? `${a.name} x${a.quantity}` : a.name
                    ).join(', ')}
                  </p>
                )}
                <p className="text-sm font-outfit font-semibold text-frapatea-pink mt-1">
                  ₱{item.totalPrice} each
                </p>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                {/* Qty controls */}
                <div className="flex items-center gap-2 bg-frapatea-surface border border-frapatea-pink/30 rounded-full px-1 py-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1.5 hover:bg-frapatea-pink/20 rounded-full transition-colors"
                  >
                    <Minus className="h-3.5 w-3.5 text-frapatea-pink" />
                  </button>
                  <span className="font-bold text-white min-w-[20px] text-center text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1.5 hover:bg-frapatea-pink/20 rounded-full transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5 text-frapatea-pink" />
                  </button>
                </div>

                <p className="text-base font-outfit font-bold text-white min-w-[60px] text-right">
                  ₱{item.totalPrice * item.quantity}
                </p>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-frapatea-muted hover:text-frapatea-pink hover:bg-frapatea-pink/10 rounded-full transition-all"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-frapatea-card border border-frapatea-border rounded-2xl p-6">
        {/* Subtotal row */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-frapatea-muted font-inter text-sm">Subtotal</span>
          <span className="text-white font-outfit font-semibold">₱{parseFloat(String(getTotalPrice() || 0)).toFixed(2)}</span>
        </div>
        <div className="border-t border-frapatea-border my-4" />
        <div className="flex items-center justify-between mb-6">
          <span className="text-xl font-outfit font-bold text-white">Total</span>
          <span className="text-2xl font-outfit font-bold text-frapatea-pink">
            ₱{parseFloat(String(getTotalPrice() || 0)).toFixed(2)}
          </span>
        </div>

        <button
          onClick={onCheckout}
          className="w-full btn-pink py-4 rounded-xl font-outfit font-bold text-base shadow-pink-lg hover:shadow-pink transition-all"
        >
          Proceed to Checkout →
        </button>
      </div>
    </div>
  );
};

export default Cart;