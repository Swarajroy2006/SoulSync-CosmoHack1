import React from "react";
import { MessageCircle } from "lucide-react";
import { Sparkles } from "lucide-react";
import { Lock } from "lucide-react";
import { motion } from "motion/react";

const Service = () => {
  return (
    <div className="grid grid-cols-3 gap-20 mt-36">
      <motion.div
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.1 },
        }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center flex-col bg-neutral-800 rounded-2xl text-center py-5"
      >
        <div className="p-3 bg-neutral-700 rounded-4xl mt-5">
          <MessageCircle color="white" />
        </div>
        <div>
          <h1 className="text-white mt-6 text-2xl">Natural language chat</h1>
          <p className="text-stone-500 my-10">
            You can use simple every day english to comunicate in the chat.
          </p>
          <div className="text-white mb-6">Learn More</div>
        </div>
      </motion.div>

      <motion.div
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.1 },
        }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center flex-col bg-neutral-800 rounded-2xl text-center py-5"
      >
        <div className="p-3 bg-neutral-700 rounded-4xl mt-5">
          <Sparkles color="white" />
        </div>
        <div>
          <h1 className="text-white mt-6 text-2xl">Fast Responses</h1>
          <p className="text-stone-500 my-10 px-5">
            You can get answers to your questions instantly, no need to wait.
          </p>
          <div className="text-white mb-6">Learn More</div>
        </div>
      </motion.div>

      <motion.div
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.1 },
        }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center flex-col bg-neutral-800 rounded-2xl text-center py-5"
      >
        <div className="p-3 bg-neutral-700 rounded-4xl mt-5">
          <Lock color="white" />
        </div>
        <div>
          <h1 className="text-white mt-6 text-2xl">Secure & private</h1>
          <p className="text-stone-500 my-10">
            Your chats are secure, we care about your privacy.
          </p>
          <div className="text-white mb-6">Learn More</div>
        </div>
      </motion.div>
    </div>
  );
};

export default Service;
