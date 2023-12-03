import { FaHome } from "react-icons/fa";
import Navbar from "../../../Shared/Navbar/Navbar";
import { MdOutlineInventory } from "react-icons/md";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { VscDiffAdded } from "react-icons/vsc";
import { useState } from "react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const AddInventory = () => {
  const { register, handleSubmit, reset } = useForm();
  const [category, setCategory] = useState("");

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result.split(",")[1]);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onSubmit = async (data) => {
    const imageInput = document.querySelector('input[name="add-image"]');
    const imageFile = imageInput.files[0];

    if (imageFile) {
      const base64Image = await convertImageToBase64(imageFile);
      data.image = base64Image;
    }

    const saveInventory = {
      itemName: data.itemName,
      itemCode: data.itemCode,
      itemSerialNumber: data.itemSerialNumber,
      uniqueId: data.uniqueId,
      price: data.price,
      quantity: data.quantity,
      purchaseDate: data.purchaseDate,
      warrantyDate: data.warrantyDate,
      description: data.description,
      location: data.location,
      remarks: data.remarks,
      image: data.image,
      photoURL: data.photoURL,
      category: category,
      employeeName: data.employeeName,
      employeeId: data.employeeId,
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
      <Helmet>
        <title>ZnZ || Add Inventory</title>
      </Helmet>
      <Navbar></Navbar>
      <hr />
      <div className="text-[#3070a2] font-bold text-3xl py-5 flex items-center gap-2 justify-center">
        <MdOutlineInventory />
        <h4> Add Inventory</h4>
      </div>
      <hr />
      <div className="card w-full shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="form-control ">
              <label className="label">
                <span className="label-text">
                  Item Name <span className="md:text-lg text-red-500">*</span>
                </span>
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
                <span className="label-text">
                  Item Code <span className="md:text-lg text-red-500">*</span>
                </span>
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
                <span className="label-text">
                  Item Serial Number{" "}
                  <span className="md:text-lg text-red-500">*</span>
                </span>
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
                <span className="label-text">
                  Unique ID <span className="md:text-lg text-red-500">*</span>
                </span>
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
                <span className="label-text">
                  Price <span className="md:text-lg text-red-500">*</span>
                </span>
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
                <span className="label-text">
                  Quantity <span className="md:text-lg text-red-500">*</span>
                </span>
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
                <span className="label-text">
                  Purchase Date{" "}
                  <span className="md:text-lg text-red-500">*</span>
                </span>
              </label>
              <input
                {...register("purchaseDate")}
                type="Date"
                name="purchaseDate"
                placeholder="purchase date"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Warranty Ends{" "}
                  <span className="md:text-lg text-red-500"></span>
                </span>
              </label>
              <input
                {...register("warrantyDate")}
                type="Date"
                name="warrantyDate"
                placeholder="warranty date"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Category <span className="md:text-lg text-red-500">*</span>
                </span>
              </label>
              <select
                {...register("category")}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="select select-bordered"
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="Hardware">Hardware</option>
                <option value="Software">Software</option>
                <option value="Licenses">Licenses</option>
                <option value="DataAndDatabases">Data and Databases</option>
                <option value="Peripherals">Peripherals</option>
                <option value="OfficeEquipment">Office Equipment</option>
                <option value="ItAccessories">IT Accessories</option>
                <option value="Documentation">Documentation</option>
                <option value="Licenses">Licenses</option>
                <option value="WarrantyAndSupportContracts">
                  Warranty and Support Contracts
                </option>
                <option value="DigitalAssets">Digital Assets</option>
                <option value="EmployeeDevices">Employee Devices</option>
                <option value="CloudResources">Cloud Resources</option>
                <option value="SecurityEquipment">Security Equipment</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Description <span className="md:text-lg text-red-500">*</span>
                </span>
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
                <span className="label-text">
                  Location <span className="md:text-lg text-red-500">*</span>
                </span>
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
                <span className="label-text">
                  Remarks<span className="md:text-lg text-red-500"></span>
                </span>
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
                <span className="label-text">
                  Add Bill Image{" "}
                  <span className="md:text-lg text-red-500"></span>
                </span>
              </label>
              <input
                {...register("add-image")}
                type="file"
                name="add-image"
                placeholder="add bill image"
                className="input file-input w-full input-bordered py-2"
              />
            </div>

            <div className="form-control ">
              <label className="label">
                <span className="label-text">
                  Item Photo URL{" "}
                  <span className="md:text-lg text-red-500"></span>
                </span>
              </label>
              <input
                {...register("photoURL")}
                type="url"
                name="photoURL"
                placeholder="item photo url"
                className="input input-bordered"
              />
            </div>

            <div className="form-control ">
              <label className="label">
                <span className="label-text">
                  Employee Name (User)
                  <span className="md:text-lg text-red-500">*</span>
                </span>
              </label>
              <input
                {...register("employeeName")}
                type="text"
                name="employeeName"
                placeholder="employee name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-text">
                  Employee ID <span className="md:text-lg text-red-500">*</span>
                </span>
              </label>
              <input
                {...register("employeeId")}
                type="text"
                name="employeeId"
                placeholder="employee id"
                className="input input-bordered"
                required
              />
            </div>
          </div>

          <div className="form-control mt-6">
            <button className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-[#015597] rounded-full shadow-md group md:w-1/4 md:mx-auto">
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#015597] group-hover:translate-x-0 ease">
                <span className="text-2xl flex items-center cursor-pointer">
                  <input type="submit" value=" " />
                  <VscDiffAdded />
                </span>
              </span>

              <span className="absolute flex items-center justify-center w-full h-full text-[#015597] transition-all duration-300 transform group-hover:translate-x-full ease">
                Add Inventory
              </span>
              <span className="relative invisible">Add Inventory</span>
            </button>
          </div>
        </form>
        <span className="text-sm px-8 pb-2 font-bold italic text-red-500">
          * This field is Required
        </span>
      </div>

      <Link to="/">
        <div className="text-sm flex gap-1 md:px-40 px-8 items-center py-5 text-[#015597] font-bold ">
          <FaHome />
          <h6 className="border-b-2">Back to Home</h6>
        </div>
      </Link>
    </div>
  );
};

export default AddInventory;
