import React from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Search, 
  FileText, 
  Brain, 
  Layout, 
  BarChart3, 
  MessageSquare, 
  Zap,
  ArrowRight,
  CheckCircle2,
  Users,
  Trophy
} from 'lucide-react';
import { Button } from '../components/UI';
import { ShareButton } from '../components/ShareButton';
import { useAuth } from '../context/AuthContext';

export default function LandingPage() {
  const { signInWithGoogle } = useAuth();

  const features = [
    {
      title: "AI Study Assistant",
      desc: "Like ChatGPT, but specialized for your academics. Answers, explains, and summarizes complex topics.",
      icon: <MessageSquare className="w-6 h-6 text-pink-600" />
    },
    {
      title: "Smart Search",
      desc: "Instant generation of Mind Maps, Flashcards, Quizzes, and Revision Notes for any topic.",
      icon: <Search className="w-6 h-6 text-pink-600" />
    },
    {
      title: "Auto Notes Generator",
      desc: "Upload PDFs, Images, or PPTs to generate perfectly formatted short and detailed notes.",
      icon: <FileText className="w-6 h-6 text-pink-600" />
    },
    {
      title: "AI Exam Builder",
      desc: "Teachers and students can generate custom MCQs, Coding, and Theory exams in seconds.",
      icon: <Zap className="w-6 h-6 text-pink-600" />
    },
    {
      title: "Mind Map Visualizer",
      desc: "Transform linear notes into interactive hierarchical mind maps for better retention.",
      icon: <Brain className="w-6 h-6 text-pink-600" />
    },
    {
      title: "Learning Analytics",
      desc: "Track your progress with heatmaps, attention scores, and predicted exam results.",
      icon: <BarChart3 className="w-6 h-6 text-pink-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-pink-100 selection:text-pink-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-pink-600 rounded-xl flex items-center justify-center">
              <BookOpen className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 uppercase">Student Track</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-pink-600 transition-colors">Features</a>
            <a href="#testimonials" className="text-sm font-medium text-slate-600 hover:text-pink-600 transition-colors">Testimonials</a>
            <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-pink-600 transition-colors">Pricing</a>
            <ShareButton variant="ghost" />
            <Button variant="primary" onClick={signInWithGoogle}>Get Started Free</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 border border-pink-100 text-pink-700 text-xs font-semibold uppercase tracking-wider"
          >
            <Zap className="w-3 h-3" />
            The Future of Learning is Here
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1]"
          >
            Master Any Subject with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">AI Intelligence</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Experience the ultimate AI study platform. Generate notes, flashcards, mind maps, and practice exams instantly. Your personal AI academic coach for lifelong success.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button size="lg" className="px-8 py-4 text-lg rounded-xl shadow-pink-200 shadow-lg" onClick={signInWithGoogle}>
              Start Studying Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="secondary" size="lg" className="px-8 py-4 text-lg rounded-xl">
              Explore Demo
            </Button>
            <ShareButton size="lg" className="px-8 py-4 text-lg rounded-xl" />
          </motion.div>
        </div>

        {/* Hero Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-20 max-w-6xl mx-auto rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/50 overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-50/50 to-transparent pointer-events-none" />
          <div className="p-4 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-slate-300" />
              <div className="w-3 h-3 rounded-full bg-slate-300" />
              <div className="w-3 h-3 rounded-full bg-slate-300" />
            </div>
            <div className="mx-auto w-1/3 h-6 rounded-md bg-white border border-slate-200" />
          </div>
          <div className="aspect-[16/9] bg-white flex items-center justify-center text-slate-300">
             <div className="grid grid-cols-12 gap-6 w-full h-full p-8">
               <div className="col-span-3 space-y-4">
                  <div className="h-10 w-full bg-slate-100 rounded-lg animate-pulse" />
                  <div className="h-6 w-3/4 bg-slate-50 rounded-lg" />
                  <div className="h-6 w-2/3 bg-slate-50 rounded-lg" />
                  <div className="pt-8 space-y-3">
                    <div className="h-4 w-full bg-slate-50 rounded-lg" />
                    <div className="h-4 w-5/6 bg-slate-50 rounded-lg" />
                    <div className="h-4 w-4/6 bg-slate-50 rounded-lg" />
                  </div>
               </div>
               <div className="col-span-9 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Layout className="w-8 h-8 text-pink-400" />
                  </div>
                  <p className="font-medium">Premium Dashboard Preview</p>
               </div>
             </div>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Active Students", val: "50,000+", icon: <Users /> },
            { label: "Notes Generated", val: "1.2M+", icon: <FileText /> },
            { label: "Study Streaks", val: "15,000+", icon: <Trophy /> },
            { label: "Avg. Grade Boost", val: "28%", icon: <Zap /> }
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-2">
              <div className="text-3xl font-bold text-slate-900">{stat.val}</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-slate-900">Everything you need to <br />excel in your studies</h2>
            <p className="text-slate-600">A comprehensive suite of AI tools designed to simplify complex subjects and maximize your learning efficiency.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / CTA */}
      <section id="pricing" className="py-24 bg-pink-600">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl font-bold text-white">Join the Learning Revolution</h2>
          <p className="text-pink-100 text-lg max-w-2xl mx-auto">Start your journey with Student Track today and transform the way you learn, prepare, and grow.</p>
          <div className="flex items-center justify-center pt-4">
            <Button size="lg" variant="secondary" className="px-10 py-4 text-pink-600 font-bold text-lg rounded-xl" onClick={signInWithGoogle}>
              Create Your Free Account
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 pt-4">
            <div className="flex items-center gap-2 text-pink-100 text-sm">
              <CheckCircle2 className="w-4 h-4" /> No credit card required
            </div>
            <div className="flex items-center gap-2 text-pink-100 text-sm">
              <CheckCircle2 className="w-4 h-4" /> Cancel anytime
            </div>
            <div className="flex items-center gap-2 text-pink-100 text-sm">
              <CheckCircle2 className="w-4 h-4" /> 24/7 AI Support
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-16 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center">
                <BookOpen className="text-white w-5 h-5" />
              </div>
            <span className="font-bold text-white tracking-tight uppercase">Student Track</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed">
              Empowering students and educators worldwide with advanced AI intelligence. The only platform you need for complete academic and career success.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Study Assistant</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Exam Builder</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Smart Search</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mind Maps</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
          <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-800 text-xs text-center">
          © 2026 Student Track. All rights reserved. Built with Intelligence.
        </div>
      </footer>
    </div>
  );
}
