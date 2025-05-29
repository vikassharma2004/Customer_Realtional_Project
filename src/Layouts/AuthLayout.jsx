import { Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import background from "../assets/coverimg.png";
import { useState } from "react";
import { LabelDot, labels } from "../components/LabelDot";

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full flex overflow-hidden font-['Manrope'] lg:flex-row flex-col">
      {/* Left Side - Logo and Labels (Desktop only) */}
      <div className="lg:w-1/2 lg:h-screen lg:flex items-center justify-center bg-[#E5E5E5] 
                      hidden xl:p-8 lg:p-6">
        <div className="relative bg-white rounded-full shadow-md 
                        xl:w-[30rem] xl:h-[30rem] 
                        lg:w-[25rem] lg:h-[25rem]
                        hidden md:block">
          <img
            src={logo}
            alt="logo"
            className="w-full h-full object-contain rounded-full"
          />
          
          {/* Labels overlay */}
          {labels.map(({ label, colorClass, style }) => (
            <LabelDot
              key={label}
              label={label}
              colorClass={colorClass}
              style={style}
            />
          ))}
        </div>
      </div>

      {/* Right Side - Form Content with Mobile Logo */}
      <div
        className="lg:w-1/2 lg:h-screen flex items-center justify-center bg-cover bg-center flex-1
                   min-h-screen lg:min-h-0 relative
                   px-4 py-8 lg:px-8 lg:py-0"
        style={{ backgroundImage: `url(${background})` }}
      >
        {/* Mobile/Tablet Logo - Positioned in center-right of background */}
        <div className="lg:hidden absolute top-1/2 right-8 transform -translate-y-1/2 z-0
                        sm:right-12 md:right-16">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 
                          bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
            <img
              src={logo}
              alt="logo"
              className="w-full h-full object-contain rounded-full opacity-80"
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="flex flex-col items-center gap-6 lg:gap-10 w-full max-w-2xl
                        lg:-mt-30 mt-0 relative z-10">
          
          {/* Cubicle Header */}
          <div className="bg-white shadow-lg rounded-lg w-full max-w-[500px] py-3 lg:py-4 px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 
                           font-bold text-center">
              Cubicle
            </h1>
          </div>

          {/* Form Container */}
          <div className="bg-white shadow-lg rounded-lg w-full max-w-[500px] h-auto 
                          p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;