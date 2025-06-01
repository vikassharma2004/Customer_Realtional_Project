import SubHeader from "@/Layouts/SubHeader.jsx";
import AddOrgForm from "../components/Add-org/AddOrgForm.jsx";

const AddOrganisation = () => {
  return (
    <>
      <SubHeader title="Add Organisation" />
      <section className="bg-muted min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-15 md:px-6 lg:px-8">
          <AddOrgForm />
        </div>
      </section>
    </>
  );
};

export default AddOrganisation;
