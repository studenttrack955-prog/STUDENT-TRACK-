import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Sparkles, 
  BookOpen, 
  Brain, 
  Zap, 
  Layout, 
  HelpCircle, 
  Code,
  FileText,
  Loader2,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Card, Button, Input } from '../components/UI';
import ReactMarkdown from 'react-markdown';

export default function SmartSearch() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isSearching) return;

    setIsSearching(true);
    try {
      const prompt = `
        User wants to learn about: "${query}"
        Generate a comprehensive study pack for this topic. 
        Return ONLY a JSON object with the following structure:
        {
          "summary": "Brief 100-word overview",
          "mindMap": "Hierarchical list representing a mind map",
          "flashcards": [{"q": "Question", "a": "Answer"}],
          "quiz": [{"q": "Question", "options": ["A", "B", "C", "D"], "correct": 0}],
          "importantQuestions": ["Q1", "Q2", "Q3"],
          "interviewQuestions": ["IQ1", "IQ2"],
          "codingProblems": ["Problem description if applicable"],
          "revisionNotes": "Markdown formatted summary"
        }
      `;

      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, systemInstruction: "You are a specialized study content generator. Return valid JSON only." })
      });

      const data = await response.json();
      // Clean potential markdown code blocks from JSON
      const jsonStr = data.text.replace(/```json\n?|\n?```/g, '').trim();
      setResults(JSON.parse(jsonStr));
    } catch (error) {
      console.error(error);
      alert("Failed to generate content. Please try a different topic.");
    } finally {
      setIsSearching(false);
    }
  };

  const tabs = [
    { id: 'summary', label: 'Summary', icon: BookOpen },
    { id: 'mindMap', label: 'Mind Map', icon: Brain },
    { id: 'flashcards', label: 'Flashcards', icon: Zap },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle },
    { id: 'interview', label: 'Interview', icon: Layout },
    { id: 'coding', label: 'Coding', icon: Code },
  ];

  const [activeTab, setActiveTab] = useState('summary');

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">AI Smart Search</h1>
        <p className="text-slate-500">Enter any topic to instantly generate a complete study kit</p>
        
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto pt-4">
          <Input 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Quantum Computing, Operating Systems, Photosynthesis..."
            className="pl-12 pr-32 h-14 text-lg rounded-2xl shadow-lg border-slate-200"
          />
          <Search className="absolute left-4 top-[30px] w-6 h-6 text-slate-400" />
          <Button 
            type="submit" 
            isLoading={isSearching}
            className="absolute right-2 top-[10px] h-10 rounded-xl"
          >
            Generate Kit
          </Button>
        </form>
      </div>

      <AnimatePresence mode="wait">
        {results ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id 
                      ? 'bg-pink-600 text-white shadow-md' 
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <Card className="p-8 min-h-[400px]">
              {activeTab === 'summary' && (
                <div className="prose prose-slate max-w-none">
                  <h2 className="text-2xl font-bold mb-4">Topic Summary</h2>
                  <ReactMarkdown>{results.summary}</ReactMarkdown>
                  <div className="mt-8 pt-8 border-t border-slate-100">
                    <h3 className="font-bold mb-4">Revision Notes</h3>
                    <ReactMarkdown>{results.revisionNotes}</ReactMarkdown>
                  </div>
                </div>
              )}

              {activeTab === 'mindMap' && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold mb-6">Visual Mind Map</h2>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 font-mono text-sm leading-relaxed">
                    <pre className="whitespace-pre-wrap">{results.mindMap}</pre>
                  </div>
                  <p className="text-xs text-slate-400 mt-4 italic">Interactive visualization coming soon in v2.0</p>
                </div>
              )}

              {activeTab === 'flashcards' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.flashcards.map((card: any, i: number) => (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      className="p-6 bg-pink-50 border border-pink-100 rounded-xl group cursor-pointer relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Zap className="w-4 h-4 text-pink-300" />
                      </div>
                      <p className="font-bold text-slate-900 mb-2">Q: {card.q}</p>
                      <p className="text-pink-600 text-sm font-medium">A: {card.a}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 'quiz' && (
                <div className="space-y-8">
                   {results.quiz.map((q: any, i: number) => (
                     <div key={i} className="space-y-4">
                        <p className="font-bold text-lg">{i+1}. {q.q}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {q.options.map((opt: string, j: number) => (
                            <button key={j} className="p-4 text-left border border-slate-200 rounded-lg hover:border-pink-500 hover:bg-pink-50 transition-all text-sm">
                              {opt}
                            </button>
                          ))}
                        </div>
                     </div>
                   ))}
                </div>
              )}

              {activeTab === 'interview' && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                      <Layout className="w-5 h-5 text-pink-600" />
                      Important Exam Questions
                    </h3>
                    <ul className="space-y-3">
                      {results.importantQuestions.map((q: string, i: number) => (
                        <li key={i} className="flex gap-3 text-slate-600 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          {q}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-6 border-t border-slate-100 space-y-4">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-amber-500" />
                      Interview Questions
                    </h3>
                    <ul className="space-y-3">
                      {results.interviewQuestions.map((q: string, i: number) => (
                        <li key={i} className="flex gap-3 text-slate-600 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                          {q}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'coding' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Practical Challenges</h2>
                  {results.codingProblems && results.codingProblems.length > 0 ? (
                    results.codingProblems.map((p: string, i: number) => (
                      <div key={i} className="bg-slate-900 rounded-xl p-6 text-pink-300 font-mono text-sm">
                         <ReactMarkdown>{p}</ReactMarkdown>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500 italic">No specific coding challenges for this topic.</p>
                  )}
                </div>
              )}
            </Card>

            <div className="flex justify-end gap-4">
              <Button variant="outline">Save to My Materials</Button>
              <Button>Export as PDF</Button>
            </div>
          </motion.div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 space-y-4">
             <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
                <Search className="w-10 h-10" />
             </div>
             <p className="font-medium">Search for a topic to get started</p>
             <div className="flex flex-wrap justify-center gap-2 max-w-sm">
               {['Data Structures', 'World History', 'Machine Learning', 'Organic Chemistry'].map(t => (
                 <button 
                  key={t}
                  onClick={() => setQuery(t)}
                  className="px-3 py-1 rounded-full border border-slate-200 text-xs hover:border-pink-500 hover:text-pink-600 transition-colors"
                 >
                   {t}
                 </button>
               ))}
             </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
