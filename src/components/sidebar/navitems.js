// navItems.js
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import WorkIcon from "@mui/icons-material/Work";
import DescriptionIcon from "@mui/icons-material/Description";
import StoreIcon from "@mui/icons-material/Store";
import BarChartIcon from "@mui/icons-material/BarChart";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import BusinessIcon from "@mui/icons-material/Business";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useAuthStore } from "../../store/AuthStore.js";

export const getNavItems = () => {
  const { orgName = "", orgId = "" } = useAuthStore.getState().currentOrg || {};
console.log("orgName at getNavItems", orgName);
console.log("orgId at getNavItems", orgId);

  const orgPath = (module) => `/${orgName}/${module}`;

  return [
    {
      id: "dashboard",
      icon: DashboardIcon,
      text: "Dashboard",
      to: `/${orgName}/dashboard`,
    },
    {
      id: "users",
      icon: GroupIcon,
      text: "Users",
      submenu: true,
      children: [
        {
          id: "manage-users",
          icon: ManageAccountsIcon,
          text: "Manage Users",
          to: `${orgPath("organisation/users")}/manage`,
        },
      ],
    },
    {
      id: "organizations",
      icon: BusinessIcon,
      text: "Organizations",
      submenu: true,
      children: [
        {
          id: "manage-orgs",
          icon: BusinessIcon,
          text: "Your Organizations",
          to: `${orgPath("organisation")}/manage`,
        },
        {
          id: "create-org",
          icon: PersonAddIcon,
          text: "Create Organization",
          to: `${orgPath("organisation")}/add-organisation`,
        },
        {
          id: "org-profile",
          icon: AssignmentIndIcon,
          text: "Organization Profile",
          to: `${orgPath("organisation-profile")}/${orgId}`,
        },
      ],
    },
    {
      id: "clients",
      icon: GroupIcon,
      text: "Clients",
      to: `${orgPath("clients")}`,
    },
    {
      id: "leads",
      icon: BarChartIcon,
      text: "Leads",
      to: `${orgPath("leads")}`,
    },
    {
      id: "firms",
      icon: WorkIcon,
      text: "Firms",
      to: `${orgPath("firms")}`,
    },
    {
      id: "vendors",
      icon: StoreIcon,
      text: "Vendors",
      to: `${orgPath("vendors")}`,
    },
    {
      id: "purchase",
      icon: ShoppingCartIcon,
      text: "Purchase",
      to: `${orgPath("purchase")}`,
    },
    {
      id: "invoices",
      icon: ReceiptLongIcon,
      text: "Invoices",
      to: `${orgPath("invoices")}`,
    },
    {
      id: "tax",
      icon: DescriptionIcon,
      text: "Tax",
      to: `${orgPath("tax")}`,
    },
    {
      id: "profile",
      icon: AccountCircleIcon,
      text: "User Profile",
      submenu: true,
      children: [
        {
          id: "edit-profile",
          icon: AssignmentIndIcon,
          text: "Edit Profile",
          to: "/user/profile/edit",
        },
        {
          id: "view-profile",
          icon: AssignmentIndIcon,
          text: "View Profile",
          to: "/user/profile/view",
        },
      ],
    },
    {
      id: "settings",
      icon: SettingsIcon,
      text: "Settings",
      submenu: true,
      children: [
        {
          id: "add-user",
          icon: PersonAddIcon,
          text: "Add User",
          to: `${orgPath("settings")}/add-user`,
        },
        {
          id: "roles-permissions",
          icon: PersonAddIcon,
          text: "Roles & Permissions",
          to: `${orgPath("settings")}/roles-permissions`,
        },
      ],
    },
  ];
};
