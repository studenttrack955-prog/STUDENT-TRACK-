import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import DashboardOverview from './pages/DashboardOverview';
import SmartSearch from './pages/SmartSearch';
import NotesGenerator from './pages/NotesGenerator';
import ExamGenerator from './pages/ExamGenerator';
import CareerGuide from './pages/CareerGuide';
import LearningAnalytics from './pages/LearningAnalytics';
import StudentPlanner from './pages/StudentPlanner';
import MindMapGenerator from './pages/MindMapGenerator';
import StudentProfile from './pages/StudentProfile';
import AIChat from './components/AIChat';
import { Sidebar } from './components/Sidebar';

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-pink-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium animate-pulse">Initializing Student Track...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard/*" element={user ? <DashboardShell /> : <Navigate to="/" />} />
    </Routes>
  );
};

const DashboardShell = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <main className="pl-64 min-h-screen">
        <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 px-8 flex items-center justify-between">
           <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
             <span>Dashboard</span>
             <span>/</span>
             <span className="text-slate-900 capitalize">
               {window.location.pathname.split('/').pop() || 'Overview'}
             </span>
           </div>
           <div className="flex items-center gap-4">
             <button className="p-2 text-slate-400 hover:text-pink-600 transition-colors">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
             </button>
           </div>
        </header>
        <div className="p-8">
          <Routes>
            <Route index element={<DashboardOverview />} />
            <Route path="chat" element={<AIChat />} />
            <Route path="search" element={<SmartSearch />} />
            <Route path="notes" element={<NotesGenerator />} />
            <Route path="exams" element={<ExamGenerator />} />
            <Route path="career" element={<CareerGuide />} />
            <Route path="analytics" element={<LearningAnalytics />} />
            <Route path="planner" element={<StudentPlanner />} />
            <Route path="mindmaps" element={<MindMapGenerator />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="*" element={<DashboardOverview />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}
