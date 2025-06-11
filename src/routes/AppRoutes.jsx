import { AuthRoutes } from "../modules/auth/routes/AuthRoutes";
import { OrganisationRoutes } from "../modules/organisation/routes/OrganisationRoutes";
import { UserRoutes } from "@/modules/user/routes/UserRoutes";
import { JiraRoutes } from "../modules/Jira/routes/JiraRoutes";

export const allRoutes = [...AuthRoutes, ...OrganisationRoutes, ...UserRoutes, ...JiraRoutes];