import React, { useState } from "react";
import {
  Share2,
  Printer,
  FileEdit,
  EyeOff,
  Eye,
  ClipboardCopy,
  Bell,
  X,
  Pencil,
} from "lucide-react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const Options = ({ invoice, onToggleStatus, statusHidden }) => {
  const { orgName } = useParams();
  const [showStatus, setShowStatus] = useState(!statusHidden);

  const handleShare = async () => {
    try {
      const url = `${window.location.origin}/${orgName}/invoices/invoice-details/${invoice._id}`;
      await navigator.clipboard.writeText(url);
      toast.success("Invoice link copied to clipboard!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handlePrint = () => {
    const content = document.getElementById("printable-content");
    const newWindow = window.open("", "", "width=900,height=700");
    newWindow.document.write(`
      <html>
        <head>
          <title>Invoice Print</title>
          <style>
            body { font-family: sans-serif; padding: 20px; }
          </style>
        </head>
        <body>
          ${content?.innerHTML}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.focus();
    newWindow.print();
    newWindow.close();
  };

  const toggleStatusVisibility = () => {
    setShowStatus(!showStatus);
    onToggleStatus(!showStatus);
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleShare}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded flex items-center justify-between"
      >
        Share Invoice <Share2 size={16} />
      </button>

      <button
        onClick={handlePrint}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded flex items-center justify-between"
      >
        Print Invoice <Printer size={16} />
      </button>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded flex items-center justify-between">
        Record Payment <Pencil size={16} />
      </button>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded flex items-center justify-between">
        Edit Invoice <FileEdit size={16} />
      </button>

      <button
        onClick={toggleStatusVisibility}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded flex items-center justify-between"
      >
        {showStatus ? "Show Status" : "Hide Status"}
        {showStatus ? <Eye size={16} /> : <EyeOff size={16} />}
      </button>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded flex items-center justify-between">
        Copy Invoice <ClipboardCopy size={16} />
      </button>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded flex items-center justify-between">
        Reminders <Bell size={16} />
      </button>

      <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded flex items-center justify-between">
        Cancel Invoice <X size={16} />
      </button>
    </div>
  );
};

export default Options;
