import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useResumeStore = create(
  persist(
    (set, get) => ({
      resumes: [],
      currentResume: null,
      analytics: {
        totalResumes: 0,
        averageScore: 0,
        topSkills: [],
        industryBreakdown: {}
      },
      
      // Actions
      addResume: (resume) => set((state) => {
        const newResume = {
          ...resume,
          id: Date.now().toString(),
          analyzedAt: new Date().toISOString(),
          score: calculateResumeScore(resume)
        };
        
        return {
          resumes: [...state.resumes, newResume],
          currentResume: newResume,
          analytics: updateAnalytics([...state.resumes, newResume])
        };
      }),
      
      removeResume: (id) => set((state) => {
        const filteredResumes = state.resumes.filter(resume => resume.id !== id);
        return {
          resumes: filteredResumes,
          currentResume: state.currentResume?.id === id ? null : state.currentResume,
          analytics: updateAnalytics(filteredResumes)
        };
      }),
      
      setCurrentResume: (resume) => set({ currentResume: resume }),
      
      updateResume: (id, updates) => set((state) => {
        const updatedResumes = state.resumes.map(resume =>
          resume.id === id ? { ...resume, ...updates } : resume
        );
        return {
          resumes: updatedResumes,
          analytics: updateAnalytics(updatedResumes)
        };
      }),
      
      clearResumes: () => set({
        resumes: [],
        currentResume: null,
        analytics: {
          totalResumes: 0,
          averageScore: 0,
          topSkills: [],
          industryBreakdown: {}
        }
      })
    }),
    {
      name: 'resume-analyzer-storage',
      storage: createJSONStorage(() => localStorage),
      version: 1
    }
  )
);

// Helper function to calculate resume score
function calculateResumeScore(resume) {
  let score = 0;
  
  // Contact information (20 points)
  if (resume.contactInfo?.name) score += 5;
  if (resume.contactInfo?.email) score += 5;
  if (resume.contactInfo?.phone) score += 5;
  if (resume.contactInfo?.linkedin) score += 5;
  
  // Work experience (40 points)
  if (resume.workExperience?.length > 0) {
    score += Math.min(resume.workExperience.length * 10, 40);
  }
  
  // Education (20 points)
  if (resume.education?.length > 0) {
    score += Math.min(resume.education.length * 10, 20);
  }
  
  // Skills (20 points)
  if (resume.skills?.length > 0) {
    score += Math.min(resume.skills.length * 2, 20);
  }
  
  return Math.min(score, 100);
}

// Helper function to update analytics
function updateAnalytics(resumes) {
  if (resumes.length === 0) {
    return {
      totalResumes: 0,
      averageScore: 0,
      topSkills: [],
      industryBreakdown: {}
    };
  }
  
  const totalScore = resumes.reduce((sum, resume) => sum + (resume.score || 0), 0);
  const averageScore = Math.round(totalScore / resumes.length);
  
  // Calculate top skills
  const skillCount = {};
  resumes.forEach(resume => {
    resume.skills?.forEach(skill => {
      skillCount[skill] = (skillCount[skill] || 0) + 1;
    });
  });
  
  const topSkills = Object.entries(skillCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([skill, count]) => ({ skill, count }));
  
  // Industry breakdown (simplified)
  const industryBreakdown = {};
  resumes.forEach(resume => {
    const industry = extractIndustry(resume);
    industryBreakdown[industry] = (industryBreakdown[industry] || 0) + 1;
  });
  
  return {
    totalResumes: resumes.length,
    averageScore,
    topSkills,
    industryBreakdown
  };
}

// Helper function to extract industry from resume
function extractIndustry(resume) {
  // Simple industry extraction based on skills and experience
  const techSkills = ['javascript', 'python', 'react', 'node', 'sql', 'html', 'css'];
  const businessSkills = ['marketing', 'sales', 'finance', 'accounting', 'management'];
  const designSkills = ['design', 'photoshop', 'illustrator', 'figma', 'ui', 'ux'];
  
  const skills = resume.skills?.map(skill => skill.toLowerCase()) || [];
  
  if (skills.some(skill => techSkills.some(tech => skill.includes(tech)))) {
    return 'Technology';
  }
  if (skills.some(skill => businessSkills.some(biz => skill.includes(biz)))) {
    return 'Business';
  }
  if (skills.some(skill => designSkills.some(design => skill.includes(design)))) {
    return 'Design';
  }
  
  return 'Other';
}
