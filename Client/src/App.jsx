import React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Button from "./components/Button";
import Chat from "./Pages/Chat";
import { MessageCircle } from "lucide-react";
import Hero2 from "./components/Hero2";
import { motion } from "motion/react";
import LightRays from "./Light";
import BlobCursor from './Cursor'

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Detect if we are on /chat
  const isChatPage = location.pathname === "/chat";

  return (
    <div className="w-screen h-screen relative flex justify-center items-center">
      <Nav />
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          background: "black",
        }}
      >
      
        <LightRays
          raysOrigin="top-center"
          raysColor="rgb(236, 236, 243)"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
        
      </div>
      
      <div className="absolute flex flex-col justify-center items-center">
        <div className="">
          <Hero />
          
        </div>
        <Button />
        {/* <Hero2/> */}
      </div>
      
      <motion.div
        whileHover={{
          scale: 1.1,
          transition: {
            duration: 0.1,
          },
        }}
        transition={{ duration: 0.5 }}
        onClick={() => navigate("/chat")}
        className="absolute w-20 h-20 flex items-center justify-center rounded-2xl bottom-20 right-20 border border-gray-400 cursor-pointer bg-neutral-900"
      >
        <MessageCircle color="white" />
      </motion.div>

      
    </div>
  );
};

export default App;



{/* <BlobCursor
  blobType="circle"
  fillColor="#5227FF"
  trailCount={3}
  sizes={[60, 125, 75]}
  innerSizes={[20, 35, 25]}
  innerColor="rgba(255,255,255,0.8)"
  opacities={[0.6, 0.6, 0.6]}
  shadowColor="rgba(0,0,0,0.75)"
  shadowBlur={5}
  shadowOffsetX={10}
  shadowOffsetY={10}
  filterStdDeviation={30}
  useFilter={true}
  fastDuration={0.1}
  slowDuration={0.5}
  zIndex={100}
/> */}