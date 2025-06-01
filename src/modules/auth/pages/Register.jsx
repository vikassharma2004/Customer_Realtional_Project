import { useState } from "react";

 const Register = () => {
    const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // You can add your backend POST request here
  };
  return (
    <>
      <form className="space-y-5">
        <div className="flex gap-4">
          <div className="w-1/2">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium mb-1 text-gray-600"
            >
              First Name
            </label>
            <input
              type="text"value={formData.firstName}
              onChange={handleChange}

              id="firstName"
              placeholder="Enter first name"
              className="w-full border  border-blue-400 rounded px-20 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium mb-1 text-gray-600 "
            >
              Last Name
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              id="lastName"
              placeholder="Enter Last name"
              className="w-full border border-blue-400 rounded px-20 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-1 text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full border border-blue-400 rounded px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1 text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full border border-blue-400 rounded px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="Phone-no"
              className="block text-sm font-medium mb-1 text-gray-600"
            >
              Phone
            </label>
            <input
              type="number"
              id="phone"
              inputMode="numeric"
              pattern="[0-9]*"
              value={formData.phone}
              onChange={handleChange}
              min={0}
              max={10}
              placeholder="1234567890"
              className=" appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full border border-blue-400 rounded px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded text-sm"
        >
          Sign Up
        </button>
      </form>

      <p className="text-sm text-center mt-4">
        Already have an Account?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Sign In
        </a>
      </p>
    </>
  );
};

export default Register
