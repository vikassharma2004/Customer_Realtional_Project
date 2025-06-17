// utils/invoicesData.js

const invoicesData = [
  {
    _id: "inv001",
    invoiceNo: "INV-2024-001",
    firmName: "TechNova Solutions",
    clientName: "Vikas Sharma",
    status: "Paid",
    invoiceDate: "2024-06-01",
    dueDate: "2024-06-10",
    email: "vikas@client.com",
    address: "123 MG Road, Bangalore, Karnataka, 560001",
    total: 12000
  },
  {
    _id: "inv002",
    invoiceNo: "INV-2024-002",
    firmName: "InnoSoft Pvt. Ltd.",
    clientName: "Pooja Gupta",
    status: "Pending",
    invoiceDate: "2024-06-05",
    dueDate: "2024-06-15",
    email: "pooja@client.com",
    address: "88 Park Street, Jaipur, Rajasthan, 302016",
    total: 8000
  },
  {
    _id: "inv003",
    invoiceNo: "INV-2024-003",
    firmName: "BizCorp India",
    clientName: "Raj Singh",
    status: "Overdue",
    invoiceDate: "2024-05-20",
    dueDate: "2024-05-30",
    email: "raj@client.com",
    address: "1 IT Park, Noida, UP, 201301",
    total: 15000
  }
];

export default invoicesData;
