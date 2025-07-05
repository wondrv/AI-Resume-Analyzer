# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of AI Resume Analyzer seriously. If you believe you have found a security vulnerability, please report it to us as described below.

**Please do not report security vulnerabilities through public GitHub issues.**

### How to Report

1. **Email**: Send details to [security@yourproject.com] (replace with actual email)
2. **GitHub Security**: Use GitHub's [private vulnerability reporting](https://github.com/wondrv/ai-resume-analyzer/security/advisories/new)

### What to Include

Please include the following information in your report:

- Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

### Response Timeline

- **Initial Response**: Within 48 hours
- **Assessment**: Within 7 days
- **Fix Development**: Varies based on complexity
- **Release**: ASAP after fix is ready

### Security Best Practices

When using AI Resume Analyzer:

1. **API Keys**: Never commit API keys to version control
2. **Environment Variables**: Use environment variables for sensitive data
3. **HTTPS**: Always use HTTPS in production
4. **Updates**: Keep dependencies updated
5. **File Validation**: Only upload trusted PDF files

### Known Security Considerations

1. **Client-Side API Keys**: API keys are stored client-side for simplicity. For production use, consider a backend proxy.
2. **File Processing**: PDF files are processed client-side. Malicious PDFs could potentially affect the browser.
3. **Data Privacy**: Resume data is sent to Google Gemini API. Review Google's privacy policy.

### Disclosure Policy

When we receive a security bug report, we will:

1. Confirm the problem and determine affected versions
2. Audit code to find any similar problems
3. Prepare a fix for all supported versions
4. Release the fix as soon as possible
5. Credit the reporter (if desired)

## Security Updates

Security updates will be:
- Released as patch versions (e.g., 1.0.1)
- Documented in the CHANGELOG.md
- Announced in GitHub releases
- Tagged with "security" label

## Contact

For questions about this security policy:
- Create an issue on GitHub
- Email: [security@yourproject.com]

Thank you for helping keep AI Resume Analyzer secure!
