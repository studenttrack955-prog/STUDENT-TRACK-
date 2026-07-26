import React from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Flame, 
  Coins, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Zap,
  ArrowRight,
  BookOpen,
  FileText,
  Brain
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Card, Button } from '../components/UI';

export default function DashboardOverview() {
  const { profile } = useAuth();

  const stats = [
    { label: 'Current Streak', val: `${profile?.streak || 0} Days`, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Study XP', val: profile?.xp || 0, icon: Trophy, color: 'text-pink-600', bg: 'bg-pink-50' },
    { label: 'Earned Coins', val: profile?.coins || 0, icon: Coins, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: 'Focus Time', val: '12.5h', icon: Clock, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const tasks = [
    { title: 'Operating Systems Revision', time: 'Today, 2:00 PM', priority: 'High', type: 'Exam' },
    { title: 'Complete DBMS Assignment', time: 'Tomorrow, 10:00 AM', priority: 'Medium', type: 'Work' },
    { title: 'Practice Python DSA', time: 'Jul 28, 4:00 PM', priority: 'Low', type: 'Skills' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back, {profile?.displayName}! 👋</h1>
          <p className="text-slate-500">Ready to crush your learning goals today?</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">Download Stats</Button>
          <Button variant="primary" size="sm">Start Focus Session</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                <TrendingUp className="w-3 h-3" />
                +12%
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.val}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* AI Recommendation */}
          <Card className="p-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500">
            <div className="bg-white rounded-[10px] p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center shrink-0">
                <Zap className="w-8 h-8 text-pink-600" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-bold text-slate-900">Recommended for you</h3>
                <p className="text-sm text-slate-600">Based on your recent activity, we recommend revising <span className="font-semibold text-pink-600">Data Structures</span>. You haven't practiced this topic in 3 days.</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">Flashcards Available</span>
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">Quiz Ready</span>
                </div>
              </div>
              <Button size="sm" className="shrink-0">Generate Revision Plan</Button>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: 'Topic Search', icon: BookOpen, desc: 'Generate materials instantly' },
              { title: 'Upload PDF', icon: FileText, desc: 'AI-powered note taking' },
              { title: 'Mind Map', icon: Brain, desc: 'Visualize your knowledge' }
            ].map((action, i) => (
              <button key={i} className="group p-6 bg-white rounded-xl border border-slate-100 shadow-sm hover:border-pink-200 hover:shadow-md transition-all text-left">
                <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-pink-50 transition-colors">
                  <action.icon className="w-5 h-5 text-slate-600 group-hover:text-pink-600" />
                </div>
                <h4 className="font-bold text-slate-900 group-hover:text-pink-600 transition-colors">{action.title}</h4>
                <p className="text-xs text-slate-500 mt-1">{action.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar in Main Grid */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900">Today's Tasks</h3>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {tasks.map((task, i) => (
                <div key={i} className="flex gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                  <button className="w-5 h-5 rounded border border-slate-300 mt-1 hover:border-pink-500 transition-colors" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900 group-hover:text-pink-600 transition-colors">{task.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 uppercase font-bold tracking-wider">{task.type}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{task.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full mt-6">Add New Task</Button>
          </Card>

          <Card className="p-6 bg-slate-900 text-white">
            <h3 className="font-bold mb-2">Upgrade to Pro</h3>
            <p className="text-slate-400 text-sm mb-4">Get unlimited AI generations, 10GB storage, and collaborative study groups.</p>
            <Button className="w-full bg-pink-500 hover:bg-pink-400 border-none text-white font-bold">Go Pro Now</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
