import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CustomSelect } from "@/components/navabar/CustomSelect.jsx";
const roles = [
  { id: "role1", name: "User" },
  { id: "role2", name: "Manager" },
  { id: "role3", name: "Support Agent" },
  { id: "role4", name: "Admin" },
  { id: "role5", name: "Guest" },
];

export default function SendInvitationDialog({
  open,
  onClose,
  onSend,
  onChange,
  disabled,
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-primary">Send Invitation</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={onSend}
          className="flex items-center gap-2 mt-2 "
        >
          <Input
            name="email"
            onChange={onChange}
            placeholder="Enter email"
            className="flex-1"
            required
          />
          <CustomSelect data={roles} />
          <Button type="submit" disabled={disabled}>
            Send
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
