import React, { useState } from 'react';
import { Plus, Minus, X, ShoppingCart } from 'lucide-react';
import { MenuItem, Variation, AddOn } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem, quantity?: number, variation?: Variation, addOns?: AddOn[]) => void;
  quantity: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAddToCart, quantity, onUpdateQuantity }) => {
  const [showCustomization, setShowCustomization] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState<Variation | undefined>(item.variations?.[0]);
  const [selectedAddOns, setSelectedAddOns] = useState<(AddOn & { quantity: number })[]>([]);

  const calculatePrice = () => {
    let price = item.effectivePrice || item.basePrice;
    if (selectedVariation) price = (item.effectivePrice || item.basePrice) + selectedVariation.price;
    selectedAddOns.forEach(a => { price += a.price * a.quantity; });
    return price;
  };

  const handleAddToCart = () => {
    if (item.variations?.length || item.addOns?.length) {
      setShowCustomization(true);
    } else {
      onAddToCart(item, 1);
    }
  };

  const handleCustomizedAddToCart = () => {
    const addOnsForCart: AddOn[] = selectedAddOns.flatMap(addOn =>
      Array(addOn.quantity).fill({ ...addOn, quantity: undefined })
    );
    onAddToCart(item, 1, selectedVariation, addOnsForCart);
    setShowCustomization(false);
    setSelectedAddOns([]);
  };

  const updateAddOnQuantity = (addOn: AddOn, qty: number) => {
    setSelectedAddOns(prev => {
      const idx = prev.findIndex(a => a.id === addOn.id);
      if (qty === 0) return prev.filter(a => a.id !== addOn.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], quantity: qty };
        return updated;
      }
      return [...prev, { ...addOn, quantity: qty }];
    });
  };

  const groupedAddOns = item.addOns?.reduce((groups, addOn) => {
    if (!groups[addOn.category]) groups[addOn.category] = [];
    groups[addOn.category].push(addOn);
    return groups;
  }, {} as Record<string, AddOn[]>);

  return (
    <>
      {/* Card */}
      <div className={`card-dark hover:border-frapatea-pink/40 transition-all duration-300 overflow-hidden group animate-scale-in ${!item.available ? 'opacity-50' : ''}`}>

        {/* Image */}
        <div className="relative h-44 bg-frapatea-surface overflow-hidden">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={`absolute inset-0 flex items-center justify-center ${item.image ? 'hidden' : ''}`}>
            <span className="text-6xl opacity-20">🧋</span>
          </div>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-frapatea-card/80 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {item.isOnDiscount && item.discountPrice && (
              <span className="bg-frapatea-pink text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-pink animate-pulse-pink">
                SALE
              </span>
            )}
            {item.popular && (
              <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                ⭐ Popular
              </span>
            )}
          </div>

          {!item.available && (
            <div className="absolute top-3 right-3 bg-frapatea-surface/90 text-frapatea-muted text-xs font-bold px-2.5 py-1 rounded-full border border-frapatea-border">
              Unavailable
            </div>
          )}

          {item.isOnDiscount && item.discountPrice && (
            <div className="absolute bottom-3 right-3 bg-frapatea-black/80 text-frapatea-pink text-xs font-bold px-2 py-1 rounded-full border border-frapatea-pink/30">
              {Math.round(((item.basePrice - item.discountPrice) / item.basePrice) * 100)}% OFF
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-base font-outfit font-semibold text-white leading-snug flex-1 pr-2">
              {item.name}
            </h4>
            {item.variations && item.variations.length > 0 && (
              <span className="text-xs text-frapatea-muted bg-frapatea-surface px-2 py-0.5 rounded-full whitespace-nowrap border border-frapatea-border">
                {item.variations.length} sizes
              </span>
            )}
          </div>

          <p className="text-sm text-frapatea-muted font-inter mb-4 leading-relaxed line-clamp-2">
            {!item.available ? 'Currently unavailable' : item.description}
          </p>

          {/* Price + Actions */}
          <div className="flex items-center justify-between">
            <div>
              {item.isOnDiscount && item.discountPrice ? (
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-outfit font-bold text-frapatea-pink">
                      ₱{item.discountPrice.toFixed(2)}
                    </span>
                    <span className="text-sm text-frapatea-subtle line-through">
                      ₱{item.basePrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-xs text-frapatea-subtle">
                    Save ₱{(item.basePrice - item.discountPrice).toFixed(2)}
                  </div>
                </div>
              ) : (
                <div>
                  <span className="text-xl font-outfit font-bold text-white">
                    ₱{item.basePrice.toFixed(2)}
                  </span>
                  {item.variations && item.variations.length > 0 && (
                    <div className="text-xs text-frapatea-muted mt-0.5">Starting price</div>
                  )}
                </div>
              )}
            </div>

            {/* Button */}
            {!item.available ? (
              <button
                disabled
                className="bg-frapatea-surface text-frapatea-subtle px-4 py-2 rounded-xl cursor-not-allowed text-sm font-medium border border-frapatea-border"
              >
                Unavailable
              </button>
            ) : quantity === 0 ? (
              <button
                onClick={handleAddToCart}
                className="btn-pink px-5 py-2 rounded-xl text-sm font-outfit font-semibold shadow-pink"
              >
                {item.variations?.length || item.addOns?.length ? '✦ Customize' : '+ Add'}
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-frapatea-surface rounded-xl p-1 border border-frapatea-pink/30">
                <button
                  onClick={() => onUpdateQuantity(item.id, quantity - 1)}
                  className="p-1.5 hover:bg-frapatea-pink/20 rounded-lg transition-colors"
                >
                  <Minus className="h-3.5 w-3.5 text-frapatea-pink" />
                </button>
                <span className="font-bold text-white min-w-[22px] text-center text-sm">{quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.id, quantity + 1)}
                  className="p-1.5 hover:bg-frapatea-pink/20 rounded-lg transition-colors"
                >
                  <Plus className="h-3.5 w-3.5 text-frapatea-pink" />
                </button>
              </div>
            )}
          </div>

          {/* Add-ons indicator */}
          {item.addOns && item.addOns.length > 0 && (
            <div className="mt-3 text-xs text-frapatea-pink/70 bg-frapatea-pink/5 border border-frapatea-pink/20 px-2.5 py-1 rounded-lg inline-flex items-center gap-1">
              <span>✦</span>
              <span>{item.addOns.length} add-on{item.addOns.length > 1 ? 's' : ''} available</span>
            </div>
          )}
        </div>
      </div>

      {/* Customization Modal */}
      {showCustomization && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-4">
          <div className="bg-frapatea-card border border-frapatea-border rounded-2xl w-full max-w-md max-h-[85vh] overflow-y-auto scrollbar-thin shadow-dark animate-slide-up">

            {/* Modal Header */}
            <div className="sticky top-0 bg-frapatea-card border-b border-frapatea-border p-5 flex items-center justify-between rounded-t-2xl">
              <div>
                <h3 className="text-lg font-outfit font-bold text-white">Customize</h3>
                <p className="text-sm text-frapatea-muted mt-0.5">{item.name}</p>
              </div>
              <button
                onClick={() => setShowCustomization(false)}
                className="p-2 hover:bg-frapatea-surface rounded-full text-frapatea-muted hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5 space-y-6">
              {/* Variations */}
              {item.variations && item.variations.length > 0 && (
                <div>
                  <h4 className="font-outfit font-semibold text-white mb-3">Choose Size</h4>
                  <div className="space-y-2">
                    {item.variations.map((variation) => (
                      <label
                        key={variation.id}
                        className={`flex items-center justify-between p-3.5 border-2 rounded-xl cursor-pointer transition-all duration-200 ${selectedVariation?.id === variation.id
                            ? 'border-frapatea-pink bg-frapatea-pink/10'
                            : 'border-frapatea-border hover:border-frapatea-pink/40 bg-frapatea-surface'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="variation"
                            checked={selectedVariation?.id === variation.id}
                            onChange={() => setSelectedVariation(variation)}
                            className="accent-frapatea-pink"
                          />
                          <span className="font-medium text-white font-inter">{variation.name}</span>
                        </div>
                        <span className="text-frapatea-pink font-outfit font-semibold">
                          ₱{((item.effectivePrice || item.basePrice) + variation.price).toFixed(2)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Add-ons */}
              {groupedAddOns && Object.keys(groupedAddOns).length > 0 && (
                <div>
                  <h4 className="font-outfit font-semibold text-white mb-3">Add-ons <span className="text-frapatea-muted text-sm font-normal">₱10 each</span></h4>
                  {Object.entries(groupedAddOns).map(([category, addOns]) => (
                    <div key={category} className="mb-4">
                      <h5 className="text-xs font-inter font-medium text-frapatea-pink uppercase tracking-wider mb-2">
                        {category.replace('-', ' ')}
                      </h5>
                      <div className="space-y-2">
                        {addOns.map((addOn) => (
                          <div
                            key={addOn.id}
                            className="flex items-center justify-between p-3 bg-frapatea-surface border border-frapatea-border rounded-xl hover:border-frapatea-pink/30 transition-all"
                          >
                            <div>
                              <span className="font-inter font-medium text-white text-sm">{addOn.name}</span>
                              <div className="text-xs text-frapatea-muted">
                                {addOn.price > 0 ? `₱${addOn.price.toFixed(2)} each` : 'Free'}
                              </div>
                            </div>

                            {selectedAddOns.find(a => a.id === addOn.id) ? (
                              <div className="flex items-center gap-2 bg-frapatea-pink/10 border border-frapatea-pink/30 rounded-xl p-1">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const current = selectedAddOns.find(a => a.id === addOn.id);
                                    updateAddOnQuantity(addOn, (current?.quantity || 1) - 1);
                                  }}
                                  className="p-1 hover:bg-frapatea-pink/20 rounded-lg"
                                >
                                  <Minus className="h-3 w-3 text-frapatea-pink" />
                                </button>
                                <span className="font-bold text-white min-w-[20px] text-center text-sm">
                                  {selectedAddOns.find(a => a.id === addOn.id)?.quantity || 0}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const current = selectedAddOns.find(a => a.id === addOn.id);
                                    updateAddOnQuantity(addOn, (current?.quantity || 0) + 1);
                                  }}
                                  className="p-1 hover:bg-frapatea-pink/20 rounded-lg"
                                >
                                  <Plus className="h-3 w-3 text-frapatea-pink" />
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => updateAddOnQuantity(addOn, 1)}
                                className="flex items-center gap-1 px-3 py-1.5 btn-pink rounded-xl text-xs font-outfit font-semibold"
                              >
                                <Plus className="h-3 w-3" />
                                <span>Add</span>
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Price Summary */}
              <div className="border-t border-frapatea-border pt-4">
                <div className="flex items-center justify-between text-xl font-outfit font-bold">
                  <span className="text-white">Total:</span>
                  <span className="text-frapatea-pink">₱{calculatePrice().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCustomizedAddToCart}
                className="w-full btn-pink py-4 rounded-xl font-outfit font-bold flex items-center justify-center gap-2 shadow-pink-lg text-base"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart — ₱{calculatePrice().toFixed(2)}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuItemCard;