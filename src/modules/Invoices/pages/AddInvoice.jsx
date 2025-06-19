import SubHeader from "@/Layouts/SubHeader.jsx";
import AddInvoiceForm from "../components/Add-invoice/AddInvoiceForm.jsx";

const AddInvoice = () => {
  return (
    <>
      <SubHeader title="Add Invoice" />
      <section className="bg-muted min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-15 md:px-6 lg:px-8 relative">
          <AddInvoiceForm />
        </div>
      </section>
    </>
  );
};

export default AddInvoice;
