import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


if (!process.env.KEY) {
  throw new Error("API KEY missing in .env file");
}

const genAI = new GoogleGenerativeAI(process.env.KEY);

// Use a supported + stable model
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});

const crisisKeywords = [
  "suicide",
  "kill myself",
  "end my life",
  "self harm",
  "cut myself",
  "want to die",
  "no reason to live"
];

app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).send({
        _status: false,
        _message: "question is required"
      });
    }

    const isCrisis = crisisKeywords.some(word =>
      question.toLowerCase().includes(word)
    );

    if (isCrisis) {
      return res.send({
        _status: true,
        finalData: `
I'm really sorry that you're feeling this way.
You are not alone, and help is available.

Please reach out immediately:
• India: AASRA – 91-9820466726
• US & Canada: 988 Suicide & Crisis Lifeline
• Emergency services in your country

If possible, talk to someone you trust right now.
`
      });
    }
    const systemPrompt = `
You are a mental health support assistant.
You are NOT a therapist or medical professional.
You do NOT diagnose mental health conditions.

Your role:
- Be empathetic and supportive
- Use calm, non-judgmental language
- Offer grounding exercises and coping strategies
- Encourage professional help when appropriate

Safety rules:
- Never give medical advice or diagnosis
- Never encourage self-harm
- Never claim to replace therapy
`;
    const userPrompt = `
User message:
"${question}"

Respond as a supportive mental health companion.
`;
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: userPrompt }]
        }
      ],
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      }
    });

    const answer =
      result?.response?.text() ||
      "I'm here with you. Would you like to share more?";

    res.send({
      _status: true,
      finalData: answer
    });

  } catch (err) {
    console.error("SERVER ERROR:", err.message);

    res.status(500).send({
      _status: false,
      _message: "Something went wrong on the server"
    });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
