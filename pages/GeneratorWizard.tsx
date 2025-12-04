import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Loader2, Check, Zap } from 'lucide-react';
import { useStore } from '../store';
import { generateExamPaper } from '../services/geminiService';
import { PaperConfiguration, BloomLevel, QuestionType } from '../types';
import { Button, Input, Card } from '../components/ui/UIComponents';

const STEPS = [
  "Subject & Topics",
  "Question Types",
  "Bloom & Difficulty",
  "Review"
];

export const GeneratorWizard: React.FC = () => {
  const navigate = useNavigate();
  const { setConfig, addPaper, setLoading, isLoading } = useStore();
  const [currentStep, setCurrentStep] = useState(0);
  
  const [formData, setFormData] = useState<PaperConfiguration>({
    subject: '',
    topics: [],
    questionTypes: [],
    bloomDistribution: [],
    difficultyDist: { easy: 30, medium: 40, hard: 30 },
    totalMarks: 100,
    variantCount: 1
  });

  const [topicInput, setTopicInput] = useState('');

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(c => c + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(c => c - 1);
  };

  const addTopic = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && topicInput.trim()) {
      setFormData(prev => ({ ...prev, topics: [...prev.topics, topicInput.trim()] }));
      setTopicInput('');
    }
  };

  const toggleSelection = (item: any, list: any[], key: keyof PaperConfiguration) => {
    const exists = list.includes(item);
    const newList = exists ? list.filter(i => i !== item) : [...list, item];
    setFormData({ ...formData, [key]: newList });
  };

  const handleGenerate = async () => {
    setLoading(true);
    setConfig(formData);
    
    try {
      // Simulate API delay for dramatic effect if needed, but actually call service
      const questions = await generateExamPaper(formData);
      
      const newPaper = {
        id: Date.now().toString(),
        title: `${formData.subject} - ${new Date().toLocaleDateString()}`,
        questions,
        createdAt: new Date().toISOString(),
        config: formData
      };
      
      addPaper(newPaper);
      setLoading(false);
      navigate('/results');
      
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Failed to generate paper. Please try again.");
    }
  };

  // --- Step Render Functions ---

  const renderStep1 = () => (
    <div className="space-y-6">
      <Input 
        label="Subject Name" 
        placeholder="e.g. Advanced Data Structures"
        value={formData.subject}
        onChange={(e) => setFormData({...formData, subject: e.target.value})}
        autoFocus
      />
      
      <div>
        <label className="text-sm font-mono text-neon-500/80 mb-2 block">Topics Covered (Press Enter to add)</label>
        <Input 
          placeholder="e.g. Binary Trees, Graphs, Sorting Algorithms..." 
          value={topicInput}
          onChange={(e) => setTopicInput(e.target.value)}
          onKeyDown={addTopic}
        />
        <div className="flex flex-wrap gap-2 mt-3">
          {formData.topics.map((t, i) => (
            <span key={i} className="bg-slate-800 text-slate-200 px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-slate-700">
              {t} 
              <button onClick={() => setFormData({...formData, topics: formData.topics.filter((_, idx) => idx !== i)})} className="hover:text-red-400">×</button>
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input 
          label="Total Marks" 
          type="number" 
          value={formData.totalMarks}
          onChange={(e) => setFormData({...formData, totalMarks: parseInt(e.target.value) || 0})}
        />
        <Input 
          label="Variants (Anti-Cheat)" 
          type="number" 
          max={5}
          min={1}
          value={formData.variantCount}
          onChange={(e) => setFormData({...formData, variantCount: parseInt(e.target.value) || 1})}
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.values(QuestionType).map((type) => (
        <div 
          key={type}
          onClick={() => toggleSelection(type, formData.questionTypes, 'questionTypes')}
          className={`p-4 rounded-lg border cursor-pointer transition-all ${formData.questionTypes.includes(type) ? 'bg-neon-500/20 border-neon-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-600'}`}
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold">{type}</span>
            {formData.questionTypes.includes(type) && <Check size={16} className="text-neon-500" />}
          </div>
        </div>
      ))}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold mb-4">Bloom's Taxonomy Focus</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.values(BloomLevel).map((level) => (
            <div 
              key={level}
              onClick={() => toggleSelection(level, formData.bloomDistribution, 'bloomDistribution')}
              className={`p-3 rounded border text-sm cursor-pointer text-center ${formData.bloomDistribution.includes(level) ? 'bg-blue-900/40 border-blue-500 text-blue-200 shadow-[0_0_10px_rgba(59,130,246,0.2)]' : 'bg-slate-900/50 border-slate-800 text-slate-500 hover:border-slate-600'}`}
            >
              {level}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">Difficulty Distribution</h3>
        <div className="space-y-4">
          {Object.entries(formData.difficultyDist).map(([key, val]) => (
            <div key={key}>
              <div className="flex justify-between text-sm mb-1 uppercase text-slate-400 tracking-wider font-mono">
                <span>{key}</span>
                <span>{val}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={val}
                onChange={(e) => setFormData({...formData, difficultyDist: { ...formData.difficultyDist, [key]: parseInt(e.target.value) }})}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-neon-500"
              />
            </div>
          ))}
          <p className="text-xs text-slate-500 text-right">Total must equal 100% (currently: {Object.values(formData.difficultyDist).reduce((a: number, b: number) => a + b, 0)}%)</p>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-neon-500">Summary</h3>
      <div className="bg-slate-900/80 p-6 rounded-lg border border-slate-700 space-y-3 font-mono text-sm">
        <p><span className="text-slate-500">Subject:</span> {formData.subject}</p>
        <p><span className="text-slate-500">Topics:</span> {formData.topics.join(', ')}</p>
        <p><span className="text-slate-500">Marks:</span> {formData.totalMarks}</p>
        <p><span className="text-slate-500">Types:</span> {formData.questionTypes.join(', ')}</p>
        <p><span className="text-slate-500">Bloom:</span> {formData.bloomDistribution.join(', ')}</p>
        <p><span className="text-slate-500">Difficulty:</span> E:{formData.difficultyDist.easy}% M:{formData.difficultyDist.medium}% H:{formData.difficultyDist.hard}%</p>
      </div>
      <p className="text-slate-400 text-sm italic">
        Ready to generate? The system will take about 5-10 seconds to construct the paper using semantic analysis and difficulty matching.
      </p>
    </div>
  );

  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-6">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-slate-800 rounded-full"></div>
          <div className="w-24 h-24 border-4 border-neon-500 rounded-full animate-spin absolute top-0 border-t-transparent shadow-[0_0_20px_rgba(34,197,94,0.5)]"></div>
        </div>
        <h2 className="text-2xl font-bold animate-pulse text-white">Designing Assessment...</h2>
        <div className="font-mono text-neon-500">
           Analyzing taxonomy...<br/>
           Checking semantic duplicates...<br/>
           Calibrating difficulty...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pt-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Paper Wizard</h1>
          <p className="text-slate-400">Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep]}</p>
        </div>
        <div className="flex gap-2">
          {STEPS.map((_, i) => (
            <div key={i} className={`h-2 w-8 rounded-full transition-colors ${i <= currentStep ? 'bg-neon-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]' : 'bg-slate-800'}`} />
          ))}
        </div>
      </div>

      <Card className="min-h-[400px] border-slate-800 bg-black/50">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {currentStep === 0 && renderStep1()}
            {currentStep === 1 && renderStep2()}
            {currentStep === 2 && renderStep3()}
            {currentStep === 3 && renderStep4()}
          </motion.div>
        </AnimatePresence>
      </Card>

      <div className="flex justify-between mt-8">
        <Button variant="ghost" onClick={handlePrev} disabled={currentStep === 0}>
          <ChevronLeft size={20} /> Back
        </Button>
        
        {currentStep === STEPS.length - 1 ? (
          <Button variant="primary" glow onClick={handleGenerate}>
            Generate Paper <Zap size={20} />
          </Button>
        ) : (
          <Button variant="secondary" onClick={handleNext} disabled={currentStep === 0 && !formData.subject}>
            Next <ChevronRight size={20} />
          </Button>
        )}
      </div>
    </div>
  );
};