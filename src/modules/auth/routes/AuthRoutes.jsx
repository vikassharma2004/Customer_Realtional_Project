import { Login } from "../pages/Login.jsx";
import { Register } from "../pages/Register.jsx";
import { ResetPassword } from "../pages/ResetPassword.jsx";
import { ForgotPassword } from "../pages/ForgotPassword.jsx";
import AuthLayout from "../../../Layouts/AuthLayout.jsx";

export const AuthRoutes = {
  path: "/auth",
  element: <AuthLayout />,

  children: [
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "forgot-password",
      element: <ForgotPassword />,  
    },
    {
      path: "reset-password",
      element: <ResetPassword />,
    },
  ],
};
