import React from "react";
import { Eye, Share2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const InvoicesPreview = ({ invoice }) => {
  const navigate = useNavigate();
  const { orgName } = useParams();

  if (!invoice) return <p className="text-gray-500">Select an invoice to see details</p>;

  const formatDate = (date) => {
    const d = new Date(date);
    return isNaN(d) ? "Invalid Date" : d.toLocaleDateString();
  };

  const handleViewInvoice = () => {
    navigate(`/${orgName}/dashboard/invoice/${invoice._id}`);
  };

  const handleShareInvoice = async () => {
    try {
      const shareUrl = `${window.location.origin}/${orgName}/dashboard/invoice/${invoice._id}`;
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Invoice link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link!");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="text-blue-600 font-semibold text-md">Preview</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleViewInvoice}
            title="View Full Invoice"
            className="hover:text-blue-700 text-blue-600"
          >
            <Eye size={20} />
          </button>
          <button
            onClick={handleShareInvoice}
            title="Share Invoice Link"
            className="hover:text-blue-700 text-blue-600"
          >
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Invoice Info */}
      <div className="text-sm">
        <div className="flex justify-between mb-2">
          <div>
            <span className="font-semibold">Invoice Date:</span>{" "}
            {formatDate(invoice.invoiceDate)}
          </div>
          <div>
            <span className="font-semibold">Due Date:</span>{" "}
            {formatDate(invoice.dueDate)}
          </div>
        </div>

        <div className="mt-4 mb-1 font-semibold">Bill To:</div>
        <div><span className="font-semibold">Name:</span> {invoice.clientName}</div>
        <div><span className="font-semibold">Email:</span> {invoice.email}</div>
        <div><span className="font-semibold">Address:</span> {invoice.address}</div>

        <div className="mt-4 text-lg font-bold">
          Total: ₹{invoice.total?.toLocaleString("en-IN") || "0"}
        </div>
      </div>
    </div>
  );
};

export default InvoicesPreview;
