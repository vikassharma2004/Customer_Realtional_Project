import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormField from "./FormField";
import ConfirmModal from "./ConfirmModule";
import Loader from "@/components/Loader";

const AddFirmForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    invoicePrefix: "",
    add: "",
    contectPerson: "",
    website: "",
    gst_no: "",
    logo: null,
    registeredFirmName: "",
    uin: "",
    tinNo: "",
    cinNo: ""
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
    const { name, files, type, value } = e.target;
    const newValue = type === "file" ? files[0] : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const submitForm = async () => {
    setLoading(true);
    try {
      console.log("Submitting form:", formData);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Firm added successfully!");
    } catch (error) {
      alert("Failed to add firm.");
    } finally {
      setLoading(false);
      setModalOpen(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-screen-xl mx-auto space-y-10 bg-white p-10 rounded-2xl shadow-md font-['Roboto'] absolute -mt-15"
      >
        <h2 className="text-xl font-bold text-primary">Add Firm</h2>

        <div className="flex flex-col items-center mb-6">
          <label
            htmlFor="logo"
            className="cursor-pointer w-32 h-32 rounded-full border border-gray-300 flex items-center justify-center overflow-hidden hover:border-blue-600 transition-colors relative"
            title="Click to upload logo"
          >
            {logoPreview ? (
              <img src={logoPreview} alt="Logo Preview" className="w-32 h-32 rounded-full object-cover" />
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
          <FormField label="Firm Name" name="name" value={formData.name} onChange={handleChange} required />
          <FormField label="Email" name="email" value={formData.email} onChange={handleChange} required />
          <FormField label="Phone" name="phone" value={formData.phone} onChange={handleChange} required />
          <FormField label="Invoice Prefix" name="invoicePrefix" value={formData.invoicePrefix} onChange={handleChange} />
          <FormField label="Address" name="add" value={formData.add} onChange={handleChange} />
          <FormField label="Contact Person" name="contectPerson" value={formData.contectPerson} onChange={handleChange} />
          <FormField label="Website" name="website" value={formData.website} onChange={handleChange} />
          <FormField label="GST No" name="gst_no" value={formData.gst_no} onChange={handleChange} />
          <FormField label="Registered Firm Name" name="registeredFirmName" value={formData.registeredFirmName} onChange={handleChange} />
          <FormField label="UIN" name="uin" value={formData.uin} onChange={handleChange} />
          <FormField label="TIN No" name="tinNo" value={formData.tinNo} onChange={handleChange} />
          <FormField label="CIN No" name="cinNo" value={formData.cinNo} onChange={handleChange} />
        </div>

        <Button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Add Firm"}
        </Button>
      </form>

      <ConfirmModal
        open={modalOpen}
        setOpen={setModalOpen}
        title="Confirm Submission"
        description="Are you sure you want to add this firm? Please confirm all details."
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