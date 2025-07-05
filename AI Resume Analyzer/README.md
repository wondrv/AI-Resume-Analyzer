# 🚀 AI Resume Analyzer

A powerful, modern web application that uses Google's Gemini AI to analyze resumes and provide intelligent insights, scoring, and improvement suggestions.

![AI Resume Analyzer](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-4.4.5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white)

## ✨ Features

### 🎯 **Core Functionality**
- **AI-Powered Analysis**: Uses Google Gemini 1.5 Flash for intelligent resume parsing
- **Smart Scoring System**: Calculates resume scores (0-100) based on completeness and quality
- **Improvement Suggestions**: Provides personalized recommendations for resume enhancement
- **Comprehensive Data Extraction**: Extracts contact info, work experience, education, skills, certifications, and projects

### 🎨 **User Experience**
- **Modern UI/UX**: Clean, responsive design with smooth animations
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Drag & Drop Upload**: Easy PDF resume upload with file validation
- **Real-time Feedback**: Loading states, progress indicators, and detailed error messages
- **Export Functionality**: Download analysis results as JSON

### 🔧 **Technical Features**
- **Robust Error Handling**: Multiple fallback strategies for JSON parsing
- **API Key Management**: Simple configuration with validation
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Type Safety**: Comprehensive input validation and error recovery

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Google Gemini API key (free)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/wondrv/ai-resume-analyzer.git
cd ai-resume-analyzer
```

2. **Install dependencies**
```bash
npm install
```

3. **Get your Google Gemini API key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy the generated API key

4. **Configure API key**
   - Open `src/App.jsx`
   - Find line 10: `const GEMINI_API_KEY = "YOUR_API_KEY";`
   - Replace `"YOUR_API_KEY"` with your actual API key

5. **Start the development server**
```bash
npm run dev
```

6. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Start analyzing resumes! 🎉

## 📋 Usage

### Basic Usage
1. **Upload Resume**: Drag and drop a PDF file or click to browse
2. **Analyze**: Click the "Analyze Resume" button
3. **Review Results**: View the comprehensive analysis with scoring and suggestions
4. **Export**: Download the results as JSON for future reference

### API Key Testing
- Click the "Test API" button in the header to verify your API key is working
- The system will show clear error messages if there are any issues

### Features Overview
- **Resume Score**: Real-time scoring from 0-100 based on completeness
- **Contact Analysis**: Complete contact information extraction
- **Work Experience**: Detailed job history with achievements
- **Education**: Academic background with GPA if available
- **Skills**: Interactive skill badges
- **Projects & Certifications**: Additional resume sections
- **Improvement Tips**: AI-powered suggestions for better resumes

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.2.0
- **Build Tool**: Vite 4.4.5
- **Styling**: Tailwind CSS 3.3.3
- **UI Components**: Lucide React (icons)
- **File Handling**: React Dropzone
- **AI Service**: Google Gemini 1.5 Flash
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## 📦 Project Structure

```
ai-resume-analyzer/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx              # Main application component
│   ├── index.css            # Global styles and Tailwind imports
│   └── main.jsx             # Application entry point
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.js          # Vite build configuration
└── README.md               # Project documentation
```

## 🔧 Configuration

### Environment Variables
The application uses a simple configuration approach. Edit the `GEMINI_API_KEY` constant in `src/App.jsx`:

```javascript
// ========================================================================================
// 🔑 CONFIGURATION: ADD YOUR GOOGLE GEMINI API KEY HERE
// ========================================================================================
const GEMINI_API_KEY = "your-actual-api-key-here";
```

### Customization Options
- **Scoring Algorithm**: Modify `calculateResumeScore()` function
- **Suggestion Rules**: Update `generateSuggestions()` function
- **UI Theme**: Customize colors in `tailwind.config.js`
- **File Size Limits**: Adjust in the `onDrop` callback (default: 10MB)

## 🚢 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click
4. Your app will be live at `your-app.vercel.app`

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure redirects for SPA routing

### Other Platforms
The application builds to static files and can be deployed anywhere that serves static content.

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 🐛 Troubleshooting

### Common Issues

**API Key Errors**
- Ensure your API key is correctly set in `src/App.jsx`
- Verify the API key has Gemini API access enabled
- Check if you've exceeded the free tier limits

**JSON Parsing Errors**
- The app includes robust error recovery for malformed AI responses
- Check browser console for detailed error information
- Try with a simpler PDF if issues persist

**File Upload Issues**
- Ensure the file is a valid PDF under 10MB
- Check browser console for specific error messages
- Try a different PDF file

**Build Errors**
- Run `npm install` to ensure all dependencies are installed
- Clear node_modules and reinstall if needed: `rm -rf node_modules package-lock.json && npm install`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for providing the powerful language model
- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icons
- **Vite** for the lightning-fast build tool

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/wondrv/ai-resume-analyzer/issues)
- **Discussions**: [GitHub Discussions](https://github.com/wondrv/ai-resume-analyzer/discussions)

## 🔮 Roadmap

- [ ] **Multi-language Support**: Support for resumes in different languages
- [ ] **PDF Generation**: Generate improved resume PDFs based on suggestions
- [ ] **Resume Templates**: Provide professional resume templates
- [ ] **Batch Processing**: Analyze multiple resumes at once
- [ ] **Advanced Analytics**: Detailed resume analytics and trends
- [ ] **ATS Optimization**: Specific suggestions for ATS systems
- [ ] **Job Matching**: Match resumes with job descriptions

---

<div align="center">
  <p>Made with ❤️ using React & Google Gemini AI</p>
  <p>⭐ Star this repo if you find it helpful!</p>
  
  **[🚀 Live Demo](https://your-app.vercel.app)** | **[📖 Documentation](https://github.com/wondrv/ai-resume-analyzer/wiki)** | **[💬 Discussions](https://github.com/wondrv/ai-resume-analyzer/discussions)**
</div>
