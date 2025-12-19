import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { House, Send, LogOut, AlertCircle, CheckCircle, Loader } from 'lucide-react';

const Chat = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [ques, setQues] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sessionLoading, setSessionLoading] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);

  // Check authentication on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (!savedToken) {
      navigate('/login');
      return;
    }

    setToken(savedToken);
    setUser(JSON.parse(savedUser));
  }, [navigate]);

  // Start a new session
  const startSession = async () => {
    try {
      setSessionLoading(true);
      setError("");

      const response = await axios.post(
        'http://localhost:8000/sessions/start',
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data._status) {
        setSessionId(response.data.sessionId);
        setSessionActive(true);
        setMessages([]);
        setSessionEnded(false);
        setAnalysisResults(null);
      } else {
        setError(response.data._message || 'Failed to start session');
      }
    } catch (err) {
      console.error('Session start error:', err);
      setError('Failed to start session. Please try again.');
    } finally {
      setSessionLoading(false);
    }
  };

  // Send message to chatbot
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sessionActive || !sessionId) {
      setError('Please start a session first');
      return;
    }

    if (!ques.trim()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Add user message to local state
      setMessages(prev => [...prev, { role: 'user', content: ques }]);
      setQues("");

      // Send to backend
      const response = await axios.post(
        `http://localhost:8000/sessions/${sessionId}/message`,
        { question: ques },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data._status) {
        // Add assistant message to local state
        setMessages(prev => [...prev, { role: 'assistant', content: response.data.response }]);
      } else {
        setError(response.data._message || 'Failed to process message');
        // Remove the user message if there was an error
        setMessages(prev => prev.slice(0, -1));
      }
    } catch (err) {
      console.error('Message error:', err);
      setError('Failed to send message. Please try again.');
      // Remove the user message if there was an error
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  // End session and trigger analysis
  const handleEndSession = async () => {
    if (!sessionId) return;

    try {
      setSessionLoading(true);
      setError("");

      const response = await axios.post(
        `http://localhost:8000/sessions/${sessionId}/end`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data._status) {
        setAnalysisResults(response.data.analysis);
        setSessionActive(false);
        setSessionEnded(true);

        if (response.data.escalationTriggered) {
          setError('⚠️ Emergency escalation was triggered. Your emergency contact has been notified.');
        }
      } else {
        setError(response.data._message || 'Failed to end session');
      }
    } catch (err) {
      console.error('Session end error:', err);
      setError('Failed to end session. Please try again.');
    } finally {
      setSessionLoading(false);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="h-screen w-screen bg-neutral-900 flex justify-center items-center relative">
      <div className="h-[90vh] w-[95vw] max-w-5xl rounded-2xl text-white flex flex-col relative bg-neutral-800 border border-neutral-700">
        
        {/* Header */}
        <div className="h-16 rounded-t-2xl flex justify-between items-center px-6 border-b border-neutral-900 bg-neutral-750">
          <div>
            <h2 className="text-2xl font-bold">Chat Session</h2>
            {user && <p className="text-sm text-gray-400">Welcome, {user.name}</p>}
          </div>
          <div className="flex gap-3">
            {sessionActive && (
              <button
                onClick={handleEndSession}
                disabled={sessionLoading}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-lg font-semibold text-sm transition flex items-center gap-2"
              >
                <AlertCircle size={18} />
                End Session
              </button>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg font-semibold text-sm transition flex items-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {!sessionActive && !sessionEnded && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <h3 className="text-xl font-semibold mb-4">Start a New Chat Session</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                Begin a new conversation with our mental health support chatbot. Your session will be analyzed for insights when you end it.
              </p>
              <button
                onClick={startSession}
                disabled={sessionLoading}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 rounded-lg font-semibold transition flex items-center gap-2"
              >
                {sessionLoading ? <Loader size={20} className="animate-spin" /> : <Send size={20} />}
                {sessionLoading ? 'Starting...' : 'Start Chat'}
              </button>
            </div>
          )}

          {sessionEnded && analysisResults && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <div className="bg-blue-500/10 border border-blue-500 rounded-lg p-6 max-w-md">
                <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center justify-center gap-2">
                  <CheckCircle size={24} />
                  Session Analysis Complete
                </h3>
                
                <div className="text-left space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 font-semibold">Summary:</p>
                    <p className="text-white mt-2">{analysisResults.summary}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 font-semibold">Emotional Distress Level:</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 bg-neutral-700 rounded-full h-2">
                        <div
                          className={`h-full rounded-full transition-all ${
                            analysisResults.severityRating >= 4 ? 'bg-red-500' :
                            analysisResults.severityRating >= 3 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${(analysisResults.severityRating / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-white font-semibold">
                        {analysisResults.severityRating}/5
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={startSession}
                disabled={sessionLoading}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 rounded-lg font-semibold transition flex items-center gap-2"
              >
                {sessionLoading ? <Loader size={20} className="animate-spin" /> : <Send size={20} />}
                {sessionLoading ? 'Starting...' : 'Start New Session'}
              </button>
            </div>
          )}

          {sessionActive && messages.length === 0 && (
            <div className="flex items-center justify-center h-full text-center text-gray-400">
              <p>Start typing to begin your conversation...</p>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-700 text-gray-100'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-neutral-700 px-4 py-2 rounded-lg">
                <Loader className="animate-spin text-blue-400" size={20} />
              </div>
            </div>
          )}
        </div>

        {/* Error/Info Messages */}
        {error && (
          <div className="px-6 py-3 bg-red-500/10 border-t border-red-500/50 text-red-400 text-sm flex items-start gap-2">
            <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        {/* Input Area */}
        {sessionActive && (
          <form onSubmit={handleSubmit} className="border-t border-neutral-700 p-4 bg-neutral-750">
            <div className="flex gap-3">
              <input
                value={ques}
                onChange={(e) => setQues(e.target.value)}
                disabled={loading}
                className="flex-1 px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition disabled:opacity-50"
                placeholder="How can I help you today..."
              />
              <button
                type="submit"
                disabled={loading || !ques.trim()}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg font-semibold transition flex items-center gap-2"
              >
                {loading ? <Loader size={20} className="animate-spin" /> : <Send size={20} />}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Home Button */}
      <div className='absolute bottom-20 left-10 flex items-center justify-center cursor-pointer rounded-2xl hover:opacity-70 transition' onClick={() => navigate('/')}>
        <House size={30} color='white' />
      </div>
    </div>
  );
}

export default Chat
