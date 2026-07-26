import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Student Track API is healthy" });
  });

  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { message, history, systemInstruction } = req.body;
      const { GoogleGenAI } = await import("@google/genai");
      const genAI = new GoogleGenAI({ 
        apiKey: process.env.GEMINI_API_KEY || "",
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });

      const chat = genAI.chats.create({
        model: "gemini-3.6-flash",
        config: {
          systemInstruction: systemInstruction || "You are Student Track assistant, a premium academic coach. Be concise, accurate, and helpful."
        },
        history: history || []
      });

      const result = await chat.sendMessage({ message });
      res.json({ text: result.text });
    } catch (error: any) {
      console.error("Gemini Chat Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/ai/generate", async (req, res) => {
    try {
      const { prompt, systemInstruction } = req.body;
      const { GoogleGenAI } = await import("@google/genai");
      const genAI = new GoogleGenAI({ 
        apiKey: process.env.GEMINI_API_KEY || "",
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });

      const result = await genAI.models.generateContent({
        model: "gemini-3.6-flash",
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          systemInstruction: systemInstruction || "You are a specialized academic content generator. Output in clean Markdown."
        }
      });

      res.json({ text: result.text });
    } catch (error: any) {
      console.error("Gemini Generate Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
