import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Link } from "react-router-dom";

import topHeader from "../assets/top-header.png";
import ButtonOutline from "@/components/Button";

const SubHeader = ({
  title,
  btnLink,
  btnTitle,
  setShowAdd,
  handleSelected,
}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full overflow-hidden  rounded-t-2xl font-['Manrope']">
      {/* Header image */}
      <div className="w-full h-[250px] overflow-hidden">
        <img
          src={topHeader}
          alt="Header"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay content aligned bottom */}
      <div className="absolute inset-20 flex items-end justify-between  py-6 px-4 ">
        <h1 className="text-white text-4xl font-medium ">{title}</h1>

        <ButtonOutline
          name="Organisation"
          link="/jobs/create"
          bgOpacity="30"
          textColor="text-white/70"
          textSize="text-lg"
        />
      </div>
    </div>
  );
};

export default SubHeader;
