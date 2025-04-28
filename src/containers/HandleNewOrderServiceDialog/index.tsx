import { DialogHeader } from "@/components/TailwindDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/TailwindDialog";
import { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useGetCities } from "@/hooks/cities-sotypes/useGetCities";
import { useGetSoTypes } from "@/hooks/cities-sotypes/useGetSoTypes";
import { ServiceOrderFormOneSchema } from "@/dtos";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IMaskInput } from "react-imask";
import { useCreateOrderService } from "@/hooks/order-services/useCreateOrderService";
import toast from "react-hot-toast";
import { AuthContext } from "@/context/authContext";
import { citiesCoordinates } from "@/utils/citiesCoordernates";

export function generateLinkForm (company: string, osType: string){
  if ((company === "A C Q PEREIRA" || company === "A C Q Pereira") && osType === "A413") {
    return "https://forms.clickup.com/9013984055/f/8cmcytq-933/NMO50UG4OJ3DK26M6Z";
  } else if ((company === "A C Q PEREIRA" || company === "A C Q Pereira") && osType === "E401") {
    return "https://forms.clickup.com/9013984055/f/8cmcytq-1053/8PNEQ8LP7QZN1NBPSG";
  } else if ((company === "A C Q PEREIRA" || company === "A C Q Pereira") && (osType === "B438" || osType === "B437")) {
    return "https://forms.clickup.com/9013984055/f/8cmcytq-1093/H7BZPDG3F8N009BMJ4";
  } else if ((company === "G W M ARCANJO" || company === "G W M Arcanjo") && osType === "E401") {
    return "https://forms.clickup.com/9013984055/f/8cmcytq-1793/CBRR9N3YXI6H7O6KQV";
  } else if ((company === "G W M ARCANJO" || company === "G W M Arcanjo") && osType === "A413") {
    return "https://forms.clickup.com/9013984055/f/8cmcytq-1833/JQL876CJVHOGF38Q6J";
  } else if ((company === "G W M ARCANJO" || company === "G W M Arcanjo") && (osType === "B438" || osType === "B437")) {
    return "https://forms.clickup.com/9013984055/f/8cmcytq-1633/PIZ41V4UX8MZBBA51B";
  } else {
    return "Tipo G";
  }
  
}

