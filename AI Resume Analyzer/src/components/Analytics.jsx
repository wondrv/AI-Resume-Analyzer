import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, PieChart, Activity } from 'lucide-react';
import { useResumeStore } from '../store/resumeStore';

const Analytics = () => {
  const { resumes, analytics } = useResumeStore();
  const [timeFrame, setTimeFrame] = useState('all');

  const chartData = {
    scores: resumes.map(resume => ({
      name: resume.contactInfo?.name || 'Unknown',
      score: resume.score || 0,
      atsScore: resume.atsScore || 0,
      date: new Date(resume.analyzedAt).toLocaleDateString()
    })),
    skills: analytics.topSkills.slice(0, 10),
    industries: Object.entries(analytics.industryBreakdown)
  };

  const ScoreChart = () => (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Score Distribution
      </h3>
      <div className="space-y-4">
        {chartData.scores.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="w-20 text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
              {item.name}
            </div>
            <div className="flex-1 flex gap-2">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-500">Overall</span>
                  <span className="text-xs font-medium">{item.score}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-blue-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.score}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-500">ATS</span>
                  <span className="text-xs font-medium">{item.atsScore}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-green-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.atsScore}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SkillsChart = () => (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Top Skills Across All Resumes
      </h3>
      <div className="space-y-3">
        {chartData.skills.map((skill, index) => (
          <div key={skill.skill} className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {skill.skill}
            </span>
            <div className="flex items-center gap-3 flex-1 ml-4">
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(skill.count / analytics.totalResumes) * 100}%` }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 min-w-[3rem]">
                {skill.count}/{analytics.totalResumes}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const IndustryChart = () => (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Industry Distribution
      </h3>
      {chartData.industries.length > 0 ? (
        <div className="space-y-4">
          {chartData.industries.map(([industry, count], index) => {
            const percentage = (count / analytics.totalResumes) * 100;
            const colors = [
              'bg-blue-500',
              'bg-green-500', 
              'bg-purple-500',
              'bg-orange-500',
              'bg-red-500'
            ];
            return (
              <div key={industry} className="flex items-center gap-4">
                <div className="flex items-center gap-2 min-w-[120px]">
                  <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]}`}></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {industry}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <motion.div
                        className={`h-3 rounded-full ${colors[index % colors.length]}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: index * 0.2, duration: 0.8 }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 ml-3">
                      {count} ({percentage.toFixed(0)}%)
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No industry data available yet.
        </p>
      )}
    </div>
  );

  const MetricsOverview = () => {
    const metrics = [
      {
        title: 'Average Score',
        value: analytics.averageScore,
        suffix: '/100',
        change: '+5%',
        changeType: 'positive',
        icon: <TrendingUp className="h-5 w-5" />,
        color: 'bg-green-500'
      },
      {
        title: 'Highest Score',
        value: Math.max(...resumes.map(r => r.score || 0)),
        suffix: '/100',
        change: '+12%',
        changeType: 'positive',
        icon: <BarChart3 className="h-5 w-5" />,
        color: 'bg-blue-500'
      },
      {
        title: 'Skills Diversity',
        value: analytics.topSkills.length,
        suffix: ' unique',
        change: '+8%',
        changeType: 'positive',
        icon: <PieChart className="h-5 w-5" />,
        color: 'bg-purple-500'
      },
      {
        title: 'Analysis Count',
        value: analytics.totalResumes,
        suffix: ' resumes',
        change: '+20%',
        changeType: 'positive',
        icon: <Activity className="h-5 w-5" />,
        color: 'bg-orange-500'
      }
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {metric.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metric.value}<span className="text-sm text-gray-500">{metric.suffix}</span>
                </p>
                <p className={`text-sm ${
                  metric.changeType === 'positive' 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {metric.change} from last period
                </p>
              </div>
              <div className={`p-3 rounded-full ${metric.color} text-white`}>
                {metric.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  if (resumes.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            No Analytics Data
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Analyze some resumes to see detailed insights and trends.
          </p>
          <button className="btn-primary">
            Analyze Your First Resume
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Analytics & Insights
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Comprehensive analysis of resume data and trends
              </p>
            </div>
            <div className="flex gap-2">
              {['week', 'month', 'all'].map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeFrame(period)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    timeFrame === period
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {period === 'all' ? 'All Time' : `This ${period}`}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <MetricsOverview />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ScoreChart />
          <SkillsChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <IndustryChart />
          
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Performance Trends
            </h3>
            <div className="space-y-6">
              <div className="text-center py-8">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Trend analysis coming soon...
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 card"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Key Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {analytics.topSkills.length > 0 ? analytics.topSkills[0].skill : 'N/A'}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Most Common Skill</p>
            </div>
            
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                {Object.keys(analytics.industryBreakdown).length > 0 
                  ? Object.entries(analytics.industryBreakdown).sort(([,a], [,b]) => b - a)[0][0]
                  : 'N/A'
                }
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Top Industry</p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {resumes.length > 0 
                  ? Math.round(resumes.reduce((sum, r) => sum + (r.workExperience?.length || 0), 0) / resumes.length)
                  : 0
                }
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Work Experiences</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
