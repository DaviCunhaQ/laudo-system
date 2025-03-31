import { AuthContext } from "@/context/authContext";
import { useContext } from "react";
import Github from "@/../public/git.svg";

export function Footer() {
  const {company} = useContext(AuthContext)
  return (
    <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 md:mx-8 flex h-14 items-center justify-between">
        <p className="text-xs md:text-sm leading-loose text-muted-foreground text-left">
          Sistema de Ordens de Serviço - Empresa: {company}
        </p>
        <a href="https://github.com/DaviCunhaQ" target="_blank" className="hover:cursor-pointer flex items-center gap-3 text-muted-foreground">
          <p className="text-xs md:text-sm leading-loose text-muted-foreground text-left">
            Feito por: DaviCunhaQ 
          </p>
          <img src={Github} alt="github" className="text-muted-foreground h-5" />
        </a>
      </div>
    </div>
  );
}
