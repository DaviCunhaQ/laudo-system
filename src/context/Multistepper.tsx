import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { CardContent } from "@/components/ui/card";
import { StepsHeader } from "../components/stepsheader";
import { ServiceOrderFormOneSchema, ServiceOrderFormThreeSchema, ServiceOrderFormTwoSchema } from "@/dtos";
import { useCreateOrderService } from "@/hooks/order-services/useCreateOrderService";
import { AuthContext } from "./authContext";
import { useUpdateOrderService } from "@/hooks/order-services/useUpdateOrderService";
// import { useLocation } from "react-router-dom";

// 📌 Tipos dos dados do formulário
type FormData = {
  form1?: ServiceOrderFormOneSchema;
  form2?: ServiceOrderFormTwoSchema;
  form3?: ServiceOrderFormThreeSchema;
};

type FormDataUpdate = {
  form1?: ServiceOrderFormOneSchema;
  form2?: ServiceOrderFormTwoSchema;
  form3?: ServiceOrderFormThreeSchema;
};

// 📌 Tipos do contexto
type MultiStepContextType = {
  formData: FormData;
  formDataUpdate: FormDataUpdate;
  setFormValue: (formKey: keyof FormData, data: any) => void;
  setFormValueUpdate: (formKey: keyof FormDataUpdate, data: any) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  reset: () => void;
  canGoToNextStep: boolean;
  canGoToPrevStep: boolean;
  setStep: (step: number | ((step: number) => number)) => void;
  currentStep: number;
  FinalReqOccurenceCreate: () => Promise<void>;
  FinalReqOccurrenceUpdate: (id: string) => Promise<void>;
  setIsTriggedToast: React.Dispatch<React.SetStateAction<boolean>>;
  isTriggedToast: boolean;
};

// 📌 Criando o contexto
const MultiStepContext = createContext<MultiStepContextType | null>(null);

// 📌 Hook para acessar o contexto com segurança
export function useMultiStep(): MultiStepContextType {
  const context = useContext(MultiStepContext);
  if (!context) {
    throw new Error("useMultiStep must be used within a MultiStepProvider");
  }
  return context;
}

// 📌 Provider que gerencia os passos + valores do formulário
export function MultiStepProvider({ children }: { children: ReactNode }) {
  const maxStep = Array.isArray(children) ? children.length : 1;
  const [isTriggedToast , setIsTriggedToast] = useState<boolean>(false)
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({});
  const [formDataUpdate, setFormDataUpdate] = useState<FormDataUpdate>({});
  const createOrderService = useCreateOrderService()
  const updateOrderService = useUpdateOrderService()
  const {company} = useContext(AuthContext)

  const saveDrafts = useCallback(() => {
    if (formData.form1 && !formData.form3) {
      localStorage.setItem('draftFormData', JSON.stringify(formData));
    }
  }, [formData]);

  const FinalReqOccurenceCreate = async () => {
    try {
      const form1 = formData.form1;
      const form2 = formData.form2;
      const form3 = formData.form3;
  
      if (form1 && form2 && form3) {
        const {displacement_value: displacement, service_value: service , ...rest} = form1
        const displacement_value = displacement ? Number(displacement) : undefined
        const service_value = service ? Number(service) : undefined
        await createOrderService.mutateAsync({
          company,
          displacement_value,
          service_value,
          ...rest,
          ...form2,
          ...form3
        });
        localStorage.removeItem("isCreating")
      } else {
        console.error("Formulário incompleto:", formData);
      }
    } catch (error) {
      console.error("Erro ao criar ordem de serviço:", error);
      throw error; 
    }
  };

  const FinalReqOccurrenceUpdate = async (id: string) => {
    try {
      const form1 = formDataUpdate.form1;
      const form2 = formDataUpdate.form2;
      const form3 = formDataUpdate.form3;
  
      if (form1 && form2 && form3) {
        const {displacement_value: displacement, service_value: service , ...rest} = form1
        const displacement_value = displacement ? Number(displacement) : undefined
        const service_value = service ? Number(service) : undefined
        await updateOrderService.mutateAsync({
          id,
          company,
          displacement_value,
          service_value,
          ...rest,
          ...form2,
          ...form3
        });
        localStorage.removeItem("isCreating")
      } else {
        console.error("Formulário incompleto:", formDataUpdate);
      }
    } catch (error) {
      console.error("Erro ao atualizar ordem de serviço:", error);
      throw error; 
    }
  };
  

  // 📌 Define os valores do formulário
  const setFormValue = (formKey: keyof FormData, data: any) => {
    setFormData((prev) => ({ ...prev, [formKey]: data }));
  };

  const setFormValueUpdate = (formKey: keyof FormDataUpdate, data: any) => {
    setFormDataUpdate((prev) => ({ ...prev, [formKey]: data }));
  };

  // 📌 Controle de navegação
  const canGoToNextStep = currentStep < maxStep;
  const canGoToPrevStep = currentStep > 1;

  const setStep = useCallback((step: number | ((step: number) => number)) => {
    setCurrentStep((prev) => {
      const newStep = typeof step === "function" ? step(prev) : step;
      return newStep >= 1 && newStep <= maxStep ? newStep : prev;
    });
  }, [maxStep]);

  const goToNextStep = useCallback(() => {
    setStep((step) => step + 1);
  }, [setStep]);

  const goToPrevStep = useCallback(() => {
    setStep((step) => step - 1);
  }, [setStep]);

  const reset = useCallback(() => {
    setStep(1);
    setFormData({});
  }, [setStep]);

  useEffect(() => {

    // Adiciona um evento de salvamento do rascunho quando houver um evento inesperado
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      console.log(event)
      saveDrafts();
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [saveDrafts]);

  return (
    <MultiStepContext.Provider
      value={{
        formData,
        setFormValue,
        goToNextStep,
        goToPrevStep,
        canGoToNextStep,
        canGoToPrevStep,
        setStep,
        reset,
        currentStep,
        FinalReqOccurenceCreate,
        FinalReqOccurrenceUpdate,
        setFormValueUpdate,
        formDataUpdate,
        setIsTriggedToast,
        isTriggedToast
      }}
    >
      <StepsHeader className="p-10" />
      {Array.isArray(children) &&
        children.map((child, index) => {
          if (index + 1 === currentStep && child) {
            return <CardContent key={index}>{child}</CardContent>;
          }
          return null;
        })}
    </MultiStepContext.Provider>
  );
}