export default function OrgAbout({ orgData }) {
  return (
    <div className="bg-white p-4 rounded shadow w-full md:w-1/3 text-sm space-y-2">
      <h3 className="text-primary font-semibold mb-2">About</h3>
      <p><strong>Name:</strong> {orgData?.orgName}</p>
      <p><strong>Email:</strong> {orgData?.orgEmail}</p>
      <p><strong>Phone:</strong> {orgData?.orgPhone}</p>
    </div>
  );
}
