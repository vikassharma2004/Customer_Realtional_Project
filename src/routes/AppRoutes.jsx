import { AuthRoutes } from "../modules/auth/routes/AuthRoutes";
import { OrganisationRoutes } from "../modules/organisation/routes/OrganisationRoutes";

export const allRoutes = [...AuthRoutes, ...OrganisationRoutes];