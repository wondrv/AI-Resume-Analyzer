import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Loader2, 
  FileText, 
  User, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  Sparkles,
  Download,
  Share2,
  Star,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useResumeStore } from '../store/resumeStore';
import ScoreDisplay from './ScoreDisplay';
import ResumeInsights from './ResumeInsights';
import ExportOptions from './ExportOptions';

// Helper Functions
const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
});

// UI Components
const UploadZone = ({ onDrop, loading }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: { 'application/pdf': ['.pdf'] }, 
    disabled: loading 
  });

  return (
    <motion.div
      {...getRootProps()}
      className={`w-full max-w-2xl mx-auto border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
        isDragActive 
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
          : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 bg-gray-50 dark:bg-gray-800/50'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <input {...getInputProps()} />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <FileText className="mx-auto h-16 w-16 text-gray-400 mb-4" />
      </motion.div>
      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
        {isDragActive ? 'Drop your resume here' : 'Upload your resume'}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-2">
        Drag & drop your resume here, or click to select a file
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        PDF format only • Max 10MB
      </p>
    </motion.div>
  );
};

const InfoCard = ({ icon, title, children, score, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`card hover:shadow-xl transition-all duration-300 ${className}`}
  >
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
      </div>
      {score !== undefined && (
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.round(score / 20) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {score}/100
          </span>
        </div>
      )}
    </div>
    <div className="text-gray-600 dark:text-gray-300 space-y-3">
      {children}
    </div>
  </motion.div>
);

const SkillBadge = ({ skill, proficiency }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full px-3 py-1 text-sm font-medium mr-2 mb-2 shadow-md"
  >
    {skill}
    {proficiency && (
      <span className="ml-2 bg-white bg-opacity-20 rounded-full px-2 py-0.5 text-xs">
        {proficiency}%
      </span>
    )}
  </motion.span>
);

const ResumeAnalyzer = () => {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [showExport, setShowExport] = useState(false);
  
  const { addResume } = useResumeStore();

  const callGeminiAPI = async (base64File) => {
    setLoading(true);
    setError(null);
    setResumeData(null);

    const prompt = `You are an expert HR assistant and resume analyzer. Analyze the following resume and extract comprehensive information in a structured JSON format. 

    The JSON object should have these exact keys:
    - 'contactInfo': object with name, email, phone, linkedin, location, website
    - 'summary': string (professional summary)
    - 'workExperience': array of objects with title, company, duration, description, achievements
    - 'education': array of objects with degree, institution, year, gpa, honors
    - 'skills': array of objects with name, category, proficiency (estimated 1-100)
    - 'certifications': array of objects with name, issuer, year
    - 'projects': array of objects with name, description, technologies, url
    - 'languages': array of objects with language, proficiency
    - 'recommendations': array of improvement suggestions
    - 'keywords': array of important keywords found
    - 'atsScore': number (1-100 ATS compatibility score)
    
    Provide detailed analysis and improvement suggestions.`;

    const payload = {
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: "application/pdf",
                data: base64File
              }
            }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            contactInfo: {
              type: "OBJECT",
              properties: {
                name: { type: "STRING" },
                email: { type: "STRING" },
                phone: { type: "STRING" },
                linkedin: { type: "STRING" },
                location: { type: "STRING" },
                website: { type: "STRING" }
              }
            },
            summary: { type: "STRING" },
            workExperience: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  title: { type: "STRING" },
                  company: { type: "STRING" },
                  duration: { type: "STRING" },
                  description: { type: "STRING" },
                  achievements: { type: "ARRAY", items: { type: "STRING" } }
                }
              }
            },
            education: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  degree: { type: "STRING" },
                  institution: { type: "STRING" },
                  year: { type: "STRING" },
                  gpa: { type: "STRING" },
                  honors: { type: "STRING" }
                }
              }
            },
            skills: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  name: { type: "STRING" },
                  category: { type: "STRING" },
                  proficiency: { type: "NUMBER" }
                }
              }
            },
            certifications: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  name: { type: "STRING" },
                  issuer: { type: "STRING" },
                  year: { type: "STRING" }
                }
              }
            },
            projects: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  name: { type: "STRING" },
                  description: { type: "STRING" },
                  technologies: { type: "ARRAY", items: { type: "STRING" } },
                  url: { type: "STRING" }
                }
              }
            },
            languages: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  language: { type: "STRING" },
                  proficiency: { type: "STRING" }
                }
              }
            },
            recommendations: {
              type: "ARRAY",
              items: { type: "STRING" }
            },
            keywords: {
              type: "ARRAY",
              items: { type: "STRING" }
            },
            atsScore: { type: "NUMBER" }
          }
        }
      }
    };

    try {
      const apiKey = ""; // API key should be in environment variables
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorBody}`);
      }

      const result = await response.json();
      
      if (result.candidates && result.candidates.length > 0) {
        const jsonText = result.candidates[0].content.parts[0].text;
        const parsedJson = JSON.parse(jsonText);
        setResumeData(parsedJson);
        addResume(parsedJson);
      } else {
        throw new Error("No content received from the API.");
      }

    } catch (err) {
      console.error(err);
      setError("Failed to analyze the resume. Please check your API key and try again.");
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setResumeData(null);
      setError(null);
    }
  }, []);
  
  const handleAnalyze = async () => {
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        await callGeminiAPI(base64);
      } catch (err) {
        setError("Could not read the file. Please try again.");
        console.error(err);
      }
    }
  };
  
  const handleReset = () => {
    setFile(null);
    setResumeData(null);
    setError(null);
    setLoading(false);
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto p-6">
        <AnimatePresence mode="wait">
          {!file && !resumeData && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Analyze Your Resume with AI
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Get comprehensive insights, ATS compatibility scores, and personalized recommendations 
                  to improve your resume and land your dream job.
                </p>
              </div>
              <UploadZone onDrop={onDrop} loading={loading} />
            </motion.div>
          )}

          {file && !resumeData && !loading && (
            <motion.div
              key="file-selected"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="card mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-blue-500" />
                    <div className="text-left">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {file.name}
                      </span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleReset}
                    className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                    disabled={loading}
                  >
                    Remove
                  </button>
                </div>
              </div>
              
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="btn-primary px-8 py-4 text-lg"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Analyze Resume with AI
              </button>
            </motion.div>
          )}

          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="loading-dots mx-auto mb-6">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Analyzing Your Resume
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI is carefully reviewing your resume and generating insights...
              </p>
            </motion.div>
          )}

          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                  Analysis Failed
                </h3>
                <p className="text-red-700 dark:text-red-300 mb-4">{error}</p>
                <button
                  onClick={handleReset}
                  className="btn-secondary"
                >
                  Try Again
                </button>
              </div>
            </motion.div>
          )}

          {resumeData && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Header with actions */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Resume Analysis Complete
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Comprehensive AI-powered insights for {resumeData.contactInfo?.name || 'your resume'}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowExport(true)}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Export
                  </button>
                  <button className="btn-secondary flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                  <button
                    onClick={handleReset}
                    className="btn-primary"
                  >
                    Analyze Another
                  </button>
                </div>
              </div>

              {/* Score Overview */}
              <ScoreDisplay resumeData={resumeData} />

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Contact & Summary */}
                <div className="space-y-6">
                  <InfoCard 
                    icon={<User className="h-6 w-6 text-blue-600 dark:text-blue-400" />} 
                    title="Contact Information"
                  >
                    <div className="space-y-2">
                      <p><strong>Name:</strong> {resumeData.contactInfo?.name || 'N/A'}</p>
                      <p><strong>Email:</strong> {resumeData.contactInfo?.email || 'N/A'}</p>
                      <p><strong>Phone:</strong> {resumeData.contactInfo?.phone || 'N/A'}</p>
                      <p><strong>Location:</strong> {resumeData.contactInfo?.location || 'N/A'}</p>
                      {resumeData.contactInfo?.linkedin && (
                        <p>
                          <strong>LinkedIn:</strong>{' '}
                          <a 
                            href={resumeData.contactInfo.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-500 hover:underline"
                          >
                            View Profile
                          </a>
                        </p>
                      )}
                      {resumeData.contactInfo?.website && (
                        <p>
                          <strong>Website:</strong>{' '}
                          <a 
                            href={resumeData.contactInfo.website} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-500 hover:underline"
                          >
                            Visit Site
                          </a>
                        </p>
                      )}
                    </div>
                  </InfoCard>

                  <InfoCard 
                    icon={<Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />} 
                    title="Professional Summary"
                  >
                    <p className="leading-relaxed">{resumeData.summary || 'No summary available.'}</p>
                  </InfoCard>
                </div>

                {/* Middle Column - Experience & Education */}
                <div className="space-y-6">
                  <InfoCard 
                    icon={<Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />} 
                    title="Work Experience"
                  >
                    {resumeData.workExperience?.length > 0 ? (
                      <div className="space-y-4">
                        {resumeData.workExperience.map((job, index) => (
                          <div key={index} className="border-l-4 border-blue-500 pl-4">
                            <h4 className="font-bold text-lg text-gray-900 dark:text-white">
                              {job.title}
                            </h4>
                            <p className="font-semibold text-blue-600 dark:text-blue-400">
                              {job.company}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                              {job.duration}
                            </p>
                            <p className="text-sm mb-2">{job.description}</p>
                            {job.achievements && job.achievements.length > 0 && (
                              <ul className="list-disc list-inside text-sm space-y-1 text-gray-600 dark:text-gray-300">
                                {job.achievements.map((achievement, i) => (
                                  <li key={i}>{achievement}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No work experience found.</p>
                    )}
                  </InfoCard>

                  <InfoCard 
                    icon={<GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />} 
                    title="Education"
                  >
                    {resumeData.education?.length > 0 ? (
                      <div className="space-y-3">
                        {resumeData.education.map((edu, index) => (
                          <div key={index} className="border-l-4 border-green-500 pl-4">
                            <h4 className="font-bold text-gray-900 dark:text-white">{edu.degree}</h4>
                            <p className="font-semibold text-green-600 dark:text-green-400">{edu.institution}</p>
                            <div className="flex justify-between items-center">
                              <p className="text-sm text-gray-500 dark:text-gray-400">{edu.year}</p>
                              {edu.gpa && (
                                <p className="text-sm font-medium">GPA: {edu.gpa}</p>
                              )}
                            </div>
                            {edu.honors && (
                              <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">{edu.honors}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No education details found.</p>
                    )}
                  </InfoCard>
                </div>

                {/* Right Column - Skills & More */}
                <div className="space-y-6">
                  <InfoCard 
                    icon={<Wrench className="h-6 w-6 text-blue-600 dark:text-blue-400" />} 
                    title="Skills & Expertise"
                  >
                    {resumeData.skills?.length > 0 ? (
                      <div className="space-y-4">
                        {Object.entries(
                          resumeData.skills.reduce((acc, skill) => {
                            const category = skill.category || 'Other';
                            if (!acc[category]) acc[category] = [];
                            acc[category].push(skill);
                            return acc;
                          }, {})
                        ).map(([category, skills]) => (
                          <div key={category}>
                            <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                              {category}
                            </h5>
                            <div className="flex flex-wrap gap-1">
                              {skills.map((skill, index) => (
                                <SkillBadge 
                                  key={index} 
                                  skill={skill.name} 
                                  proficiency={skill.proficiency} 
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No skills found.</p>
                    )}
                  </InfoCard>

                  {/* Additional sections */}
                  {resumeData.certifications?.length > 0 && (
                    <InfoCard 
                      icon={<CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />} 
                      title="Certifications"
                    >
                      <div className="space-y-2">
                        {resumeData.certifications.map((cert, index) => (
                          <div key={index} className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{cert.name}</p>
                              <p className="text-sm text-gray-500">{cert.issuer}</p>
                            </div>
                            <span className="text-sm text-gray-400">{cert.year}</span>
                          </div>
                        ))}
                      </div>
                    </InfoCard>
                  )}
                </div>
              </div>

              {/* Insights Section */}
              <ResumeInsights resumeData={resumeData} />

              {/* Export Modal */}
              {showExport && (
                <ExportOptions
                  resumeData={resumeData}
                  onClose={() => setShowExport(false)}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
