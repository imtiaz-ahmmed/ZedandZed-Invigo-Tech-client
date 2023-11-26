// EditForm.jsx
import React, { useState } from "react";

const EditForm = ({ inventory, handleEdit, setEditing }) => {
  const [editedData, setEditedData] = useState({ ...inventory });

  const handleInputChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEdit(inventory._id, editedData);
    setEditing(false); // Close the edit form after submission
  };

  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div
            className="absolute inset-0 bg-gray-500 opacity-75"
            onClick={() => setEditing(false)}
          ></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form
            onSubmit={handleSubmit}
            className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
          >
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700">
                Unique ID:
              </label>
              <input
                type="text"
                name="uniqueId"
                value={editedData.uniqueId}
                onChange={handleInputChange}
                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700">
                Item Name:
              </label>
              <input
                type="text"
                name="itemName"
                value={editedData.itemName}
                onChange={handleInputChange}
                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700">
                Item Code:
              </label>
              <input
                type="text"
                name="itemCode"
                value={editedData.itemCode}
                onChange={handleInputChange}
                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700">
                Item Serial Number:
              </label>
              <input
                type="text"
                name="itemSerialNumber"
                value={editedData.itemSerialNumber}
                onChange={handleInputChange}
                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700">
                Item Price:
              </label>
              <input
                type="number"
                name="price"
                value={editedData.price}
                onChange={handleInputChange}
                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700">
                Quantity:
              </label>
              <input
                type="number"
                name="quantity"
                value={editedData.quantity}
                onChange={handleInputChange}
                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700">
                Employee Name:
              </label>
              <input
                type="text"
                name="employeeName"
                value={editedData.employeeName}
                onChange={handleInputChange}
                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700">
                Employee ID :
              </label>
              <input
                type="text"
                name="employeeId"
                value={editedData.employeeId}
                onChange={handleInputChange}
                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>

            <div className="flex items-center justify-between">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="btn btn-secondary ml-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
