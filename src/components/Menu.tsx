import React from 'react';
import { MenuItem, CartItem } from '../types';
import { useCategories } from '../hooks/useCategories';
import MenuItemCard from './MenuItemCard';
import MobileNav from './MobileNav';

const preloadImages = (items: MenuItem[]) => {
  items.forEach(item => {
    if (item.image) {
      const img = new Image();
      img.src = item.image;
    }
  });
};

interface MenuProps {
  menuItems: MenuItem[];
  addToCart: (item: MenuItem, quantity?: number, variation?: any, addOns?: any[]) => void;
  cartItems: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
}

const Menu: React.FC<MenuProps> = ({ menuItems, addToCart, cartItems, updateQuantity }) => {
  const { categories } = useCategories();
  const [activeCategory, setActiveCategory] = React.useState('classic-frappe');

  React.useEffect(() => {
    if (menuItems.length > 0) {
      const visibleItems = menuItems.filter(item => item.category === activeCategory);
      preloadImages(visibleItems);
      setTimeout(() => {
        const otherItems = menuItems.filter(item => item.category !== activeCategory);
        preloadImages(otherItems);
      }, 1000);
    }
  }, [menuItems, activeCategory]);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(categoryId);
    if (element) {
      const offset = 64 + 60 + 20;
      window.scrollTo({ top: element.offsetTop - offset, behavior: 'smooth' });
    }
  };

  React.useEffect(() => {
    if (categories.length > 0) {
      const defaultCat = categories.find(c => c.id === 'classic-frappe') || categories[0];
      if (!categories.find(c => c.id === activeCategory)) {
        setActiveCategory(defaultCat.id);
      }
    }
  }, [categories, activeCategory]);

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = categories.map(cat => document.getElementById(cat.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveCategory(categories[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [categories]);

  return (
    <>
      <MobileNav activeCategory={activeCategory} onCategoryClick={handleCategoryClick} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-outfit font-bold text-white mb-3">
            Our <span className="text-gradient-pink">Menu</span>
          </h2>
          <p className="text-frapatea-muted font-inter max-w-2xl mx-auto leading-relaxed">
            From creamy frappes to rice bowls and signature milkshakes — crafted fresh, every order.
          </p>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-frapatea-pink to-frapatea-pink-dark rounded-full mx-auto" />
        </div>

        {/* Category sections */}
        {categories.map((category) => {
          const categoryItems = menuItems.filter(item => item.category === category.id);
          if (categoryItems.length === 0) return null;

          return (
            <section key={category.id} id={category.id} className="mb-16">
              <div className="flex items-center mb-8 gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-frapatea-pink/15 border border-frapatea-pink/30">
                  <span className="text-xl">{category.icon}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-outfit font-bold text-white">{category.name}</h3>
                  <div className="w-8 h-0.5 bg-frapatea-pink rounded-full mt-1" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {categoryItems.map((item) => {
                  const cartItem = cartItems.find(ci => ci.id === item.id);
                  return (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      onAddToCart={addToCart}
                      quantity={cartItem?.quantity || 0}
                      onUpdateQuantity={updateQuantity}
                    />
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>
    </>
  );
};

export default Menu;