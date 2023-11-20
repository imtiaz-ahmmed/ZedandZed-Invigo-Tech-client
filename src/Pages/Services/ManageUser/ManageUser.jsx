import { Link } from "react-router-dom";
import Navbar from "../../../Shared/Navbar/Navbar";
import { LuUserPlus } from "react-icons/lu";
import { useEffect, useState } from "react";
import { LiaUsersSolid } from "react-icons/lia";
import User from "./User";
import { FaHome } from "react-icons/fa";
import { Helmet } from "react-helmet";
const ManageUser = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data);
        setIsLoading(false);
      });
  }, []);
  return (
    <div>
      <Helmet>
        <title>ZnZ || Manage Users</title>
      </Helmet>
      <Navbar></Navbar>
      <hr />
      <div className="md:grid grid-cols-2 justify-center items-center gap-5 text-lg my-5 px-5">
        <div>
          <h2 className="text-[#4ba5ea] font-bold p-1 md:p-3 bg-slate-200 hover:bg-slate-300  rounded-lg my-3 md:my-0">
            Total Users : {allUsers.length}
          </h2>
        </div>
        <div className=" p-1 md:p-3 bg-slate-200 hover:bg-slate-300  rounded-lg my-3 md:my-0 ">
          <Link to="/register" className="text-[#4ba5ea] font-bold">
            <div className="flex gap-3 items-center ">
              <LuUserPlus />
              Add New User
            </div>
          </Link>
        </div>
      </div>
      <hr />
      <div className="text-[#3070a2] font-bold text-3xl  py-5 flex items-center gap-2 justify-center">
        <LiaUsersSolid />
        <h4> All Users</h4>
      </div>
      <hr />

      {/* Main Content */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-12 w-12 mb-4"></div>
          <p className="text-2xl font-bold text-blue-500">
            Zedandzed Invigo Tech
          </p>
        </div>
      ) : (
        <div className="grid justify-items-center grid-cols-1 md:grid-cols-2 gap-6 md:gap-20 md:px-32 py-10 mx-3 md:mx-0">
          {allUsers.map((user) => {
            console.log(user);
            return <User key={user._id} user={user}></User>;
          })}
        </div>
      )}

      <Link to="/">
        <div className="text-sm flex gap-1 md:px-40 px-8   items-center py-5 text-[#015597] font-bold ">
          <FaHome />
          <h6 className="border-b-2">Back to Home</h6>
        </div>
      </Link>
    </div>
  );
};

export default ManageUser;
