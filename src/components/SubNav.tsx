import React from 'react';
import { useCategories } from '../hooks/useCategories';

interface SubNavProps {
  selectedCategory: string;
  onCategoryClick: (categoryId: string) => void;
}

const SubNav: React.FC<SubNavProps> = ({ selectedCategory, onCategoryClick }) => {
  const { categories, loading } = useCategories();

  return (
    <div className="sticky top-16 z-40 bg-frapatea-dark/95 backdrop-blur-md border-b border-frapatea-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 overflow-x-auto py-3 scrollbar-hide">
          {loading ? (
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-8 w-24 bg-frapatea-surface rounded-full animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              <button
                onClick={() => onCategoryClick('all')}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-inter font-medium transition-all duration-200 ${selectedCategory === 'all'
                    ? 'pill-active'
                    : 'pill-inactive'
                  }`}
              >
                ✨ All
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onCategoryClick(c.id)}
                  className={`flex-shrink-0 flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-sm font-inter font-medium transition-all duration-200 whitespace-nowrap ${selectedCategory === c.id
                      ? 'pill-active'
                      : 'pill-inactive'
                    }`}
                >
                  <span>{c.icon}</span>
                  <span>{c.name}</span>
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubNav;
