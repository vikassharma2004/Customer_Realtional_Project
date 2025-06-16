import React, { useState } from "react";
import toast from "react-hot-toast";

const AddLeadForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    client: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: {
        line1: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
      },
    },
    estimatedWorth: "",
    currency: "INR",
    stage: "",
    status: "",
    pipeline: {
      department: "",
      userType: "",
    },
    tags: "",
    timezone: "",
    closureDate: "",
    notes: "",
    priority: "Medium",
    followUpDate: "",
    nextAction: "",
    customNextAction: "",
    firmId: "",
  });

  const [step, setStep] = useState(0);

  const allFields = [
    { name: "title", label: "Title*", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea" },
    { name: "client.firstName", label: "Client First Name", type: "text" },
    { name: "client.lastName", label: "Client Last Name", type: "text" },
    { name: "client.email", label: "Client Email", type: "email" },
    { name: "client.phone", label: "Client Phone", type: "text" },
    { name: "client.address.line1", label: "Address Line 1", type: "text" },
    { name: "client.address.city", label: "City", type: "text" },
    { name: "client.address.state", label: "State", type: "text" },
    { name: "client.address.country", label: "Country", type: "text" },
    { name: "client.address.postalCode", label: "Postal Code", type: "text" },
    { name: "estimatedWorth", label: "Estimated Worth", type: "number" },
    {
      name: "currency",
      label: "Currency*",
      type: "select",
      options: ["INR", "USD", "EUR", "BTC", "JPY", "MXN", "PKR"],
      required: true,
    },
    {
      name: "stage",
      label: "Stage*",
      type: "select",
      options: ["New", "Contacted", "Qualified", "ProposalSent", "Negotiation", "Lead Closed"],
      required: true,
    },
    {
      name: "status",
      label: "Status*",
      type: "select",
      options: ["New", "Won", "Lost", "Hold"],
      required: true,
    },
    { name: "pipeline.department", label: "Department", type: "text" },
    { name: "pipeline.userType", label: "User Type", type: "text" },
    { name: "tags", label: "Tags (comma separated)", type: "text" },
    { name: "timezone", label: "Timezone", type: "text" },
    { name: "closureDate", label: "Closure Date", type: "date" },
    { name: "notes", label: "Notes", type: "text" },
    {
      name: "priority",
      label: "Priority",
      type: "select",
      options: ["Low", "Medium", "High", "Critical"],
    },
    { name: "followUpDate", label: "Follow-up Date", type: "date" },
    {
      name: "nextAction",
      label: "Next Action*",
      type: "select",
      options: [
        "Call Lead", "Send Email", "Schedule Meeting", "Demo", "Send Proposal",
        "Negotiate", "Close Deal", "Follow Up Later", "Collect Documents"
      ],
      required: true,
    },
    { name: "customNextAction", label: "Custom Next Action", type: "text" },
    { name: "firmId", label: "Firm ID", type: "text" },
  ];

  const fieldsPerStep = 8;
  const totalSteps = Math.ceil(allFields.length / fieldsPerStep);

  const currentFields = allFields.slice(step * fieldsPerStep, (step + 1) * fieldsPerStep);

  const inputClass =
    "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500";
  const labelClass = "font-medium text-sm";

  const getValueByPath = (obj, path) =>
    path.split(".").reduce((o, p) => (o ? o[p] : ""), obj);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    setFormData((prev) => {
      let nested = { ...prev };
      let ref = nested;
      for (let i = 0; i < keys.length - 1; i++) {
        ref[keys[i]] = { ...ref[keys[i]] };
        ref = ref[keys[i]];
      }
      ref[keys[keys.length - 1]] = value;
      return nested;
    });
  };

  const validateCurrentStep = () => {
    for (const field of currentFields) {
      if (field.required) {
        const value = getValueByPath(formData, field.name);
        if (!value?.trim()) return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      toast.error("Please fill all required fields.");
      return;
    }
    if (step < totalSteps - 1) setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateCurrentStep()) {
      toast.error("Please fill all required fields.");
      return;
    }
    console.log("Submitted Lead:", formData);
    toast.success("Lead submitted successfully!");
    setFormData("");
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto space-y-10 bg-white p-10 rounded-2xl shadow-md font-['Roboto'] absolute -mt-15">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Lead</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentFields.map((field, idx) => (
          <div key={idx}>
            <label className={labelClass}>{field.label}</label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                value={getValueByPath(formData, field.name)}
                onChange={handleChange}
                className={inputClass}
              />
            ) : field.type === "select" ? (
              <select
                name={field.name}
                value={getValueByPath(formData, field.name)}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select</option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={getValueByPath(formData, field.name)}
                onChange={handleChange}
                className={inputClass}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-4 pt-4">
        {step > 0 && (
          <button
            type="button"
            onClick={handlePrevious}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition-all"
          >
            Previous
          </button>
        )}

        {step < totalSteps - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition-all"
          >
            Next
          </button>
        ) : (
          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition-all"
            >
              Add Lead
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddLeadForm;
