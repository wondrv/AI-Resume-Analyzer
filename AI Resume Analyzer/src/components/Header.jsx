import React from 'react';
import { Menu, Sun, Moon, Download, Settings, Bell } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useResumeStore } from '../store/resumeStore';

const Header = ({ onMenuClick, currentView }) => {
  const { isDark, toggleTheme } = useTheme();
  const { resumes } = useResumeStore();

  const getViewTitle = (view) => {
    const titles = {
      dashboard: 'Dashboard',
      analyzer: 'Resume Analyzer',
      comparison: 'Resume Comparison',
      analytics: 'Analytics',
      settings: 'Settings'
    };
    return titles[view] || 'AI Resume Analyzer';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex items-center ml-4 lg:ml-0">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
              </div>
              <div className="ml-4">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {getViewTitle(currentView)}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {resumes.length} resumes analyzed
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <Bell className="h-5 w-5" />
            </button>
            
            <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <Download className="h-5 w-5" />
            </button>
            
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">U</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
