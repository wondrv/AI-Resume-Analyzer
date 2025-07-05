import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Target,
  Eye,
  FileText,
  Search,
  Award,
  Briefcase,
  GraduationCap
} from 'lucide-react';

const ResumeInsights = ({ resumeData }) => {
  const [activeTab, setActiveTab] = useState('recommendations');

  const recommendations = resumeData.recommendations || [];
  const keywords = resumeData.keywords || [];
  
  const tabs = [
    { id: 'recommendations', label: 'Recommendations', icon: Lightbulb, count: recommendations.length },
    { id: 'keywords', label: 'Keywords', icon: Search, count: keywords.length },
    { id: 'improvements', label: 'Quick Wins', icon: TrendingUp, count: 5 },
    { id: 'strengths', label: 'Strengths', icon: Award, count: 4 }
  ];

  const improvements = [
    {
      title: 'Add Action Verbs',
      description: 'Start bullet points with strong action verbs like "Led", "Developed", "Implemented"',
      priority: 'high',
      impact: 'Increases readability by 25%'
    },
    {
      title: 'Quantify Achievements',
      description: 'Include numbers, percentages, and metrics to demonstrate impact',
      priority: 'high',
      impact: 'Makes accomplishments 3x more compelling'
    },
    {
      title: 'Optimize Length',
      description: 'Keep resume to 1-2 pages for optimal readability',
      priority: 'medium',
      impact: 'Improves recruiter engagement'
    },
    {
      title: 'Update Contact Info',
      description: 'Ensure all contact information is current and professional',
      priority: 'medium',
      impact: 'Prevents missed opportunities'
    },
    {
      title: 'Add Keywords',
      description: 'Include industry-specific keywords to pass ATS screening',
      priority: 'high',
      impact: 'Increases ATS match rate by 40%'
    }
  ];

  const strengths = [
    {
      title: 'Professional Experience',
      description: 'Strong work history with relevant experience',
      icon: <Briefcase className="h-5 w-5" />
    },
    {
      title: 'Technical Skills',
      description: 'Comprehensive technical skill set',
      icon: <Target className="h-5 w-5" />
    },
    {
      title: 'Education Background',
      description: 'Relevant educational qualifications',
      icon: <GraduationCap className="h-5 w-5" />
    },
    {
      title: 'Clear Structure',
      description: 'Well-organized and easy to read format',
      icon: <FileText className="h-5 w-5" />
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      default:
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    }
  };

  const RecommendationCard = ({ recommendation, index }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card border-l-4 border-blue-500"
    >
      <div className="flex items-start gap-3">
        <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full mt-1">
          <Lightbulb className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {recommendation}
        </p>
      </div>
    </motion.div>
  );

  const ImprovementCard = ({ improvement, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-gray-900 dark:text-white">
          {improvement.title}
        </h4>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(improvement.priority)}`}>
          {improvement.priority}
        </span>
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
        {improvement.description}
      </p>
      <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400">
        <TrendingUp className="h-3 w-3" />
        {improvement.impact}
      </div>
    </motion.div>
  );

  const StrengthCard = ({ strength, index }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="card border-l-4 border-green-500 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start gap-3">
        <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-full">
          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
            {strength.title}
          </h4>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {strength.description}
          </p>
        </div>
      </div>
    </motion.div>
  );

  const KeywordCloud = () => (
    <div className="card">
      <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
        Key Resume Keywords
      </h4>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="inline-flex items-center bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-800"
          >
            {keyword}
          </motion.span>
        ))}
      </div>
      {keywords.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          No keywords extracted. Consider adding industry-specific terms.
        </p>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full">
            <Eye className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              AI-Powered Insights
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Detailed analysis and recommendations to improve your resume
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
                {tab.count > 0 && (
                  <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id
                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'recommendations' && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Personalized Recommendations
            </h4>
            {recommendations.length > 0 ? (
              recommendations.map((recommendation, index) => (
                <RecommendationCard
                  key={index}
                  recommendation={recommendation}
                  index={index}
                />
              ))
            ) : (
              <div className="card text-center py-8">
                <Lightbulb className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  No specific recommendations available. Your resume looks good overall!
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'keywords' && <KeywordCloud />}

        {activeTab === 'improvements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {improvements.map((improvement, index) => (
              <ImprovementCard
                key={index}
                improvement={improvement}
                index={index}
              />
            ))}
          </div>
        )}

        {activeTab === 'strengths' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strengths.map((strength, index) => (
              <StrengthCard
                key={index}
                strength={strength}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeInsights;
