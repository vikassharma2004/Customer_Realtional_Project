import React from "react";

const FullDetails = ({ invoice, hideStatus = false }) => {
  const formatDate = (date) => {
    if (!date) return "-";
    const d = new Date(date);
    return isNaN(d) ? "-" : d.toLocaleDateString("en-GB");
  };

  if (!invoice) {
    return (
      <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500 border border-dashed border-gray-300">
        <p>No invoice data available. Please select a valid invoice.</p>
      </div>
    );
  }

  const {
    invoiceNo,
    firmName,
    clientName,
    status,
    invoiceDate,
    dueDate,
    email,
    address,
    total,
    items = [],
    fromFirm = {
      name: "new firm",
      email: "newfirm@gmail.com",
      gst: "FGJKLOIUYT5678",
      address1: "address 1",
      address2: "address 2",
      city: "Ofu, Manu'a, American Samoa, 303030",
    },
    toFirm = {
      name: clientName || "Client Name",
      email: email || "client@email.com",
      gst: "111222233344445555",
      city: address || "Client Address",
    },
  } = invoice;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const amountPaid = 0;
  const totalDue = subtotal - amountPaid;

  return (
    <div className="bg-white p-8 rounded-xl shadow-md text-sm text-black space-y-6 border print:shadow-none print:border-none">
      {/* Header */}
      <div className="flex justify-between items-start">
        <img src="/logo.png" alt="Logo" className="h-10 mb-4" />
        <div className="text-right space-y-1">
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=Invoice"
            alt="QR Code"
            className="h-20 w-20 mx-auto"
          />
          <h1 className="text-2xl font-bold text-blue-600">Invoice</h1>
          <p className="text-xs text-gray-600">{invoiceNo || "NF-9"}</p>
          {!hideStatus && (
            <p className="text-sm font-semibold text-red-600">{status || "Overdue"}</p>
          )}
        </div>
      </div>

      <hr />

      {/* From / To Section */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="font-semibold mb-1">From</h2>
          <p>{fromFirm.name}</p>
          <p>{fromFirm.email}</p>
          <p className="text-xs">GST: {fromFirm.gst}</p>
          <p>{fromFirm.address1}</p>
          <p>{fromFirm.address2}</p>
          <p>{fromFirm.city}</p>
        </div>

        <div className="text-right">
          <h2 className="font-semibold mb-1">To</h2>
          <p>{toFirm.name}</p>
          <p>{toFirm.email}</p>
          <p className="text-xs">GST: {toFirm.gst}</p>
          <p>{toFirm.city}</p>
        </div>
      </div>

      {/* Dates */}
      <div className="flex justify-between items-center p-3 border rounded bg-gray-50">
        <p><strong>Invoice Date:</strong> {formatDate(invoiceDate)}</p>
        <p><strong>Due Date:</strong> {formatDate(dueDate)}</p>
      </div>

      {/* Item Table */}
      <div className="w-full">
        <h2 className="font-semibold mb-2">Item Details</h2>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="text-left p-2 rounded-l-lg">Item</th>
              <th className="p-2 text-center">Qty</th>
              <th className="p-2 text-center">Price</th>
              <th className="p-2 text-center rounded-r-lg">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item, index) => (
                <tr key={index} className="border-b last:border-none">
                  <td className="p-2 text-left">
                    <div>{item.name}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </td>
                  <td className="p-2 text-center">{item.quantity}</td>
                  <td className="p-2 text-center">₹{item.price.toFixed(2)}</td>
                  <td className="p-2 text-center font-semibold">
                    ₹{(item.quantity * item.price).toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-400">No items listed</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <hr />

      {/* Total */}
      <div className="flex justify-end">
        <div className="w-full sm:w-1/2 md:w-1/3 space-y-1">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between">
            <span>Amount Paid</span>
            <span>₹{amountPaid.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between font-semibold text-blue-600">
            <span>Total Due</span>
            <span>₹{totalDue.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>

      <hr />

      {/* Footer */}
      <p className="text-center text-xs text-gray-500 mt-4">
        This is a computer-generated invoice and does not require any physical signature.
      </p>
    </div>
  );
};

export default FullDetails;