export default function HandleNewOrderServiceDialog() {
  const [isOpen, setIsOpen] = useState<boolean>();
  const createOrderService = useCreateOrderService();
  const { data: cities } = useGetCities();
  const { data: osTypes } = useGetSoTypes();
  const { company } = useContext(AuthContext);

  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedOrderType, setSelectedOrderType] = useState<string>("");
  const [isValueVisible, setIsValueVisible] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors, isSubmitting, isValidating },
  } = useForm<ServiceOrderFormOneSchema>({
    resolver: zodResolver(ServiceOrderFormOneSchema),
    defaultValues: {
      company: company,
    },
  });

  useEffect(() => {
    setValue(
      "cep",
      citiesCoordinates.find(
        (city) =>
          city.name === cities?.find((city) => city.id === selectedCity)?.name
      )?.cep as string
    );
  }, [selectedCity]);

  useEffect(() => {
    if (selectedOrderType) {
      const selectedOsType = osTypes?.find(
        (osType) => osType.id === selectedOrderType
      );
      if (selectedOsType?.service_value === null) {
        setIsValueVisible(true);
      } else {
        setIsValueVisible(false);
        setValue("service_value", undefined);
        setValue("displacement_value", undefined);
      }
    } else {
      setIsValueVisible(false);
      setValue("service_value", undefined);
      setValue("displacement_value", undefined);
    }
  }, [selectedOrderType]);

  const handleClose = () => {
    setIsOpen(false);
    setValue("city", "");
    setValue("order_type", "");
    setValue("order_number", "");
    setValue("client_name", "");
    setValue("rgi_registration", "");
    setValue("service_value", undefined);
    setValue("displacement_value", undefined);
    setValue("opening_date", "");
    setValue("contact_name", "");
    setValue("contact_number", "");
    setValue("cep", "");
    setSelectedCity("");
    setSelectedOrderType("");
    setIsValueVisible(false);
  };

  const onSubmit = (data: ServiceOrderFormOneSchema) => {
    createOrderService.mutateAsync(data).then(() => {
      handleClose();
      toast.success("Ordem de serviço criada com sucesso!");
    });
  };

  console.log(watch("form_link"))

  useEffect(()=>{
    setValue("company", company)
    if (company && selectedOrderType && osTypes){
      const soType = osTypes.find((type)=>type.id===selectedOrderType)?.code as string
      setValue("form_link", generateLinkForm(company,soType))
    }
  },[company, selectedOrderType, osTypes, setValue])

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isModalOpen) => setIsOpen(isModalOpen)}
    >
      <DialogTrigger>
        <Button type="button" className="flex items-center">
          <p className="max-sm:hidden">Gerar Ordem de Serviço</p> <FaPlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-sm:!w-[400px] max-[500px]:!w-[300px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="max-[500px]:hidden">
          <h1 className="text-[1.5rem] text-secondary-color font-bold">
            Gerar Ordem de Serviço
          </h1>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-6"
        >
          <div className="w-full h-auto flex flex-col gap-[1rem]">
            <h1 className="font-bold text-[1.25rem] max-w-[80%]">
              Empresa selecionada: {company}
            </h1>
            <div className="flex justify-between items-center w-full max-[1200px]:flex-col max-[1200px]:justify-center">
              <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full max-[1200px]:mb-4">
                <Label>Cidade</Label>
                <Controller
                  control={control}
                  name="city"
                  render={({ field }) => (
                    <select
                      {...field}
                      value={selectedCity}
                      onChange={(e) => {
                        setSelectedCity(e.target.value);
                        field.onChange(e.target.value);
                      }}
                      className="focus:ring-0 focus:border-input outline-none w-full px-4 py-2 text-sm border border-input bg-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
                    >
                      <option value="" disabled>
                        Selecione uma cidade...
                      </option>
                      {cities?.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  )}
                />

                <p className="text-red-warning">{errors.city?.message}</p>
              </div>
              <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full">
                <Label>Tipo de O.S.</Label>
                <Controller
                  control={control}
                  name="order_type"
                  render={({ field }) => (
                    <select
                      {...field}
                      value={selectedOrderType}
                      onChange={(e) => {
                        setSelectedOrderType(e.target.value);
                        field.onChange(e.target.value);
                      }}
                      className="focus:ring-0 focus:border-input outline-none w-full px-4 py-2 text-sm border border-input bg-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
                    >
                      <option value="" disabled>
                        Tipo de O.S...
                      </option>
                      {osTypes?.map((osType) => (
                        <option key={osType.id} value={osType.id}>
                          {osType.code}
                        </option>
                      ))}
                    </select>
                  )}
                />

                <p className="text-red-warning">{errors.order_type?.message}</p>
              </div>
            </div>
            {isValueVisible && (
              <div className="flex justify-between items-center w-full max-[1200px]:flex-col max-[1200px]:justify-center">
                <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full max-[1200px]:mb-4">
                  <Label>Valor do Serviço</Label>
                  <Controller
                    control={control}
                    name="service_value"
                    render={({ field }) => (
                      <Input
                        required
                        {...field}
                        type="text" // <-- trocar para text
                        onChange={(e) => {
                          const rawValue = e.target.value.replace(",", ".");
                          const numericValue = parseFloat(rawValue);
                          field.onChange(
                            isNaN(numericValue) ? undefined : numericValue
                          );
                        }}
                        value={field.value ?? ""}
                        placeholder="..."
                      />
                    )}
                  />
                  <p className="text-red-warning">
                    {errors.service_value?.message}
                  </p>
                </div>
                <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full">
                  <Label>Valor do Deslocamento</Label>
                  <Controller
                    control={control}
                    name="displacement_value"
                    render={({ field }) => (
                      <Input
                        required
                        {...field}
                        type="text" // <-- trocar para text
                        onChange={(e) => {
                          const rawValue = e.target.value.replace(",", ".");
                          const numericValue = parseFloat(rawValue);
                          field.onChange(
                            isNaN(numericValue) ? undefined : numericValue
                          );
                        }}
                        value={field.value ?? ""}
                        placeholder="..."
                      />
                    )}
                  />
                  <p className="text-red-warning">
                    {errors.displacement_value?.message}
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center w-full max-[1200px]:flex-col max-[1200px]:justify-center">
              <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full max-[1200px]:mb-4">
                <Label>Número da O.S.</Label>
                <Input
                  type="text"
                  {...register("order_number")}
                  placeholder="Número da O.S..."
                />
                <p className="text-red-warning">
                  {errors.order_number?.message}
                </p>
              </div>
              <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full">
                <Label>Nome do cliente</Label>
                <Input
                  type="text"
                  {...register("client_name")}
                  placeholder="Nome do cliente..."
                />
                <p className="text-red-warning">
                  {errors.client_name?.message}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center w-full max-[1200px]:flex-col max-[1200px]:justify-center">
              <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full max-[1200px]:mb-4">
                <Label>Matrícula do RGI</Label>
                <Input
                  type="text"
                  {...register("rgi_registration")}
                  placeholder="Matrícula do RGI..."
                />
                <p className="text-red-warning">
                  {errors.rgi_registration?.message}
                </p>
              </div>
              <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full">
                <Label>Data de abertura</Label>
                <Controller
                  control={control}
                  name="opening_date"
                  render={({ field }) => (
                    <IMaskInput
                      {...field}
                      mask="00/00/0000"
                      placeholder="dd/mm/aaaa"
                      value={field.value || ""}
                      onAccept={(value) => field.onChange(value)}
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  )}
                />
                <p className="text-red-warning">
                  {errors.opening_date?.message}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center w-full max-[1200px]:flex-col max-[1200px]:justify-center">
              <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full max-[1200px]:mb-4">
                <Label>Nome do contato</Label>
                <Input
                  type="text"
                  {...register("contact_name")}
                  placeholder="Nome do contato..."
                />
                <p className="text-red-warning">
                  {errors.contact_name?.message}
                </p>
              </div>
              <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full">
                <Label>Número do Contato</Label>
                <Controller
                  control={control}
                  name="contact_number"
                  render={({ field }) => (
                    <IMaskInput
                      {...field}
                      mask="(00) 00000-0000"
                      placeholder="(00) 00000-0000"
                      value={field.value || ""}
                      onAccept={(value) => field.onChange(value)}
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  )}
                />
                <p className="text-red-warning">
                  {errors.contact_number?.message}
                </p>
              </div>
            </div>
            <div className="mt-4 w-full flex items-center justify-between">
              <Button
                type="button"
                variant={"outline"}
                onClick={() => handleClose()}
                className="w-[47%]"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                isLoading={isSubmitting || isValidating}
                className="w-[47%]"
              >
                Gerar
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
