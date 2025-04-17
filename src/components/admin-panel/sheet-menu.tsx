import { Link } from "react-router-dom";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/admin-panel/menu";
import Eng from "@/../public/icon-eng.svg";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import HandleSelectCompanyDialog from "@/containers/HandleSelectCompanyDialog";

export function SheetMenu() {
  const { company } = useContext(AuthContext);
  return (
    <>
      <HandleSelectCompanyDialog />
      <Sheet>
        <SheetTrigger className="lg:hidden" asChild>
          <Button className="h-8" variant="outline" size="icon">
            <MenuIcon size={20} />
          </Button>
        </SheetTrigger>
        <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
          <SheetHeader>
            <Button
              className="flex justify-center items-center pb-2 pt-1"
              variant="link"
              asChild
            >
              <Link to="/" className="flex flex-col items-center gap-2">
                <img src={Eng} className="h-10 w-10 mt-6" />
                <SheetTitle className="flex flex-col items-center font-medium text-sm text-background-color">
                  <p>Empresa: {company}</p>
                </SheetTitle>
              </Link>
            </Button>
          </SheetHeader>
          <Menu isOpen />
        </SheetContent>
      </Sheet>
    </>
  );
}
