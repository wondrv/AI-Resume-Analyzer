<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# AI Resume Analyzer - Copilot Instructions

## Project Overview
This is a professional AI Resume Analyzer application built with React, Vite, and Google Gemini AI. The application provides comprehensive resume analysis, scoring, comparison tools, and analytics dashboard.

## Technology Stack
- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with custom animations
- **State Management**: Zustand
- **Animation**: Framer Motion
- **AI Integration**: Google Gemini API
- **File Handling**: React Dropzone
- **Export**: jsPDF, html2canvas
- **Icons**: Lucide React

## Code Style Guidelines

### React Components
- Use functional components with hooks
- Implement proper PropTypes or TypeScript interfaces
- Follow React best practices for performance
- Use descriptive component and variable names
- Implement proper error boundaries where needed

### State Management
- Use Zustand store for global state
- Keep component state local when possible
- Implement proper state immutability
- Use selectors for derived state

### Styling
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Implement dark mode support consistently
- Use CSS custom properties for theming
- Maintain consistent spacing and typography

### Animation
- Use Framer Motion for smooth animations
- Implement proper loading states
- Add micro-interactions for better UX
- Use consistent animation timing

### Code Organization
- Keep components focused and single-purpose
- Extract custom hooks for reusable logic
- Use proper folder structure
- Implement proper import/export patterns

## Key Features to Maintain

### Resume Analysis
- PDF file upload and processing
- AI-powered content extraction
- Comprehensive scoring system
- ATS compatibility checking
- Structured data output

### User Experience
- Intuitive drag-and-drop interface
- Real-time feedback and progress
- Responsive design across devices
- Accessible navigation and controls
- Professional visual design

### Data Management
- Local storage persistence
- Export functionality (PDF, JSON, PNG)
- Data comparison capabilities
- Analytics and insights generation

## Performance Considerations
- Implement proper code splitting
- Optimize bundle size
- Use React.memo for expensive components
- Implement virtualization for large lists
- Optimize API calls and caching

## Security Best Practices
- Sanitize user inputs
- Secure API key handling
- Implement proper error handling
- Validate file uploads
- Follow OWASP guidelines

## Testing Approach
- Write unit tests for utility functions
- Test component rendering and interactions
- Mock external API calls
- Test error scenarios
- Implement accessibility testing

When writing code for this project, please:
1. Maintain consistency with existing patterns
2. Follow the established architecture
3. Implement proper error handling
4. Write self-documenting code with comments
5. Consider performance implications
6. Ensure responsive design compatibility
7. Support both light and dark themes
8. Follow accessibility best practices
