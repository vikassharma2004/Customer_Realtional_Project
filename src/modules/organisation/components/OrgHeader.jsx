import { Button } from "@/components/ui/button";
import SendIcon from '@mui/icons-material/Send';

export default function OrgHeader({ orgData, onInviteClick }) {
  return (
    <div className="w-full flex justify-between items-center bg-white p-4 rounded shadow">
      <div className="flex items-center space-x-4">
        <img
          src={orgData?.orgLogo || "/default-logo.png"}
          alt="Org Logo"
          className="w-16 h-16 rounded-full border-4 border-white"
        />
        <div className="text-lg font-semibold text-gray-800">{orgData?.orgName}</div>
      </div>
      <Button onClick={onInviteClick} variant="outline" className="gap-2 px-10 py-5 outline-none border-blue-200  text-blue-500">
        <SendIcon className="w-4 h-4 " />
        Send Invitation
      </Button>
    </div>
  );
}
