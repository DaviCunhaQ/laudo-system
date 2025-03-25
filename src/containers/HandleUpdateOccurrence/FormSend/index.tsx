import { useMultiStep } from "@/context/Multistepper";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function FormSendUpdate() {
  const { setIsTriggedToast ,  goToPrevStep, FinalReqOccurrenceUpdate} =
    useMultiStep();
  const navigate = useNavigate();

  useEffect(() => {
    const toastId = toast.loading("Atualizando...");
      FinalReqOccurrenceUpdate()
        .then(() => {
          navigate("/");
          toast.success("Ocorrência atualizada com sucesso!")
          toast.dismiss(toastId);
        })
        .catch((error) => {
          toast.error("Erro ao atualizar ocorrência.");
          console.error(error);
          goToPrevStep();
        });
      
        setIsTriggedToast(false)
  }, []);

  return <></>;
}
