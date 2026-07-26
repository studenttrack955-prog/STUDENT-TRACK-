import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Upload, 
  File, 
  Type, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Download,
  Copy,
  Plus
} from 'lucide-react';
import { Card, Button, Input } from '../components/UI';
import ReactMarkdown from 'react-markdown';

export default function NotesGenerator() {
  const [activeMode, setActiveMode] = useState<'text' | 'file'>('text');
  const [content, setContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [notes, setNotes] = useState<string | null>(null);
  const [noteType, setNoteType] = useState('detailed');

  const generateNotes = async () => {
    if (!content.trim() && activeMode === 'text') return;
    setIsGenerating(true);

    try {
      const prompt = `
        Create ${noteType} notes for the following content. 
        Format the output in professional Markdown with headings, bullet points, and bold text.
        Content: ${content}
      `;

      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt, 
          systemInstruction: "You are an expert academic note taker. Your notes are clear, concise, and highlight key concepts." 
        })
      });

      const data = await response.json();
      setNotes(data.text);
    } catch (error) {
      console.error(error);
      alert("Failed to generate notes. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const noteTypes = [
    { id: 'short', label: 'Short Notes', desc: 'Summary of key points' },
    { id: 'detailed', label: 'Detailed Notes', desc: 'In-depth explanation' },
    { id: 'exam', label: 'Exam Focused', desc: 'Focus on possible questions' },
    { id: 'one-page', label: 'One Page', desc: 'Perfect for quick review' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Auto Notes Generator</h1>
          <p className="text-slate-500">Transform any content into structured study notes</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl border border-slate-200">
          <button 
            onClick={() => setActiveMode('text')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeMode === 'text' ? 'bg-pink-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Paste Text
          </button>
          <button 
            onClick={() => setActiveMode('file')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeMode === 'file' ? 'bg-pink-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Upload File
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Input/Settings */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-pink-600" />
              Generator Settings
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">Note Style</label>
                <div className="grid grid-cols-1 gap-2">
                  {noteTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setNoteType(type.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        noteType === type.id 
                          ? 'border-pink-600 bg-pink-50 ring-1 ring-pink-600' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <p className={`text-sm font-bold ${noteType === type.id ? 'text-pink-700' : 'text-slate-900'}`}>{type.label}</p>
                      <p className="text-[10px] text-slate-500">{type.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  onClick={generateNotes} 
                  isLoading={isGenerating}
                  className="w-full h-12 text-lg"
                  disabled={activeMode === 'text' && !content.trim()}
                >
                  Generate Notes
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-slate-50 border-dashed border-2 border-slate-200">
             <div className="flex items-center gap-3 mb-4">
               <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-slate-200">
                 <Plus className="w-4 h-4 text-slate-400" />
               </div>
               <p className="text-sm font-bold text-slate-700">Quick Tips</p>
             </div>
             <ul className="space-y-2">
               <li className="flex gap-2 text-xs text-slate-500">
                 <CheckCircle2 className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                 Include specific headings for better structure
               </li>
               <li className="flex gap-2 text-xs text-slate-500">
                 <CheckCircle2 className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                 Ask for "Exam Focused" mode for board questions
               </li>
             </ul>
          </Card>
        </div>

        {/* Right: Content/Output */}
        <div className="lg:col-span-2">
          {activeMode === 'text' ? (
            <Card className="p-0 overflow-hidden min-h-[500px] flex flex-col">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  Paste Content
                </h4>
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{content.length} characters</span>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste your lecture notes, transcript, or book excerpts here..."
                className="flex-1 w-full p-8 text-slate-800 focus:outline-none resize-none leading-relaxed text-sm"
              />
            </Card>
          ) : (
            <Card className="p-12 border-dashed border-2 border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-center min-h-[500px]">
              <div className="w-20 h-20 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center mb-6">
                <Upload className="w-10 h-10 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Upload Study Material</h3>
              <p className="text-slate-500 max-w-sm mb-8">Support for PDF, DOCX, PPT, and Images. AI will extract and summarize content for you.</p>
              <Button variant="outline" className="px-8 h-12 rounded-xl">Select Files</Button>
              <p className="mt-4 text-xs text-slate-400">Max file size: 20MB</p>
            </Card>
          )}

          <AnimatePresence>
            {notes && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900">Generated Notes</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export PDF
                    </Button>
                  </div>
                </div>
                <Card className="p-10 prose prose-slate max-w-none shadow-xl border-pink-100">
                  <ReactMarkdown>{notes}</ReactMarkdown>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
