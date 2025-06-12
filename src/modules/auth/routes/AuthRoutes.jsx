import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import AuthLayout from "../../../Layouts/AuthLayout.jsx";

export const AuthRoutes = [
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { index: true, element: <Register /> }, // ✅ Default route when site loads
      { path: 'login', element: <Login /> },
      
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'reset-password/:token', element: <ResetPassword /> },
    ],
  },
];
