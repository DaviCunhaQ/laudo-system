import {
  LayoutGrid,
  LucideIcon,
  NotepadText
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
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/",
          label: "Início",
          icon: LayoutGrid,
          submenus: [],
          disabled: location.pathname === "/create"?true:false
        },
        {
          href: "/drafts",
          label: "Rascunhos",
          icon: NotepadText,
          submenus: [],
          disabled: location.pathname === "/create"?true:false
        }
      ]
    },
    // {
    //   groupLabel: "Contents",
    //   menus: [
    //     {
    //       href: "",
    //       label: "Posts",
    //       icon: SquarePen,
    //       submenus: [
    //         {
    //           href: "/posts",
    //           label: "All Posts"
    //         },
    //         {
    //           href: "/posts/new",
    //           label: "New Post"
    //         }
    //       ]
    //     },
    //     {
    //       href: "/categories",
    //       label: "Categories",
    //       icon: Bookmark
    //     },
    //     {
    //       href: "/tags",
    //       label: "Tags",
    //       icon: Tag
    //     }
    //   ]
    // },
    // {
    //   groupLabel: "Settings",
    //   menus: [
    //     {
    //       href: "/users",
    //       label: "Users",
    //       icon: Users
    //     },
    //     {
    //       href: "/account",
    //       label: "Account",
    //       icon: Settings
    //     }
    //   ]
    // }
  ];
}
