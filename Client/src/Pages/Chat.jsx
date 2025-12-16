import React from 'react'
import axios from "axios";
import { useState } from 'react';
import { Route , Routes, useNavigate} from "react-router-dom";
import App from '../App';


const Chat = () => {
  const Navigate = useNavigate();
  const [ques, setQues] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const res = await axios.post("http://localhost:8000/ask", {
        question: ques,
      });

      setAnswer(res.data.finalData);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-400 flex justify-center items-center relative">
      <div className="h-[400px] w-[1000px] rounded-2xl border-2 bg-white">
        <div className="h-10 rounded-2xl flex items-center px-5 font-semibold">
          Chat Bot
        </div>

        <div className="grid grid-cols-[35%_auto] gap-2 h-[350px]">
          {/* Left */}
          <form onSubmit={handleSubmit} className="ml-2 flex flex-col">
            <textarea
              value={ques}
              onChange={(e) => setQues(e.target.value)}
              className="h-[270px] border-2 rounded-xl p-3 resize-none"
              placeholder="How can I help you..."
            />

            <button
              disabled={loading}
              className="bg-black text-white mt-2 px-3 py-1 rounded-xl disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </form>

          {/* Right */}
          <div className="border-2 rounded-xl mr-2 p-4 overflow-y-auto">
            {loading && <p className="text-gray-500">Loading response...</p>}

            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && answer && (
              <p className="whitespace-pre-wrap">{answer}</p>
            )}

            {!loading && !error && !answer && (
              <p className="text-gray-400">
                The response will appear here.
              </p>
            )}
          </div>
        </div>
      </div>
      <div className='absolute bottom-30 left-20 bg-red-300 flex items-center justify-center p-4 cursor-pointer' onClick={()=>{
        Navigate("/app")
      }}>
        Home
      </div>
      <Routes>
        <Route path ="/app" element = {<App/>}></Route>
      </Routes>
    </div>
  );
}

export default Chat
