import React from 'react';
import { Card, Button } from '../components/ui/UIComponents';
import { Shield, User, Bell, Lock, Globe } from 'lucide-react';

export const Settings: React.FC = () => {
  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-slate-400">Configure system preferences and profile.</p>
      </div>

      <Card className="space-y-6 bg-black/40">
        <h2 className="text-xl font-bold text-white flex items-center gap-2"><User size={20} /> Profile</h2>
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-sm text-slate-400">Institution Name</label>
                <input type="text" value="Tech University" className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white" />
            </div>
            <div className="space-y-2">
                <label className="text-sm text-slate-400">Department</label>
                <input type="text" value="Computer Science" className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white" />
            </div>
        </div>
      </Card>

      <Card className="space-y-6 bg-black/40">
        <h2 className="text-xl font-bold text-white flex items-center gap-2"><Shield size={20} /> Security & Anti-Cheat</h2>
        <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded">
                <div>
                    <h3 className="font-medium text-white">Shuffle Questions by Default</h3>
                    <p className="text-xs text-slate-500">Randomize order for every export</p>
                </div>
                <div className="w-12 h-6 bg-neon-500 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded">
                <div>
                    <h3 className="font-medium text-white">Watermark Papers</h3>
                    <p className="text-xs text-slate-500">Add institution watermark to PDFs</p>
                </div>
                <div className="w-12 h-6 bg-slate-700 rounded-full relative cursor-pointer">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
            </div>
        </div>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="ghost">Cancel</Button>
        <Button variant="primary" glow>Save Changes</Button>
      </div>
    </div>
  );
};