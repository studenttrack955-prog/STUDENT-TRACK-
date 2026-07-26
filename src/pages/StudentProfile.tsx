import React from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Settings, 
  Award, 
  Book, 
  Trophy, 
  Flame, 
  Mail, 
  Shield, 
  LogOut,
  ChevronRight,
  Star
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Card, Button } from '../components/UI';

export default function StudentProfile() {
  const { profile, logout } = useAuth();

  const achievements = [
    { title: 'Early Bird', desc: 'Study 5 days in a row before 8 AM', icon: Award, date: 'Jul 20, 2026' },
    { title: 'Quiz Master', desc: 'Score 100% on 10 different quizzes', icon: Trophy, date: 'Jul 15, 2026' },
    { title: 'Goal Crusher', desc: 'Complete all daily tasks for 7 days', icon: Star, date: 'Jul 10, 2026' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="relative group">
          <div className="w-32 h-32 rounded-3xl bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-4xl shadow-inner border-4 border-white overflow-hidden">
             {profile?.photoURL ? (
               <img src={profile.photoURL} alt={profile.displayName} className="w-full h-full object-cover" />
             ) : (
               profile?.displayName?.charAt(0) || 'U'
             )}
          </div>
          <button className="absolute -bottom-2 -right-2 p-2 bg-pink-600 text-white rounded-xl shadow-lg border-2 border-white hover:scale-110 transition-transform">
            <Settings className="w-4 h-4" />
          </button>
        </div>
        
        <div className="text-center md:text-left flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <h1 className="text-3xl font-bold text-slate-900">{profile?.displayName}</h1>
            <span className="px-3 py-1 bg-pink-50 text-pink-700 text-xs font-bold rounded-full border border-pink-100 uppercase tracking-wider self-center">
              {profile?.role}
            </span>
          </div>
          <p className="text-slate-500 mt-1 flex items-center justify-center md:justify-start gap-2">
            <Mail className="w-4 h-4" />
            {profile?.email}
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">{profile?.xp || 0}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total XP</p>
            </div>
            <div className="text-center border-x border-slate-100 px-6">
              <p className="text-2xl font-bold text-slate-900">{profile?.streak || 0}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Day Streak</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">{profile?.coins || 0}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Study Coins</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Achievements */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-6 h-6 text-pink-600" />
            Recent Achievements
          </h2>
          <div className="space-y-3">
            {achievements.map((ach, i) => (
              <Card key={i} className="p-4 flex items-center gap-4 hover:border-pink-200 transition-colors cursor-pointer group">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-pink-50 transition-colors">
                  <ach.icon className="w-6 h-6 text-slate-400 group-hover:text-pink-600 transition-colors" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900">{ach.title}</p>
                  <p className="text-xs text-slate-500">{ach.desc}</p>
                </div>
                <p className="text-[10px] font-bold text-slate-400">{ach.date}</p>
              </Card>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="w-full mt-2">View All Achievements</Button>
        </div>

        {/* Account Settings */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Shield className="w-6 h-6 text-pink-600" />
            Account Security
          </h2>
          <div className="space-y-2">
            {[
              { label: 'Privacy Settings', icon: Shield },
              { label: 'Notification Preferences', icon: Settings },
              { label: 'Study Reminders', icon: Book },
              { label: 'Integrate Google Calendar', icon: Flame },
            ].map((item, i) => (
              <button key={i} className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-slate-400 group-hover:text-pink-600" />
                  <span className="text-sm font-semibold text-slate-700">{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </button>
            ))}
            <button 
              onClick={logout}
              className="w-full flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100 hover:bg-red-100 transition-colors group mt-4"
            >
              <div className="flex items-center gap-3">
                <LogOut className="w-4 h-4 text-red-500" />
                <span className="text-sm font-semibold text-red-700">Sign Out of All Devices</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
