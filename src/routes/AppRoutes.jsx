import { FirmRoutes } from "@/modules/Firms/routes/FirmRoutes";
import { AuthRoutes } from "../modules/auth/routes/AuthRoutes";
import { OrganisationRoutes } from "../modules/organisation/routes/OrganisationRoutes";
import { UserRoutes } from "@/modules/user/routes/UserRoutes";
import { LeadRoutes } from "@/modules/Leads/routes/LeadRoutes";
import { InvoicesRoutes } from "@/modules/Invoices/routes/InvoicesRoutes";

export const allRoutes = [...AuthRoutes, ...OrganisationRoutes, ...UserRoutes, ...FirmRoutes, ...LeadRoutes, ...InvoicesRoutes];