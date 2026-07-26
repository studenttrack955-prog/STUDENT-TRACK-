import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  HelpCircle, 
  Clock, 
  Settings, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  Trophy,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { Card, Button, Input } from '../components/UI';

export default function ExamGenerator() {
  const [topic, setTopic] = useState('');
  const [examType, setExamType] = useState('mcq');
  const [difficulty, setDifficulty] = useState('medium');
  const [numQuestions, setNumQuestions] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const [examData, setExamData] = useState<any>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const generateExam = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setShowResults(false);
    setUserAnswers({});

    try {
      const prompt = `
        Generate a ${difficulty} difficulty ${examType} exam for the topic: "${topic}".
        Include ${numQuestions} questions.
        Return ONLY a JSON object:
        {
          "title": "Exam Title",
          "questions": [
            {
              "q": "Question text",
              "options": ["Opt 1", "Opt 2", "Opt 3", "Opt 4"],
              "correct": 0,
              "explanation": "Why this is correct"
            }
          ]
        }
      `;

      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, systemInstruction: "You are an expert examiner. Return valid JSON only." })
      });

      const data = await response.json();
      const jsonStr = data.text.replace(/```json\n?|\n?```/g, '').trim();
      setExamData(JSON.parse(jsonStr));
    } catch (error) {
      console.error(error);
      alert("Failed to generate exam.");
    } finally {
      setIsGenerating(false);
    }
  };

  const calculateScore = () => {
    let score = 0;
    examData.questions.forEach((q: any, i: number) => {
      if (userAnswers[i] === q.correct) score++;
    });
    return score;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">AI Exam Generator</h1>
        <p className="text-slate-500">Create custom practice exams for any subject or topic</p>
      </div>

      <AnimatePresence mode="wait">
        {!examData ? (
          <motion.div
            key="config"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Card className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-2">Topic or Subject</label>
                    <Input 
                      placeholder="e.g. Data Structures and Algorithms, World War II, Photosynthesis"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-2">Exam Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['mcq', 'coding', 'theory', 'fill-blanks'].map(t => (
                        <button
                          key={t}
                          onClick={() => setExamType(t)}
                          className={`px-4 py-2 rounded-lg border text-sm font-medium capitalize transition-all ${
                            examType === t ? 'bg-pink-600 text-white border-pink-600' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {t.replace('-', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-2">Difficulty Level</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['easy', 'medium', 'hard'].map(d => (
                        <button
                          key={d}
                          onClick={() => setDifficulty(d)}
                          className={`px-4 py-2 rounded-lg border text-sm font-medium capitalize transition-all ${
                            difficulty === d ? 'bg-pink-600 text-white border-pink-600' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-2">Number of Questions ({numQuestions})</label>
                    <input 
                      type="range" 
                      min="5" 
                      max="30" 
                      step="5"
                      value={numQuestions}
                      onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-pink-600"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-wider">
                      <span>5 Qs</span>
                      <span>30 Qs</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-100 flex justify-center">
                <Button 
                  size="lg" 
                  className="px-12 h-14 text-lg rounded-2xl shadow-xl shadow-pink-100"
                  onClick={generateExam}
                  isLoading={isGenerating}
                  disabled={!topic.trim()}
                >
                  Generate Exam
                  <Zap className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="exam"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 sticky top-20 z-20 shadow-sm">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => setExamData(null)}>
                  Back
                </Button>
                <h2 className="font-bold text-slate-900">{examData.title}</h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                  <Clock className="w-4 h-4 text-pink-500" />
                  <span>30:00</span>
                </div>
                {!showResults && (
                  <Button size="sm" onClick={() => setShowResults(true)}>
                    Submit Exam
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {examData.questions.map((q: any, i: number) => (
                <Card key={i} className={`p-6 transition-all ${showResults && userAnswers[i] !== q.correct ? 'border-red-100 bg-red-50/30' : ''}`}>
                  <p className="font-bold text-lg text-slate-900 mb-4">{i + 1}. {q.q}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {q.options.map((opt: string, j: number) => (
                      <button
                        key={j}
                        disabled={showResults}
                        onClick={() => setUserAnswers({ ...userAnswers, [i]: j })}
                        className={`p-4 text-left border rounded-xl transition-all relative ${
                          userAnswers[i] === j 
                            ? 'border-pink-600 bg-pink-50 text-pink-700 font-bold' 
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                        } ${
                          showResults && q.correct === j ? 'border-emerald-500 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-500' : ''
                        } ${
                          showResults && userAnswers[i] === j && q.correct !== j ? 'border-red-500 bg-red-50 text-red-700 ring-2 ring-red-500' : ''
                        }`}
                      >
                        {opt}
                        {showResults && q.correct === j && (
                          <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600" />
                        )}
                        {showResults && userAnswers[i] === j && q.correct !== j && (
                          <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-600" />
                        )}
                      </button>
                    ))}
                  </div>
                  {showResults && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="mt-6 p-4 bg-white border border-slate-100 rounded-lg text-sm text-slate-600"
                    >
                      <p className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-pink-500" />
                        Explanation:
                      </p>
                      {q.explanation}
                    </motion.div>
                  )}
                </Card>
              ))}
            </div>

            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-12 text-center space-y-6 border-2 border-pink-600 bg-pink-50/30">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <Trophy className="w-10 h-10 text-yellow-500" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-slate-900">Exam Completed!</h2>
                    <p className="text-slate-600 font-medium">You scored {calculateScore()} out of {examData.questions.length}</p>
                  </div>
                  <div className="text-5xl font-black text-pink-600">
                    {Math.round((calculateScore() / examData.questions.length) * 100)}%
                  </div>
                  <div className="flex items-center justify-center gap-4 pt-6">
                    <Button variant="outline" onClick={() => { setExamData(null); setShowResults(false); }}>
                      Back to Home
                    </Button>
                    <Button onClick={() => { setShowResults(false); setUserAnswers({}); }}>
                      Retake Exam
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
