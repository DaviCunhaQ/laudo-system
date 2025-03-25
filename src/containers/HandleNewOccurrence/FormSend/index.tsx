import { useMultiStep } from "@/context/Multistepper";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function FormSend() {
  const { goToPrevStep, FinalReqOccurenceCreate } =
    useMultiStep();
  const navigate = useNavigate();

  useEffect(() => {
    const toastId = toast.loading("Criando...");
    FinalReqOccurenceCreate()
    .then(() => {
      navigate("/");
      toast.success("Ocorrência criada com sucesso!");
      toast.dismiss(toastId);
    })
    .catch((error) => {
      toast.error("Erro ao criar ocorrência.");
      console.error(error);
      goToPrevStep();
    });
  }, []);

  return <></>;
}
