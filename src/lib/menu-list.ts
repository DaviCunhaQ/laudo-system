import {
  LayoutGrid,
  LucideIcon,
  Users
} from "lucide-react";
import { useLocation } from "react-router-dom";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
  disabled?: boolean;
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(): Group[] {
  const location = useLocation()
  const role = localStorage.getItem("role")
  const finalList = [
    {
      groupLabel: "",
      menus: [
        {
          href: "/",
          label: "Início",
          icon: LayoutGrid,
          submenus: [],
          disabled: location.pathname === "/create"?true:false
        }
      ]
    },
  ];
  if (role === "Dev"){
    finalList[0].menus.push(
      {
        href: "/users",
        label: "Gestão de usuários",
        icon: Users,
        submenus: [],
        disabled: location.pathname === "/create"?true:false
      }
    )
  }
  return finalList
}
