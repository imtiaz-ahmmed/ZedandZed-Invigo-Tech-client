import { Link } from "react-router-dom";
import Navbar from "../../../Shared/Navbar/Navbar";
import { LuUserPlus } from "react-icons/lu";
import { useEffect, useState } from "react";
import { LiaUsersSolid } from "react-icons/lia";
import User from "./User";
import { FaHome } from "react-icons/fa";
import { Helmet } from "react-helmet";
import Navigation from "../../../Shared/Navbar/Navigation";
const ManageUser = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = allUsers.filter((user) => {
      const lowerCaseSearch = searchInput.toLowerCase();

      // Check if user.name and user.designation are not undefined before using includes
      const nameIncludes =
        user.name && user.name.toLowerCase().includes(lowerCaseSearch);
      const idIncludes =
        user.employeeId && user.employeeId.includes(searchInput);
      const designationIncludes =
        user.designation &&
        user.designation.toLowerCase().includes(lowerCaseSearch);

      return nameIncludes || idIncludes || designationIncludes;
    });
    setFilteredUsers(filtered);
  }, [searchInput, allUsers]);

  return (
    <div>
      <Helmet>
        <title>ZnZ || Manage Users</title>
      </Helmet>
      <Navbar />
      <hr />
      <Navigation></Navigation>
      <hr />
      <div className="md:grid grid-cols-2 justify-center items-center gap-5 text-lg my-5 px-5">
        <div>
          <h2 className="text-[#4ba5ea] font-bold p-1 md:p-3 bg-slate-200 hover:bg-slate-300  rounded-lg my-3 md:my-0">
            Total Users : {allUsers.length}
          </h2>
        </div>
        <div className="p-1 md:p-3 bg-slate-200 hover:bg-slate-300  rounded-lg my-3 md:my-0 ">
          <Link to="/register" className="text-[#4ba5ea] font-bold">
            <div className="flex gap-3 items-center ">
              <LuUserPlus />
              Add New User
            </div>
          </Link>
        </div>
      </div>
      <hr />

      <div className="my-6 mx-7">
        <label htmlFor="search" className="text-[#3070a2] font-bold text-lg">
          Search :
        </label>
        <input
          type="text"
          id="search"
          placeholder="search here"
          className="input input-bordered input-info input-sm md:w-full max-w-xs p-2 ml-2"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
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
          {filteredUsers.map((user) => (
            <User key={user._id} user={user}></User>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageUser;
