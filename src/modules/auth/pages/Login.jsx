import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../store/AuthStore";

export const Login = () => {
  // from zustand store
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputType, setInputType] = useState("password");
  const [disable, setDisable] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisable(true);

    try {
      await login(email, password);
      setDisable(false);
    } catch (err) {
      setDisable(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-full max-w-md mx-auto"
      >
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Sign &nbsp;In
          </h2>
          <p className="text-gray-600 text-sm">Login to stay connected.</p>
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            placeholder="Enter email"
            className="w-full px-4 py-2 border border-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="relative">
          <label htmlFor="password" className="block mb-1 font-medium text-gray-600">
            Password
          </label>
          <input
            type={inputType}
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            placeholder="Enter password"
            className="w-full pr-10 px-4 py-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            // Added pr-10 to make space for the eye icon
          />
          {password && inputType === "password" ? (
            <AiFillEyeInvisible
              className="absolute top-9.5 right-3 text-xl text-blue-600 cursor-pointer"
              onClick={() => setInputType("text")}
            />
          ) : (
            password && (
              <AiFillEye
                className="absolute top-9.5 right-3 text-xl text-blue-600 cursor-pointer"
                onClick={() => setInputType("password")}
              />
            )
          )}
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            disabled={disable}
            className={`px-6 py-2 text-white rounded-md  text-sm ${
              disable
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {disable ? "Signing In..." : "Sign In"}
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/auth/register" className="text-blue-600 hover:underline">
            Click here to sign up.
          </Link>
        </p>
      </form>
    </>
  );
};
