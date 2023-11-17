import logo from "../../../public/logo.png";
import { CiLogout } from "react-icons/ci";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Logged out. Stay awesome!",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/");
  };
  return (
    <div className="flex items-center justify-between gap-3 md:gap-80 mt-4 mx-3 md:mx-0">
      <img className=" w-3/4 md:w-3/6 md:h-24" src={logo} alt="" />

      <div className="relative inline-flex items-center justify-center p-2 px-6 py-2 md:p-4  md:py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-[#015597] rounded-full shadow-md group">
        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#015597] group-hover:translate-x-0 ease">
          <button onClick={handleLogOut} className="md:text-2xl">
            <CiLogout />
          </button>
        </span>
        <span className="absolute text-xs md:text-base flex items-center justify-center w-full h-full text-[#015597] transition-all duration-300 transform group-hover:translate-x-full ease">
          Logout
        </span>
        <span className="relative invisible">Logout</span>
      </div>
    </div>
  );
};

export default Navbar;
