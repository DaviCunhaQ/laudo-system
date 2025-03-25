import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaPlus } from "react-icons/fa";

export function TooltipNotVehicle() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            className="bg-main-color flex items-center cursor-not-allowed"
          >
            <p className="max-[470px]:hidden">Adicionar</p>
            <FaPlus />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Adicione pelo menos um veículo primeiro.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
