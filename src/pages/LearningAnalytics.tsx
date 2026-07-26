import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Target, 
  Clock, 
  Brain, 
  Zap, 
  Award,
  ChevronDown
} from 'lucide-react';
import { Card } from '../components/UI';

const studyData = [
  { name: 'Mon', hours: 4.5, accuracy: 85 },
  { name: 'Tue', hours: 3.2, accuracy: 78 },
  { name: 'Wed', hours: 6.1, accuracy: 92 },
  { name: 'Thu', hours: 2.8, accuracy: 88 },
  { name: 'Fri', hours: 5.4, accuracy: 95 },
  { name: 'Sat', hours: 7.2, accuracy: 91 },
  { name: 'Sun', hours: 4.0, accuracy: 89 },
];

const subjectData = [
  { name: 'DSA', value: 40, color: '#6366f1' },
  { name: 'OS', value: 25, color: '#a855f7' },
  { name: 'DBMS', value: 20, color: '#ec4899' },
  { name: 'Math', value: 15, color: '#f43f5e' },
];

export default function LearningAnalytics() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Learning Analytics</h1>
          <p className="text-slate-500">Deep dive into your study patterns and performance</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
          Last 7 Days
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Top Level Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 flex items-center gap-6">
           <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center">
              <Clock className="w-7 h-7 text-pink-600" />
           </div>
           <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Study Time</p>
              <h3 className="text-2xl font-bold text-slate-900">32h 45m</h3>
              <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +15% from last week
              </p>
           </div>
        </Card>
        <Card className="p-6 flex items-center gap-6">
           <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center">
              <Target className="w-7 h-7 text-purple-600" />
           </div>
           <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Avg. Quiz Accuracy</p>
              <h3 className="text-2xl font-bold text-slate-900">89.4%</h3>
              <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +3% increase
              </p>
           </div>
        </Card>
        <Card className="p-6 flex items-center gap-6">
           <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center">
              <Brain className="w-7 h-7 text-amber-600" />
           </div>
           <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Concepts Mastered</p>
              <h3 className="text-2xl font-bold text-slate-900">142</h3>
              <p className="text-xs text-slate-500 font-bold mt-1">12 new this week</p>
           </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Study Hours Trend */}
        <Card className="p-8">
           <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-slate-900">Study Hours Trend</h3>
              <Zap className="w-5 h-5 text-pink-400" />
           </div>
           <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={studyData}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="hours" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </Card>

        {/* Subject Distribution */}
        <Card className="p-8">
           <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-slate-900">Subject Distribution</h3>
              <Award className="w-5 h-5 text-pink-400" />
           </div>
           <div className="h-[300px] flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subjectData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {subjectData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <span className="text-2xl font-bold text-slate-900">100%</span>
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Focus</span>
              </div>
           </div>
           <div className="grid grid-cols-2 gap-4 mt-4">
              {subjectData.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                   <span className="text-sm font-medium text-slate-600">{s.name} ({s.value}%)</span>
                </div>
              ))}
           </div>
        </Card>
      </div>

      <Card className="p-8">
         <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900">Accuracy vs Goal</h3>
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-400">
               <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-pink-600" />
                  Accuracy
               </div>
               <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-pink-200" />
                  Goal
               </div>
            </div>
         </div>
         <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="accuracy" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
         </div>
      </Card>
    </div>
  );
}
