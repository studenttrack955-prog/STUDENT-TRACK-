import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  CheckSquare, 
  Plus, 
  Trash2, 
  Play, 
  Pause, 
  RotateCcw,
  Zap,
  Target
} from 'lucide-react';
import { Card, Button, Input } from '../components/UI';

export default function StudentPlanner() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Revise Operating Systems', done: false, priority: 'high' },
    { id: 2, title: 'Math Assignment #4', done: true, priority: 'medium' },
    { id: 3, title: 'English Essay Draft', done: false, priority: 'low' },
  ]);
  const [newTask, setNewTask] = useState('');

  // Pomodoro State
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setIsActive(false);
          alert("Time's up! Take a break.");
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), title: newTask, done: false, priority: 'medium' }]);
    setNewTask('');
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
      {/* Left: Pomodoro Timer */}
      <div className="space-y-6">
        <Card className="p-8 text-center bg-slate-900 text-white border-none shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-pink-500" style={{ width: `${((25 * 60 - (minutes * 60 + seconds)) / (25 * 60)) * 100}%` }} />
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Focus Timer</h3>
          <div className="text-7xl font-black font-mono mb-8 tabular-nums">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <div className="flex justify-center gap-4">
            <Button 
              className={`rounded-full w-14 h-14 p-0 ${isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-pink-500 hover:bg-pink-600'}`}
              onClick={() => setIsActive(!isActive)}
            >
              {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </Button>
            <Button 
              variant="outline" 
              className="rounded-full w-14 h-14 p-0 border-slate-700 text-slate-300 hover:bg-slate-800"
              onClick={() => { setIsActive(false); setMinutes(25); setSeconds(0); }}
            >
              <RotateCcw className="w-6 h-6" />
            </Button>
          </div>
          <p className="mt-8 text-xs text-slate-500 font-medium italic">"Deep work is the superpower of the 21st century."</p>
        </Card>

        <Card className="p-6">
           <div className="flex items-center gap-3 mb-4">
             <Target className="w-5 h-5 text-pink-600" />
             <h3 className="font-bold text-slate-900">Study Goal</h3>
           </div>
           <p className="text-sm text-slate-600 mb-4">You've completed 4 out of 10 study hours this week.</p>
           <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-pink-600 w-[40%]" />
           </div>
        </Card>
      </div>

      {/* Right: Task List */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <CheckSquare className="w-6 h-6 text-pink-600" />
              <h2 className="text-2xl font-bold text-slate-900">Task Planner</h2>
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{tasks.filter(t => !t.done).length} remaining</span>
          </div>

          <form onSubmit={addTask} className="flex gap-2 mb-8">
            <Input 
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="What do you need to study today?"
              className="flex-1 rounded-xl"
            />
            <Button type="submit" className="rounded-xl px-6">
              <Plus className="w-5 h-5" />
            </Button>
          </form>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div 
                key={task.id} 
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                  task.done ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-100 hover:border-pink-200 shadow-sm'
                }`}
              >
                <button 
                  onClick={() => toggleTask(task.id)}
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                    task.done ? 'bg-pink-600 border-pink-600 text-white' : 'border-slate-200 hover:border-pink-400'
                  }`}
                >
                  {task.done && <CheckSquare className="w-4 h-4" />}
                </button>
                <div className="flex-1">
                  <p className={`text-sm font-semibold text-slate-900 ${task.done ? 'line-through text-slate-400' : ''}`}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      task.priority === 'high' ? 'bg-red-50 text-red-600' : 
                      task.priority === 'medium' ? 'bg-amber-50 text-amber-600' : 
                      'bg-slate-100 text-slate-500'
                    }`}>
                      {task.priority}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">Added Today</span>
                  </div>
                </div>
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <Card className="p-6 flex items-center gap-4 border-l-4 border-pink-600">
              <Calendar className="w-8 h-8 text-pink-600" />
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Upcoming Exam</p>
                <p className="text-sm font-bold text-slate-900">Computer Networks</p>
                <p className="text-xs text-slate-500">In 3 days</p>
              </div>
           </Card>
           <Card className="p-6 flex items-center gap-4 border-l-4 border-amber-500">
              <Zap className="w-8 h-8 text-amber-500" />
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Daily Streak</p>
                <p className="text-sm font-bold text-slate-900">5 Days</p>
                <p className="text-xs text-slate-500">Keep it up!</p>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
