import { Link } from "react-router-dom";
import { TbHomeShare } from "react-icons/tb";
import { FaHouseUser } from "react-icons/fa";
import { MdInventory, MdOutlineInventory } from "react-icons/md";
const Navigation = () => {
  return (
    <div className="text-[#474849] md:w-4/5 mx-auto  font-bold bg-[#c7c7df] hover:bg-[#c4c4e4]  my-4 p-4 rounded-2xl flex flex-col items-center gap-2 md:flex-row md:justify-evenly shadow-xl  ">
      <Link to="/">
        <div className="flex gap-1 items-center md:text-lg hover:text-white">
          <TbHomeShare />
          Home
        </div>
      </Link>
      <Link to="/manage-user">
        <div className="flex gap-1 items-center md:text-lg hover:text-white">
          <FaHouseUser />
          Manage Users
        </div>
      </Link>
      <Link to="/add-inventory">
        <div className="flex gap-1 items-center md:text-lg hover:text-white">
          <MdOutlineInventory />
          Add Inventory
        </div>
      </Link>
      <Link to="/manage-inventory">
        <div className="flex gap-1 items-center md:text-lg hover:text-white">
          <MdInventory />
          Manage Inventory
        </div>
      </Link>
    </div>
  );
};

export default Navigation;
