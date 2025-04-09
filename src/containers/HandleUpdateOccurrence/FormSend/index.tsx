import { useMultiStep } from "@/context/Multistepper";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function FormSendUpdate({id}: {id?: string}) {
  const { goToPrevStep, FinalReqOccurrenceUpdate } =
    useMultiStep();
  const navigate = useNavigate();

  useEffect(() => {
    const toastId = toast.loading("Atualizando...");
    FinalReqOccurrenceUpdate(id ? id : "")
    .then(() => {
      localStorage.removeItem('currentOsType')
      localStorage.removeItem('cityCoordinates')
      localStorage.removeItem('cityCep')
      navigate("/");
      toast.success("Ordem de serviço atualizada com sucesso!");
      toast.dismiss(toastId);
    })
    .catch((error) => {
      toast.error("Erro ao atualizar ordem de serviço.");
      console.error(error);
      goToPrevStep();
    });
  }, []);

  return <></>;
}
