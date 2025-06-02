import AddOrganisation from "../pages/AddOrganisation.jsx";
import OrganisationDashboard from "../pages/OrganisationDashboard.jsx";
import OrganisationPage from "../pages/OrganisationPage.jsx";
import MainLayout from "../../../Layouts/MainLayout.jsx";
import OrganisationProfile from "../pages/OrganisationProfile.jsx"
import YourOrganisation from "../pages/YourOrganisation.jsx";

export const OrganisationRoutes = [
  {
    path: "/:orgName/organisation",
    element: <MainLayout />,
    children: [
     
      {
        path: "add-organisation", // /:orgName/organization/add-organization
        element: <AddOrganisation />,
      },
         {
        path: "Your-organisation", // /:orgName/organization/add-organization
        element: <YourOrganisation />,
      },
      {
        path: "dashboard", // optional separate dashboard route
        element: <OrganisationDashboard />,
      },
      {
        path: "update-organisation/:id", // /:orgName/organization/:id
        element: <OrganisationPage />,
      },
      {
        path: "organisation-profile/:id", // /:orgName/organization/:id
        element: <OrganisationProfile />,
      },
    ],
  },
];

