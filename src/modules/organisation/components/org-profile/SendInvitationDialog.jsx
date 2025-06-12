import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useOrgStore from "../../../../store/orgStore.js";
import { LoaderPinwheel } from "lucide-react";


// Roles Enum
const ROLES = {
  MANAGER: "Manager",
  SUPPORT_AGENT: "SupportAgent",
  USER: "User",
};

const roles = [
  { id: "role1", name: ROLES.USER },
  { id: "role2", name: ROLES.MANAGER },
  { id: "role3", name: ROLES.SUPPORT_AGENT },
];

export default function SendInvitationDialog({
  open,
  onClose,
  setShowInvite,
  setDisabled,
  disabled,
}) {
  const { createInvite } = useOrgStore();
  const [selectedRole, setSelectedRole] = useState("");
  const [email, setEmail] = useState("");

  const handleSendInvitation = async (e) => {
    e.preventDefault();

    if (!email || !selectedRole) return;

    try {
      setDisabled(true);
      let data={
        email:email,
        role:selectedRole
      }
     
      // Replace this URL with your actual API endpoint
      await createInvite(data);

      // Reset fields
      setEmail("");
      setSelectedRole("");

      // Close dialog
      setShowInvite(false);
    } catch (error) {
      console.error("Error sending invitation:", error);
      // Optionally show toast or error message
    } finally {
      setDisabled(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-primary">Send Invitation</DialogTitle>
          <DialogDescription>
            Enter the user's email and assign a role to send the invitation.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSendInvitation}
          className="flex flex-col gap-4 mt-2 w-full"
        >
          {/* Email input */}
          <Input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />

          {/* Role selection */}
          <div className="flex flex-wrap gap-3">
            {roles.map((role) => (
              <button
                type="button"
                key={role.id}
                onClick={() => setSelectedRole(role.name)}
                className={`px-4 py-2 rounded border text-sm font-medium ${
                  selectedRole === role.name
                    ? "bg-primary text-white"
                    : "bg-white text-black border-gray-300"
                }`}
              >
                {role.name}
              </button>
            ))}
          </div>

          {/* Submit button */}
          <div className="flex justify-end">
            <Button type="submit" disabled={disabled}>
             {disabled ? <LoaderPinwheel  className="w-5 h-5 mr-2 animate-spin"/> : "Send"} 
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
