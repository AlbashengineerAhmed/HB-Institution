import React, { useState } from 'react';
import styles from './CourseContent.module.css';

const CourseContent = ({ course, onBack, onEvaluate }) => {
  const [selectedModule, setSelectedModule] = useState(course.modules[0]);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');

  // Mock detailed module content
  const moduleContent = {
    1: {
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      content: `
        <h2>Introduction to Islamic Finance</h2>
        <p>Islamic finance is a financial system that operates according to Islamic law (Sharia) and its practical application through the development of Islamic economics.</p>
        
        <h3>Key Principles</h3>
        <ul>
          <li><strong>Prohibition of Riba (Interest):</strong> Islamic finance prohibits the charging or paying of interest.</li>
          <li><strong>Risk Sharing:</strong> Both parties in a financial transaction must share the risk.</li>
          <li><strong>Asset-Backed Financing:</strong> All transactions must be backed by tangible assets.</li>
          <li><strong>Prohibition of Gharar:</strong> Excessive uncertainty or speculation is not allowed.</li>
        </ul>
        
        <h3>Learning Objectives</h3>
        <p>By the end of this module, you will be able to:</p>
        <ol>
          <li>Understand the fundamental principles of Islamic finance</li>
          <li>Identify the differences between conventional and Islamic banking</li>
          <li>Recognize various Islamic financial instruments</li>
        </ol>
      `,
      materials: [
        { name: 'Islamic Finance Principles.pdf', type: 'pdf', size: '2.3 MB' },
        { name: 'Key Terms Glossary.docx', type: 'doc', size: '1.1 MB' },
        { name: 'Practice Quiz', type: 'quiz', questions: 10 }
      ]
    },
    2: {
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      content: `
        <h2>Sharia Principles in Banking</h2>
        <p>This module explores how Sharia principles are applied in modern banking systems and financial institutions.</p>
        
        <h3>Core Sharia Principles</h3>
        <ul>
          <li><strong>Prohibition of Riba:</strong> Interest-based transactions are forbidden</li>
          <li><strong>Prohibition of Gharar:</strong> Excessive uncertainty must be avoided</li>
          <li><strong>Prohibition of Maysir:</strong> Gambling and speculation are not allowed</li>
          <li><strong>Halal Investments:</strong> Only Sharia-compliant business activities</li>
        </ul>
        
        <h3>Implementation in Banking</h3>
        <p>Learn how these principles are practically implemented in:</p>
        <ul>
          <li>Deposit accounts and savings</li>
          <li>Financing and loans</li>
          <li>Investment products</li>
          <li>Insurance (Takaful)</li>
        </ul>
      `,
      materials: [
        { name: 'Sharia Banking Guidelines.pdf', type: 'pdf', size: '3.1 MB' },
        { name: 'Case Studies.pdf', type: 'pdf', size: '2.8 MB' },
        { name: 'Module Assessment', type: 'quiz', questions: 15 }
      ]
    },
    3: {
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      content: `
        <h2>Islamic Investment Instruments</h2>
        <p>Explore the various Sharia-compliant investment instruments available in Islamic finance.</p>
        
        <h3>Major Islamic Financial Instruments</h3>
        <ul>
          <li><strong>Murabaha:</strong> Cost-plus financing</li>
          <li><strong>Ijara:</strong> Islamic leasing</li>
          <li><strong>Musharaka:</strong> Partnership financing</li>
          <li><strong>Mudaraba:</strong> Profit-sharing partnership</li>
          <li><strong>Sukuk:</strong> Islamic bonds</li>
        </ul>
        
        <h3>Practical Applications</h3>
        <p>Understanding how these instruments work in practice:</p>
        <ul>
          <li>Real estate financing</li>
          <li>Trade financing</li>
          <li>Corporate financing</li>
          <li>Government funding</li>
        </ul>
      `,
      materials: [
        { name: 'Investment Instruments Guide.pdf', type: 'pdf', size: '4.2 MB' },
        { name: 'Sukuk Market Analysis.xlsx', type: 'excel', size: '1.8 MB' },
        { name: 'Interactive Examples', type: 'interactive', duration: '30 min' }
      ]
    },
    4: {
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      content: `
        <h2>Risk Management in Islamic Finance</h2>
        <p>Learn about risk management strategies and tools used in Islamic financial institutions.</p>
        
        <h3>Types of Risks</h3>
        <ul>
          <li><strong>Credit Risk:</strong> Risk of default by borrowers</li>
          <li><strong>Market Risk:</strong> Risk from market fluctuations</li>
          <li><strong>Operational Risk:</strong> Risk from internal processes</li>
          <li><strong>Sharia Compliance Risk:</strong> Risk of non-compliance with Islamic law</li>
        </ul>
        
        <h3>Risk Mitigation Strategies</h3>
        <p>Explore various strategies for managing risks:</p>
        <ul>
          <li>Diversification techniques</li>
          <li>Hedging instruments</li>
          <li>Governance frameworks</li>
          <li>Regulatory compliance</li>
        </ul>
      `,
      materials: [
        { name: 'Risk Management Framework.pdf', type: 'pdf', size: '3.5 MB' },
        { name: 'Risk Assessment Tools.xlsx', type: 'excel', size: '2.1 MB' },
        { name: 'Final Assessment', type: 'quiz', questions: 20 }
      ]
    }
  };

  const currentModuleContent = moduleContent[selectedModule.id] || moduleContent[1];

  const handleModuleComplete = (moduleId) => {
    console.log(`Module ${moduleId} marked as complete`);
    // In real app, this would update the backend
  };

  const handleDownloadMaterial = (material) => {
    console.log(`Downloading: ${material.name}`);
    // In real app, this would trigger download
  };

  const handleTakeQuiz = (material) => {
    console.log(`Starting quiz: ${material.name}`);
    // In real app, this would open quiz interface
  };

  const getFileIcon = (type) => {
    const icons = {
      pdf: '📄',
      doc: '📝',
      excel: '📊',
      quiz: '❓',
      interactive: '🎮'
    };
    return icons[type] || '📎';
  };

  return (
    <div className={styles.courseContent}>
      {/* Course Header */}
      <div className={styles.courseHeader}>
        <div className={styles.courseInfo}>
          <h2 className={styles.courseTitle}>{course.title}</h2>
          <p className={styles.courseInstructor}>👨‍🏫 {course.instructor}</p>
          <div className={styles.courseProgress}>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <span className={styles.progressText}>{course.progress}% Complete</span>
          </div>
        </div>
        <div className={styles.courseActions}>
          {course.canEvaluate && (
            <button 
              className={styles.evaluateBtn}
              onClick={onEvaluate}
            >
              ⭐ Evaluate Course
            </button>
          )}
          <button 
            className={styles.notesBtn}
            onClick={() => setShowNotes(!showNotes)}
          >
            📝 {showNotes ? 'Hide Notes' : 'My Notes'}
          </button>
        </div>
      </div>

      <div className={styles.contentLayout}>
        {/* Sidebar with modules */}
        <div className={styles.modulesSidebar}>
          <h3 className={styles.modulesTitle}>Course Modules</h3>
          <div className={styles.modulesList}>
            {course.modules.map((module) => (
              <div
                key={module.id}
                className={`${styles.moduleItem} ${
                  selectedModule.id === module.id ? styles.active : ''
                } ${module.completed ? styles.completed : ''}`}
                onClick={() => setSelectedModule(module)}
              >
                <div className={styles.moduleStatus}>
                  {module.completed ? '✓' : module.id}
                </div>
                <div className={styles.moduleInfo}>
                  <h4 className={styles.moduleTitle}>{module.title}</h4>
                  <span className={styles.moduleDuration}>{module.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main content area */}
        <div className={styles.mainContent}>
          {/* Video Player */}
          <div className={styles.videoSection}>
            <div className={styles.videoPlayer}>
              <iframe
                src={currentModuleContent.videoUrl}
                title={selectedModule.title}
                frameBorder="0"
                allowFullScreen
                className={styles.videoFrame}
              ></iframe>
            </div>
            <div className={styles.videoControls}>
              <button 
                className={styles.completeBtn}
                onClick={() => handleModuleComplete(selectedModule.id)}
                disabled={selectedModule.completed}
              >
                {selectedModule.completed ? '✓ Completed' : 'Mark as Complete'}
              </button>
            </div>
          </div>

          {/* Module Content */}
          <div className={styles.moduleContent}>
            <div 
              className={styles.contentText}
              dangerouslySetInnerHTML={{ __html: currentModuleContent.content }}
            />
          </div>

          {/* Materials Section */}
          <div className={styles.materialsSection}>
            <h3 className={styles.materialsTitle}>Module Materials</h3>
            <div className={styles.materialsList}>
              {currentModuleContent.materials.map((material, index) => (
                <div key={index} className={styles.materialItem}>
                  <div className={styles.materialInfo}>
                    <span className={styles.materialIcon}>
                      {getFileIcon(material.type)}
                    </span>
                    <div className={styles.materialDetails}>
                      <h4 className={styles.materialName}>{material.name}</h4>
                      <span className={styles.materialMeta}>
                        {material.size && `Size: ${material.size}`}
                        {material.questions && `${material.questions} questions`}
                        {material.duration && `Duration: ${material.duration}`}
                      </span>
                    </div>
                  </div>
                  <div className={styles.materialActions}>
                    {material.type === 'quiz' ? (
                      <button 
                        className={styles.quizBtn}
                        onClick={() => handleTakeQuiz(material)}
                      >
                        Take Quiz
                      </button>
                    ) : (
                      <button 
                        className={styles.downloadBtn}
                        onClick={() => handleDownloadMaterial(material)}
                      >
                        Download
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notes Panel */}
        {showNotes && (
          <div className={styles.notesPanel}>
            <div className={styles.notesHeader}>
              <h3 className={styles.notesTitle}>My Notes</h3>
              <button 
                className={styles.closeNotesBtn}
                onClick={() => setShowNotes(false)}
              >
                ✕
              </button>
            </div>
            <textarea
              className={styles.notesTextarea}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Take notes while learning..."
            />
            <button className={styles.saveNotesBtn}>
              💾 Save Notes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseContent;