import React from 'react';
import { Film } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Film className="w-8 h-8 text-red-600" />
            <span className="text-xl font-bold dark:text-white">MovieHub</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-500">
              Home
            </Link>
            <Link to="/trending" className="text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-500">
              Trending
            </Link>
            <Link to="/popular" className="text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-500">
              Popular
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};