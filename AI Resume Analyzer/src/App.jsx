import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Loader2, FileText, User, Briefcase, GraduationCap, Wrench, Sparkles, BarChart3, Download, Share2, Moon, Sun, Menu, X } from 'lucide-react';

// ========================================================================================
// 🔑 CONFIGURATION: ADD YOUR GOOGLE GEMINI API KEY HERE
// ========================================================================================
// Get your free API key from: https://makersuite.google.com/app/apikey
// Replace "YOUR_API_KEY_HERE" with your actual API key
const GEMINI_API_KEY = "YOUR_API_KEY";
// ========================================================================================

// --- Helper Functions ---
const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
});

// Score calculation function
const calculateResumeScore = (resumeData) => {
    let score = 0;
    
    // Contact info completeness (20 points)
    if (resumeData.contactInfo) {
        if (resumeData.contactInfo.name) score += 5;
        if (resumeData.contactInfo.email) score += 5;
        if (resumeData.contactInfo.phone) score += 5;
        if (resumeData.contactInfo.linkedin) score += 5;
    }
    
    // Summary/objective (15 points)
    if (resumeData.summary && resumeData.summary.length > 50) score += 15;
    
    // Work experience (30 points)
    if (resumeData.workExperience && resumeData.workExperience.length > 0) {
        score += Math.min(resumeData.workExperience.length * 10, 30);
    }
    
    // Education (15 points)
    if (resumeData.education && resumeData.education.length > 0) {
        score += Math.min(resumeData.education.length * 7.5, 15);
    }
    
    // Skills (20 points)
    if (resumeData.skills && resumeData.skills.length > 0) {
        score += Math.min(resumeData.skills.length * 2, 20);
    }
    
    return Math.min(score, 100);
};

// Generate improvement suggestions
const generateSuggestions = (resumeData, score) => {
    const suggestions = [];
    
    if (!resumeData.contactInfo?.linkedin) {
        suggestions.push("Add LinkedIn profile URL to increase professional credibility");
    }
    
    if (!resumeData.summary || resumeData.summary.length < 50) {
        suggestions.push("Add a compelling professional summary (50+ words)");
    }
    
    if (!resumeData.workExperience || resumeData.workExperience.length < 2) {
        suggestions.push("Include more work experience entries with detailed descriptions");
    }
    
    if (!resumeData.skills || resumeData.skills.length < 5) {
        suggestions.push("Add more relevant skills to showcase your expertise");
    }
    
    if (score < 70) {
        suggestions.push("Consider adding certifications, projects, or volunteer experience");
    }
    
    return suggestions;
};

// --- UI Components ---

// Enhanced Header Component
const Header = ({ darkMode, toggleDarkMode, onExport, hasData, onTestApi }) => (
    <header className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                        <Sparkles className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        <h1 className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">
                            AI Resume Analyzer
                        </h1>
                    </div>
                </div>
                
                <div className="flex items-center space-x-4">
                    <button
                        onClick={onTestApi}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        Test API
                    </button>
                    
                    {hasData && (
                        <button
                            onClick={onExport}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            <Download className="h-4 w-4 mr-2" />
                            Export Analysis
                        </button>
                    )}
                    
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>
                </div>
            </div>
        </div>
    </header>
);

