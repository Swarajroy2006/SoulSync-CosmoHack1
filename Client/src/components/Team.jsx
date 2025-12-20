import React from "react";

const Team = () => {
  return (
    <>
    <h1 className="bg-neutral-950 text-white text-6xl px-20 pt-10">OUR TEAM</h1>
    <div className="text-white bg-neutral-950 flex items-center justify-center w-full py-50 px-20">
      
      <div className=" grid grid-cols-4 gap-5">
        <div className="flex items-center justify-center flex-col bg-neutral-800 px-10 py-5 rounded-2xl">
          <div className="bg-blue-400 rounded-4xl w-10 h-10 flex items-center justify-center mb-3">SR</div>
          <div className="text-center">
            <h1 className="text-2xl mb-5">Saptanshu Roy</h1>
            <p className="mb-3">Cosmic Hackers(Member)</p>
            <p className="text-gray-300 text-sm">Focuses on building intuitive, responsive user interfaces and ensuring a smooth user experience across the application.</p>
          </div>
        </div>

        <div className="flex items-center justify-center flex-col bg-neutral-800 px-10 py-5 rounded-2xl">
          <div className="bg-white text-black rounded-4xl w-10 h-10 flex items-center justify-center mb-3">SR</div>
          <div className="text-center">
            <h1 className="text-2xl mb-5">Swaraj Roy</h1>
            <p className="mb-3">Cosmic Hackers(Member)</p>
            <p className="text-gray-300 text-sm">Handles server logic, APIs, and database management to ensure secure and reliable system performance.</p>
          </div>
        </div>

        <div className="flex items-center justify-center flex-col bg-neutral-800 px-10 py-5 rounded-2xl">
          <div className="bg-green-400 rounded-4xl w-10 h-10 flex items-center justify-center mb-3">AB</div>
          <div className="text-center">
            <h1 className="text-2xl mb-5">Anik Bhaumik</h1>
            <p className="mb-3">Cosmic Hackers(Member)</p>
            <p className="text-gray-300 text-sm">Researches user needs and helps shape meaningful content, ensuring the platform remains helpful and user-centric.</p>
          </div>
        </div>

        <div className="flex items-center justify-center flex-col bg-neutral-800 px-10 py-5 rounded-2xl">
          <div className="bg-red-400 rounded-4xl w-10 h-10 flex items-center justify-center mb-3">JK</div>
          <div className="text-center">
            <h1 className="text-2xl mb-5">Joyjit Karmakar</h1>
            <p className="mb-3">Cosmic Hackers(Leader)</p>
            <p className="text-gray-300 text-sm">Guides the vision and direction of the project. Responsible for decision-making, coordination, and ensuring the product delivers real value to users.</p>
          </div>
        </div>

      </div>
    </div>
    </>
    
  );
};

export default Team;
