# Contributing to AI Resume Analyzer

Thank you for your interest in contributing to AI Resume Analyzer! This document provides guidelines and instructions for contributing to the project.

## 🤝 How to Contribute

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include:

- **Clear description** of the issue
- **Steps to reproduce** the behavior
- **Expected vs actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, browser, Node.js version)
- **Console errors** if any

### Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:

- **Clear description** of the enhancement
- **Use case** and benefits
- **Implementation ideas** if you have them
- **Mockups or examples** if applicable

### Pull Requests

1. **Fork** the repository
2. **Create a branch** from `main`: `git checkout -b feature/your-feature-name`
3. **Make your changes** following our coding standards
4. **Test your changes** thoroughly
5. **Commit** with clear, descriptive messages
6. **Push** to your fork: `git push origin feature/your-feature-name`
7. **Create a Pull Request** with a clear description

## 🛠️ Development Setup

1. **Clone your fork**:
   ```bash
   git clone https://github.com/wondrv/ai-resume-analyzer.git
   cd ai-resume-analyzer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment**:
   ```bash
   # Copy and edit the API key in src/App.jsx
   # Line 10: const GEMINI_API_KEY = "your-api-key-here";
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

## 📝 Coding Standards

### JavaScript/React
- Use **functional components** with hooks
- Follow **React best practices**
- Use **descriptive variable names**
- Add **comments** for complex logic
- Handle **errors gracefully**

### Styling
- Use **Tailwind CSS** utility classes
- Maintain **responsive design**
- Follow **dark/light theme** patterns
- Keep **consistent spacing** and typography

### Code Structure
```javascript
// Component structure
const ComponentName = ({ prop1, prop2 }) => {
  // Hooks
  const [state, setState] = useState();
  
  // Functions
  const handleSomething = () => {
    // Implementation
  };
  
  // Effects
  useEffect(() => {
    // Side effects
  }, []);
  
  // Render
  return (
    <div className="component-container">
      {/* JSX content */}
    </div>
  );
};
```

### Commit Messages
Use clear, descriptive commit messages:
- `feat: add resume comparison feature`
- `fix: resolve JSON parsing error`
- `docs: update README with new features`
- `style: improve mobile responsiveness`
- `refactor: optimize API call handling`

## 🧪 Testing

Before submitting a PR:

1. **Test manually**:
   - Upload different PDF formats
   - Test responsive design
   - Verify dark/light mode
   - Check error handling

2. **Browser testing**:
   - Chrome/Chromium
   - Firefox
   - Safari (if possible)
   - Mobile browsers

3. **API testing**:
   - Valid API key
   - Invalid API key
   - Network errors
   - Malformed responses

## 📋 Areas for Contribution

### High Priority
- [ ] **Error handling improvements**
- [ ] **Mobile optimization**
- [ ] **Accessibility features**
- [ ] **Performance optimizations**
- [ ] **Test coverage**

### Features
- [ ] **Resume builder/editor**
- [ ] **Job description matching**
- [ ] **Multi-language support**
- [ ] **Advanced analytics**
- [ ] **Resume templates**
- [ ] **Batch processing**

### Technical Improvements
- [ ] **TypeScript migration**
- [ ] **Component testing**
- [ ] **E2E testing**
- [ ] **Performance monitoring**
- [ ] **CI/CD pipeline**

## 📖 Documentation

Help improve documentation:
- Fix typos and grammar
- Add code examples
- Improve setup instructions
- Create video tutorials
- Write blog posts

## 🎨 Design Contributions

- UI/UX improvements
- Icon designs
- Animation enhancements
- Color scheme optimization
- Mobile interface design

## ❓ Questions?

- **GitHub Discussions**: For general questions and ideas
- **GitHub Issues**: For specific bugs or feature requests
- **Email**: For private inquiries

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be:
- Added to the contributors list
- Mentioned in release notes
- Credited in the README

Thank you for making AI Resume Analyzer better! 🚀