// Enhanced Upload Zone
const UploadZone = ({ onDrop, loading }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
        onDrop, 
        accept: { 'application/pdf': ['.pdf'] }, 
        disabled: loading 
    });

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
                    isDragActive 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                        : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 bg-gray-50 dark:bg-gray-800/50'
                }`}
            >
                <input {...getInputProps()} />
                <div className="space-y-4">
                    <FileText className="mx-auto h-16 w-16 text-gray-400" />
                    <div>
                        <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                            {isDragActive ? 'Drop your resume here!' : 'Upload your resume'}
                        </p>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Drag & drop your PDF resume here, or click to browse files
                        </p>
                    </div>
                    <div className="text-xs text-gray-400">
                        Supported format: PDF (Max 10MB)
                    </div>
                </div>
            </div>
        </div>
    );
};

// Score Display Component
const ScoreDisplay = ({ score, suggestions }) => {
    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-600 dark:text-green-400';
        if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-red-600 dark:text-red-400';
    };

    const getScoreLabel = (score) => {
        if (score >= 80) return 'Excellent';
        if (score >= 60) return 'Good';
        return 'Needs Improvement';
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
                    {score}/100
                </div>
                <div className={`text-lg font-semibold mt-2 ${getScoreColor(score)}`}>
                    {getScoreLabel(score)}
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mt-4">
                    <div 
                        className={`h-3 rounded-full transition-all duration-500 ${
                            score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${score}%` }}
                    ></div>
                </div>
                
                {suggestions.length > 0 && (
                    <div className="mt-6 text-left">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                            Improvement Suggestions:
                        </h4>
                        <ul className="space-y-2">
                            {suggestions.map((suggestion, index) => (
                                <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                                    <span className="text-blue-500 mr-2">•</span>
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

// Enhanced Info Card
const InfoCard = ({ icon, title, children, className = '' }) => (
    <div className={`bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 ${className}`}>
        <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full">
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
        </div>
        <div className="text-gray-600 dark:text-gray-300 space-y-3">
            {children}
        </div>
    </div>
);

// Skill Badge Component
const SkillBadge = ({ skill }) => (
    <span className="inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full px-3 py-1 text-sm font-medium mr-2 mb-2 hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors">
        {skill}
    </span>
);

// Loading Component
const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-12">
        <div className="text-center">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Analyzing your resume with AI...
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                This may take a few moments
            </p>
        </div>
    </div>
);

// Main App Component
export default function App() {
    const [resumeData, setResumeData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [file, setFile] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [score, setScore] = useState(0);
    const [suggestions, setSuggestions] = useState([]);

    // Dark mode effect
    React.useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    // Test API Key function
    const testApiKey = async () => {
        if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_API_KEY") {
            setError("Please add your Google Gemini API key at the top of App.jsx file. Get one from https://makersuite.google.com/app/apikey");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const testPayload = {
                contents: [{
                    role: "user",
                    parts: [{ text: "Hello, please respond with 'API test successful'" }]
                }]
            };

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(testPayload)
            });

            if (response.ok) {
                alert("✅ API Key is working correctly!");
            } else {
                const errorText = await response.text();
                throw new Error(`API test failed: ${response.status} - ${errorText}`);
            }
        } catch (err) {
            setError(`API Key test failed: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const callGeminiAPI = async (base64File) => {
        setLoading(true);
        setError(null);
        setResumeData(null);

        const prompt = `You are an expert HR assistant and resume analyzer. Analyze the following resume and extract comprehensive information in a structured JSON format. 

IMPORTANT: Return ONLY valid JSON without any markdown formatting, explanations, or additional text.

Please provide detailed analysis including:
1. Complete contact information
2. Professional summary or objective
3. Detailed work experience with responsibilities and achievements
4. Educational background
5. Technical and soft skills
6. Any certifications, projects, or additional sections

The JSON object should have these exact keys: 'contactInfo', 'summary', 'workExperience', 'education', 'skills', 'certifications', 'projects'.

Rules for JSON output:
- Use only valid JSON syntax
- Escape all quotes and special characters properly
- Do not include any text before or after the JSON
- Keep descriptions concise to avoid JSON parsing issues
- Use empty arrays [] if no data is found for a section

Make the analysis thorough and professional, extracting as much relevant detail as possible.`;

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
                                    gpa: { type: "STRING" }
                                }
                            }
                        },
                        skills: {
                            type: "ARRAY",
                            items: { type: "STRING" }
                        },
                        certifications: {
                            type: "ARRAY",
                            items: { type: "STRING" }
                        },
                        projects: {
                            type: "ARRAY",
                            items: {
                                type: "OBJECT",
                                properties: {
                                    name: { type: "STRING" },
                                    description: { type: "STRING" },
                                    technologies: { type: "ARRAY", items: { type: "STRING" } }
                                }
                            }
                        }
                    }
                }
            }
        };

        try {
            // Check if API key is provided
            if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_API_KEY") {
                throw new Error("Please add your Google Gemini API key at the top of App.jsx file. Get one from https://makersuite.google.com/app/apikey");
            }
            
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
            
            console.log("Making API request to:", apiUrl);
            console.log("Payload size:", JSON.stringify(payload).length);
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            console.log("Response status:", response.status, response.statusText);

            if (!response.ok) {
                const errorBody = await response.text();
                console.error("API Error Response:", errorBody);
                
                if (response.status === 400) {
                    throw new Error(`Invalid request: ${errorBody}. Please check if your PDF is valid and not corrupted.`);
                } else if (response.status === 401) {
                    throw new Error(`Invalid API key. Please check your Google Gemini API key.`);
                } else if (response.status === 403) {
                    throw new Error(`API access forbidden. Please check your API key permissions and billing status.`);
                } else if (response.status === 429) {
                    throw new Error(`Rate limit exceeded. Please wait a moment and try again.`);
                } else {
                    throw new Error(`API Error (${response.status}): ${errorBody}`);
                }
            }

            const result = await response.json();
            console.log("API Response:", result);
            
            if (result.candidates && result.candidates.length > 0) {
                let jsonText = result.candidates[0].content.parts[0].text;
                console.log("Raw JSON from API:", jsonText);
                
                // Clean the JSON text to handle common issues
                try {
                    // Remove any markdown code blocks if present
                    jsonText = jsonText.replace(/```json\s*/g, '').replace(/```\s*$/g, '');
                    
                    // Remove any leading/trailing whitespace
                    jsonText = jsonText.trim();
                    
                    // Try to find JSON content if it's wrapped in other text
                    const jsonStart = jsonText.indexOf('{');
                    const jsonEnd = jsonText.lastIndexOf('}');
                    
                    if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
                        jsonText = jsonText.substring(jsonStart, jsonEnd + 1);
                    }
                    
                    console.log("Cleaned JSON:", jsonText);
                    
                    // Attempt to parse the JSON
                    const parsedJson = JSON.parse(jsonText);
                    
                    // Validate that we have the expected structure
                    if (!parsedJson || typeof parsedJson !== 'object') {
                        throw new Error("Invalid response structure from AI");
                    }
                    
                    setResumeData(parsedJson);
                    
                    // Calculate score and suggestions
                    const calculatedScore = calculateResumeScore(parsedJson);
                    const improvementSuggestions = generateSuggestions(parsedJson, calculatedScore);
                    setScore(calculatedScore);
                    setSuggestions(improvementSuggestions);
                    
                } catch (parseError) {
                    console.error("JSON parsing failed:", parseError);
                    console.error("Problematic JSON text:", jsonText);
                    
                    // Try to extract partial information if JSON is malformed
                    try {
                        // Attempt to fix common JSON issues
                        let fixedJson = jsonText
                            .replace(/,\s*}/g, '}')  // Remove trailing commas
                            .replace(/,\s*]/g, ']')   // Remove trailing commas in arrays
                            .replace(/\n/g, ' ')      // Replace newlines
                            .replace(/\t/g, ' ')      // Replace tabs
                            .replace(/\\/g, '\\\\')   // Escape backslashes
                            .replace(/"/g, '\\"')     // Escape quotes
                            .replace(/\\"/g, '"');    // Fix over-escaped quotes
                        
                        // Try parsing the fixed version
                        const parsedJson = JSON.parse(fixedJson);
                        setResumeData(parsedJson);
                        
                        const calculatedScore = calculateResumeScore(parsedJson);
                        const improvementSuggestions = generateSuggestions(parsedJson, calculatedScore);
                        setScore(calculatedScore);
                        setSuggestions(improvementSuggestions);
                        
                    } catch (secondParseError) {
                        console.error("Second JSON parsing attempt failed:", secondParseError);
                        throw new Error("The AI response could not be parsed. The resume content might be too complex. Please try with a simpler PDF or try again.");
                    }
                }
            } else {
                console.error("No candidates in response:", result);
                throw new Error("No content received from the API. The model may have refused to process the content.");
            }

        } catch (err) {
            console.error("Full error details:", err);
            if (err.message.includes('JSON.parse')) {
                setError("Failed to parse the AI response. The resume might be too complex or corrupted. Please try a different PDF.");
            } else if (err.message.includes('fetch')) {
                setError("Network error. Please check your internet connection and try again.");
            } else {
                setError(err.message || "Failed to analyze the resume. Please try again with a different PDF.");
            }
        } finally {
            setLoading(false);
        }
    };

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles.length > 0) {
            const selectedFile = acceptedFiles[0];
            if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
                setError("File size too large. Please select a file under 10MB.");
                return;
            }
            setFile(selectedFile);
            setResumeData(null);
            setError(null);
            setScore(0);
            setSuggestions([]);
        }
    }, []);
    
    const handleAnalyze = async () => {
        if (file) {
            try {
                const base64 = await fileToBase64(file);
                await callGeminiAPI(base64);
            } catch (err) {
                setError("Could not read the file. Please try again with a different PDF.");
                console.error(err);
            }
        }
    };
    
    const handleReset = () => {
        setFile(null);
        setResumeData(null);
        setError(null);
        setLoading(false);
        setScore(0);
        setSuggestions([]);
    };

    const handleExport = () => {
        if (resumeData) {
            const exportData = {
                analysisDate: new Date().toLocaleDateString(),
                score: score,
                suggestions: suggestions,
                ...resumeData
            };
            
            const dataStr = JSON.stringify(exportData, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
            
            const exportFileDefaultName = `resume-analysis-${new Date().getTime()}.json`;
            
            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <Header 
                darkMode={darkMode} 
                toggleDarkMode={toggleDarkMode}
                onExport={handleExport}
                hasData={!!resumeData}
                onTestApi={testApiKey}
            />
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Professional Resume Analysis
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Get instant AI-powered insights, scoring, and improvement suggestions for your resume
                    </p>
                </div>

                {/* API Key Setup Notice */}
                {(!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_API_KEY_HERE") && (
                    <div className="max-w-4xl mx-auto mb-8">
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <Sparkles className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                                        Setup Required: Add Your Google Gemini API Key
                                    </h3>
                                    <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                                        <p className="mb-2">To start analyzing resumes, you need a free Google Gemini API key:</p>
                                        <ol className="list-decimal list-inside space-y-1 mb-3">
                                            <li>Visit <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-900 dark:hover:text-yellow-100">Google AI Studio</a></li>
                                            <li>Sign in with your Google account</li>
                                            <li>Click "Create API Key"</li>
                                            <li>Copy the generated API key</li>
                                            <li>Replace <code className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">"YOUR_API_KEY_HERE"</code> at the top of App.jsx with your key</li>
                                        </ol>
                                        <p className="text-xs">💡 The API key is free and includes generous usage limits for testing.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <main className="space-y-8">
                    {/* Upload Section */}
                    {!file && !loading && (
                        <UploadZone onDrop={onDrop} loading={loading} />
                    )}

                    {/* File Preview and Analysis Button */}
                    {file && !loading && (
                        <div className="max-w-2xl mx-auto">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-8 w-8 text-blue-500" />
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white">{file.name}</p>
                                            <p className="text-sm text-gray-500">
                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleReset}
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                                
                                <button
                                    onClick={handleAnalyze}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                                >
                                    <BarChart3 className="h-5 w-5" />
                                    Analyze Resume
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Loading State */}
                    {loading && <LoadingSpinner />}

                    {/* Error State */}
                    {error && (
                        <div className="max-w-2xl mx-auto">
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                                <div className="flex items-center">
                                    <div className="text-red-600 dark:text-red-400">
                                        <X className="h-5 w-5" />
                                    </div>
                                    <p className="ml-3 text-red-700 dark:text-red-300">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Results Section */}
                    {resumeData && (
                        <div className="max-w-7xl mx-auto space-y-8">
                            {/* Score and Suggestions */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-1">
                                    <ScoreDisplay score={score} suggestions={suggestions} />
                                </div>
                                
                                {/* Contact Information */}
                                <div className="lg:col-span-2">
                                    <InfoCard 
                                        icon={<User className="h-6 w-6 text-blue-600 dark:text-blue-400" />} 
                                        title="Contact Information"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <p><strong>Name:</strong> {resumeData.contactInfo?.name || 'N/A'}</p>
                                                <p><strong>Email:</strong> {resumeData.contactInfo?.email || 'N/A'}</p>
                                                <p><strong>Phone:</strong> {resumeData.contactInfo?.phone || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <p><strong>Location:</strong> {resumeData.contactInfo?.location || 'N/A'}</p>
                                                <p><strong>LinkedIn:</strong> 
                                                    {resumeData.contactInfo?.linkedin ? (
                                                        <a href={resumeData.contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-1">
                                                            Profile
                                                        </a>
                                                    ) : ' N/A'}
                                                </p>
                                                <p><strong>Website:</strong> 
                                                    {resumeData.contactInfo?.website ? (
                                                        <a href={resumeData.contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-1">
                                                            {resumeData.contactInfo.website}
                                                        </a>
                                                    ) : ' N/A'}
                                                </p>
                                            </div>
                                        </div>
                                    </InfoCard>
                                </div>
                            </div>

                            {/* Summary */}
                            {resumeData.summary && (
                                <InfoCard 
                                    icon={<Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />} 
                                    title="Professional Summary"
                                >
                                    <p className="text-base leading-relaxed">{resumeData.summary}</p>
                                </InfoCard>
                            )}

                            {/* Work Experience and Education */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Work Experience */}
                                <InfoCard 
                                    icon={<Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />} 
                                    title="Work Experience"
                                >
                                    {resumeData.workExperience?.length > 0 ? resumeData.workExperience.map((job, index) => (
                                        <div key={index} className="pb-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0 last:pb-0">
                                            <h4 className="font-bold text-lg text-gray-900 dark:text-white">{job.title}</h4>
                                            <p className="text-blue-600 dark:text-blue-400 font-semibold">{job.company}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{job.duration}</p>
                                            <p className="text-gray-700 dark:text-gray-300 mb-2">{job.description}</p>
                                            {job.achievements && job.achievements.length > 0 && (
                                                <div>
                                                    <p className="font-semibold text-gray-900 dark:text-white mb-2">Key Achievements:</p>
                                                    <ul className="list-disc list-inside space-y-1">
                                                        {job.achievements.map((achievement, idx) => (
                                                            <li key={idx} className="text-sm text-gray-600 dark:text-gray-400">{achievement}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    )) : <p>No work experience found.</p>}
                                </InfoCard>

                                {/* Education */}
                                <InfoCard 
                                    icon={<GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />} 
                                    title="Education"
                                >
                                    {resumeData.education?.length > 0 ? resumeData.education.map((edu, index) => (
                                        <div key={index} className="pb-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 last:pb-0">
                                            <h4 className="font-bold text-gray-900 dark:text-white">{edu.degree}</h4>
                                            <p className="text-blue-600 dark:text-blue-400">{edu.institution}</p>
                                            <div className="flex justify-between items-center mt-1">
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{edu.year}</p>
                                                {edu.gpa && <p className="text-sm text-gray-600 dark:text-gray-400">GPA: {edu.gpa}</p>}
                                            </div>
                                        </div>
                                    )) : <p>No education details found.</p>}
                                </InfoCard>
                            </div>

                            {/* Skills and Additional Sections */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Skills */}
                                <InfoCard 
                                    icon={<Wrench className="h-6 w-6 text-blue-600 dark:text-blue-400" />} 
                                    title="Skills"
                                >
                                    {resumeData.skills?.length > 0 ? (
                                        <div className="flex flex-wrap">
                                            {resumeData.skills.map((skill, index) => (
                                                <SkillBadge key={index} skill={skill} />
                                            ))}
                                        </div>
                                    ) : <p>No skills found.</p>}
                                </InfoCard>

                                {/* Certifications */}
                                {resumeData.certifications && resumeData.certifications.length > 0 && (
                                    <InfoCard 
                                        icon={<FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />} 
                                        title="Certifications"
                                    >
                                        <ul className="space-y-2">
                                            {resumeData.certifications.map((cert, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="text-blue-500 mr-2">•</span>
                                                    {cert}
                                                </li>
                                            ))}
                                        </ul>
                                    </InfoCard>
                                )}
                            </div>

                            {/* Projects */}
                            {resumeData.projects && resumeData.projects.length > 0 && (
                                <InfoCard 
                                    icon={<Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />} 
                                    title="Projects"
                                >
                                    {resumeData.projects.map((project, index) => (
                                        <div key={index} className="pb-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 last:pb-0">
                                            <h4 className="font-bold text-gray-900 dark:text-white">{project.name}</h4>
                                            <p className="text-gray-700 dark:text-gray-300 mb-2">{project.description}</p>
                                            {project.technologies && project.technologies.length > 0 && (
                                                <div className="flex flex-wrap">
                                                    {project.technologies.map((tech, idx) => (
                                                        <span key={idx} className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-1 text-xs text-gray-700 dark:text-gray-300 mr-2 mb-1">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </InfoCard>
                            )}

                            {/* Action Buttons */}
                            <div className="flex justify-center gap-4 pt-8">
                                <button
                                    onClick={handleReset}
                                    className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors duration-200"
                                >
                                    Analyze Another Resume
                                </button>
                                <button
                                    onClick={handleExport}
                                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center gap-2"
                                >
                                    <Download className="h-5 w-5" />
                                    Export Analysis
                                </button>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
