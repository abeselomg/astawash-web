import { MdDashboard } from "react-icons/md";
import { CiUser, CiMail, CiCircleInfo, CiSettings } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";
import { IconBaseProps, IconType } from "react-icons";
import { PiCarSimple, PiIdentificationBadge } from "react-icons/pi";
interface MenuItem {
  name: string;
  link: string;
  icon: IconBaseProps;
}
const iconProps: IconBaseProps = {
  style: { fontSize: "26px" },
};
export const adminmenu: Array<MenuItem> = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: <MdDashboard {...iconProps} />,
  },
  {
    name: "Cars",
    link: "/cars",
    icon: <PiCarSimple {...iconProps} />,
  },
  {
    name: "Driver Licenses",
    link: "/driver-license",
    icon: <PiIdentificationBadge {...iconProps} />,
  },
  {
    name: "Drivers",
    link: "/drivers",
    icon: <CiUser {...iconProps} />,
  },
  // {
  //   name: "Mailbox",
  //   link: "/admin-dashboard",
  //   icon: <CiMail {...iconProps} />,
  // },
  // {
  //   name: "Support",
  //   link: "/admin-dashboard",
  //   icon: <CiCircleInfo {...iconProps} />,
  // },
  // {
  //   name: "Settings",
  //   link: "/admin-dashboard",
  //   icon: <CiSettings {...iconProps} />,
  // },
  {
    name: "Logout",
    link: "/logout",
    icon: <AiOutlineLogout {...iconProps} />,
  },
];

export const adminroutes: Array<string> = [
  "/admin-dashboard",
  "/file-managment",
  "/access-requests",
  "/users",
  "/customer",
  "/all-customers",
];
