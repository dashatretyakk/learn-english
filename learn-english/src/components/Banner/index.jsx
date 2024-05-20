import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="relative w-full h-[600px] border border-[#5D564F] rounded-md">
      <Image
        src={"/images/background.png"}
        alt="Banner"
        fill
        className="object-contain"
      />

      <div className="absolute -bottom-[20px] px-8 left-1/2 transform -translate-x-1/2 p-3 bg-white border border-[#5D564F] rounded-full">
        <span className="text-[24px] font-medium text-gray-800">
          Unlock Your Potential with English
        </span>
      </div>
    </div>
  );
};

export default Banner;
