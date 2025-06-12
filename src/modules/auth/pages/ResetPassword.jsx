import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../../store/AuthStore.js";
const ResetPassword = () => {
  const { resetPassword } = useAuthStore();
  const { token } = useParams();
  console.log(token);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    let password = newPassword;
    await resetPassword(token, password);
    // Call your reset API logic here
    console.log("New Password:", newPassword);
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Set New Password</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="new-password" className={"text-sm font-medium mb-4"}>
            New Password
          </Label>
          <Input
            id="new-password"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <Label
            htmlFor="confirm-password"
            className={"text-sm font-medium mb-4"}
          >
            Confirm Password
          </Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="Re-enter new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-600">
          Reset Password
        </Button>
      </form>
    </>
  );
};

export default ResetPassword;
