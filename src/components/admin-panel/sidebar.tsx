"use client";
import { Menu } from "@/components/admin-panel/menu";
import { SidebarToggle } from "@/components/admin-panel/sidebar-toggle";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import Eng from '@/../public/icon-eng.svg'
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";

export function Sidebar() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;
  const {company , setIsOpenCompany} = useContext(AuthContext)
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        !getOpenState() ? "w-[90px]" : "w-72",
        settings.disabled && "hidden"
      )}
      style={{ zIndex: 2000 }}
    >
      <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800"
      >
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            !getOpenState() ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <img src={Eng} className="h-10 w-10" />
            </Link>
            <div
              className={`text-background-color font-normal text-[12px] whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300 ${!getOpenState() ? `-translate-x-96 opacity-0 hidden`: `translate-x-0 opacity-100`}`}
            >
              <p>Empresa selecionada: {company}</p>
              <a className="underline cursor-pointer" onClick={()=>setIsOpenCompany(true)}>
                Trocar empresa
              </a>
            </div>
          </div>
        </Button>
        <Menu isOpen={getOpenState()} />
      </div>
    </aside>
  );
}
