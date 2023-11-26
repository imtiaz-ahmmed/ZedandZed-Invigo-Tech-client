import { useEffect, useState } from "react";
import Navbar from "../../../Shared/Navbar/Navbar";
import { MdInventory } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Inventory from "./Inventory";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
const ManageInventory = () => {
  const [allInventory, setAllInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingInventory, setEditingInventory] = useState(null);
  const fetchData = () => {
    fetch("http://localhost:5000/inventory")
      .then((res) => res.json())
      .then((data) => {
        setAllInventory(data);
        setIsLoading(false);
      });
  };

  // Update inventory data
  const updateInventory = (inventoryId, updatedData) => {
    fetch(`http://localhost:5000/inventory/${inventoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then(() => {
        // After successful update, refetch the data
        fetchData();
      })
      .catch((error) => {
        console.error("Error updating inventory:", error);
      });
  };

  useEffect(() => {
    // Fetch data on component mount
    fetchData();
  }, []);

  const handleEdit = (inventoryId, updatedData) => {
    // Make the necessary update (e.g., API call) and update state
    updateInventory(inventoryId, updatedData);
    setEditingInventory(null); // Clear the editing state
  };

  const handleDelete = (inventoryId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/inventory/${inventoryId}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            setAllInventory((prevInventory) =>
              prevInventory.filter((item) => item._id !== inventoryId)
            );

            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error deleting inventory:", error);

            Swal.fire({
              title: "Error!",
              text: "An error occurred while deleting the inventory.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>ZnZ || Manage Inventory</title>
      </Helmet>
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
                <th>Edit</th>
                <th>Delete</th>
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
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                  />
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
