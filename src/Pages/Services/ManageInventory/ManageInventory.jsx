import { useEffect, useState } from "react";
import Navbar from "../../../Shared/Navbar/Navbar";
import { MdInventory } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Inventory from "./Inventory";
const ManageInventory = () => {
  const [allInventory, setAllInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:5000/inventory")
      .then((res) => res.json())
      .then((data) => {
        setAllInventory(data);
        setIsLoading(false);
      });
  }, []);
  return (
    <div>
      <Navbar></Navbar>
      <hr />
      <div className="text-[#3070a2] font-bold text-3xl  py-5 flex items-center gap-2 justify-center">
        <MdInventory />
        <h4> All Inventories </h4>
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
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Unique ID</th>
                <th>Item Name</th>
                <th>Item Code</th>
                <th>Item Serial Number</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {" "}
              {allInventory.map((inventory) => {
                console.log(inventory);
                return (
                  <Inventory
                    key={inventory._id}
                    inventory={inventory}
                  ></Inventory>
                );
              })}
            </tbody>
          </table>
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

export default ManageInventory;
