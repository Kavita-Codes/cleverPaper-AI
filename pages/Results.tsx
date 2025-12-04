import React from 'react';
import { useStore } from '../store';
import { Navigate } from 'react-router-dom';
import { Download, Share2, Copy, FileText, Code, CheckCircle } from 'lucide-react';
import { Button, Card, Badge } from '../components/ui/UIComponents';
import { Difficulty, QuestionType } from '../types';

export const Results: React.FC = () => {
  const { generatedPapers } = useStore();
  
  if (generatedPapers.length === 0) {
    return <Navigate to="/generator" />;
  }

  const paper = generatedPapers[0]; // Most recent

  const handlePrint = () => {
    const printContent = document.getElementById('printable-paper');
    if (printContent) {
      const win = window.open('', '', 'width=900,height=650');
      win?.document.write(`
        <html>
          <head>
            <title>${paper.title}</title>
            <style>
              body { font-family: serif; padding: 40px; }
              .header { text-align: center; border-bottom: 2px solid black; margin-bottom: 30px; padding-bottom: 10px; }
              .q-block { margin-bottom: 20px; break-inside: avoid; }
              .marks { float: right; font-weight: bold; }
            </style>
          </head>
          <body>${printContent.innerHTML}</body>
        </html>
      `);
      win?.document.close();
      win?.print();
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-dark-border pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Paper Generated Successfully</h1>
          <p className="text-slate-400 font-mono text-sm">{paper.id} • {paper.questions.length} Questions • {paper.config.totalMarks} Marks</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handlePrint}><Download size={18} /> Export PDF</Button>
          <Button variant="secondary"><Share2 size={18} /> Share Link</Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Paper View */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white text-black min-h-[800px] p-10 font-serif" >
            <div id="printable-paper">
              <div className="text-center border-b-2 border-black pb-4 mb-8">
                <h2 className="text-2xl font-bold uppercase tracking-widest">{paper.config.subject}</h2>
                <div className="flex justify-between mt-4 text-sm font-sans font-bold text-gray-600">
                  <span>Time: 3 Hours</span>
                  <span>Max Marks: {paper.config.totalMarks}</span>
                </div>
                <div className="mt-2 text-xs text-gray-500 font-sans">
                  Topics: {paper.config.topics.join(', ')}
                </div>
              </div>

              <div className="space-y-8">
                {paper.questions.map((q, idx) => (
                  <div key={q.id} className="q-block">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex gap-2">
                        <span className="font-bold">{idx + 1}.</span>
                        <div>
                          <p className="leading-relaxed whitespace-pre-wrap">{q.text}</p>
                          
                          {/* MCQ Options */}
                          {q.type === QuestionType.MCQ && q.options && (
                            <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-3 ml-2">
                              {q.options.map((opt, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  <span className="w-5 h-5 rounded-full border border-black flex items-center justify-center text-xs font-bold">{String.fromCharCode(65+i)}</span>
                                  <span>{opt}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Coding Stub */}
                          {q.type === QuestionType.CODING && q.starterCode && (
                            <div className="mt-3 bg-gray-100 p-3 rounded font-mono text-sm border border-gray-300">
                              <pre>{q.starterCode}</pre>
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="font-bold text-sm whitespace-nowrap">[{q.marks} Marks]</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar Analysis */}
        <div className="space-y-6">
          {/* Answer Key */}
          <Card className="h-[400px] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-neon-500">
              <CheckCircle size={20} /> Answer Key
            </h3>
            <div className="space-y-4">
              {paper.questions.map((q, i) => (
                <div key={q.id} className="border-b border-slate-800 pb-3 last:border-0">
                  <div className="flex justify-between text-sm text-slate-400 mb-1">
                    <span>Q{i+1}</span>
                    <Badge color={q.difficulty === Difficulty.HARD ? 'bg-red-900/50 text-red-200' : 'bg-slate-800'}>{q.difficulty}</Badge>
                  </div>
                  <p className="text-sm font-mono text-green-400">{q.answer}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Stats */}
          <Card>
            <h3 className="text-lg font-bold mb-4">Paper Analysis</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Bloom's Coverage</span>
                <span className="text-white">85% Aligned</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Avg. Complexity</span>
                <span className="text-white">Moderate-High</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
                <div className="bg-neon-500 h-full" style={{ width: '65%' }}></div>
              </div>
              <p className="text-xs text-slate-500 mt-1">Difficulty Distribution</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};