import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Import models
import User from "./models/User.js";
import ChatSession from "./models/ChatSession.js";

// Import middleware
import { verifyToken } from "./middleware/auth.js";

// Import utilities
import { generateSessionAnalysis, shouldEscalate } from "./utils/sessionAnalysis.js";
import { triggerEmergencyEscalation, getEscalationThreshold } from "./utils/escalation.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ============================================================
// INITIALIZE SERVICES
// ============================================================

if (!process.env.KEY) {
  throw new Error("API KEY missing in .env file");
}

const genAI = new GoogleGenerativeAI(process.env.KEY);

// Use a supported + stable model
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});

// ============================================================
// DATABASE CONNECTION
// ============================================================

// Connect to MongoDB
const mongodbUri = process.env.MONGODB_URI || "mongodb://localhost:27017/cosmo-hack";
mongoose.connect(mongodbUri)
  .then(() => console.log("✓ MongoDB connected"))
  .catch(err => console.error("✗ MongoDB connection error:", err.message));

// ============================================================
// AUTHENTICATION ROUTES
// ============================================================

/**
 * POST /auth/signup
 * Register a new user with name, email, password, and emergency contact
 */
app.post("/auth/signup", async (req, res) => {
  try {
    const { name, email, password, emergencyContact } = req.body;

    // Validate required fields
    if (!name || !email || !password || !emergencyContact) {
      return res.status(400).json({
        _status: false,
        _message: "Missing required fields: name, email, password, emergencyContact"
      });
    }

    // Validate emergency contact fields
    if (!emergencyContact.name || !emergencyContact.relationship || !emergencyContact.phoneNumber) {
      return res.status(400).json({
        _status: false,
        _message: "Emergency contact must have name, relationship, and phoneNumber"
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        _status: false,
        _message: "Email already registered"
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      emergencyContact
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      _status: true,
      _message: "User registered successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({
      _status: false,
      _message: "Signup failed",
      error: error.message
    });
  }
});

/**
 * POST /auth/login
 * Authenticate user with email and password
 */
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        _status: false,
        _message: "Email and password are required"
      });
    }

    // Find user by email and include password field (normally hidden)
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        _status: false,
        _message: "Invalid email or password"
      });
    }

    // Compare passwords
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        _status: false,
        _message: "Invalid email or password"
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    res.json({
      _status: true,
      _message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({
      _status: false,
      _message: "Login failed",
      error: error.message
    });
  }
});

// ============================================================
// CHAT SESSION ROUTES
// ============================================================

/**
 * POST /sessions/start
 * Start a new chat session for an authenticated user
 */
app.post("/sessions/start", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    // Create new session
    const session = new ChatSession({
      userId,
      messages: [],
      status: "active"
    });

    await session.save();

    res.status(201).json({
      _status: true,
      _message: "Chat session started",
      sessionId: session._id,
      startedAt: session.startedAt
    });
  } catch (error) {
    console.error("Session start error:", error.message);
    res.status(500).json({
      _status: false,
      _message: "Failed to start session",
      error: error.message
    });
  }
});

/**
 * POST /sessions/:sessionId/message
 * Add a message to a chat session and get AI response
 */
app.post("/sessions/:sessionId/message", verifyToken, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { question } = req.body;
    const userId = req.userId;

    if (!question) {
      return res.status(400).json({
        _status: false,
        _message: "Message content is required"
      });
    }

    // Verify session exists and belongs to user
    const session = await ChatSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({
        _status: false,
        _message: "Session not found"
      });
    }

    if (session.userId.toString() !== userId) {
      return res.status(403).json({
        _status: false,
        _message: "Unauthorized access to this session"
      });
    }

    if (session.status !== "active") {
      return res.status(400).json({
        _status: false,
        _message: "This session has ended. Start a new session to continue."
      });
    }

    // Add user message to session
    session.messages.push({
      role: "user",
      content: question,
      timestamp: new Date()
    });

    // Generate AI response
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

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: question }]
        }
      ],
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      }
    });

    const answer = result?.response?.text() || "I'm here with you. Would you like to share more?";

    // Add assistant message to session
    session.messages.push({
      role: "assistant",
      content: answer,
      timestamp: new Date()
    });

    await session.save();

    res.json({
      _status: true,
      _message: "Message processed",
      response: answer,
      messageCount: session.messages.length
    });
  } catch (error) {
    console.error("Message processing error:", error.message);
    res.status(500).json({
      _status: false,
      _message: "Failed to process message",
      error: error.message
    });
  }
});

