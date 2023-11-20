import { FaHome } from "react-icons/fa";
import Navbar from "../../../Shared/Navbar/Navbar";
import { MdOutlineInventory } from "react-icons/md";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { VscDiffAdded } from "react-icons/vsc";
import { useState } from "react";
import Swal from "sweetalert2";

const AddInventory = () => {
  const { register, handleSubmit, reset } = useForm();
  // const [imagePreview, setImagePreview] = useState("");
  // Function to convert image file to Base64
  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result.split(",")[1]); // Extract the Base64 data
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const onSubmit = async (data) => {
    // Convert the image file to Base64
    const imageInput = document.querySelector('input[name="add-image"]');
    const imageFile = imageInput.files[0];

    if (imageFile) {
      const base64Image = await convertImageToBase64(imageFile);
      data.image = base64Image;
    }

    // Log the full form data
    console.log(data);

    const saveInventory = {
      itemName: data.itemName,
      itemCode: data.itemCode,
      itemSerialNumber: data.itemSerialNumber,
      uniqueId: data.uniqueId,
      price: data.price,
      quantity: data.quantity,
      date: data.date,
      description: data.description,
      location: data.location,
      remarks: data.remarks,
      image: data.image,
      photoURL: data.photoURL,
    };
    console.log(saveInventory);
    fetch("http://localhost:5000/add-inventory", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(saveInventory),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Inventory Item Added",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      });
  };

  return (
    <div>
      <Navbar></Navbar>
      <hr />
      <div className="text-[#3070a2] font-bold text-3xl  py-5 flex items-center gap-2 justify-center">
        <MdOutlineInventory />
        <h4> Add Inventory</h4>
      </div>
      <hr />
      {/* Main Content */}
      <div className="card  w-full  shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="form-control ">
              <label className="label">
                <span className="label-text">Item Name</span>
              </label>
              <input
                {...register("itemName")}
                type="text"
                name="itemName"
                placeholder="item name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Item Code</span>
              </label>
              <input
                {...register("itemCode")}
                type="text"
                name="itemCode"
                placeholder="item code"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Item Serial Number</span>
              </label>
              <input
                {...register("itemSerialNumber")}
                type="text"
                name="itemSerialNumber"
                placeholder="item serial number"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Unique ID</span>
              </label>
              <input
                {...register("uniqueId")}
                type="text"
                name="uniqueId"
                placeholder="unique id"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                {...register("price")}
                type="number"
                name="price"
                placeholder="price"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Quantity</span>
              </label>
              <input
                {...register("quantity")}
                type="number"
                name="quantity"
                placeholder="quantity"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <input
                {...register("date")}
                type="date"
                name="date"
                placeholder="date"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <input
                {...register("description")}
                type="text"
                name="description"
                placeholder="description"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                {...register("location")}
                type="text"
                name="location"
                placeholder="location"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Remarks</span>
              </label>
              <input
                {...register("remarks")}
                type="text"
                name="remarks"
                placeholder="remarks"
                className="input input-bordered"
              />
            </div>

            <div className="form-control ">
              <label className="label">
                <span className="label-text">Add Bill Image</span>
              </label>
              <input
                {...register("add-image")}
                type="file"
                name="add-image"
                placeholder="add bill image"
                className="input file-input  w-full  input-bordered py-2"
              />
            </div>

            <div className="form-control ">
              <label className="label">
                <span className="label-text">Item Photo URL</span>
              </label>
              <input
                {...register("photoURL")}
                type="url"
                name="photoURL"
                placeholder="item photo url"
                className="input input-bordered"
              />
            </div>
          </div>

          <div className="form-control mt-6">
            <div className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-[#015597] rounded-full shadow-md group md:w-1/4 md:mx-auto">
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#015597] group-hover:translate-x-0 ease">
                <button className="text-2xl flex items-center cursor-pointer">
                  <input type="submit" value=" " />
                  <VscDiffAdded />
                </button>
              </span>

              <span className="absolute flex items-center justify-center w-full h-full text-[#015597] transition-all duration-300 transform group-hover:translate-x-full ease">
                Add Inventory
              </span>
              <span className="relative invisible">Add Inventory</span>
            </div>
          </div>
        </form>
      </div>

      {/* Buttom Navigation */}

      <Link to="/">
        <div className="text-sm flex gap-1 md:px-40 px-8   items-center py-5 text-[#015597] font-bold ">
          <FaHome />
          <h6 className="border-b-2">Back to Home</h6>
        </div>
      </Link>
    </div>
  );
};

export default AddInventory;
