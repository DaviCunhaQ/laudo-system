import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { CardContent } from "@/components/ui/card";
import { StepsHeader } from "../components/stepsheader";
import { AuthoritiesFormSchema, DriverAndVehicleSchema, LocationSchema, OccurrenceSchema, ParticipantFormSchema, UpdateAuthoritiesFormSchema, UpdateLocationSchema, UpdateParticipantFormSchema } from "@/dtos";
import { useCreateOccurrence } from "@/hooks/occurrence/useCreateOccurrence";
import { useCreateLocation } from "@/hooks/location/useCreateLocation";
import { useCreateParticipant } from "@/hooks/participants/useCreateParticipant";
import { useCreateAuthority } from "@/hooks/authorities/useCreateAuthority";
import { useCreateVehicles } from "@/hooks/drivers_and_vehicles/useCreateVehicles";
import { useCreateDrivers } from "@/hooks/drivers_and_vehicles/useCreateDrivers";
import { useUpdateOccurrence } from "@/hooks/occurrence/useUpdateOccurrence";
import { useUpdateLocation } from "@/hooks/location/useUpdateLocation";
// import { useLocation } from "react-router-dom";

// 📌 Tipos dos dados do formulário
type FormData = {
  form1?: OccurrenceSchema;
  form2?: LocationSchema;
  form3?: DriverAndVehicleSchema;
  form4?: ParticipantFormSchema;
  form5?: AuthoritiesFormSchema;
};

type FormDataUpdate = {
  form1?: OccurrenceSchema;
  form2?: UpdateLocationSchema;
  form3?: DriverAndVehicleSchema;
  form4?: UpdateParticipantFormSchema;
  form5?: UpdateAuthoritiesFormSchema;
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
  FinalReqOccurrenceUpdate: () => Promise<void>;
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
  const createOccurrence = useCreateOccurrence()
  const createLocation = useCreateLocation()
  const createVehicles = useCreateVehicles()
  const createDrivers = useCreateDrivers()
  const createParticipants = useCreateParticipant()
  const createAuthority = useCreateAuthority()
  const updateOccurrence = useUpdateOccurrence()
  const updateLocation = useUpdateLocation()

  const saveDrafts = useCallback(() => {
    if (formData.form1 && !formData.form5) {
      localStorage.setItem('draftFormData', JSON.stringify(formData));
    }
  }, [formData]);

  const FinalReqOccurenceCreate = async () => {
    try {
      const form1 = formData.form1;
      const form2 = formData.form2;
      const form3 = formData.form3;
      const form4 = formData.form4;
      const form5 = formData.form5;
  
      if (form1 && form2 && form3 && form4 && form5) {
  
        // Executa as requisições em sequência
        await createOccurrence.mutateAsync(form1);
        await createLocation.mutateAsync(form2);

        if (form3.vehicles && (form3.vehicles?.length !== 0) ) {
          await createVehicles.mutateAsync(form3.vehicles);
        }

        if (form3.drivers && (form3.drivers?.length !== 0) ) {
          await createDrivers.mutateAsync(form3.drivers);
        }

        if (form4 && (form4.participants?.length !== 0) ) {
          await createParticipants.mutateAsync(form4);
        }

        if (form5 && (form5.authorities?.length !== 0) ) {
          await createAuthority.mutateAsync(form5);
        }
        localStorage.removeItem("isCreating")
      } else {
        console.error("Formulário incompleto:", formData);
      }
    } catch (error) {
      console.error("Erro ao criar ocorrência:", error);
      throw error; // Propaga o erro para ser capturado pelo `catch` do `useEffect`
    }
  };

  const FinalReqOccurrenceUpdate = async () => {
    try {
      const form1 = formDataUpdate.form1;
      const form2 = formDataUpdate.form2;
  
      if (form1 && form2) {
  
        // Executa as requisições em sequência
        await updateOccurrence.mutateAsync(form1);
        await updateLocation.mutateAsync(form2);
      } else {
        console.error("Formulário incompleto:", formData);
      }
    } catch (error) {
      console.error("Erro ao criar ocorrência:", error);
      throw error; // Propaga o erro para ser capturado pelo `catch` do `useEffect`
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