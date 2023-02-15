import React from "react";

export const Banner = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:space-x-5 justify-between font-bold py-5 mb-10">
      <div className="">
        <h1 className="text-7xl">Vincent Thought</h1>
        <h2>Welcome to </h2>
        <span className="underline decoration-4 decoration-blue-300">
          The Notion
        </span>
        {` of a `}
        <span className="underline decoration-4 decoration-blue-300">
          Developer
        </span>
      </div>
      <p className="mt-5 md:mt-2 text-gray-400 max-w-sm">
        Tips & Tricks in finding a job | Self-development | Personal
        documentation
      </p>
    </div>
  );
};
