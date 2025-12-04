import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { GeneratorWizard } from './pages/GeneratorWizard';
import { Results } from './pages/Results';
import { Dashboard } from './pages/Dashboard';
import { Papers } from './pages/Papers';
import { QuestionBank } from './pages/QuestionBank';
import { Settings } from './pages/Settings';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/generator" element={<GeneratorWizard />} />
          <Route path="/results" element={<Results />} />
          <Route path="/papers" element={<Papers />} />
          <Route path="/bank" element={<QuestionBank />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;