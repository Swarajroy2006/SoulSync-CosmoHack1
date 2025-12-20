import React from "react";
import Carousel from "../Carousel";
import Team from "./Team";
import Footer from "./Footer";

const Faq = () => {
  return (
    <>
    <Team/>
    <section className="w-full h-[500px] bg-neutral-950 flex justify-center items-center ">
      
      <div className="pt-30" style={{ height: "800px", position: "relative" }}>
        <h1 className="text-white text-5xl mb-10">FAQ</h1>
        <Carousel
          baseWidth={400}
          autoplay={true}
          autoplayDelay={5000}
          pauseOnHover={true}
          loop={true}
          height= {500}
          round={false}
        />
      </div>
      
    </section>
    <Footer/>
    </>
  );
};

export default Faq;
