export default function OrgProfileCard({ orgData }) {
  return (
    <div className="bg-white p-6 rounded shadow w-full text-center">
      <img
        src={orgData?.orgBanner || "/fallback-banner.jpg"}
        alt="Organization Banner"
        className="w-64 h-64 mx-auto object-cover"
      />
      <h2 className="mt-4 text-2xl font-bold text-gray-800">{orgData?.orgName}</h2>
    </div>
  );
}
