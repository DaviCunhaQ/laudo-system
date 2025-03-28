import { Link } from "react-router-dom";
import { MenuIcon } from "lucide-react";
import Brasao from "@/assets/brasao-massape.png";
import LetrasBrasao from "@/assets/letras-brasao-massape.png";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/admin-panel/menu";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

export function SheetMenu() {
  return (
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
            <Link to="/" className="flex items-center gap-2">
              <img src={Brasao} className="w-10 h-10 mr-1" />
              <SheetTitle className="font-bold text-lg text-background-color">
                <img src={LetrasBrasao} className="h-12" />{" "}
              </SheetTitle>
            </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}
