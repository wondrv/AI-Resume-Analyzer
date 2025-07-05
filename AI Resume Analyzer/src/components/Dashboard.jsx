import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  TrendingUp, 
  Users, 
  Award,
  BarChart3,
  Calendar,
  Clock,
  Target
} from 'lucide-react';
import { useResumeStore } from '../store/resumeStore';

const Dashboard = () => {
  const { resumes, analytics } = useResumeStore();

  const stats = [
    {
      title: 'Total Resumes',
      value: analytics.totalResumes,
      change: '+12%',
      changeType: 'positive',
      icon: <FileText className="h-6 w-6" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Average Score',
      value: `${analytics.averageScore}/100`,
      change: '+5%',
      changeType: 'positive',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'bg-green-500'
    },
    {
      title: 'Top Skills Found',
      value: analytics.topSkills.length,
      change: '+8%',
      changeType: 'positive',
      icon: <Award className="h-6 w-6" />,
      color: 'bg-purple-500'
    },
    {
      title: 'Industries',
      value: Object.keys(analytics.industryBreakdown).length,
      change: '+2%',
      changeType: 'positive',
      icon: <Users className="h-6 w-6" />,
      color: 'bg-orange-500'
    }
  ];

  const recentResumes = resumes.slice(-5).reverse();

  const StatCard = ({ stat, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {stat.title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {stat.value}
          </p>
          <p className={`text-sm ${
            stat.changeType === 'positive' 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-red-600 dark:text-red-400'
          }`}>
            {stat.change} from last month
          </p>
        </div>
        <div className={`p-3 rounded-full ${stat.color} text-white`}>
          {stat.icon}
        </div>
      </div>
    </motion.div>
  );

  const ResumeCard = ({ resume, index }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
          {resume.contactInfo?.name?.charAt(0) || 'R'}
        </div>
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white">
            {resume.contactInfo?.name || 'Unknown'}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Analyzed {new Date(resume.analyzedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="text-right">
        <div className={`text-lg font-bold ${
          resume.score >= 80 ? 'text-green-600' :
          resume.score >= 60 ? 'text-yellow-600' : 'text-red-600'
        }`}>
          {resume.score}/100
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">Score</p>
      </div>
    </motion.div>
  );

  const QuickAction = ({ title, description, icon, onClick, color }) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full p-4 text-left bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${color}`}>
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </motion.button>
  );

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Overview of your resume analysis activity and insights
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.title} stat={stat} index={index} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Analyses
                </h3>
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                  View All
                </button>
              </div>
              
              {recentResumes.length > 0 ? (
                <div className="space-y-3">
                  {recentResumes.map((resume, index) => (
                    <ResumeCard key={resume.id} resume={resume} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    No resumes analyzed yet. Start by uploading your first resume!
                  </p>
                </div>
              )}
            </motion.div>

            {/* Top Skills Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Most Common Skills
              </h3>
              
              {analytics.topSkills.length > 0 ? (
                <div className="space-y-4">
                  {analytics.topSkills.slice(0, 8).map((skill, index) => (
                    <div key={skill.skill} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {skill.skill}
                      </span>
                      <div className="flex items-center gap-3 flex-1 ml-4">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <motion.div
                            className="bg-blue-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(skill.count / analytics.totalResumes) * 100}%` }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                          />
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400 min-w-[2rem]">
                          {skill.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  No skills data available yet.
                </p>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <QuickAction
                  title="Analyze Resume"
                  description="Upload and analyze a new resume"
                  icon={<FileText className="h-5 w-5 text-blue-600" />}
                  color="bg-blue-50 dark:bg-blue-900/20"
                  onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'analyzer' }))}
                />
                <QuickAction
                  title="Compare Resumes"
                  description="Compare multiple resumes side by side"
                  icon={<BarChart3 className="h-5 w-5 text-green-600" />}
                  color="bg-green-50 dark:bg-green-900/20"
                  onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'comparison' }))}
                />
                <QuickAction
                  title="View Analytics"
                  description="Detailed insights and trends"
                  icon={<TrendingUp className="h-5 w-5 text-purple-600" />}
                  color="bg-purple-50 dark:bg-purple-900/20"
                  onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'analytics' }))}
                />
              </div>
            </motion.div>

            {/* Industry Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Industry Breakdown
              </h3>
              
              {Object.keys(analytics.industryBreakdown).length > 0 ? (
                <div className="space-y-3">
                  {Object.entries(analytics.industryBreakdown).map(([industry, count], index) => (
                    <div key={industry} className="flex justify-between items-center">
                      <span className="text-sm text-gray-700 dark:text-gray-300">{industry}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {count}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4 text-sm">
                  No industry data available yet.
                </p>
              )}
            </motion.div>

            {/* Recent Activity Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                This Week
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                    <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {resumes.length} resumes analyzed
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">This week</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                    <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Avg. 2 min analysis
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Processing time</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                    <Target className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {analytics.averageScore}% avg. score
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Quality rating</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
