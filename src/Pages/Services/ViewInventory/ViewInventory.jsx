import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import QRCode from "qrcode.react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Navbar from "../../../Shared/Navbar/Navbar";
import Navigation from "../../../Shared/Navbar/Navigation";
import logo from "../../../../public/znz.png";
const ViewInventory = () => {
  // Use the useLocation hook to get access to the location object
  const locationAddress = useLocation();

  // Access the form data from the location.state
  const { inventory } = locationAddress.state || {};

  // Check if formData is available
  if (!inventory) {
    // navigate("/");
    return null;
  }
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
  const useDateObj = new Date(inventory.itemHandoverDate);
  const date = new Date();
  const totalDuration = Math.floor((date - useDateObj) / (24 * 60 * 60 * 1000));
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
      totalDuration,
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
      ["Item Handover Date", itemHandoverDate],
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
    <div>
      <Helmet>
        <title>ZnZ || View Inventory</title>
      </Helmet>

      <Navbar></Navbar>
      <hr />

      <Navigation></Navigation>
      <hr />

      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        {/* Display all information here */}

        <div className="flex gap-5  p-9">
          <div className="w-8/12">
            <p className="md:text-xl font-bold text-[#015597]">{itemName}</p>
            <div className="grid grid-cols-3 mt-3 items-center">
              <p>
                <span className="text-[#015597] font-bold md:my-6">
                  Unique ID:
                </span>{" "}
                {uniqueId}
              </p>
              <p>
                <span className="text-[#015597] font-bold md:my-6">
                  Item Code :
                </span>{" "}
                {itemCode}
              </p>
              <p>
                <span className="text-[#015597] font-bold md:my-6 ">
                  Category :
                </span>{" "}
                {category}
              </p>
            </div>

            <div className="grid grid-cols-3 mt-3 items-center">
              <p>
                <span className="text-[#015597] font-bold md:my-6 ">
                  Quantity :
                </span>{" "}
                {quantity}
              </p>
              <p>
                <span className="text-[#015597] font-bold md:my-6 ">
                  Per Unit Price :
                </span>{" "}
                <span className="md:text-lg">&#2547; </span>
                {perUnitPrice}
              </p>
              <p>
                <span className="text-[#015597] font-bold md:my-6 ">
                  Location :
                </span>{" "}
                {location}
              </p>
            </div>
            <p className=" mt-3 text-justify">
              <span className="text-[#015597] font-bold md:my-6  ">
                Item Description :
              </span>{" "}
              {description}
            </p>
            <p className="text-justify mt-3">
              <span className="text-[#015597] font-bold md:my-6 ">
                Remarks :
              </span>{" "}
              {remarks}
            </p>
            <div className="grid grid-cols-2 items-center mt-3">
              {" "}
              <p>
                <span className="text-[#015597] font-bold md:my-6 ">
                  Purchase Date :
                </span>{" "}
                {purchaseDate}
              </p>
              {warrantyDate && (
                <p>
                  <span className="text-[#015597] font-bold md:my-6 ">
                    Warranty Date :
                  </span>{" "}
                  {warrantyDate}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 items-center mt-3">
              {" "}
              {warrantyDate && (
                <p>
                  <span className="text-[#015597] font-bold md:my-6 ">
                    Remaining Warranty Days :
                  </span>{" "}
                  {remainingDays} days
                </p>
              )}
              {estimatedLifeTime && (
                <p>
                  <span className="text-[#015597] font-bold md:my-6 ">
                    Estimated Life Time :
                  </span>{" "}
                  {estimatedLifeTime} days
                </p>
              )}
            </div>

            <div className="mb-4">
              <h4 className="text-[#015597] font-bold md:my-3">QR Code:</h4>
              <QRCode value={formattedQRCodeData} />
            </div>
            <h3 className="text-[#015597] font-bold md:mt-24 text-center bg-base-200 p-4 rounded-lg ">
              User Information
            </h3>
            <div className="grid grid-cols-3 mt-3 px-8 ">
              <p>
                <span className="text-[#015597] font-bold md:my-6 ">
                  Employee Name :
                </span>{" "}
                {employeeName}
              </p>
              <p>
                <span className="text-[#015597] font-bold md:my-6 ">
                  Employee ID :
                </span>{" "}
                {employeeId}
              </p>
              <p>
                <span className="text-[#015597] font-bold md:my-6 ">
                  Employee Department :
                </span>{" "}
                {employeeDepartment}
              </p>
            </div>
            <div className="grid grid-cols-2 mt-3 px-8">
              <p>
                <span className="text-[#015597] font-bold md:my-6 ">
                  Item Handover Date :
                </span>{" "}
                {itemHandoverDate}
              </p>
              <p>
                <span className="text-[#015597] font-bold md:my-6 ">
                  Total Uptime (Current Date) :
                </span>{" "}
                {totalDuration} days
              </p>
            </div>
          </div>
          <div className="w-4/12">
            <img
              src={`data:image/png;base64,${photoURL}`}
              className=" w-full rounded-lg shadow-2xl"
            />

            <button
              onClick={downloadImage}
              className="mt-12 btn btn-outline btn-primary md:ml-5"
            >
              Download Bill
            </button>
            <button
              onClick={() => {
                generatePDF();
              }}
              className="mt-12 btn btn-outline md:ml-10"
            >
              Generate Report
            </button>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default ViewInventory;
