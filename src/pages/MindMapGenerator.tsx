import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Brain, 
  Search, 
  Download, 
  Share2, 
  Maximize2, 
  Zap,
  Loader2,
  GitBranch
} from 'lucide-react';
import { Card, Button, Input } from '../components/UI';

export default function MindMapGenerator() {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [mindMapData, setMindMapData] = useState<string | null>(null);

  const generateMindMap = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);

    try {
      const prompt = `
        Generate a hierarchical mind map for the topic: "${topic}".
        Use a structured text format with indentation to represent nodes and sub-nodes.
        Include at least 3 levels of depth.
      `;

      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, systemInstruction: "You are a visual learning expert. Create logical, structured mind maps." })
      });

      const data = await response.json();
      setMindMapData(data.text);
    } catch (error) {
      console.error(error);
      alert("Failed to generate mind map.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">AI Mind Map Generator</h1>
          <p className="text-slate-500">Visualize complex topics with interactive hierarchical structures</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <Card className="p-8">
        <div className="max-w-2xl mx-auto flex gap-2">
          <Input 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic to map out..."
            className="h-12 rounded-xl"
          />
          <Button 
            onClick={generateMindMap} 
            isLoading={isGenerating}
            className="h-12 px-8 rounded-xl"
          >
            Map It
          </Button>
        </div>
      </Card>

      <div className="min-h-[500px] bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 p-8 flex items-center justify-center relative overflow-hidden">
        {isGenerating ? (
          <div className="text-center space-y-4 z-10">
            <Loader2 className="w-12 h-12 text-pink-600 animate-spin mx-auto" />
            <p className="font-bold text-pink-900">Structuring your ideas...</p>
          </div>
        ) : mindMapData ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-full flex flex-col"
          >
             <div className="flex justify-end mb-4">
                <Button variant="ghost" size="sm">
                  <Maximize2 className="w-4 h-4" />
                </Button>
             </div>
             <div className="bg-white p-12 rounded-2xl shadow-xl border border-slate-100 font-mono text-slate-800 whitespace-pre-wrap overflow-auto max-h-[600px] relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-pink-600" />
                {mindMapData}
             </div>
             <div className="mt-8 flex justify-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-pink-600" />
                  <span className="text-xs font-bold text-slate-500 uppercase">Core Topic</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-pink-400" />
                  <span className="text-xs font-bold text-slate-500 uppercase">Sub Topics</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-pink-200" />
                  <span className="text-xs font-bold text-slate-500 uppercase">Details</span>
                </div>
             </div>
          </motion.div>
        ) : (
          <div className="text-center space-y-4 text-slate-400 max-w-sm">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm border border-slate-100 mb-4">
              <GitBranch className="w-10 h-10 text-slate-200" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Start Your Map</h3>
            <p className="text-sm">Enter a topic above and our AI will branch out all related concepts into a logical hierarchy for you.</p>
          </div>
        )}

        {/* Decorative background elements */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-pink-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-100 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Interactive Nodes', desc: 'Click to expand or edit nodes manually.', icon: Zap },
          { title: 'Smart Auto-Layout', desc: 'AI automatically organizes branches for clarity.', icon: Brain },
          { title: 'Export Anywhere', desc: 'Download as PDF, Image, or Markdown.', icon: Download }
        ].map((feat, i) => (
          <Card key={i} className="p-6 flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center mb-4">
              <feat.icon className="w-5 h-5 text-pink-600" />
            </div>
            <h4 className="font-bold text-slate-900 mb-1">{feat.title}</h4>
            <p className="text-xs text-slate-500">{feat.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
