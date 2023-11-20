import React, { useState } from "react";

const Inventory = ({ inventory }) => {
  const {
    itemName,
    itemCode,
    itemSerialNumber,
    uniqueId,
    price,
    quantity,
    date,
    description,
    location,
    remarks,
    image,
    photoURL,
  } = inventory;

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const downloadImage = () => {
    // Assuming the 'image' property contains base64 data
    const base64Image = image; // Replace with the actual property name

    // Convert base64 to Blob
    const byteCharacters = atob(base64Image);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/png" });

    // Create a temporary link and trigger a click to download
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${itemName}_image.png`;
    link.click();

    // Clean up
    window.URL.revokeObjectURL(link.href);
  };

  return (
    <>
      <tr>
        <td className="font-bold">{uniqueId}</td>
        <td>{itemName}</td>
        <td>{itemCode}</td>
        <td>{itemSerialNumber}</td>
        <td>{quantity}</td>
        <td>
          <span className="md:text-2xl">&#2547;</span> {price}
        </td>
        <th>
          <button
            onClick={openModal}
            className="btn btn-outline btn-xs border-none"
          >
            See Details
          </button>
        </th>
      </tr>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div
                className="absolute inset-0 bg-gray-500 opacity-75"
                onClick={closeModal}
              ></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                {/* Display all information here */}
                <div className="mb-4">
                  <p className="md:text-xl font-bold">
                    <span className="text-[#015597]">Item Name:</span>{" "}
                    {itemName}
                  </p>
                  <p className="text-sm">
                    <span className="text-[#015597] font-bold md:my-6">
                      Unique ID:
                    </span>{" "}
                    {uniqueId}
                  </p>
                  <p className="text-sm">
                    <span className="text-[#015597] font-bold md:my-6">
                      Item Code :
                    </span>{" "}
                    {itemCode}
                  </p>
                  <p className="text-sm ">
                    <span className="text-[#015597] font-bold md:my-6 ">
                      Item Description :
                    </span>{" "}
                    {description}
                  </p>
                  <p className="text-sm ">
                    <span className="text-[#015597] font-bold md:my-6 ">
                      Quantity :
                    </span>{" "}
                    {quantity}
                  </p>
                  <p className="text-sm ">
                    <span className="text-[#015597] font-bold md:my-6 ">
                      Item Price :
                    </span>{" "}
                    {price}
                  </p>
                  <p className="text-sm ">
                    <span className="text-[#015597] font-bold md:my-6 ">
                      Location :
                    </span>{" "}
                    {location}
                  </p>
                  <p className="text-sm ">
                    <span className="text-[#015597] font-bold md:my-6 ">
                      Remarks :
                    </span>{" "}
                    {remarks}
                  </p>
                  <p className="text-sm ">
                    <span className="text-[#015597] font-bold md:my-6 ">
                      Date :
                    </span>{" "}
                    {date}
                  </p>
                </div>

                {/* Display the image with a download button */}
                <div className="mb-4">
                  <h4 className="text-[#015597] font-bold md:my-3">
                    Item Image:
                  </h4>
                  <img
                    className="w-full border-8"
                    src={photoURL}
                    alt={itemName}
                  />
                  <h4 className="text-[#015597] font-bold md:my-3">
                    Attached Bill:
                  </h4>
                  <img
                    src={`data:image/png;base64,${image}`}
                    alt={uniqueId}
                    className="w-full border-8"
                  />
                  <button
                    onClick={downloadImage}
                    className="mt-2 btn btn-outline btn-primary"
                  >
                    Download Bill
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={closeModal}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Inventory;
