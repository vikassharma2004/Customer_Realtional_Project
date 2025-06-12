import logo from "../../../src/assets/logo.png";
// selcect component

// button component
import ButtonOutline from "../Button";
import { CustomSelect } from "./CustomSelect.jsx";



const Navbar = () => {
  
  return (
    <div className=" flex items-center justify-end gap-8 mr-14 font-[Roboto] py-2">
      <div>
        <CustomSelect  />
      </div>
      <div>
        <ButtonOutline name="Create" />
      </div>
      <div>
        <button>
          <img src={logo} alt="logo" className="h-13 w-13" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
