import mongoose from 'mongoose';

const EscalationLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatSession',
    required: true
  },
  severityRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  // The phone number that was called
  phoneNumberCalled: {
    type: String,
    required: true
  },
  // Twilio call SID for tracking
  twilioCallSid: {
    type: String,
    default: null
  },
  // Result of the escalation attempt
  result: {
    type: String,
    enum: ['success', 'failed', 'pending'],
    default: 'pending'
  },
  // Error message if escalation failed
  errorMessage: {
    type: String,
    default: null
  },
  // The user's name (for context in logs)
  userName: {
    type: String,
    required: true
  },
  // Timestamp when escalation was triggered
  triggeredAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model('EscalationLog', EscalationLogSchema);
