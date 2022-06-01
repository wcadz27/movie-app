import React from "react";

export function PlayIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      clipRule="evenodd"
      viewBox="0 0 500 500"
      className="w-[5rem] h-[5rem] absolute"
    >
      <path
        fill="url(#_Linear1)"
        d="M250 25c124.181 0 225 100.819 225 225S374.181 475 250 475 25 374.181 25 250 125.819 25 250 25zm91.499 216.407a10 10 0 010 17.186l-136.769 81.41a10 10 0 01-15.115-8.592V168.589a10.001 10.001 0 0115.115-8.592l136.769 81.41z"
      ></path>
      <defs>
        <linearGradient
          id="_Linear1"
          x1="0"
          x2="1"
          y1="0"
          y2="0"
          gradientTransform="matrix(500 -500 500 500 0 500)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#2CB4E2"></stop>
          <stop offset="1" stopColor="#3AE38A"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}
