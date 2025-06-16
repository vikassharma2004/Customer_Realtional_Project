import SubHeader from "@/Layouts/SubHeader.jsx";
import AddLeadForm from "../components/Add-lead/AddLeadForm.jsx";

const AddLead = () => {
  return (
    <>
      <SubHeader title="Add Lead" />
      <section className="bg-muted min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-15 md:px-6 lg:px-8 relative">
          <AddLeadForm />
        </div>
      </section>
    </>
  );
};

export default AddLead;
