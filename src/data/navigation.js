import {
  BriefcaseIcon,
  BuildingOfficeIcon,
  CogIcon,
  DocumentCheckIcon,
  HomeIcon,
  ListBulletIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: HomeIcon,
    privilege: "dashboard",
    roles: ["Manager", "Admin-Project", "Superadmin", "PIC-HR", "Assessor"],
  },
  {
    name: "Merchant",
    href: "/admin/merchant",
    icon: BriefcaseIcon,
    privilege: "merchant",
    roles: ["Manager", "Admin-Project", "Superadmin", "PIC-HR", "Assessor"],
  },
  {
    name: "Outlet",
    href: "/admin/outlet",
    icon: ListBulletIcon,
    privilege: "outlet",
    roles: ["Manager", "Admin-Project", "Superadmin", "PIC-HR", "Assessor"],
  },
];

export default navigation;
