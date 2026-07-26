import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  Search, 
  Compass, 
  Code, 
  Layout, 
  BarChart, 
  Map, 
  Award, 
  ArrowRight,
  TrendingUp,
  DollarSign,
  Star
} from 'lucide-react';
import { Card, Button, Input } from '../components/UI';

export default function CareerGuide() {
  const [goal, setGoal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [careerData, setCareerData] = useState<any>(null);

  const generateGuide = async () => {
    if (!goal.trim()) return;
    setIsGenerating(true);

    try {
      const prompt = `
        User wants career advice for: "${goal}".
        Provide a detailed career roadmap, skills required, salary insights, and placement preparation tips.
        Return ONLY a JSON object:
        {
          "role": "Job Title",
          "description": "Short description",
          "salary": "Range",
          "skills": ["Skill 1", "Skill 2"],
          "roadmap": ["Step 1", "Step 2"],
          "interviewTips": ["Tip 1", "Tip 2"],
          "popularCourses": ["Course 1", "Course 2"]
        }
      `;

      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, systemInstruction: "You are an expert career counselor and placement officer. Return valid JSON only." })
      });

      const data = await response.json();
      const jsonStr = data.text.replace(/```json\n?|\n?```/g, '').trim();
      setCareerData(JSON.parse(jsonStr));
    } catch (error) {
      console.error(error);
      alert("Failed to generate career guide.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">AI Career & Placement Guide</h1>
        <p className="text-slate-500">Get personalized roadmaps, interview tips, and skill assessments for your dream job</p>
        
        <div className="max-w-2xl mx-auto pt-6 flex gap-2">
          <Input 
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g. Frontend Developer, Data Scientist, Product Manager..."
            className="h-12 text-lg rounded-xl shadow-sm"
          />
          <Button 
            onClick={generateGuide} 
            isLoading={isGenerating}
            className="h-12 px-8 rounded-xl shadow-lg shadow-pink-100"
          >
            Find Path
          </Button>
        </div>
      </div>

      {careerData ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="space-y-1">
                  <h2 className="text-3xl font-bold text-slate-900">{careerData.role}</h2>
                  <p className="text-slate-500">{careerData.description}</p>
                </div>
                <div className="p-4 bg-pink-50 rounded-2xl">
                  <Briefcase className="w-8 h-8 text-pink-600" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Average Salary</p>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-emerald-600" />
                    <span className="text-xl font-bold text-slate-900">{careerData.salary}</span>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Demand Level</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-pink-600" />
                    <span className="text-xl font-bold text-slate-900">High Growth</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Map className="w-6 h-6 text-pink-600" />
                  Your Learning Roadmap
                </h3>
                <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                  {careerData.roadmap.map((step: string, i: number) => (
                    <div key={i} className="flex gap-6 relative">
                      <div className="w-6 h-6 rounded-full bg-pink-600 flex items-center justify-center shrink-0 text-[10px] font-bold text-white z-10 shadow-sm">
                        {i + 1}
                      </div>
                      <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm flex-1">
                        <p className="text-slate-700 font-medium">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  Key Skills to Master
                </h3>
                <div className="flex flex-wrap gap-2">
                  {careerData.skills.map((skill: string, i: number) => (
                    <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold border border-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-pink-600" />
                  Interview Tips
                </h3>
                <ul className="space-y-2">
                  {careerData.interviewTips.map((tip: string, i: number) => (
                    <li key={i} className="text-sm text-slate-600 flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5 shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-bold text-slate-900 mb-4">Top Courses</h3>
              <div className="space-y-4">
                {careerData.popularCourses.map((course: string, i: number) => (
                  <div key={i} className="group cursor-pointer">
                    <p className="text-sm font-bold text-slate-800 group-hover:text-pink-600 transition-colors">{course}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-slate-400 font-medium">Verified Program</span>
                      <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-pink-400 transition-all group-hover:translate-x-1" />
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-6">Browse All Courses</Button>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-pink-600 to-rose-700 text-white border-none shadow-xl">
              <h3 className="font-bold text-lg mb-2">Mock Interviews</h3>
              <p className="text-pink-100 text-sm mb-6">Schedule a 1-on-1 AI-powered mock interview tailored for {careerData.role}.</p>
              <Button className="w-full bg-white text-pink-600 hover:bg-pink-50 border-none font-bold">Start Session</Button>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-slate-900 mb-4">Placement Success</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Rahul Sharma</p>
                    <p className="text-[10px] text-slate-500">Placed at Google</p>
                  </div>
                </div>
                <p className="text-xs italic text-slate-500">"StudyVerse's career guide helped me focus on exactly what matters. The interview tips were spot on!"</p>
              </div>
            </Card>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
           {[
             { title: 'Roadmaps', desc: 'Step-by-step career paths', icon: Map },
             { title: 'Salary Check', desc: 'Global income insights', icon: DollarSign },
             { title: 'Prep Kits', desc: 'Interview & DSA trackers', icon: Code }
           ].map((card, i) => (
             <Card key={i} className="p-8 text-center space-y-4">
                <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto">
                  <card.icon className="w-7 h-7 text-pink-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{card.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{card.desc}</p>
             </Card>
           ))}
        </div>
      )}
    </div>
  );
}
