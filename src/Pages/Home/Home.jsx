import { Link } from "react-router-dom";
import Navbar from "../../Shared/Navbar/Navbar";
import { MdOutlineInventory } from "react-icons/md";
import { VscSymbolOperator } from "react-icons/vsc";
import { MdInventory } from "react-icons/md";
import { FaHouseUser } from "react-icons/fa";
import { Helmet } from "react-helmet";
import Footer from "../../Shared/Footer/Footer";
const Home = () => {
  return (
    <div>
      <Helmet>
        <title>ZnZ || Home</title>
      </Helmet>
      <Navbar></Navbar>
      <section className="px-5 md:px-0">
        <div className="flex items-center pt-5 ">
          <span className="text-2xl md:text-3xl pb-10 font-bold text-[#045797]">
            <VscSymbolOperator />
          </span>
          <h1 className="text-2xl md:text-3xl px-2 font-bold text-[#045797] pb-10">
            OperateEase
          </h1>
        </div>

        <div className="md:grid grid-cols-3 justify-center items-center gap-5 text-lg">
          <div className=" p-1 md:p-3 bg-slate-200 hover:bg-slate-300  rounded-lg">
            <Link to="/manage-user" className="text-[#4ba5ea] font-bold">
              <div className="flex gap-3 items-center">
                <FaHouseUser />
                Manage Users
              </div>
            </Link>
          </div>
          <div className=" p-1 md:p-3 bg-slate-200 hover:bg-slate-300  rounded-lg my-3 md:my-0 ">
            <Link to="/add-inventory" className="text-[#4ba5ea] font-bold">
              <div className="flex gap-3 items-center ">
                <MdOutlineInventory />
                Add Inventory
              </div>
            </Link>
          </div>

          <div className=" p-2 md:p-3 bg-slate-200 hover:bg-slate-300  rounded-lg my-3  md:my-0">
            <Link to="/manage-inventory" className="text-[#4ba5ea] font-bold">
              <div className="flex gap-3 items-center">
                <MdInventory />
                Manage Inventory
              </div>
            </Link>
          </div>
        </div>
        <Footer></Footer>
      </section>
    </div>
  );
};

export default Home;
