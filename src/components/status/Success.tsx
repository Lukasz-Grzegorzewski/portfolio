import * as React from "react";

const Success = () => {
  return (
    <div className="relative flex items-center justify-center w-12 h-12 rounded-full overflow-hidden">
      {/* Covering mask to animate */}
      <div className="absolute inset-0 bg-background transform translate-x-full animate-reveal-mask" />

      {/* Checkmark Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="w-8 h-8 text-primary"
      >
        <title>Success</title>
        <path
          d="M5 13l4 4L19 7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default Success;
