import { useState } from "react";
import SubHeader from "../../../Layouts/SubHeader.jsx" // Adjust path if different
import OrgAbout from "../components/OrgAbout.jsx";
import OrgHeader from "../components/OrgHeader.jsx";
import OrgProfileCard from "../components/OrgProfileCard.jsx";
import SendInvitationDialog from "../components/SendInvitationDialog.jsx";
const OrganisationProfile = () => {
    const [showInvite, setShowInvite] = useState(false);
  const [invitation, setInvitation] = useState("");
  const [disabled, setDisabled] = useState(false);

  const orgData = {
    orgName: "Cubicle Web",
    orgEmail: "info@cubicleweb.com",
    orgPhone: "123-456-7890",
    orgLogo: "/logo.png", // Placeholder
    orgBanner: "/banner.png", // Placeholder
  };
    const handleStatusChange = (value) => {
    console.log("Selected status:", value);
  };

  const handleChange = (e) => {
    setInvitation(e.target.value);
  };

  const handleSend = (e) => {
    e.preventDefault();
    setDisabled(true);
    // Handle submission logic here
    setTimeout(() => {
      setDisabled(false);
      setShowInvite(false);
    }, 1000);
  };

  // Optional: handler for dropdown change
 

  return (
 <>
      {/* SubHeader */}
      <SubHeader
        title="Organisation Profile"
        btnTitle="Create"
        btnLink="/organisation/create" // or pass setShowAdd if using modal
        handleSelected={handleStatusChange}
        />

      {/* Main content */}
   
    <div className="space-y-4 px-25 py-6">
      <OrgHeader orgData={orgData} onInviteClick={() => setShowInvite(true)} />
      <div className="flex flex-col md:flex-row gap-4">
        <OrgAbout orgData={orgData} />
        <OrgProfileCard orgData={orgData} />
      </div>
      <SendInvitationDialog
        open={showInvite}
        onClose={() => setShowInvite(false)}
        onSend={handleSend}
        onChange={handleChange}
        disabled={disabled}
        />
    </div>

    </>
   
  );
};

export default OrganisationProfile;
