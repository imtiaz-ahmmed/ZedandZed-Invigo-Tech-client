import { Link } from "react-router-dom";
import Navbar from "../../../Shared/Navbar/Navbar";
import { LuUserPlus } from "react-icons/lu";
const ManageUser = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="md:grid grid-cols-2 justify-center items-center gap-5 text-lg">
        <div className=" p-1 md:p-3 bg-slate-200 hover:bg-slate-300  rounded-lg my-3 md:my-0 ">
          <Link to="/register" className="text-[#4ba5ea] font-bold">
            <div className="flex gap-3 items-center ">
              <LuUserPlus />
              Add New User
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
