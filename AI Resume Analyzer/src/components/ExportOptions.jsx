import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Download, 
  FileText, 
  Image, 
  Mail, 
  Share2,
  Copy,
  Check
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ExportOptions = ({ resumeData, onClose }) => {
  const [exportType, setExportType] = useState('pdf');
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  const exportOptions = [
    {
      id: 'pdf',
      label: 'PDF Report',
      description: 'Complete analysis report as PDF',
      icon: <FileText className="h-5 w-5" />,
      color: 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300'
    },
    {
      id: 'json',
      label: 'JSON Data',
      description: 'Raw structured data export',
      icon: <Download className="h-5 w-5" />,
      color: 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300'
    },
    {
      id: 'image',
      label: 'Image Summary',
      description: 'Visual summary as PNG image',
      icon: <Image className="h-5 w-5" />,
      color: 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300'
    }
  ];

  const generatePDF = async () => {
    setIsExporting(true);
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      let yPosition = 20;

      // Title
      pdf.setFontSize(20);
      pdf.text('AI Resume Analysis Report', 20, yPosition);
      yPosition += 20;

      // Contact Info
      if (resumeData.contactInfo) {
        pdf.setFontSize(16);
        pdf.text('Contact Information', 20, yPosition);
        yPosition += 10;
        
        pdf.setFontSize(12);
        const contactInfo = resumeData.contactInfo;
        if (contactInfo.name) {
          pdf.text(`Name: ${contactInfo.name}`, 20, yPosition);
          yPosition += 7;
        }
        if (contactInfo.email) {
          pdf.text(`Email: ${contactInfo.email}`, 20, yPosition);
          yPosition += 7;
        }
        if (contactInfo.phone) {
          pdf.text(`Phone: ${contactInfo.phone}`, 20, yPosition);
          yPosition += 7;
        }
        yPosition += 10;
      }

      // Summary
      if (resumeData.summary) {
        pdf.setFontSize(16);
        pdf.text('Professional Summary', 20, yPosition);
        yPosition += 10;
        
        pdf.setFontSize(12);
        const splitSummary = pdf.splitTextToSize(resumeData.summary, pageWidth - 40);
        pdf.text(splitSummary, 20, yPosition);
        yPosition += splitSummary.length * 7 + 10;
      }

      // Skills
      if (resumeData.skills && resumeData.skills.length > 0) {
        pdf.setFontSize(16);
        pdf.text('Skills', 20, yPosition);
        yPosition += 10;
        
        pdf.setFontSize(12);
        const skillsText = resumeData.skills.map(skill => 
          typeof skill === 'string' ? skill : skill.name
        ).join(', ');
        const splitSkills = pdf.splitTextToSize(skillsText, pageWidth - 40);
        pdf.text(splitSkills, 20, yPosition);
        yPosition += splitSkills.length * 7 + 10;
      }

      // Score
      pdf.setFontSize(16);
      pdf.text(`Overall Score: ${resumeData.score || 'N/A'}/100`, 20, yPosition);
      yPosition += 10;

      if (resumeData.atsScore) {
        pdf.text(`ATS Compatibility: ${resumeData.atsScore}/100`, 20, yPosition);
        yPosition += 10;
      }

      // Recommendations
      if (resumeData.recommendations && resumeData.recommendations.length > 0) {
        pdf.setFontSize(16);
        pdf.text('Recommendations', 20, yPosition);
        yPosition += 10;
        
        pdf.setFontSize(12);
        resumeData.recommendations.forEach((rec, index) => {
          if (yPosition > pageHeight - 20) {
            pdf.addPage();
            yPosition = 20;
          }
          
          const splitRec = pdf.splitTextToSize(`${index + 1}. ${rec}`, pageWidth - 40);
          pdf.text(splitRec, 20, yPosition);
          yPosition += splitRec.length * 7 + 5;
        });
      }

      pdf.save(`${resumeData.contactInfo?.name || 'resume'}_analysis.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const generateJSON = () => {
    const dataStr = JSON.stringify(resumeData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resumeData.contactInfo?.name || 'resume'}_data.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const generateImage = async () => {
    setIsExporting(true);
    try {
      // Create a summary element to capture
      const summaryElement = document.createElement('div');
      summaryElement.style.cssText = `
        width: 800px;
        padding: 40px;
        background: white;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        position: fixed;
        top: -9999px;
        left: -9999px;
      `;

      summaryElement.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #1f2937; margin: 0 0 10px 0; font-size: 28px;">Resume Analysis Report</h1>
          <h2 style="color: #6b7280; margin: 0; font-size: 18px; font-weight: normal;">${resumeData.contactInfo?.name || 'Candidate'}</h2>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
          <div style="text-align: center; padding: 20px; background: #f3f4f6; border-radius: 12px;">
            <div style="font-size: 36px; font-weight: bold; color: #3b82f6; margin-bottom: 5px;">${resumeData.score || 0}</div>
            <div style="color: #6b7280; font-size: 14px;">Overall Score</div>
          </div>
          <div style="text-align: center; padding: 20px; background: #f3f4f6; border-radius: 12px;">
            <div style="font-size: 36px; font-weight: bold; color: #10b981; margin-bottom: 5px;">${resumeData.atsScore || 0}</div>
            <div style="color: #6b7280; font-size: 14px;">ATS Compatibility</div>
          </div>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px;">Key Strengths</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div style="padding: 10px; background: #ecfdf5; border-left: 4px solid #10b981; border-radius: 4px;">Strong Experience</div>
            <div style="padding: 10px; background: #ecfdf5; border-left: 4px solid #10b981; border-radius: 4px;">Technical Skills</div>
            <div style="padding: 10px; background: #ecfdf5; border-left: 4px solid #10b981; border-radius: 4px;">Education</div>
            <div style="padding: 10px; background: #ecfdf5; border-left: 4px solid #10b981; border-radius: 4px;">Clear Format</div>
          </div>
        </div>
        
        ${resumeData.skills && resumeData.skills.length > 0 ? `
        <div>
          <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px;">Top Skills</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${resumeData.skills.slice(0, 10).map(skill => 
              `<span style="background: #3b82f6; color: white; padding: 6px 12px; border-radius: 20px; font-size: 12px;">${typeof skill === 'string' ? skill : skill.name}</span>`
            ).join('')}
          </div>
        </div>
        ` : ''}
      `;

      document.body.appendChild(summaryElement);
      
      const canvas = await html2canvas(summaryElement, {
        backgroundColor: '#ffffff',
        scale: 2
      });
      
      document.body.removeChild(summaryElement);
      
      const link = document.createElement('a');
      link.download = `${resumeData.contactInfo?.name || 'resume'}_summary.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExport = () => {
    switch (exportType) {
      case 'pdf':
        generatePDF();
        break;
      case 'json':
        generateJSON();
        break;
      case 'image':
        generateImage();
        break;
      default:
        break;
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(resumeData, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareAnalysis = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Resume Analysis Report',
          text: `Check out my resume analysis: Overall Score ${resumeData.score || 0}/100, ATS Score ${resumeData.atsScore || 0}/100`,
          url: window.location.href
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Export Analysis
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <h4 className="font-medium text-gray-900 dark:text-white">
                Choose export format:
              </h4>
              
              {exportOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    exportType === option.id
                      ? option.color + ' border-current'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <input
                    type="radio"
                    name="exportType"
                    value={option.id}
                    checked={exportType === option.id}
                    onChange={(e) => setExportType(e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`p-2 rounded-lg ${
                      exportType === option.id ? 'bg-white bg-opacity-50' : 'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      {option.icon}
                    </div>
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm opacity-75">{option.description}</div>
                    </div>
                  </div>
                  {exportType === option.id && (
                    <div className="w-4 h-4 bg-current rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </label>
              ))}
            </div>

            <div className="space-y-3">
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="w-full btn-primary flex items-center justify-center gap-2 py-3"
              >
                {isExporting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Export {exportOptions.find(opt => opt.id === exportType)?.label}
                  </>
                )}
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={copyToClipboard}
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copied!' : 'Copy Data'}
                </button>

                <button
                  onClick={shareAnalysis}
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-1 rounded">
                  <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                    Email Summary
                  </p>
                  <p className="text-blue-700 dark:text-blue-300">
                    Want to email this analysis? Use the share button to send via your email client.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExportOptions;
