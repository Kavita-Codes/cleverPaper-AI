import React from 'react';
import { Card, Button } from '../components/ui/UIComponents';
import { Plus, Clock, FileText, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400">Welcome back, Professor.</p>
        </div>
        <Link to="/generator">
          <Button variant="primary" glow>
            <Plus size={20} /> New Paper
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Papers", val: "124", icon: FileText, color: "text-blue-500", link: "/papers" },
          { label: "Questions Banked", val: "8,432", icon: Database, color: "text-neon-500", link: "/bank" },
          { label: "Avg Difficulty", val: "Med-Hard", icon: Clock, color: "text-purple-500", link: "/papers" },
          { label: "Hours Saved", val: "320h", icon: Clock, color: "text-yellow-500", link: "/dashboard" },
        ].map((stat, i) => (
          <Link to={stat.link} key={i}>
            <Card className="flex flex-col justify-between hover:border-neon-500 transition-colors h-full">
              <div className="flex justify-between items-start">
                <span className="text-slate-400 text-sm font-medium">{stat.label}</span>
                <stat.icon className={`${stat.color}`} size={20} />
              </div>
              <div className="text-3xl font-bold text-white mt-4">{stat.val}</div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Recent Papers</h3>
            <Link to="/papers" className="text-xs text-neon-500 hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Link to="/papers" key={i} className="block">
                <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-slate-800 hover:border-neon-500 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-900 rounded flex items-center justify-center text-slate-400 font-bold group-hover:text-neon-500">PDF</div>
                    <div>
                      <p className="font-medium text-white group-hover:text-neon-400 transition-colors">Computer Networks Mid-Term</p>
                      <p className="text-xs text-slate-500">Generated 2 days ago • 45 Questions</p>
                    </div>
                  </div>
                  <div className="text-neon-500 text-sm font-mono">Ready</div>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-bold mb-4">Topic Performance (Smart Insights)</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Data Structures</span>
                <span className="text-neon-500">High Demand</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full">
                <div className="bg-neon-500 h-full rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" style={{width: '85%'}}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Algorithms</span>
                <span className="text-blue-500">Stable</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full">
                <div className="bg-blue-500 h-full rounded-full" style={{width: '65%'}}></div>
              </div>
            </div>
            <div className="p-4 bg-green-900/10 border border-green-500/20 rounded mt-4 text-xs text-slate-300 leading-relaxed">
              <strong className="text-neon-500 block mb-1">System Recommendation:</strong>
              Students struggled with "Dynamic Programming" in the last 3 generated sets. Consider increasing "Understand" level questions for this topic.
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};