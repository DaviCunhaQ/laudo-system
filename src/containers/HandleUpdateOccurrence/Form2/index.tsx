import Loading from "@/components/icons/loading";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMultiStep } from "@/context/Multistepper";
import { ServiceOrderFormTwoSchema, ServiceOrderListSchema } from "@/dtos";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { 
  pciVerificationsOptions , 
  artPciVerificationOptions , 
  artRegistrationCompareOptions , 
  decRegistrationCompareOptions , 
  documentOptions , 
  dwellRegistrationOptions , 
  mandatoryDocumentBOptions , 
  minimalDocumentOptions , 
  moreAccurateOptions , 
  plsVerificationsOptions , 
  projectPermitVerificationOptions
 } from "@/utils/allOptions";

export default function Form2Update({ data }: { data?: ServiceOrderListSchema }) {
  const {
    goToNextStep,
    canGoToPrevStep,
    goToPrevStep,
    canGoToNextStep,
    currentStep,
    formDataUpdate,
    setFormValueUpdate,
  } = useMultiStep();
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>(formDataUpdate.form2?.property_type ? formDataUpdate.form2.property_type as string : (data?.property_type? data.property_type as string : ''))
  const [selectedPropertyStatus, setSelectedPropertyStatus] = useState<string>(formDataUpdate.form2?.property_status ? formDataUpdate.form2.property_status as string : (data?.property_status? data.property_status as string : ''))
  const [selectedRegistrationOnSystem, setSelectedRegistrationOnSystem] = useState<string>(formDataUpdate.form2?.registration_on_system ? formDataUpdate.form2.registration_on_system as string : (data?.registration_on_system? data.registration_on_system as string : ''))
  const [selectedSiopiCoincides, setSelectedSiopiCoincides] = useState<string>(formDataUpdate.form2?.siopi_coincides ? formDataUpdate.form2.siopi_coincides as string : (data?.siopi_coincides? data.siopi_coincides as string : ''))
  const [selectedRegistrationType, setSelectedRegistrationType] = useState<string>(formDataUpdate.form2?.registration_type ? formDataUpdate.form2.registration_type as string : (data?.registration_type? data.registration_type as string : ''))
  const [soType, setSoType] = useState<string>("")
  const onlyNumbers = (value: string) => value.replace(/\D/g, "");
  const formatCpfCnpj = (value: string) => {
    const numbers = onlyNumbers(value);

    if (numbers.length <= 11) {
      // Formata como CPF
      return numbers
        .replace(/^(\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1-$2")
        .slice(0, 14);
    } else {
      // Formata como CNPJ
      return numbers
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .slice(0, 18);
    }
  };

  useEffect(() => {
    const soType = localStorage.getItem("currentOsType")
    if(soType) {
      setSoType(soType)
    }
  },[])
  // const createLocation = useCreateLocation()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ServiceOrderFormTwoSchema>({
    resolver: zodResolver(ServiceOrderFormTwoSchema),
    defaultValues: {
      art_registration_compare: formDataUpdate.form2?.art_registration_compare ? formDataUpdate.form2.art_registration_compare : data?.art_registration_compare ? data.art_registration_compare : undefined,
      dec_registration_compare: formDataUpdate.form2?.dec_registration_compare ? formDataUpdate.form2.dec_registration_compare : data?.dec_registration_compare ? data.dec_registration_compare : undefined,
      dwell_registration_compare: formDataUpdate.form2?.dwell_registration_compare ? formDataUpdate.form2.dwell_registration_compare : data?.dwell_registration_compare ? data.dwell_registration_compare : undefined,
      mandatory_documents: formDataUpdate.form2?.mandatory_documents ? formDataUpdate.form2.mandatory_documents : data?.mandatory_documents ? data.mandatory_documents : undefined,
      pls_verifications: formDataUpdate.form2?.pls_verifications ? formDataUpdate.form2.pls_verifications : data?.pls_verifications ? data.pls_verifications : undefined,
      pls_built_situation: formDataUpdate.form2?.pls_built_situation ? formDataUpdate.form2.pls_built_situation : data?.pls_built_situation ? data.pls_built_situation : "",
      property_status: formDataUpdate.form2?.property_status ? formDataUpdate.form2.property_status : data?.property_status ? data.property_status : "",
      property_type: formDataUpdate.form2?.property_type ? formDataUpdate.form2.property_type : data?.property_type ? data.property_type : "",
      registration_date: formDataUpdate.form2?.registration_date ? formDataUpdate.form2.registration_date : data?.registration_date ? data.registration_date : "",
      registration_on_system: formDataUpdate.form2?.registration_on_system ? formDataUpdate.form2.registration_on_system : data?.registration_on_system ? data.registration_on_system : "",
      registration_type: formDataUpdate.form2?.registration_type ? formDataUpdate.form2.registration_type : data?.registration_type ? data.registration_type : "",
      siopi_coincides: formDataUpdate.form2?.siopi_coincides ? formDataUpdate.form2.siopi_coincides : data?.siopi_coincides ? data.siopi_coincides : "",
      averbation_exists: formDataUpdate.form2?.averbation_exists ? formDataUpdate.form2.averbation_exists : data?.averbation_exists ? data.averbation_exists : undefined,
      built_area_presents: formDataUpdate.form2?.built_area_presents ? formDataUpdate.form2.built_area_presents : data?.built_area_presents ? data.built_area_presents : "",
      minimal_documentation: formDataUpdate.form2?.minimal_documentation ? formDataUpdate.form2.minimal_documentation : data?.minimal_documentation ? data.minimal_documentation : undefined,
      pci_verifications: formDataUpdate.form2?.pci_verifications ? formDataUpdate.form2.pci_verifications : data?.pci_verifications ? data.pci_verifications : undefined,
      pci_art_compare: formDataUpdate.form2?.pci_art_compare ? formDataUpdate.form2.pci_art_compare : data?.pci_art_compare ? data.pci_art_compare : undefined,
      project_permit_verifications: formDataUpdate.form2?.project_permit_verifications ? formDataUpdate.form2.project_permit_verifications : data?.project_permit_verifications ? data.project_permit_verifications : undefined,
      built_area: formDataUpdate.form2?.built_area ? formDataUpdate.form2.built_area : data?.built_area ? data.built_area : undefined,
      terrain_area: formDataUpdate.form2?.terrain_area ? formDataUpdate.form2.terrain_area : data?.terrain_area ? data.terrain_area : undefined,
      rooms_number: formDataUpdate.form2?.rooms_number ? formDataUpdate.form2.rooms_number : data?.rooms_number ? data.rooms_number : undefined,
      bathrooms_number: formDataUpdate.form2?.bathrooms_number ? formDataUpdate.form2.bathrooms_number : data?.bathrooms_number ? data.bathrooms_number : undefined,
      cpf: formDataUpdate.form2?.cpf ? formDataUpdate.form2.cpf : data?.cpf ? data.cpf : "",
      cnpj: formDataUpdate.form2?.cnpj ? formDataUpdate.form2.cnpj : data?.cnpj ? data.cnpj : "",
      total_measured: formDataUpdate.form2?.total_measured ? formDataUpdate.form2.total_measured : data?.total_measured ? data.total_measured : undefined,
      more_accurate_informations: formDataUpdate.form2?.more_accurate_informations ? formDataUpdate.form2.more_accurate_informations : data?.more_accurate_informations ? data.more_accurate_informations : undefined,
      mandatory_documents_to_b: formDataUpdate.form2?.mandatory_documents_to_b ? formDataUpdate.form2.mandatory_documents_to_b : data?.mandatory_documents_to_b ? data.mandatory_documents_to_b : undefined,
    },
  });

  const [value, setValueLocal] = useState(formDataUpdate.form2?.cpf || formDataUpdate.form2?.cnpj || data?.cpf || data?.cnpj || "");

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const rawValue = e.target.value;
  const formatted = formatCpfCnpj(rawValue);
  setValueLocal(formatted);

  const numbers = onlyNumbers(formatted);

  if (numbers.length <= 11) {
    // É CPF
    setValue("cpf", formatted);
    setValue("cnpj", ""); // limpa o outro
  } else {
    // É CNPJ
    setValue("cnpj", formatted);
    setValue("cpf", ""); // limpa o outro
  }
};

  const onSubmit = (data: ServiceOrderFormTwoSchema) => {
    // createLocation.mutateAsync(data).then(()=>goToNextStep()).catch((error)=>console.error(error))
    setFormValueUpdate("form2", data);
    goToNextStep();
  };


  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-6"
      >
        {soType ? ( 
          <div className="w-full h-auto flex flex-col gap-[1rem]">
            <div className="flex w-full flex-col items-end justify-start gap-4">
              <div className="flex items-center justify-between w-full max-md:flex-col max-md:justify-center">
                {/* cpf or cnpj */}
                <div className={`flex flex-col ${soType.startsWith("B") ? "w-full" : "w-[47%]"} gap-2 max-md:w-full max-md:mb-4`}>
                  <Label>CPF / CNPJ</Label>
                  <Input
                    id="cpf"
                    value={value}
                    onChange={handleChange}
                    placeholder="Ex: 000.000.000-00"
                    maxLength={18}
                    required
                  />
                  <p className="text-red-warning">
                    {errors.cpf?.message || errors.cnpj?.message}
                  </p>
                </div>
                {/* property_type */}
                {(soType.startsWith("G") || (soType === "A413")) && (
                  <div className="flex flex-col w-[47%] gap-2 max-md:w-full">
                    <Label>Tipo de imóvel</Label>
                    <Controller 
                      control = {control}	
                      name="property_type"
                      render={({ field }) => (
                          <Select 
                          {...field}
                          value={selectedPropertyType} 
                          onValueChange={(value) => {
                              setSelectedPropertyType(value as string)
                              field.onChange(value)
                          }}
                          >
                              <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Tipo de Imóvel..." />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Imóvel residencial">Imóvel residencial</SelectItem>
                                <SelectItem value="Imóvel comercial">Imóvel comercial</SelectItem>
                                <SelectItem value="Terreno">Terreno</SelectItem>
                              </SelectContent>
                          </Select>
                      )}
                      />
                    <p className="text-red-warning">{errors.property_type?.message}</p>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between w-full max-md:flex-col max-md:justify-center">
                {/* property_status */}
                {(soType.startsWith("G") || (soType === "A413")) && (
                  <div className="flex flex-col w-[47%] gap-2 max-md:w-full max-md:mb-4">
                    <Label>Condição do imóvel</Label>
                    <Controller 
                      control = {control}	
                      name="property_status"
                      render={({ field }) => (
                          <Select 
                          {...field}
                          value={selectedPropertyStatus} 
                          onValueChange={(value) => {
                              setSelectedPropertyStatus(value as string)
                              field.onChange(value)
                          }}
                          >
                              <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Condição do imóvel..." />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Novo">Novo</SelectItem>
                                <SelectItem value="Usado">Usado</SelectItem>
                                <SelectItem value="Não identificado">Não identificado</SelectItem>
                              </SelectContent>
                          </Select>
                      )}
                      />
                    <p className="text-red-warning">
                      {errors.property_status?.message}
                    </p>
                  </div>
                )}
                {/* registration_on_system */}
                {(soType.startsWith("G") || (soType === "A413") || soType.startsWith("B")) && (
                  <div className={`flex flex-col ${soType.startsWith("B") ? "w-full" : "w-[47%]"} gap-2 max-md:w-full`}>
                    <Label>Matrícula consta no sistema?</Label>
                    <Controller 
                      control = {control}	
                      name="registration_on_system"
                      render={({ field }) => (
                          <Select 
                          {...field}
                          value={selectedRegistrationOnSystem} 
                          onValueChange={(value) => {
                              setSelectedRegistrationOnSystem(value as string)
                              field.onChange(value)
                          }}
                          >
                              <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Selecione..." />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Sim">Sim (verificar a qualidade)</SelectItem>
                                <SelectItem value="Não">Não (solicitar segunda via)</SelectItem>
                                <SelectItem value="Corrompida">Corrompida</SelectItem>
                              </SelectContent>
                          </Select>
                      )}
                      />
                    <p className="text-red-warning">{errors.registration_on_system?.message}</p>
                  </div>
                )}
              </div>
              {(soType.startsWith("G") || (soType === "A413") || soType.startsWith("B")) && ( 
                <div className="flex items-center justify-between w-full max-md:flex-col max-md:justify-center">
                  {/* siopi_coincides */}
                  {(soType.startsWith("G") || (soType === "A413") || soType.startsWith("B")) && (
                    <div className="flex flex-col w-[47%] gap-2 max-md:w-full max-md:mb-4">
                      <Label>Dados da Matrícula no documento coincide com o que está descrito no Siopi (nº de matrícula, livro e cartório)?</Label>
                      <Controller 
                        control = {control}	
                        name="siopi_coincides"
                        render={({ field }) => (
                            <Select 
                            {...field}
                            value={selectedSiopiCoincides} 
                            onValueChange={(value) => {
                                setSelectedSiopiCoincides(value as string)
                                field.onChange(value)
                            }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione..." />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Sim">Sim</SelectItem>
                                  <SelectItem value="Divergente">Divergente (Solicitar cancelamento)</SelectItem>
                                  <SelectItem value="Incompleta">Incompleta (Abrir Pept)</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                        />
                      <p className="text-red-warning">
                        {errors.siopi_coincides?.message}
                      </p>
                    </div>
                  )}
                  {/* registration_type */}
                  {(soType.startsWith("G") || (soType === "A413") || soType.startsWith("B")) && (
                    <div className="flex flex-col w-[47%] gap-2 max-md:w-full">
                      <Label>Tipo de Matrícula</Label>
                      <Controller 
                        control = {control}	
                        name="registration_type"
                        render={({ field }) => (
                            <Select 
                            {...field}
                            value={selectedRegistrationType} 
                            onValueChange={(value) => {
                                setSelectedRegistrationType(value as string)
                                field.onChange(value)
                            }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione..." />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Certidão de inteiro teor">Certidão de inteiro teor (Matrícula individualizada)</SelectItem>
                                  <SelectItem value="Matrícula Mãe">Matrícula Mãe (Não permitido para imóvel Usado)</SelectItem>
                                  <SelectItem value="Não identificado">Não identificado</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                        />
                      <p className="text-red-warning">{errors.registration_type?.message}</p>
                    </div>
                  )}
                </div>
              )}
              {(soType.startsWith("G") || (soType === "A413")) && (
                <div className="flex justify-between items-center w-full max-[1200px]:flex-col max-[1200px]:justify-center">
                  {/* averbation_exists */}
                  {(soType.startsWith("G") || (soType === "A413")) && (
                    <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full max-[1200px]:mb-4">
                      <Controller
                        name="averbation_exists"
                        control={control}
                        rules={{ required: "Informe se existe averbação." }}
                        render={({ field }) => (
                          <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full max-[1200px]:mb-4">
                            <Label>Existe averbação de área construída na matrícula?</Label>
                            <div className="flex items-center gap-4">
                              <label className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  value="true"
                                  checked={field.value === true}
                                  onChange={() => field.onChange(true)}
                                />
                                Sim
                              </label>
                              <label className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  value="false"
                                  checked={field.value === false}
                                  onChange={() => field.onChange(false)}
                                />
                                Não
                              </label>
                            </div>
                            <p className="text-red-warning">{errors.averbation_exists?.message}</p>
                          </div>
                        )}
                      />
                      <p className="text-red-warning">{errors.averbation_exists?.message}</p>
                    </div>
                  )}
                  {/* registration_date */}
                  {(soType.startsWith("G") || (soType === "A413") || soType.startsWith("B")) && (
                    <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full">
                        <Label>
                            Data da matrícula
                        </Label>
                        <Controller
                            control={control}
                            name="registration_date"
                            render={({ field }) => (
                            <IMaskInput
                                {...field}
                                required
                                mask="00/00/0000"
                                placeholder="dd/mm/aaaa"
                                value={field.value || ""}
                                onAccept={(value) => field.onChange(value)}
                                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            )}
                        />
                        <p className="text-red-warning">{errors.registration_date?.message}</p>
                    </div>
                  )}
                </div>
              )}
              {/* built_area_presents */}
              {(soType.startsWith("G") || (soType === "A413")) && (
                <div className="flex flex-col w-full gap-2">
                  <Label>Área construída presente na matrícula</Label>
                  <Input required type="text" {...register("built_area_presents")} placeholder="Sua resposta..."/>
                  <p className="text-red-warning">{errors.built_area_presents?.message}</p>
                </div>
              )}
              {/* mandatory_documents */}
              {(soType.startsWith("G") || (soType === "A413")) && (
                <div className="flex items-center justify-between w-full max-md:flex-col max-md:justify-center">
                  <div className="flex flex-col w-full gap-2">
                    <Label>Documentos obrigatórios para imóvel novo</Label>
                    <Controller
                      control={control}
                      name="mandatory_documents"
                      render={({ field }) => {
                        const { value = [], onChange } = field;

                        const handleCheck = (val: string) => {
                          if (value.includes(val)) {
                            onChange(value.filter((v: string) => v !== val));
                          } else {
                            onChange([...value, val]);
                          }
                        };

                        return (
                          <div className="flex flex-col gap-2">
                            {documentOptions.map((option) => (
                              <label key={option.value} className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={value.includes(option.value)}
                                  onChange={() => handleCheck(option.value)}
                                  className="accent-blue-500"
                                />
                                {option.label}
                              </label>
                            ))}
                          </div>
                        );
                      }}
                    />
                    <p className="text-red-warning">
                      {errors.mandatory_documents?.message}
                    </p>
                  </div>
                </div>
              )}
              {/* dwell_registartion_compare*/}
              {(soType.startsWith("G") || (soType === "A413")) && (
                <div className="flex items-center justify-between w-full max-md:flex-col max-md:justify-center">
                  <div className="flex flex-col w-full gap-2">
                    <Label>Verificações de comparação entre o Habite-se e a matrícula:</Label>
                    <Controller
                      control={control}
                      name="dwell_registration_compare"
                      render={({ field }) => {
                        const { value = [], onChange } = field;

                        const handleCheck = (val: string) => {
                          if (value.includes(val)) {
                            onChange(value.filter((v: string) => v !== val));
                          } else {
                            onChange([...value, val]);
                          }
                        };

                        return (
                          <div className="flex flex-col gap-2">
                            {dwellRegistrationOptions.map((option) => (
                              <label key={option.value} className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={value.includes(option.value)}
                                  onChange={() => handleCheck(option.value)}
                                  className="accent-blue-500"
                                />
                                {option.label}
                              </label>
                            ))}
                          </div>
                        );
                      }}
                    />
                    <p className="text-red-warning">
                      {errors.dwell_registration_compare?.message}
                    </p>
                  </div>
                </div>
              )}
              {/* art_registration_compare */}
              {(soType.startsWith("G") || (soType === "A413")) && (
                <div className="flex items-center justify-between w-full max-md:flex-col max-md:justify-center">
                  <div className="flex flex-col w-full gap-2">
                    <Label>Verificações e comparação entre a ART e a matrícula:</Label>
                    <Controller
                      control={control}
                      name="art_registration_compare"
                      render={({ field }) => {
                        const { value = [], onChange } = field;

                        const handleCheck = (val: string) => {
                          if (value.includes(val)) {
                            onChange(value.filter((v: string) => v !== val));
                          } else {
                            onChange([...value, val]);
                          }
                        };

                        return (
                          <div className="flex flex-col gap-2">
                            {artRegistrationCompareOptions.map((option) => (
                              <label key={option.value} className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={value.includes(option.value)}
                                  onChange={() => handleCheck(option.value)}
                                  className="accent-blue-500"
                                />
                                {option.label}
                              </label>
                            ))}
                          </div>
                        );
                      }}
                    />
                    <p className="text-red-warning">
                      {errors.art_registration_compare?.message}
                    </p>
                  </div>
                </div>
              )}
              {/* dec_registration_compare */}
              {(soType.startsWith("G") || (soType === "A413")) && (
                <div className="flex items-center justify-between w-full max-md:flex-col max-md:justify-center">
                  <div className="flex flex-col w-full gap-2">
                    <Label>Verificações e comparação entre a DEC e a matrícula/ART:</Label>
                    <Controller
                      control={control}
                      name="dec_registration_compare"
                      render={({ field }) => {
                        const { value = [], onChange } = field;

                        const handleCheck = (val: string) => {
                          if (value.includes(val)) {
                            onChange(value.filter((v: string) => v !== val));
                          } else {
                            onChange([...value, val]);
                          }
                        };

                        return (
                          <div className="flex flex-col gap-2">
                            {decRegistrationCompareOptions.map((option) => (
                              <label key={option.value} className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={value.includes(option.value)}
                                  onChange={() => handleCheck(option.value)}
                                  className="accent-blue-500"
                                />
                                {option.label}
                              </label>
                            ))}
                          </div>
                        );
                      }}
                    />
                    <p className="text-red-warning">
                      {errors.dec_registration_compare?.message}
                    </p>
                  </div>
                </div>
              )}
              {/* minimal_documentation */}
              {(soType.startsWith("G") || (soType === "E401")) && (
                <div className="flex items-center justify-between w-full max-md:flex-col max-md:justify-center">
                  <div className="flex flex-col w-full gap-2">
                    <Label>Documentação mínima necessária:</Label>
                    <Controller
                      control={control}
                      name="minimal_documentation"
                      render={({ field }) => {
                        const { value = [], onChange } = field;

                        const handleCheck = (val: string) => {
                          if (value.includes(val)) {
                            onChange(value.filter((v: string) => v !== val));
                          } else {
                            onChange([...value, val]);
                          }
                        };

                        return (
                          <div className="flex flex-col gap-2">
                            {minimalDocumentOptions.map((option) => (
                              <label key={option.value} className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={value.includes(option.value)}
                                  onChange={() => handleCheck(option.value)}
                                  className="accent-blue-500"
                                />
                                {option.label}
                              </label>
                            ))}
                          </div>
                        );
                      }}
                    />
                    <p className="text-red-warning">
                      {errors.minimal_documentation?.message}
                    </p>
                  </div>
                </div>
              )}
              {/* pls_verifications */}
              {(soType.startsWith("G") || (soType === "E401")) && (
                <div className="flex items-center justify-between w-full max-md:flex-col max-md:justify-center">
                  <div className="flex flex-col w-full gap-2">
                    <Label>Verificações na PLS:</Label>
                    <Controller
                      control={control}
                      name="pls_verifications"
                      render={({ field }) => {
                        const { value = [], onChange } = field;

                        const handleCheck = (val: string) => {
                          if (value.includes(val)) {
                            onChange(value.filter((v: string) => v !== val));
                          } else {
                            onChange([...value, val]);
                          }
                        };

                        return (
                          <div className="flex flex-col gap-2">
                            {plsVerificationsOptions.map((option) => (
                              <label key={option.value} className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={value.includes(option.value)}
                                  onChange={() => handleCheck(option.value)}
                                  className="accent-blue-500"
                                />
                                {option.label}
                              </label>
                            ))}
                          </div>
                        );
                      }}
                    />
                    <p className="text-red-warning">
                      {errors.pls_verifications?.message}
                    </p>
                  </div>
                </div>
              )}
              {/* pls_built_situation */}
              {(soType.startsWith("G") || (soType === "E401")) && (
                <div className="flex flex-col w-full gap-2">
                  <Label>Situação da obra na PLS</Label>
                  <Input required type="text" {...register("pls_built_situation")} placeholder="Ex: Normal, Atrasada, Adiantada, Vencida, Outro..."/>
                  <p className="text-red-warning">{errors.pls_built_situation?.message}</p>
                </div>
              )}
              {/* total_measured */}
              {(soType.startsWith("G") || (soType === "E401")) && (
                <div className="flex flex-col w-full gap-2">
                  <Label>Mensurado Acumulado Atual</Label>
                  <div className="w-1/2 max-w-[6rem] max-[1200px]:w-full flex gap-2 items-center">
                    <Controller
                      control={control}
                      name="total_measured"
                      render={({ field }) => (
                        <Input
                          required
                          {...field}
                          type="text" // <-- trocar para text
                          onChange={(e) => {
                            const rawValue = e.target.value.replace(',', '.');
                            const numericValue = parseFloat(rawValue);
                            field.onChange(isNaN(numericValue) ? undefined : numericValue);
                          }}
                          value={field.value ?? ""}
                          placeholder="..."
                        />
                      )}
                    />
                    <Label className="font-bold">%</Label>
                  </div>
                  <p className="text-red-warning">{errors.total_measured?.message}</p>
                </div>
              )}
              {/* more_accurate_informations */}
              {(soType.startsWith("G") || soType.startsWith("B")) && (
                <div className="flex items-center justify-between w-full max-md:flex-col max-md:justify-center">
                  <div className="flex flex-col w-full gap-2">
                    <Label>Quanto a localização na matrícula, além do endereço, há algo que identifique a localização mais precisamente?</Label>
                    <Controller
                      control={control}
                      name="more_accurate_informations"
                      render={({ field }) => {
                        const { value = [], onChange } = field;

                        const handleCheck = (val: string) => {
                          if (value.includes(val)) {
                            onChange(value.filter((v: string) => v !== val));
                          } else {
                            onChange([...value, val]);
                          }
                        };

                        return (
                          <div className="flex flex-col gap-2">
                            {moreAccurateOptions.map((option) => (
                              <label key={option.value} className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={value.includes(option.value)}
                                  onChange={() => handleCheck(option.value)}
                                  className="accent-blue-500"
                                />
                                {option.label}
                              </label>
                            ))}
                          </div>
                        );
                      }}
                    />
                    <p className="text-red-warning">
                      {errors.more_accurate_informations?.message}
                    </p>
                  </div>
                </div>
              )}
              {/* mandatory_documents_to_b */}
              {(soType.startsWith("G") || soType.startsWith("B")) && (
                <div className="flex items-center justify-between w-full max-md:flex-col max-md:justify-center">
                  <div className="flex flex-col w-full gap-2">
                    <Label>Documentos obrigatórios para prosseguir com a análise</Label>
                    <Controller
                      control={control}
                      name="mandatory_documents_to_b"
                      render={({ field }) => {
                        const { value = [], onChange } = field;

                        const handleCheck = (val: string) => {
                          if (value.includes(val)) {
                            onChange(value.filter((v: string) => v !== val));
                          } else {
                            onChange([...value, val]);
                          }
                        };

                        return (
                          <div className="flex flex-col gap-2">
                            {mandatoryDocumentBOptions.map((option) => (
                              <label key={option.value} className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={value.includes(option.value)}
                                  onChange={() => handleCheck(option.value)}
                                  className="accent-blue-500"
                                />
                                {option.label}
                              </label>
                            ))}
                          </div>
                        );
                      }}
                    />
                    <p className="text-red-warning">
                      {errors.mandatory_documents_to_b?.message}
                    </p>
                  </div>
                </div>
              )}
              {/* pci_verifications */}
              {(soType.startsWith("G") || soType.startsWith("B")) && (
                <div className="flex items-center justify-between w-full max-md:flex-col max-md:justify-center">
                  <div className="flex flex-col w-full gap-2">
                    <Label>Verificações na PCI</Label>
                    <Controller
                      control={control}
                      name="pci_verifications"
                      render={({ field }) => {
                        const { value = [], onChange } = field;

                        const handleCheck = (val: string) => {
                          if (value.includes(val)) {
                            onChange(value.filter((v: string) => v !== val));
                          } else {
                            onChange([...value, val]);
                          }
                        };

                        return (
                          <div className="flex flex-col gap-2">
                            {pciVerificationsOptions.map((option) => (
                              <label key={option.value} className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={value.includes(option.value)}
                                  onChange={() => handleCheck(option.value)}
                                  className="accent-blue-500"
                                />
                                {option.label}
                              </label>
                            ))}
                          </div>
                        );
                      }}
                    />
                    <p className="text-red-warning">
                      {errors.pci_verifications?.message}
                    </p>
                  </div>
                </div>
              )}
              {/* pci_art_compare */}
              {(soType.startsWith("G") || soType.startsWith("B")) && (
                <div className="flex items-center justify-between w-full max-md:flex-col max-md:justify-center">
                  <div className="flex flex-col w-full gap-2">
                    <Label>Verificações e comparação entre a ART e a PCI:</Label>
                    <Controller
                      control={control}
                      name="pci_art_compare"
                      render={({ field }) => {
                        const { value = [], onChange } = field;

                        const handleCheck = (val: string) => {
                          if (value.includes(val)) {
                            onChange(value.filter((v: string) => v !== val));
                          } else {
                            onChange([...value, val]);
                          }
                        };

                        return (
                          <div className="flex flex-col gap-2">
                            {artPciVerificationOptions.map((option) => (
                              <label key={option.value} className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={value.includes(option.value)}
                                  onChange={() => handleCheck(option.value)}
                                  className="accent-blue-500"
                                />
                                {option.label}
                              </label>
                            ))}
                          </div>
                        );
                      }}
                    />
                    <p className="text-red-warning">
                      {errors.pci_art_compare?.message}
                    </p>
                  </div>
                </div>
              )}
              {/* project_permit_verifications */}
              {(soType.startsWith("G") || soType.startsWith("B")) && (
                <div className="flex items-center justify-between w-full max-md:flex-col max-md:justify-center">
                  <div className="flex flex-col w-full gap-2">
                    <Label>Verificações do Projeto e Alvará</Label>
                    <Controller
                      control={control}
                      name="project_permit_verifications"
                      render={({ field }) => {
                        const { value = [], onChange } = field;

                        const handleCheck = (val: string) => {
                          if (value.includes(val)) {
                            onChange(value.filter((v: string) => v !== val));
                          } else {
                            onChange([...value, val]);
                          }
                        };

                        return (
                          <div className="flex flex-col gap-2">
                            {projectPermitVerificationOptions.map((option) => (
                              <label key={option.value} className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={value.includes(option.value)}
                                  onChange={() => handleCheck(option.value)}
                                  className="accent-blue-500"
                                />
                                {option.label}
                              </label>
                            ))}
                          </div>
                        );
                      }}
                    />
                    <p className="text-red-warning">
                      {errors.project_permit_verifications?.message}
                    </p>
                  </div>
                </div>
              )}
              {/* built_area and terrain_area */}
              {(soType.startsWith("G") || soType.startsWith("B")) && (
                <div className="flex items-center justify-between w-full max-md:flex-col max-md:justify-center">
                  <div className="flex flex-col w-[47%] gap-2 max-md:w-full max-md:mb-4">
                    <Label>Área construída</Label>
                    <div className="flex items-center gap-2">
                      <Controller
                        control={control}
                        name="built_area"
                        render={({ field }) => (
                          <Input
                            required
                            {...field}
                            type="text" // <-- trocar para text
                            onChange={(e) => {
                              const rawValue = e.target.value.replace(',', '.');
                              const numericValue = parseFloat(rawValue);
                              field.onChange(isNaN(numericValue) ? undefined : numericValue);
                            }}
                            value={field.value ?? ""}
                            placeholder="..."
                          />
                        )}
                      />

                      <Label>m<sup>2</sup></Label>
                    </div>
                    <p className="text-red-warning">{errors.built_area?.message}</p>
                  </div>
                  <div className="flex flex-col w-[47%] gap-2 max-md:w-full">
                    <Label>Área do terreno</Label>
                    <div className="flex items-center gap-2">
                    <Controller
                        control={control}
                        name="terrain_area"
                        render={({ field }) => (
                          <Input
                            required
                            {...field}
                            type="text" // <-- trocar para text
                            onChange={(e) => {
                              const rawValue = e.target.value.replace(',', '.');
                              const numericValue = parseFloat(rawValue);
                              field.onChange(isNaN(numericValue) ? undefined : numericValue);
                            }}
                            value={field.value ?? ""}
                            placeholder="..."
                          />
                        )}
                      />
                      <Label>m<sup>2</sup></Label>
                    </div>
                    <p className="text-red-warning">{errors.terrain_area?.message}</p>
                  </div>
                </div>
              )}
              {/* rooms_number and bathrooms_number */}
              {(soType.startsWith("G") || soType.startsWith("B")) && (
                <div className="flex items-center justify-between w-full max-md:flex-col max-md:justify-center">
                  <div className="flex flex-col w-[47%] gap-2 max-md:w-full max-md:mb-4">
                    <Label>Número de quartos</Label>
                    <Controller
                      control={control}
                      name="rooms_number"
                      render={({ field }) => (
                        <Input
                          required
                          {...field}
                          type="number"
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          value={field.value ?? ""}
                          placeholder="..."
                          min={0}
                        />
                      )}
                    />
                    <p className="text-red-warning">{errors.rooms_number?.message}</p>
                  </div>
                  <div className="flex flex-col w-[47%] gap-2 max-md:w-full">
                    <Label>Número de banheiros</Label>
                    <Controller
                      control={control}
                      name="bathrooms_number"
                      render={({ field }) => (
                        <Input
                          required
                          {...field}
                          type="number"
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          value={field.value ?? ""}
                          placeholder="..."
                          min={0}
                        />
                      )}
                    />
                    <p className="text-red-warning">{errors.bathrooms_number?.message}</p>
                  </div>
                </div>
              )}
            </div>
            <CardFooter
              className={`flex px-0 pt-8 ${
                currentStep === 1 ? "justify-between" : "justify-end"
              } gap-4 w-full`}
            >
              {canGoToPrevStep && (
                <Button
                  onClick={goToPrevStep}
                  variant={"outline"}
                  className="max-[450px]:w-[70px]"
                >
                  <ChevronLeft className="max-[450px]:hidden" /> Anterior
                </Button>
              )}
              <Button
                type="submit"
                isLoading={isSubmitting}
                className="max-[450px]:w-[70px]"
              >
                {canGoToNextStep ? "Próximo" : "Finalizar"}
                <ChevronRight className="max-[450px]:hidden" />
              </Button>
            </CardFooter>
          </div>
        ):(
          <>
            <Loading/>
          </>
        )}
      </form>
    </>
  );
}
