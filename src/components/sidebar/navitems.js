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
import LogoutIcon from "@mui/icons-material/Logout";


export const navItems = [
  {
    id: "dashboard",
    icon: DashboardIcon,
    text: "Dashboard",
    to: "/dashboard",
  },
  {
    id: "users",
    icon: GroupIcon,
    text: "Users",
    to: "/users",
  },
  {
    id: "jobs",
    icon: WorkIcon,
    text: "Jobs",
    to: "/jobs",
    alert: true,
  },
  {
    id: "reports",
    icon: DescriptionIcon,
    text: "Reports",
    to: "/reports",
  },
  {
    id: "marketplace",
    icon: StoreIcon,
    text: "Marketplace",
    to: "/marketplace",
  },
  {
    id: "analytics",
    icon: BarChartIcon,
    text: "Analytics",
    to: "/analytics",
  },
  {
    id: "invoices",
    icon: ReceiptLongIcon,
    text: "Invoices",
    to: "/invoices",
  },
  {
    id: "orders",
    icon: ShoppingCartIcon,
    text: "Orders",
    to: "/orders",
  },
 
  {
    id: "new-user",
    icon: PersonAddIcon,
    text: "New User",
    to: "/new-user",
  },
  {
    id: "settings",
    icon: SettingsIcon,
    text: "Settings",
    to: "/settings",
  },
  {
    id: "logout",
    icon: LogoutIcon,
    text: "Logout",
    to: "/logout",
  },
];
