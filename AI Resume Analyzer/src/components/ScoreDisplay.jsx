import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle, CheckCircle, Target } from 'lucide-react';

const ScoreDisplay = ({ resumeData }) => {
  const overallScore = resumeData.score || 0;
  const atsScore = resumeData.atsScore || 0;
  
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-100 dark:bg-green-900/30';
    if (score >= 60) return 'bg-yellow-100 dark:bg-yellow-900/30';
    return 'bg-red-100 dark:bg-red-900/30';
  };

  const CircularProgress = ({ score, label, size = 120 }) => {
    const radius = (size - 20) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
      <div className="flex flex-col items-center">
        <div className="relative" style={{ width: size, height: size }}>
          <svg
            className="transform -rotate-90"
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
          >
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200 dark:text-gray-700"
            />
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={getScoreColor(score)}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <motion.div
                className={`text-2xl font-bold ${getScoreColor(score)}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                {score}
              </motion.div>
              <div className="text-xs text-gray-500 dark:text-gray-400">out of 100</div>
            </div>
          </div>
        </div>
        <div className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
          {label}
        </div>
      </div>
    );
  };

  const ScoreBreakdown = () => {
    const categories = [
      { name: 'Contact Info', score: resumeData.contactInfo ? 90 : 20, weight: '20%' },
      { name: 'Experience', score: resumeData.workExperience?.length > 0 ? 85 : 0, weight: '40%' },
      { name: 'Education', score: resumeData.education?.length > 0 ? 80 : 0, weight: '20%' },
      { name: 'Skills', score: resumeData.skills?.length > 0 ? 75 : 0, weight: '20%' }
    ];

    return (
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Score Breakdown</h4>
        {categories.map((category, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {category.name}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">{category.weight}</span>
                <span className={`text-sm font-semibold ${getScoreColor(category.score)}`}>
                  {category.score}%
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                className={`h-2 rounded-full ${
                  category.score >= 80 ? 'bg-green-500' :
                  category.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${category.score}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`card text-center ${getScoreBgColor(overallScore)}`}
      >
        <CircularProgress score={overallScore} label="Overall Score" />
        <div className="mt-4">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(overallScore)} ${getScoreColor(overallScore)}`}>
            {overallScore >= 80 && <CheckCircle className="w-4 h-4 mr-1" />}
            {overallScore >= 60 && overallScore < 80 && <AlertTriangle className="w-4 h-4 mr-1" />}
            {overallScore < 60 && <Target className="w-4 h-4 mr-1" />}
            {overallScore >= 80 ? 'Excellent' : overallScore >= 60 ? 'Good' : 'Needs Improvement'}
          </div>
        </div>
      </motion.div>

      {/* ATS Compatibility */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`card text-center ${getScoreBgColor(atsScore)}`}
      >
        <CircularProgress score={atsScore} label="ATS Compatibility" />
        <div className="mt-4">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(atsScore)} ${getScoreColor(atsScore)}`}>
            <TrendingUp className="w-4 h-4 mr-1" />
            ATS Friendly
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
            {atsScore >= 80 ? 'Excellent ATS compatibility' : 
             atsScore >= 60 ? 'Good ATS compatibility' : 
             'Consider ATS optimization'}
          </p>
        </div>
      </motion.div>

      {/* Score Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <ScoreBreakdown />
      </motion.div>
    </div>
  );
};

export default ScoreDisplay;
