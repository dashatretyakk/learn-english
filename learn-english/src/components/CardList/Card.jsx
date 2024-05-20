import Link from "next/link";
import React from "react";

const Card = ({ index, title, description, icon, bgColor, iconColor }) => {
  return (
    <Link
      href={`/${index}`}
      className={`flex flex-col items-center justify-center w-64 h-80 rounded-2xl shadow-lg ${bgColor} p-6 transition-transform transform hover:scale-105 hover:shadow-2xl`}
    >
      <div
        className={`w-16 h-16 flex items-center justify-center text-[34px] rounded-full ${iconColor} mb-4 transition-transform transform hover:rotate-12`}
      >
        {icon}
      </div>
      <h2 className="text-xl font-semibold mb-2 poetsen-font transition-colors hover:text-blue-600">
        {title}
      </h2>
      <p className="text-center transition-opacity hover:opacity-75">
        {description}
      </p>
    </Link>
  );
};

export default Card;
