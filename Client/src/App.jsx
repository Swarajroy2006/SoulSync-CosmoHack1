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
import BlobCursor from "./Cursor";
import Team from "../src/Pages/Team";
import About from "../src/Pages/About";
import FAQ from "../src/Pages/Faq";

const App = () => {
  const location = useLocation();
  const isChatPage = location.pathname === "/chat";
  return (
    <>
      {!isChatPage && (
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
              raysSpeed={1.0}
              lightSpread={1.3}
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
        </div>
      )}
      <Routes>
        <Route path="/team" element={<Team />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/faq" element={<FAQ />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
      </Routes>
    </>
  );
};

export default App;
