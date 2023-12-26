import { useEffect, useState } from "react";
import Navbar from "../../../Shared/Navbar/Navbar";
import { MdInventory } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Inventory from "./Inventory";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import Navigation from "../../../Shared/Navbar/Navigation";

const ManageInventory = () => {
  const [allInventory, setAllInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingInventory, setEditingInventory] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filteredInventory, setFilteredInventory] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:5000/inventory")
      .then((res) => res.json())
      .then((data) => {
        setAllInventory(data);
        setIsLoading(false);
      });
  };

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
        fetchData();
      })
      .catch((error) => {
        console.error("Error updating inventory:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (inventoryId, updatedData) => {
    updateInventory(inventoryId, updatedData);
    setEditingInventory(null);
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
          .then(() => {
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

  const handleSearch = (input) => {
    setSearchInput(input);
    const searchTerm = input.toLowerCase().trim();
    const filteredData = allInventory.filter((item) => {
      return (
        item.itemName.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm) ||
        item.uniqueId.toLowerCase().includes(searchTerm) ||
        item.itemCode.toLowerCase().includes(searchTerm) ||
        item.employeeId.toLowerCase().includes(searchTerm) ||
        item.employeeName.toLowerCase().includes(searchTerm)
      );
    });
    setFilteredInventory(filteredData);
  };

  return (
    <div className="mb-4">
      <Helmet>
        <title>ZnZ || Manage Inventory</title>
      </Helmet>
      <Navbar></Navbar>
      <hr />

      <Navigation></Navigation>
      <hr />
      <div className="text-[#3070a2] font-bold text-3xl  py-5 flex items-center gap-2 justify-center">
        <MdInventory />
        <h4> All Inventories </h4>
      </div>
      <hr />

      <div className="my-6">
        <label htmlFor="search" className="text-[#3070a2] font-bold text-lg">
          Search :
        </label>
        <input
          type="text"
          id="search"
          placeholder="search here"
          className="input input-bordered input-info input-sm md:w-full max-w-xs p-2 ml-2"
          value={searchInput}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <hr />

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
            <thead>
              <tr>
                <th>Unique ID</th>
                <th>Item Name</th>
                <th>Item Code</th>
                <th>Item Serial Number</th>
                <th>Quantity</th>
                <th>Price </th>
                <th>Details</th>
                <th>Edit</th>
                <th>Delete</th>
                <th>QR Code</th>
              </tr>
            </thead>
            <tbody>
              {(searchInput ? filteredInventory : allInventory).map(
                (inventory) => (
                  <Inventory
                    key={inventory._id}
                    inventory={inventory}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                  />
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageInventory;
