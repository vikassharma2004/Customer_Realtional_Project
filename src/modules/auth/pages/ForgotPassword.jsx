import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/AuthStore";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { forgotPassword , loading } = useAuthStore();

  const handleSubmit = async (e)=> {
    e.preventDefault();
  await forgotPassword(email);
    console.log("Reset email sent to:", email);
    
  };

  return (
  
     <>
        <p className="text-sm text-gray-500 mb-6">
          Enter your email address to receive reset instructions.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="email" className={"text-sm font-medium mb-4"}>Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              />
          </div>
          <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-600" disabled={loading}>
            {loading ? "Sending..." : "Reset Password"}
          </Button>
        </form>
              </>
     
  );
};

export default ForgotPassword;
