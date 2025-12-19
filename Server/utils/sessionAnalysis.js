import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.KEY);

/**
 * Generate session summary and severity rating using Gemini API
 * @param {Array} messages - Array of messages in the session [{role, content}, ...]
 * @returns {Promise<Object>} Object containing { summary, severityRating }
 */
export const generateSessionAnalysis = async (messages) => {
  try {
    if (!messages || messages.length === 0) {
      return {
        summary: 'No messages in session',
        severityRating: 1
      };
    }

    // Format conversation for the AI
    const conversationText = messages
      .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n');

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash'
    });

    const analysisPrompt = `
You are an AI assistant specializing in mental health support analysis. 
Your task is to analyze a user's conversation session and provide:

1. A concise summary (2-3 sentences) of the key topics and emotional themes discussed
2. A severity rating on a scale of 1-5 indicating emotional distress or crisis risk:
   - 1: No distress, normal conversation
   - 2: Minor concerns, mild distress
   - 3: Moderate emotional distress or concern
   - 4: Significant distress, high concern
   - 5: Severe crisis, immediate danger indication

IMPORTANT: You MUST respond with ONLY valid JSON in this exact format (no markdown, no extra text):
{
  "summary": "concise summary here",
  "severityRating": <number between 1 and 5>
}

Conversation to analyze:
${conversationText}

Remember: Respond ONLY with the JSON object, nothing else.
`;

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: analysisPrompt }]
        }
      ]
    });

    const responseText = result?.response?.text() || '';
    
    // Parse the JSON response
    let analysis;
    try {
      // Extract JSON from the response (in case there's extra whitespace or formatting)
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      analysis = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error('Failed to parse AI response:', responseText);
      // Fallback to default values if parsing fails
      analysis = {
        summary: 'Unable to generate summary',
        severityRating: 2
      };
    }

    // Validate the response
    if (!analysis.summary || typeof analysis.summary !== 'string') {
      analysis.summary = 'Session analysis completed';
    }
    
    if (!analysis.severityRating || typeof analysis.severityRating !== 'number') {
      analysis.severityRating = 2;
    }

    // Ensure severity rating is between 1 and 5
    analysis.severityRating = Math.max(1, Math.min(5, Math.round(analysis.severityRating)));

    return analysis;
  } catch (error) {
    console.error('Error generating session analysis:', error.message);
    // Return safe defaults in case of error
    return {
      summary: 'Session analysis failed - using default safe assessment',
      severityRating: 2 // Default to low severity if analysis fails
    };
  }
};

/**
 * Check if a session warrants emergency escalation based on severity rating
 * @param {number} severityRating - The AI-generated severity rating
 * @param {number} threshold - The escalation threshold (default from env)
 * @returns {boolean} True if escalation should be triggered
 */
export const shouldEscalate = (severityRating, threshold = parseInt(process.env.ESCALATION_SEVERITY_THRESHOLD || '4', 10)) => {
  return severityRating >= threshold;
};
