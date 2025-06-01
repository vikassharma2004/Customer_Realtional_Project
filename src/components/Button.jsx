import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const ButtonOutline = ({
  name,
  link = "/",
  bgOpacity = "20",
  textColor = "text-blue-600",
  textSize = "text-base"
}) => {
  if (!name) return null;

  return (
    <Link to={link}>
      <Button
        variant="outline"
        className={`px-10 py-5 border-blue-600 border 
          bg-blue-100 bg-opacity-${bgOpacity} 
          ${textColor} ${textSize} 
         transition-all duration-200`}
      >
        {name} <span className={`ml-2 ${textSize}`}>+</span>
      </Button>
    </Link>
  );
};

export default ButtonOutline;
