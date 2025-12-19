import React from "react";
import { MoveRight } from "lucide-react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
const Button = () => {
  const navigate = useNavigate();

  return (
    <>
    <Link to="/chat"><motion.button
      whileHover={{
        scale: 1.1,
        transition: {
          duration: 0.1,
        },
      }}
      transition={{ duration: 0.5 }}
      whileTap="tap"
      className="border border-gray-400 text-white px-4 py-3 rounded-2xl font-bold mt-20 flex cursor-pointer"
      onClick={() => {
        navigate("/chat");
      }}
    >
      <span className="mr-2">Chat Safely</span> <MoveRight />
      
    </motion.button></Link>
    
    </>
  );
};

export default Button;


