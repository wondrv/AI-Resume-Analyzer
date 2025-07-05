import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitCompare, Plus, X, Star, TrendingUp } from 'lucide-react';
import { useResumeStore } from '../store/resumeStore';

const ComparisonTool = () => {
  const { resumes } = useResumeStore();
  const [selectedResumes, setSelectedResumes] = useState([]);

  const handleSelectResume = (resume) => {
    if (selectedResumes.find(r => r.id === resume.id)) {
      setSelectedResumes(selectedResumes.filter(r => r.id !== resume.id));
    } else if (selectedResumes.length < 3) {
      setSelectedResumes([...selectedResumes, resume]);
    }
  };

  const ComparisonCard = ({ resume, isSelected, onSelect }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(resume)}
      className={`card cursor-pointer transition-all ${
        isSelected 
          ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' 
          : 'hover:shadow-lg'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {resume.contactInfo?.name?.charAt(0) || 'R'}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {resume.contactInfo?.name || 'Unknown'}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(resume.analyzedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-xl font-bold ${
            resume.score >= 80 ? 'text-green-600' :
            resume.score >= 60 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {resume.score}/100
          </div>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.round(resume.score / 20) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Experience:</span>
          <span className="font-medium">{resume.workExperience?.length || 0} jobs</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Skills:</span>
          <span className="font-medium">{resume.skills?.length || 0}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Education:</span>
          <span className="font-medium">{resume.education?.length || 0}</span>
        </div>
      </div>
    </motion.div>
  );

  if (resumes.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <GitCompare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            No Resumes to Compare
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            You need at least 2 analyzed resumes to use the comparison tool.
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Resume Comparison
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Compare up to 3 resumes side by side to identify strengths and areas for improvement
          </p>
        </motion.div>

        {selectedResumes.length < 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card mb-8 text-center bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <GitCompare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="font-medium text-blue-900 dark:text-blue-100">
                Select {2 - selectedResumes.length} more resume{2 - selectedResumes.length !== 1 ? 's' : ''} to start comparing
              </span>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Click on resumes below to add them to the comparison
            </p>
          </motion.div>
        )}

        {selectedResumes.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Comparison Results
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                        Metric
                      </th>
                      {selectedResumes.map((resume) => (
                        <th key={resume.id} className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">
                          {resume.contactInfo?.name || 'Unknown'}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                        Overall Score
                      </td>
                      {selectedResumes.map((resume) => (
                        <td key={resume.id} className="text-center py-3 px-4">
                          <span className={`font-bold ${
                            resume.score >= 80 ? 'text-green-600' :
                            resume.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {resume.score}/100
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                        Work Experience
                      </td>
                      {selectedResumes.map((resume) => (
                        <td key={resume.id} className="text-center py-3 px-4">
                          {resume.workExperience?.length || 0} positions
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                        Skills Count
                      </td>
                      {selectedResumes.map((resume) => (
                        <td key={resume.id} className="text-center py-3 px-4">
                          {resume.skills?.length || 0} skills
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                        Education
                      </td>
                      {selectedResumes.map((resume) => (
                        <td key={resume.id} className="text-center py-3 px-4">
                          {resume.education?.length || 0} degrees
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                        ATS Score
                      </td>
                      {selectedResumes.map((resume) => (
                        <td key={resume.id} className="text-center py-3 px-4">
                          <span className={`font-bold ${
                            (resume.atsScore || 0) >= 80 ? 'text-green-600' :
                            (resume.atsScore || 0) >= 60 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {resume.atsScore || 0}/100
                          </span>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Available Resumes ({resumes.length})
            </h3>
            {selectedResumes.length > 0 && (
              <button
                onClick={() => setSelectedResumes([])}
                className="btn-secondary text-sm"
              >
                Clear Selection
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <ComparisonCard
                key={resume.id}
                resume={resume}
                isSelected={selectedResumes.find(r => r.id === resume.id)}
                onSelect={handleSelectResume}
              />
            ))}
          </div>
        </div>

        {selectedResumes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Selected for Comparison ({selectedResumes.length}/3)
            </h3>
            <div className="flex flex-wrap gap-3">
              {selectedResumes.map((resume) => (
                <div
                  key={resume.id}
                  className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-2 rounded-full"
                >
                  <span className="text-sm font-medium">
                    {resume.contactInfo?.name || 'Unknown'}
                  </span>
                  <button
                    onClick={() => handleSelectResume(resume)}
                    className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ComparisonTool;
