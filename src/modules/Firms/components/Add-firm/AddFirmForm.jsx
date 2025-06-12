import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import FormField from "./FormField";
// import ConfirmModal from "./ConfirmModule";
import { Upload } from "lucide-react";
import Loader from "@/components/Loader";

const AddFirmForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contactEmail: "",
    CurrentActive: false,
    contactPhone: "",
    contactName: "",
    address: "",
    orgCity: "",
    orgState: "",
    orgCountry: "",
    logo: null,
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (formData.logo) {
      const objectUrl = URL.createObjectURL(formData.logo);
      setLogoPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setLogoPreview(null);
    }
  }, [formData.logo]);

  const handleChange = (e) => {
    const { name, files, type, value, checked } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] || null }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

 const submitForm = async () => {
  setLoading(true);
  try {
    console.log("Submitting form:", formData);

    // simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    alert("Organization added successfully!");
  } catch (error) {
    alert("Failed to add organization.");
  } finally {
    setLoading(false);
    setModalOpen(false);
  }
};


  const handleSubmit = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-screen-xl mx-auto space-y-10 bg-white p-10 rounded-2xl shadow-md font-['Roboto'] absolute -mt-15"
      >
        <h2 className="text-xl font-bold text-primary">Add Organization</h2>

        {/* Logo upload field */}
        <div className="flex flex-col items-center mb-6">
          <label
            htmlFor="logo"
            className="cursor-pointer w-32 h-32 rounded-full border border-gray-300 flex items-center justify-center overflow-hidden hover:border-blue-600 transition-colors relative"
            title="Click to upload logo"
          >
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Logo Preview"
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <Upload className="w-12 h-12 text-gray-400" />
            )}
            <input
              type="file"
              id="logo"
              name="logo"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              ref={fileInputRef}
            />
          </label>
          <span className="mt-2 text-sm text-gray-500">Upload Logo</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Organization Name"
            name="name"
            placeholder="Organization Name"
            value={formData.name}
            required
            onChange={handleChange}
          />
          <FormField
            label="Contact Email"
            name="contactEmail"
            type="email"
            placeholder="Email"
            value={formData.contactEmail}
            required
            onChange={handleChange}
          />
          <FormField
            label="Contact Phone"
            name="contactPhone"
            placeholder="Phone Number"
            value={formData.contactPhone}
            required
            onChange={handleChange}
          />
          <FormField
            label="Contact Person Name"
            name="contactName"
            placeholder="Contact Name"
            value={formData.contactName}
            required
            onChange={handleChange}
          />
          <FormField
            label="Address"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
          <FormField
            label="City"
            name="orgCity"
            placeholder="City"
            value={formData.orgCity}
            onChange={handleChange}
          />
          <FormField
            label="State"
            name="orgState"
            placeholder="State"
            value={formData.orgState}
            onChange={handleChange}
          />
          <FormField
            label="Country"
            name="orgCountry"
            placeholder="Country"
            value={formData.orgCountry}
            onChange={handleChange}
          />
        </div>

        <Button
          type="submit"
          className={"bg-blue-700 hover:bg-blue-800 text-white"}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Add Organization"}
        </Button>
      </form>

      <ConfirmModal
        open={modalOpen}
        setOpen={setModalOpen}
        title="Confirm Submission"
        description="Are you sure you want to add this organization? Please confirm all details."
        onConfirm={submitForm}
        loading={loading}
        confirmText="Confirm"
        cancelText="Cancel"
      />
       {loading && <Loader />}
    </>
  );
};

export default AddFirmForm;
