import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Download, 
  Trash2,
  Key,
  Moon,
  Sun,
  Globe
} from 'lucide-react';
import { useResumeStore } from '../store/resumeStore';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
  const { clearResumes, resumes } = useResumeStore();
  const { isDark, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('general');
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'data', label: 'Data', icon: Download }
  ];

  const SettingCard = ({ title, description, children }) => (
    <div className="card">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
      {children}
    </div>
  );

  const GeneralSettings = () => (
    <div className="space-y-6">
      <SettingCard
        title="Appearance"
        description="Customize the look and feel of the application"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Switch between light and dark themes
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isDark ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isDark ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </SettingCard>

      <SettingCard
        title="Language & Region"
        description="Set your preferred language and regional settings"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Language
            </label>
            <select className="input-field">
              <option>English (US)</option>
              <option>English (UK)</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date Format
            </label>
            <select className="input-field">
              <option>MM/DD/YYYY</option>
              <option>DD/MM/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </SettingCard>

      <SettingCard
        title="API Configuration"
        description="Configure your Google Gemini API key for resume analysis"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Google Gemini API Key
            </label>
            <div className="relative">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
                className="input-field pr-10"
              />
              <button
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showApiKey ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Get your API key from the Google AI Studio
            </p>
          </div>
          <button className="btn-primary">
            Save API Key
          </button>
        </div>
      </SettingCard>
    </div>
  );

  const AccountSettings = () => (
    <div className="space-y-6">
      <SettingCard
        title="Profile Information"
        description="Manage your account details and preferences"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Organization (Optional)
            </label>
            <input
              type="text"
              placeholder="Enter your organization"
              className="input-field"
            />
          </div>
          <button className="btn-primary">
            Update Profile
          </button>
        </div>
      </SettingCard>

      <SettingCard
        title="Account Security"
        description="Manage your account security and authentication"
      >
        <div className="space-y-4">
          <button className="btn-secondary w-full flex items-center justify-center gap-2">
            <Key className="h-4 w-4" />
            Change Password
          </button>
          <button className="btn-secondary w-full flex items-center justify-center gap-2">
            <Shield className="h-4 w-4" />
            Enable Two-Factor Authentication
          </button>
        </div>
      </SettingCard>
    </div>
  );

  const NotificationSettings = () => (
    <div className="space-y-6">
      <SettingCard
        title="Email Notifications"
        description="Choose which emails you want to receive"
      >
        <div className="space-y-4">
          {[
            { label: 'Analysis Complete', description: 'Get notified when resume analysis is finished' },
            { label: 'Weekly Summary', description: 'Receive weekly insights about your resumes' },
            { label: 'Tips & Updates', description: 'Get tips to improve your resumes' },
            { label: 'Product Updates', description: 'Stay informed about new features' }
          ].map((notification, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{notification.label}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{notification.description}</p>
              </div>
              <input
                type="checkbox"
                defaultChecked={index < 2}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      </SettingCard>

      <SettingCard
        title="Push Notifications"
        description="Manage in-app notifications"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Desktop Notifications</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Show notifications on your desktop
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
          </div>
        </div>
      </SettingCard>
    </div>
  );

  const PrivacySettings = () => (
    <div className="space-y-6">
      <SettingCard
        title="Data Privacy"
        description="Control how your data is used and stored"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Analytics Collection</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Help improve the service by sharing anonymous usage data
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Crash Reports</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Automatically send crash reports to help fix bugs
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
          </div>
        </div>
      </SettingCard>

      <SettingCard
        title="Data Retention"
        description="Manage how long your data is stored"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Auto-delete resumes after
            </label>
            <select className="input-field">
              <option>Never</option>
              <option>30 days</option>
              <option>90 days</option>
              <option>1 year</option>
            </select>
          </div>
        </div>
      </SettingCard>
    </div>
  );

  const DataSettings = () => (
    <div className="space-y-6">
      <SettingCard
        title="Export Data"
        description="Download your data in various formats"
      >
        <div className="space-y-3">
          <button className="btn-secondary w-full flex items-center justify-center gap-2">
            <Download className="h-4 w-4" />
            Export All Resume Data (JSON)
          </button>
          <button className="btn-secondary w-full flex items-center justify-center gap-2">
            <Download className="h-4 w-4" />
            Export Analytics Report (PDF)
          </button>
          <button className="btn-secondary w-full flex items-center justify-center gap-2">
            <Download className="h-4 w-4" />
            Export Settings Backup
          </button>
        </div>
      </SettingCard>

      <SettingCard
        title="Data Management"
        description="Manage your stored data and reset options"
      >
        <div className="space-y-4">
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="bg-yellow-100 dark:bg-yellow-900/50 p-1 rounded">
                <Trash2 className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-1">
                  Clear All Data
                </h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                  This will permanently delete all your resume data and cannot be undone.
                </p>
                <button
                  onClick={clearResumes}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Clear All Resumes ({resumes.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      </SettingCard>

      <SettingCard
        title="Storage Usage"
        description="View your current storage usage"
      >
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Resumes stored:</span>
            <span className="font-medium">{resumes.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Estimated size:</span>
            <span className="font-medium">{(resumes.length * 0.5).toFixed(1)} MB</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${Math.min((resumes.length / 100) * 100, 100)}%` }}></div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {resumes.length}/100 resumes (no limit in this version)
          </p>
        </div>
      </SettingCard>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings />;
      case 'account':
        return <AccountSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'privacy':
        return <PrivacySettings />;
      case 'data':
        return <DataSettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your account preferences and application settings
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-r-2 border-blue-700 dark:border-blue-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
