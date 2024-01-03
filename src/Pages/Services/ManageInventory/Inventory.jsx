import React, { useState } from "react";
import "./Inventory.css";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import EditForm from "./EditForm";
import QRCode from "qrcode.react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../../../public/znz.png";
import { useNavigate } from "react-router-dom";

const Inventory = ({ inventory, handleDelete, handleEdit }) => {
  const {
    itemName,
    itemCode,
    itemSerialNumber,
    uniqueId,
    price,
    quantity,
    purchaseDate,
    warrantyDate,
    estimatedLifeTime,
    description,
    location,
    remarks,
    image,
    photoURL,
    category,
    employeeName,
    employeeId,
    employeeDepartment,
    itemHandoverDate,
  } = inventory;
  const perUnitPrice = parseFloat(price) / parseInt(quantity);
  const purchaseDateObj = new Date(inventory.purchaseDate);
  const warrantyDateObj = new Date(inventory.warrantyDate);
  const remainingDays = Math.floor(
    (warrantyDateObj - purchaseDateObj) / (24 * 60 * 60 * 1000)
  );
  const qrCodeData = {
    category,
    itemCode,
    itemName,
    itemSerialNumber,
    uniqueId,
    employeeName,
    employeeId,
    employeeDepartment,
    itemHandoverDate,
    price,
    perUnitPrice,
    quantity,
    purchaseDate,
    warrantyDate,
    remainingDays,
    estimatedLifeTime,
    location,
  };

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const [editing, setEditing] = useState(false);

  const openEditForm = () => {
    setEditing(true);
  };

  const navigate = useNavigate();
  const handleViewInventory = () => {
    // Navigate to the "all-data" route with form data
    navigate("/view-inventory", { state: { inventory } });
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
    const blob = new Blob([byteArray], { type: "image/pdf" });

    // Create a temporary link and trigger a click to download
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${itemName}.pdf`;
    link.click();

    // Clean up
    window.URL.revokeObjectURL(link.href);
  };

  // Function to format the QR code data
  const formatQRCodeData = (data) => {
    return Object.entries(data)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
  };

  // Formatted QR code data
  const formattedQRCodeData = formatQRCodeData(qrCodeData);
  const printQRCode = () => {
    window.print();
  };

  const downloadQRCode = () => {
    const qrCodeContainer = document.getElementById("qrCodeContainer");
    const qrCodeDataURL = qrCodeContainer
      .querySelector("canvas")
      .toDataURL("image/png");

    const downloadLink = document.createElement("a");
    downloadLink.href = qrCodeDataURL;
    downloadLink.download = `${uniqueId}.png`;
    downloadLink.click();
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
    const {
      itemName,
      itemCode,
      itemSerialNumber,
      uniqueId,
      price,
      quantity,
      purchaseDate,
      warrantyDate,
      estimatedLifeTime,
      location,
      category,
      employeeName,
      employeeId,
      employeeDepartment,
    } = inventory;

    const companyInfo = {
      addressDhaka:
        " House: 322, Rd# 22, New DOHS, Mohakhali, Dhaka-1213, Bangladesh",
      addressChittagong:
        " Shahajadi Chamber(5th Floor), 1331/B, Sk.Mujib Road, Agrabad C/A.",
      phone: "880-2- 2222263378-80",
      mobile: "+8801711867974",
      email: "info@zednzedit.com",
    };

    pdf.addImage(logo, "PNG", 60, 10);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(14);
    pdf.text("Inventory Details Report", 80, 90);

    const data = [
      ["Field", "Value"],
      ["Item Name", itemName],
      ["Item Code", itemCode],
      ["Item Serial Number", itemSerialNumber],
      ["Unique ID", uniqueId],
      ["Price", price],
      ["Quantity", quantity],
      ["Purchase Date", purchaseDate],
      ["Warranty Date", warrantyDate],
      ["Estimated Life Time", estimatedLifeTime],
      ["Location", location],
      ["Category", category],
      ["Employee Name (User)", employeeName],
      ["Employee ID (User)", employeeId],
      ["Employee Department (User)", employeeDepartment],
    ];
    pdf.text(
      "--------------------------------------------------------------------------------------------------------------------",
      10,
      250
    );
    // Set font and style for company information
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(6);
    pdf.setTextColor(33, 33, 33);
    pdf.text(
      `Dhaka Office: ${companyInfo.addressDhaka} Chittagong Office: ${companyInfo.addressChittagong}`,
      20,
      260
    );
    pdf.text(
      `Phone: ${companyInfo.phone} Mobile: ${companyInfo.mobile} Email: ${companyInfo.email}`,
      70,
      265
    );

    // Use autotable plugin for a professional table layout
    pdf.autoTable({
      startY: 100,

      head: [data[0]],
      body: data.slice(1),
      theme: "grid",
      columnStyles: {
        0: { cellWidth: 65 },
        1: { cellWidth: 120 },
      },
    });

    // Save the PDF with a specific name
    pdf.save(`${uniqueId}_report.pdf`);
  };

  return (
    <>
      {editing ? (
        <EditForm
          inventory={inventory}
          handleEdit={handleEdit}
          setEditing={setEditing}
        />
      ) : (
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
              // onClick={openModal}
              onClick={handleViewInventory}
              className="btn btn-outline btn-xs border-none"
            >
              <span className="text-lg text-blue-500">
                <TbListDetails />
              </span>
            </button>
          </th>
          <th>
            <button
              onClick={openEditForm}
              // onClick={() => handleEdit(inventory._id)}
              className="btn btn-outline btn-xs border-none ml-2"
            >
              <span className="text-lg text-teal-700">
                {" "}
                <FaRegEdit />
              </span>
            </button>
          </th>
          <th>
            <button
              onClick={() => handleDelete(inventory._id)}
              className="btn btn-outline btn-xs border-none ml-2"
            >
              <span className="text-lg text-red-600">
                <MdDeleteForever />
              </span>
            </button>
          </th>
          <th>
            <button
              className="btn btn-outline px-4 btn-xs"
              onClick={() => document.getElementById("qrCodeModal").showModal()}
            >
              QR
            </button>
          </th>
        </tr>
      )}
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
                  {category && (
                    <p className="text-sm ">
                      <span className="text-[#015597] font-bold md:my-6 ">
                        Category :
                      </span>{" "}
                      {category}
                    </p>
                  )}
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
                    <span className="md:text-lg">&#2547; </span>
                    {price}
                  </p>
                  <p className="text-sm ">
                    <span className="text-[#015597] font-bold md:my-6 ">
                      Per Unit Price :
                    </span>{" "}
                    <span className="md:text-lg">&#2547; </span>
                    {perUnitPrice}
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
                      Purchase Date :
                    </span>{" "}
                    {purchaseDate}
                  </p>
                  {warrantyDate && (
                    <p className="text-sm ">
                      <span className="text-[#015597] font-bold md:my-6 ">
                        Warranty Date :
                      </span>{" "}
                      {warrantyDate}
                    </p>
                  )}
                  {warrantyDate && (
                    <p className="text-sm ">
                      <span className="text-[#015597] font-bold md:my-6 ">
                        Remaining Warranty Days :
                      </span>{" "}
                      {remainingDays} days
                    </p>
                  )}
                  {estimatedLifeTime && (
                    <p className="text-sm ">
                      <span className="text-[#015597] font-bold md:my-6 ">
                        Estimated Life Time :
                      </span>{" "}
                      {estimatedLifeTime} days
                    </p>
                  )}
                  <p className="text-sm ">
                    <span className="text-[#015597] font-bold md:my-6 ">
                      Employee Name :
                    </span>{" "}
                    {employeeName}
                  </p>
                  <p className="text-sm ">
                    <span className="text-[#015597] font-bold md:my-6 ">
                      Employee ID :
                    </span>{" "}
                    {employeeId}
                  </p>
                  <p className="text-sm ">
                    <span className="text-[#015597] font-bold md:my-6 ">
                      Employee Department :
                    </span>{" "}
                    {employeeDepartment}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-[#015597] font-bold md:my-3">QR Code:</h4>
                  <QRCode value={formattedQRCodeData} />
                </div>

                {/* Display the image with a download button */}
                <div className="mb-4">
                  <h4 className="text-[#015597] font-bold md:my-3">
                    Item Image:
                  </h4>
                  <img
                    className="w-full border-8"
                    src={`data:image/png;base64,${photoURL}`}
                    alt={itemName}
                  />
                  {/* <h4 className="text-[#015597] font-bold md:my-3">
                    Attached Bill:
                  </h4>
                  <img
                    src={`data:image/png;base64,${image}`}
                    alt={uniqueId}
                    className="w-full border-8"
                  /> */}
                  <button
                    onClick={downloadImage}
                    className="mt-4 btn btn-outline btn-primary"
                  >
                    Download Bill
                  </button>
                  <button
                    onClick={() => {
                      generatePDF();
                    }}
                    className="mt-4 btn btn-outline md:ml-10"
                  >
                    Generate Report
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
      <dialog id="qrCodeModal" className="modal">
        <div className="modal-box ">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hide-on-print">
              ✕
            </button>
          </form>

          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-7 md:m-6">
            <div id="qrCodeContainer">
              <h4 className="text-[#015597] font-bold my-3 hide-on-print ">
                QR Code:
              </h4>
              <QRCode value={formattedQRCodeData} />
            </div>
            <div className="flex items-center gap-3 md:mt-12">
              <button
                className="btn btn-xs btn-outline hide-on-print"
                onClick={downloadQRCode}
              >
                Download
              </button>
              <button
                className="btn  btn-xs btn-outline btn-primary hide-on-print"
                onClick={printQRCode}
              >
                Print
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Inventory;
