import React from "react";

const Hero2 = () => {
  return (
    <div className="grid grid-cols-3 text-white px-20 mt-10 gap-40">
      <div className=" p-3 text-center">
        <h1 className="font-bold text-m">Emotional Well-Being</h1>
        <p className="text-gray-300 text-sm">
          Affects feelings, and stress management.
        </p>
      </div>

      <div className=" px-3 py-4 text-center">
        <h1 className="font-bold text-m">
          Social Functioning Good mental health
        </h1>
        <p className="text-gray-300 text-sm">
          Supports healthy relationships and interaction.
        </p>
      </div>

      <div className=" p-3 text-center">
        <h1 className="font-bold text-m">Quality of Life</h1>
        <p className="text-gray-300 text-sm">
          Helps maintain balance and productivity.
        </p>
      </div>
    </div>
  );
};

export default Hero2;
