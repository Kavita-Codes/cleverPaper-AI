import React from 'react';
import { Card, Button, Badge } from '../components/ui/UIComponents';
import { FileText, Download, Trash2, Eye } from 'lucide-react';

export const Papers: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">My Papers</h1>
          <p className="text-slate-400">Archive of all generated assessments.</p>
        </div>
      </div>

      <div className="grid gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 gap-4 hover:border-neon-500 transition-colors bg-black/40">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-center text-neon-500">
                        <FileText size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Computer Science Mid-Term {i}</h3>
                        <p className="text-sm text-slate-500">Generated on Oct {10+i}, 2024 • {40 + i*2} Questions</p>
                        <div className="flex gap-2 mt-2">
                             <Badge color="bg-blue-900/50 text-blue-200">Mixed Difficulty</Badge>
                             <Badge color="bg-purple-900/50 text-purple-200">Anti-Cheat Active</Badge>
                        </div>
                    </div>
                </div>
                
                <div className="flex gap-2">
                    <Button variant="ghost" className="text-slate-400 hover:text-white"><Eye size={18} /></Button>
                    <Button variant="ghost" className="text-slate-400 hover:text-neon-500"><Download size={18} /></Button>
                    <Button variant="ghost" className="text-slate-400 hover:text-red-500"><Trash2 size={18} /></Button>
                </div>
            </Card>
        ))}
      </div>
    </div>
  );
};