/**
 * POST /sessions/:sessionId/end
 * End a chat session and generate summary + severity rating + escalation if needed
 */
app.post("/sessions/:sessionId/end", verifyToken, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.userId;

    // Verify session exists and belongs to user
    const session = await ChatSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({
        _status: false,
        _message: "Session not found"
      });
    }

    if (session.userId.toString() !== userId) {
      return res.status(403).json({
        _status: false,
        _message: "Unauthorized access to this session"
      });
    }

    if (session.status !== "active") {
      return res.status(400).json({
        _status: false,
        _message: "This session is already ended"
      });
    }

    // Generate session summary and severity rating using Gemini
    const analysis = await generateSessionAnalysis(session.messages);

    // Update session with analysis
    session.sessionSummary = analysis.summary;
    session.severityRating = analysis.severityRating;
    session.status = "ended";
    session.endedAt = new Date();

    // Check if escalation is needed
    const escalationThreshold = getEscalationThreshold();
    const shouldTriggerEscalation = shouldEscalate(analysis.severityRating, escalationThreshold);

    if (shouldTriggerEscalation) {
      // Get user details for escalation
      const user = await User.findById(userId);
      if (user && user.emergencyContact) {
        // Trigger emergency escalation
        const escalationResult = await triggerEmergencyEscalation(
          userId,
          user.name,
          user.emergencyContact.phoneNumber,
          sessionId,
          analysis.severityRating
        );

        session.escalationTriggered = true;

        console.log(
          `[ESCALATION] Session ${sessionId} - Severity: ${analysis.severityRating}/${escalationThreshold} - User: ${user.name}`
        );
      }
    }

    await session.save();

    res.json({
      _status: true,
      _message: "Session ended and analyzed",
      analysis: {
        summary: session.sessionSummary,
        severityRating: session.severityRating
      },
      escalationTriggered: session.escalationTriggered,
      endedAt: session.endedAt
    });
  } catch (error) {
    console.error("Session end error:", error.message);
    res.status(500).json({
      _status: false,
      _message: "Failed to end session",
      error: error.message
    });
  }
});

/**
 * GET /sessions/:sessionId
 * Get session details (messages, summary, severity rating)
 */
app.get("/sessions/:sessionId", verifyToken, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.userId;

    const session = await ChatSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({
        _status: false,
        _message: "Session not found"
      });
    }

    if (session.userId.toString() !== userId) {
      return res.status(403).json({
        _status: false,
        _message: "Unauthorized access to this session"
      });
    }

    res.json({
      _status: true,
      session
    });
  } catch (error) {
    console.error("Session retrieval error:", error.message);
    res.status(500).json({
      _status: false,
      _message: "Failed to retrieve session",
      error: error.message
    });
  }
});

/**
 * GET /sessions
 * Get all sessions for authenticated user
 */
app.get("/sessions", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    const sessions = await ChatSession.find({ userId })
      .sort({ startedAt: -1 })
      .select("-messages"); // Don't return full messages in list view

    res.json({
      _status: true,
      sessions,
      count: sessions.length
    });
  } catch (error) {
    console.error("Sessions retrieval error:", error.message);
    res.status(500).json({
      _status: false,
      _message: "Failed to retrieve sessions",
      error: error.message
    });
  }
});

// ============================================================
// LEGACY CHAT ROUTE (for backward compatibility)
// ============================================================

/**
 * POST /ask
 * Legacy route for simple chat (without session management)
 */
app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).send({
        _status: false,
        _message: "question is required"
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

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: question }]
        }
      ],
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      }
    });

    const answer = result?.response?.text() || "I'm here with you. Would you like to share more?";

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

// ============================================================
// START SERVER
// ============================================================

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ Escalation threshold: ${getEscalationThreshold()}/5`);
});