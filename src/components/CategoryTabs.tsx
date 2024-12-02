import React from 'react';

interface Category {
  id: string;
  name: string;
  language: string;
}

const categories: Category[] = [
  { id: 'hi', name: 'Hindi', language: 'hi' },
  { id: 'bn', name: 'Bengali', language: 'bn' },
  { id: 'ta', name: 'Tamil', language: 'ta' },
  { id: 'te', name: 'Telugu', language: 'te' },
  { id: 'ml', name: 'Malayalam', language: 'ml' },
  { id: 'ko', name: 'Korean', language: 'ko' },
  { id: 'ja', name: 'Japanese', language: 'ja' },
  { id: 'zh', name: 'Chinese', language: 'zh' },
  { id: 'es', name: 'Spanish', language: 'es' },
  { id: 'fr', name: 'French', language: 'fr' },
];

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: Category) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="mb-8 overflow-x-auto">
      <div className="flex gap-4 pb-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
              ${
                activeCategory === category.language
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
          >
            {category.name} Movies
          </button>
        ))}
      </div>
    </div>
  );
};