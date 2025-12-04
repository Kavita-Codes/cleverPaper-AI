import React, { useState } from 'react';
import { Card, Input, Button, Badge } from '../components/ui/UIComponents';
import { Search, Filter, Plus, Database } from 'lucide-react';

export const QuestionBank: React.FC = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Question Bank</h1>
          <p className="text-slate-400">Manage and organize your repository.</p>
        </div>
        <Button variant="primary" glow>
            <Plus size={20} /> Add Question
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
            <Input 
                placeholder="Search questions by tag, topic or content..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-black/50 border-slate-800"
            />
        </div>
        <Button variant="secondary"><Filter size={20} /> Filters</Button>
      </div>

      <div className="grid gap-4">
        {[1, 2, 3, 4].map((i) => (
             <Card key={i} className="hover:border-neon-500/50 transition-colors bg-black/40">
                <div className="flex justify-between items-start mb-3">
                    <Badge color="bg-slate-800 text-slate-300">Data Structures</Badge>
                    <span className="text-xs text-slate-500 font-mono">ID: Q-832{i}</span>
                </div>
                <p className="text-white text-lg mb-4">Explain the time complexity differences between Quick Sort and Merge Sort in worst-case scenarios.</p>
                <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                    <div className="flex gap-2 text-sm text-slate-500">
                        <span className="text-neon-500">Subjective</span> • <span>Hard</span> • <span>Apply</span>
                    </div>
                    <Button variant="ghost" className="text-xs text-slate-400">Edit</Button>
                </div>
             </Card>
        ))}
      </div>
    </div>
  );
};