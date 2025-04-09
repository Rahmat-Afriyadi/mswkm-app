import {
  BriefcaseIcon,
  BuildingOfficeIcon,
  CogIcon,
  DocumentCheckIcon,
  HomeIcon,
  ListBulletIcon,
  UsersIcon,
  UserGroupIcon,
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
  {
    name: "User",
    href: "/admin/user",
    icon: UsersIcon,
    privilege: "user",
    roles: ["Manager", "Admin-Project", "Superadmin", "PIC-HR", "Assessor"],
  },
  {
    name: "Role",
    href: "/admin/role",
    icon: UserGroupIcon,
    privilege: "role",
    roles: ["Manager", "Admin-Project", "Superadmin", "PIC-HR", "Assessor"],
  },
];

export default navigation;
