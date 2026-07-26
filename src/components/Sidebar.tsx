import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Search, 
  FileText, 
  Zap, 
  Brain, 
  Settings, 
  LogOut,
  GraduationCap,
  Calendar,
  BarChart3,
  User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

export const Sidebar = () => {
  const { logout, profile } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
    { icon: MessageSquare, label: 'AI Assistant', path: '/dashboard/chat' },
    { icon: Search, label: 'Smart Search', path: '/dashboard/search' },
    { icon: FileText, label: 'Auto Notes', path: '/dashboard/notes' },
    { icon: Zap, label: 'Exam Builder', path: '/dashboard/exams' },
    { icon: Brain, label: 'Mind Maps', path: '/dashboard/mindmaps' },
    { icon: Calendar, label: 'Planner', path: '/dashboard/planner' },
    { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: GraduationCap, label: 'Career Guide', path: '/dashboard/career' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen fixed left-0 top-0 z-40">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center">
          <GraduationCap className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-lg tracking-tight text-slate-900 uppercase">Student Track</span>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              isActive 
                ? "bg-pink-50 text-pink-700" 
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-700 font-bold text-xs">
            {profile?.displayName?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">{profile?.displayName}</p>
            <p className="text-xs text-slate-500 truncate">{profile?.role}</p>
          </div>
        </div>
        
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-1",
            isActive ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50"
          )}
        >
          <User className="w-5 h-5" />
          Profile
        </NavLink>

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};
