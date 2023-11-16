import { Link } from "react-router-dom";
import Navbar from "../../Shared/Navbar/Navbar";
import { BiPurchaseTag } from "react-icons/bi";
import { GiExpense } from "react-icons/gi";
import { VscSymbolOperator } from "react-icons/vsc";
import { TbAdjustmentsDollar } from "react-icons/tb";
const Home = () => {
  return (
    <div>
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
          <div className=" p-3 bg-slate-300 hover:bg-slate-200  rounded-lg my-3 md:my-0 ">
            <Link to="/purchase" className="text-[#4ba5ea] font-bold">
              <div className="flex gap-3 items-center">
                <BiPurchaseTag />
                Add Purchase
              </div>
            </Link>
          </div>
          <div className=" p-3 bg-slate-300 hover:bg-slate-200  rounded-lg">
            <Link to="/expense" className="text-[#4ba5ea] font-bold">
              <div className="flex gap-3 items-center">
                <GiExpense />
                Add Expense
              </div>
            </Link>
          </div>
          <div className=" p-3 bg-slate-300 hover:bg-slate-200  rounded-lg my-3 md:my-0">
            <Link to="/adjustment" className="text-[#4ba5ea] font-bold">
              <div className="flex gap-3 items-center">
                <TbAdjustmentsDollar />
                Add Adjustment
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
