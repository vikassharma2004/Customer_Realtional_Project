import ForYou from "../pages/ForYou.jsx";
import RecentPage from "../pages/Recent.jsx";
import Starred from "../pages/Starred.jsx";
import JiraLayout from "@/Layouts/JiraLayout.jsx";

export const JiraRoutes = [
  {
    path: "/:orgName/jira",
    element: <JiraLayout />,
    children: [
     
      {
        path: "for-you", // /:orgName/jira/for-you
        element: <ForYou />,
      },
      {
        path: "recent", // /:orgName/jira/for-you
        element: <RecentPage />,
      },
      {
        path: "starred", // /:orgName/jira/for-you
        element: <Starred />,
      },
      {
        path: "apps", // /:orgName/jira/for-you
        element: <Starred />,
      },
      {
        path: "plans", // /:orgName/jira/for-you
        element: <Starred />,
      },
      {
        path: "projects", // /:orgName/jira/for-you
        element: <Starred />,
      },{
        path: "teams", // /:orgName/jira/for-you
        element: <Starred />,
      },
    ],
      },
];

