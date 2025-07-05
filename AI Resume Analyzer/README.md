# AI Resume Analyzer

A professional, AI-powered resume analysis tool built with React and Vite. Analyze resumes with advanced AI insights, scoring, comparison tools, and comprehensive analytics.

## Features

### 🎯 Core Features
- **AI-Powered Analysis**: Advanced resume analysis using Google Gemini AI
- **Comprehensive Scoring**: Overall score and ATS compatibility rating
- **Resume Comparison**: Side-by-side comparison of multiple resumes
- **Analytics Dashboard**: Detailed insights and trends
- **Export Options**: PDF reports, JSON data, and image summaries

### 🚀 Advanced Features
- **Dark/Light Mode**: Elegant theme switching
- **Professional UI**: Modern, responsive design with animations
- **Data Persistence**: Local storage with state management
- **Real-time Insights**: Live recommendations and improvements
- **Skills Analysis**: Categorized skills with proficiency ratings
- **Industry Breakdown**: Career field analysis and trends

### 📊 Analysis Capabilities
- Contact information extraction
- Professional summary analysis
- Work experience evaluation
- Education background review
- Skills categorization and rating
- Certifications tracking
- Project analysis
- Language proficiency
- ATS optimization scoring
- Personalized recommendations

## Technology Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with custom animations
- **State Management**: Zustand for global state
- **Animation**: Framer Motion for smooth transitions
- **File Handling**: React Dropzone for file uploads
- **Charts**: Recharts for data visualization
- **Export**: jsPDF and html2canvas for exports
- **Icons**: Lucide React icons

## Getting Started

### Prerequisites
- Node.js 16 or higher
- Google Gemini AI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-resume-analyzer
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create a .env file in the root directory
VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

### Getting an API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key and add it to your `.env` file

## Usage

### Analyzing a Resume

1. **Upload**: Drag and drop a PDF resume or click to select
2. **Analyze**: Click "Analyze Resume with AI" button
3. **Review**: Examine the comprehensive analysis results
4. **Export**: Download reports in PDF, JSON, or image format

### Comparing Resumes

1. Navigate to the "Compare Resumes" section
2. Select 2-3 resumes from your analyzed collection
3. View side-by-side comparison metrics
4. Identify strengths and improvement areas

### Analytics Dashboard

- View overall statistics and trends
- Analyze skill distributions across resumes
- Track industry breakdowns
- Monitor performance metrics

## Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.jsx    # Main dashboard view
│   ├── ResumeAnalyzer.jsx # Core analysis component
│   ├── ComparisonTool.jsx # Resume comparison
│   ├── Analytics.jsx    # Analytics and insights
│   ├── Settings.jsx     # Application settings
│   ├── Header.jsx       # Top navigation
│   ├── Sidebar.jsx      # Side navigation
│   ├── ScoreDisplay.jsx # Score visualization
│   ├── ResumeInsights.jsx # AI insights display
│   └── ExportOptions.jsx # Export functionality
├── context/             # React contexts
│   └── ThemeContext.jsx # Theme management
├── store/               # State management
│   └── resumeStore.js   # Zustand store
├── App.jsx             # Main app component
├── main.jsx            # App entry point
└── index.css           # Global styles
```

## Features in Detail

### Resume Analysis
- **Contact Information**: Extracts name, email, phone, LinkedIn, location
- **Professional Summary**: AI-generated summary analysis
- **Work Experience**: Job titles, companies, durations, achievements
- **Education**: Degrees, institutions, years, GPA, honors
- **Skills**: Categorized by type with proficiency ratings
- **Certifications**: Professional certifications and their issuers
- **Projects**: Technical projects with descriptions and technologies
- **Languages**: Language proficiency levels

### Scoring System
- **Overall Score**: Comprehensive 0-100 rating
- **ATS Compatibility**: Applicant tracking system optimization
- **Category Breakdown**: Individual scores for different sections
- **Improvement Recommendations**: Targeted suggestions

### Export Options
- **PDF Report**: Complete analysis in PDF format
- **JSON Data**: Structured data for integration
- **Image Summary**: Visual overview for sharing
- **Copy to Clipboard**: Quick data sharing

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Open an issue on GitHub
- Check the documentation
- Review the FAQ section

## Roadmap

### Upcoming Features
- [ ] Resume builder/editor
- [ ] Job matching capabilities
- [ ] Multi-language support
- [ ] Cloud storage integration
- [ ] Team collaboration features
- [ ] Advanced AI insights
- [ ] Custom scoring criteria
- [ ] Resume templates

---

Built with ❤️ using React, Vite, and Google Gemini AI
