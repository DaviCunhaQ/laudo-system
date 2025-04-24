import { DialogHeader } from "@/components/TailwindDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/TailwindDialog";
import { useState } from "react";
import { FaClipboardList } from "react-icons/fa";
import { ServiceOrderFormTwoSchema, ServiceOrderListSchema } from "@/dtos";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IMaskInput } from "react-imask";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Loading from "@/components/icons/loading";
import {
  documentOptions,
  artPciVerificationOptions,
  artRegistrationCompareOptions,
  decRegistrationCompareOptions,
  dwellRegistrationOptions,
  mandatoryDocumentBOptions,
  minimalDocumentOptions,
  moreAccurateOptions,
  pciVerificationsOptions,
  plsVerificationsOptions,
  projectPermitVerificationOptions,
} from "@/utils/allOptions";
import { useUpdateOrderService } from "@/hooks/order-services/useUpdateOrderService";
import toast from "react-hot-toast";

export default function HandleChecklistDialog({
  orderData,
  id,
  soType,
}: {
  orderData: ServiceOrderListSchema;
  id: string;
  soType: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>();
  const updateOrderService = useUpdateOrderService();
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>(
    orderData?.property_type ? orderData.property_type : ""
  );
  const [selectedPropertyStatus, setSelectedPropertyStatus] = useState<string>(
    orderData?.property_status ? (orderData.property_status as string) : ""
  );
  const [selectedRegistrationOnSystem, setSelectedRegistrationOnSystem] =
    useState<string>(
      orderData?.registration_on_system
        ? (orderData.registration_on_system as string)
        : ""
    );
  const [selectedSiopiCoincides, setSelectedSiopiCoincides] = useState<string>(
    orderData?.siopi_coincides ? (orderData.siopi_coincides as string) : ""
  );
  const [selectedRegistrationType, setSelectedRegistrationType] =
    useState<string>(
      orderData?.registration_type
        ? (orderData.registration_type as string)
        : ""
    );
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
      art_registration_compare: orderData?.art_registration_compare
        ? orderData?.art_registration_compare
        : undefined,
      averbation_exists: orderData?.averbation_exists
        ? orderData?.averbation_exists
        : undefined,
      bathrooms_number: orderData?.bathrooms_number
        ? orderData?.bathrooms_number
        : undefined,
      built_area: orderData?.built_area ? orderData?.built_area : undefined,
      built_area_presents: orderData?.built_area_presents
        ? orderData?.built_area_presents
        : undefined,
      cnpj: orderData?.cnpj ? orderData?.cnpj : undefined,
      cpf: orderData?.cpf ? orderData?.cpf : undefined,
      dec_registration_compare: orderData?.dec_registration_compare
        ? orderData?.dec_registration_compare
        : undefined,
      dwell_registration_compare: orderData?.dwell_registration_compare
        ? orderData?.dwell_registration_compare
        : undefined,
      mandatory_documents: orderData?.mandatory_documents
        ? orderData?.mandatory_documents
        : undefined,
      mandatory_documents_to_b: orderData?.mandatory_documents_to_b
        ? orderData?.mandatory_documents_to_b
        : undefined,
      minimal_documentation: orderData?.minimal_documentation
        ? orderData?.minimal_documentation
        : undefined,
      more_accurate_informations: orderData?.more_accurate_informations
        ? orderData?.more_accurate_informations
        : undefined,
      pci_art_compare: orderData?.pci_art_compare
        ? orderData?.pci_art_compare
        : undefined,
      pci_verifications: orderData?.pci_verifications
        ? orderData?.pci_verifications
        : undefined,
      pls_built_situation: orderData?.pls_built_situation
        ? orderData?.pls_built_situation
        : undefined,
      pls_verifications: orderData?.pls_verifications
        ? orderData?.pls_verifications
        : undefined,
      property_status: orderData?.property_status
        ? orderData?.property_status
        : undefined,
      property_type: orderData?.property_type
        ? orderData?.property_type
        : undefined,
      registration_date: orderData?.registration_date
        ? orderData?.registration_date
        : undefined,
      registration_on_system: orderData?.registration_on_system
        ? orderData?.registration_on_system
        : undefined,
      registration_type: orderData?.registration_type
        ? orderData?.registration_type
        : undefined,
      rooms_number: orderData?.rooms_number
        ? orderData?.rooms_number
        : undefined,
      project_permit_verifications: orderData?.project_permit_verifications
        ? orderData?.project_permit_verifications
        : undefined,
      siopi_coincides: orderData?.siopi_coincides
        ? orderData?.siopi_coincides
        : undefined,
      total_measured: orderData?.total_measured
        ? orderData?.total_measured
        : undefined,
      terrain_area: orderData?.terrain_area
        ? orderData?.terrain_area
        : undefined,
    },
  });

  const [value, setValueLocal] = useState(
    orderData?.cpf ? orderData.cpf : orderData?.cnpj ? orderData.cnpj : ""
  );

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
    updateOrderService
      .mutateAsync({
        id,
        ...data,
      })
      .then(() => {
        setIsOpen(false);
        toast.success("Checklist preenchido com sucesso!");
      });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isModalOpen) => setIsOpen(isModalOpen)}
    >
      <DialogTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-full aspect-[2/1] bg-[#3dffe9] rounded-md flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out shadow-[0px_8px_8px_0px_rgba(0,_0,_0,_0.1)]">
                <FaClipboardList color="#fff" size={26} />
                <p className="text-white font-semibold max-[500px]:hidden">
                  Checklist
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Checklist</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className="max-sm:!w-[400px] max-[500px]:!w-[300px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="max-[500px]:hidden">
          <h1 className="text-[1.5rem] text-secondary-color font-bold">
            Checklist O.S.
          </h1>
        </DialogHeader>
        {orderData ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-6 max-[500px]:mt-[3rem]"
          >
            {soType ? (
              <div className="w-full h-auto flex flex-col gap-[1rem]">
                <div className="flex w-full flex-col items-end justify-start gap-4">
                  <div className="flex items-center justify-between w-full max-md:flex-col max-md:justify-center">
                    {/* cpf or cnpj */}
                    <div
                      className={`flex flex-col ${
                        soType.startsWith("B") ? "w-full" : "w-[47%]"
                      } gap-2 max-md:w-full max-md:mb-4`}
                    >
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
                    {(soType.startsWith("G") || soType === "A413") && (
                      <div className="flex flex-col w-[47%] gap-2 max-md:w-full">
                        <Label>Tipo de imóvel</Label>
                        <Controller
                          control={control}
                          name="property_type"
                          render={({ field }) => (
                            <select
                              {...field}
                              value={selectedPropertyType}
                              onChange={(e) => {
                                setSelectedPropertyType(e.target.value);
                                field.onChange(e.target.value);
                              }}
                              className="focus:ring-0 focus:border-input outline-none w-full px-4 py-2 text-sm border border-input bg-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
                            >
                              <option value="" disabled>
                                Tipo de Imóvel...
                              </option>
                              <option value="Imóvel residencial">
                                Imóvel residencial
                              </option>
                              <option value="Imóvel comercial">
                                Imóvel comercial
                              </option>
                              <option value="Terreno">Terreno</option>
                            </select>
                          )}
                        />

                        <p className="text-red-warning">
                          {errors.property_type?.message}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between w-full max-md:flex-col max-md:justify-center">
                    {/* property_status */}
                    {(soType.startsWith("G") || soType === "A413") && (
                      <div className="flex flex-col w-[47%] gap-2 max-md:w-full max-md:mb-4">
                        <Label>Condição do imóvel</Label>
                        <Controller
                          control={control}
                          name="property_status"
                          render={({ field }) => (
                            <select
                              {...field}
                              value={selectedPropertyStatus}
                              onChange={(e) => {
                                setSelectedPropertyStatus(e.target.value);
                                field.onChange(e.target.value);
                              }}
                              className="focus:ring-0 focus:border-input outline-none w-full px-4 py-2 text-sm border border-input bg-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
                            >
                              <option value="" disabled>
                                Condição do imóvel...
                              </option>
                              <option value="Novo">Novo</option>
                              <option value="Usado">Usado</option>
                              <option value="Não identificado">
                                Não identificado
                              </option>
                            </select>
                          )}
                        />

                        <p className="text-red-warning">
                          {errors.property_status?.message}
                        </p>
                      </div>
                    )}
                    {/* registration_on_system */}
                    {(soType.startsWith("G") ||
                      soType === "A413" ||
                      soType.startsWith("B")) && (
                      <div
                        className={`flex flex-col ${
                          soType.startsWith("B") ? "w-full" : "w-[47%]"
                        } gap-2 max-md:w-full`}
                      >
                        <Label>Matrícula consta no sistema?</Label>
                        <Controller
                          control={control}
                          name="registration_on_system"
                          render={({ field }) => (
                            <select
                              {...field}
                              value={selectedRegistrationOnSystem}
                              onChange={(e) => {
                                setSelectedRegistrationOnSystem(e.target.value);
                                field.onChange(e.target.value);
                              }}
                              className="focus:ring-0 focus:border-input outline-none w-full px-4 py-2 text-sm border border-input bg-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
                            >
                              <option value="" disabled>
                                Selecione...
                              </option>
                              <option value="Sim">
                                Sim (verificar a qualidade)
                              </option>
                              <option value="Não">
                                Não (solicitar segunda via)
                              </option>
                              <option value="Corrompida">Corrompida</option>
                            </select>
                          )}
                        />

                        <p className="text-red-warning">
                          {errors.registration_on_system?.message}
                        </p>
                      </div>
                    )}
                  </div>
                  {(soType.startsWith("G") ||
                    soType === "A413" ||
                    soType.startsWith("B")) && (
                    <div className="flex items-center justify-between w-full max-md:flex-col max-md:justify-center">
                      {/* siopi_coincides */}
                      {(soType.startsWith("G") ||
                        soType === "A413" ||
                        soType.startsWith("B")) && (
                        <div className="flex flex-col w-[47%] gap-2 max-md:w-full max-md:mb-4">
                          <Label>
                            Dados da Matrícula no documento coincide com o que
                            está descrito no Siopi (nº de matrícula, livro e
                            cartório)?
                          </Label>
                          <Controller
                            control={control}
                            name="siopi_coincides"
                            render={({ field }) => (
                              <select
                                {...field}
                                value={selectedSiopiCoincides}
                                onChange={(e) => {
                                  setSelectedSiopiCoincides(e.target.value);
                                  field.onChange(e.target.value);
                                }}
                                className="focus:ring-0 focus:border-input outline-none w-full px-4 py-2 text-sm border border-input bg-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
                              >
                                <option value="" disabled>
                                  Selecione...
                                </option>
                                <option value="Sim">Sim</option>
                                <option value="Divergente">
                                  Divergente (Solicitar cancelamento)
                                </option>
                                <option value="Incompleta">
                                  Incompleta (Abrir Pept)
                                </option>
                              </select>
                            )}
                          />

                          <p className="text-red-warning">
                            {errors.siopi_coincides?.message}
                          </p>
                        </div>
                      )}
                      {/* registration_type */}
                      {(soType.startsWith("G") ||
                        soType === "A413" ||
                        soType.startsWith("B")) && (
                        <div className="flex flex-col w-[47%] gap-2 max-md:w-full">
                          <Label>Tipo de Matrícula</Label>
                          <Controller
                            control={control}
                            name="registration_type"
                            render={({ field }) => (
                              <select
                                {...field}
                                value={selectedRegistrationType}
                                onChange={(e) => {
                                  setSelectedRegistrationType(e.target.value);
                                  field.onChange(e.target.value);
                                }}
                                className="focus:ring-0 focus:border-input outline-none w-full px-4 py-2 text-sm border border-input bg-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
                              >
                                <option value="" disabled>
                                  Selecione...
                                </option>
                                <option value="Certidão de inteiro teor">
                                  Certidão de inteiro teor (Matrícula
                                  individualizada)
                                </option>
                                <option value="Matrícula Mãe">
                                  Matrícula Mãe (Não permitido para imóvel
                                  Usado)
                                </option>
                                <option value="Não identificado">
                                  Não identificado
                                </option>
                              </select>
                            )}
                          />

                          <p className="text-red-warning">
                            {errors.registration_type?.message}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  {(soType.startsWith("G") ||
                    soType === "A413" ||
                    soType.startsWith("B")) && (
                    <div className="flex justify-between items-center w-full max-[1200px]:flex-col max-[1200px]:justify-center">
                      {/* averbation_exists */}
                      {(soType.startsWith("G") || soType === "A413") && (
                        <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full max-[1200px]:mb-4">
                          <Controller
                            name="averbation_exists"
                            control={control}
                            rules={{ required: "Informe se existe averbação." }}
                            render={({ field }) => (
                              <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full max-[1200px]:mb-4">
                                <Label>
                                  Existe averbação de área construída na
                                  matrícula?
                                </Label>
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
                                <p className="text-red-warning">
                                  {errors.averbation_exists?.message}
                                </p>
                              </div>
                            )}
                          />
                          <p className="text-red-warning">
                            {errors.averbation_exists?.message}
                          </p>
                        </div>
                      )}
                      {/* registration_date */}
                      {(soType.startsWith("G") ||
                        soType === "A413" ||
                        soType.startsWith("B")) && (
                        <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full">
                          <Label>Data da matrícula</Label>
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
                          <p className="text-red-warning">
                            {errors.registration_date?.message}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  {/* built_area_presents */}
                  {(soType.startsWith("G") || soType === "A413") && (
                    <div className="flex flex-col w-full gap-2">
                      <Label>Área construída presente na matrícula</Label>
                      <Input
                        required
                        type="text"
                        {...register("built_area_presents")}
                        placeholder="Sua resposta..."
                      />
                      <p className="text-red-warning">
                        {errors.built_area_presents?.message}
                      </p>
                    </div>
                  )}
                  {/* mandatory_documents */}
                  {(soType.startsWith("G") || soType === "A413") && (
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
                                onChange(
                                  value.filter((v: string) => v !== val)
                                );
                              } else {
                                onChange([...value, val]);
                              }
                            };

                            return (
                              <div className="flex flex-col gap-2">
                                {documentOptions.map((option) => (
                                  <label
                                    key={option.value}
                                    className="flex items-center gap-2"
                                  >
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
                  {(soType.startsWith("G") || soType === "A413") && (
                    <div className="flex items-center justify-between w-full max-md:flex-col max-md:justify-center">
                      <div className="flex flex-col w-full gap-2">
                        <Label>
                          Verificações de comparação entre o Habite-se e a
                          matrícula:
                        </Label>
                        <Controller
                          control={control}
                          name="dwell_registration_compare"
                          render={({ field }) => {
                            const { value = [], onChange } = field;

                            const handleCheck = (val: string) => {
                              if (value.includes(val)) {
                                onChange(
                                  value.filter((v: string) => v !== val)
                                );
                              } else {
                                onChange([...value, val]);
                              }
                            };

                            return (
                              <div className="flex flex-col gap-2">
                                {dwellRegistrationOptions.map((option) => (
                                  <label
                                    key={option.value}
                                    className="flex items-center gap-2"
                                  >
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
                  {(soType.startsWith("G") || soType === "A413") && (
                    <div className="flex items-center justify-between w-full max-md:flex-col max-md:justify-center">
                      <div className="flex flex-col w-full gap-2">
                        <Label>
                          Verificações e comparação entre a ART e a matrícula:
                        </Label>
                        <Controller
                          control={control}
                          name="art_registration_compare"
                          render={({ field }) => {
                            const { value = [], onChange } = field;

                            const handleCheck = (val: string) => {
                              if (value.includes(val)) {
                                onChange(
                                  value.filter((v: string) => v !== val)
                                );
                              } else {
                                onChange([...value, val]);
                              }
                            };

                            return (
                              <div className="flex flex-col gap-2">
                                {artRegistrationCompareOptions.map((option) => (
                                  <label
                                    key={option.value}
                                    className="flex items-center gap-2"
                                  >
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
                  {(soType.startsWith("G") || soType === "A413") && (
                    <div className="flex items-center justify-between w-full max-md:flex-col max-md:justify-center">
                      <div className="flex flex-col w-full gap-2">
                        <Label>
                          Verificações e comparação entre a DEC e a
                          matrícula/ART:
                        </Label>
                        <Controller
                          control={control}
                          name="dec_registration_compare"
                          render={({ field }) => {
                            const { value = [], onChange } = field;

                            const handleCheck = (val: string) => {
                              if (value.includes(val)) {
                                onChange(
                                  value.filter((v: string) => v !== val)
                                );
                              } else {
                                onChange([...value, val]);
                              }
                            };

                            return (
                              <div className="flex flex-col gap-2">
                                {decRegistrationCompareOptions.map((option) => (
                                  <label
                                    key={option.value}
                                    className="flex items-center gap-2"
                                  >
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
                  {(soType.startsWith("G") || soType === "E401") && (
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
                                onChange(
                                  value.filter((v: string) => v !== val)
                                );
                              } else {
                                onChange([...value, val]);
                              }
                            };

                            return (
                              <div className="flex flex-col gap-2">
                                {minimalDocumentOptions.map((option) => (
                                  <label
                                    key={option.value}
                                    className="flex items-center gap-2"
                                  >
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
                  {(soType.startsWith("G") || soType === "E401") && (
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
                                onChange(
                                  value.filter((v: string) => v !== val)
                                );
                              } else {
                                onChange([...value, val]);
                              }
                            };

                            return (
                              <div className="flex flex-col gap-2">
                                {plsVerificationsOptions.map((option) => (
                                  <label
                                    key={option.value}
                                    className="flex items-center gap-2"
                                  >
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
                  {(soType.startsWith("G") || soType === "E401") && (
                    <div className="flex flex-col w-full gap-2">
                      <Label>Situação da obra na PLS</Label>
                      <Input
                        required
                        type="text"
                        {...register("pls_built_situation")}
                        placeholder="Ex: Normal, Atrasada, Adiantada, Vencida, Outro..."
                      />
                      <p className="text-red-warning">
                        {errors.pls_built_situation?.message}
                      </p>
                    </div>
                  )}
                  {/* total_measured */}
                  {(soType.startsWith("G") || soType === "E401") && (
                    <div className="flex flex-col w-full gap-2">
                      <Label>Mensurado Acumulado Atual</Label>
                      <div className="w-1/2 max-w-[6rem] max-[1200px]:w-full flex gap-2 items-center">
                        <Controller
                          control={control}
                          name="total_measured"
                          render={({ field }) => (
                            <Input
                              {...field}
                              type="text"
                              required
                              placeholder="..."
                              onChange={(e) => {
                                const input = e.target.value;

                                // Permite só números, vírgulas e pontos no texto
                                const sanitized = input.replace(
                                  /[^0-9.,]/g,
                                  ""
                                );

                                // Substitui vírgula por ponto e faz parse
                                const numericValue = parseFloat(
                                  sanitized.replace(",", ".")
                                );

                                field.onChange(
                                  isNaN(numericValue) ? undefined : numericValue
                                );
                              }}
                              // Exibe como string sempre
                              value={
                                field.value !== undefined &&
                                field.value !== null
                                  ? String(field.value).replace(".", ",") // Exibe com vírgula se quiser
                                  : ""
                              }
                            />
                          )}
                        />

                        <Label className="font-bold">%</Label>
                      </div>
                      <p className="text-red-warning">
                        {errors.total_measured?.message}
                      </p>
                    </div>
                  )}
                  {/* more_accurate_informations */}
                  {(soType.startsWith("G") || soType.startsWith("B")) && (
                    <div className="flex items-center justify-between w-full max-md:flex-col max-md:justify-center">
                      <div className="flex flex-col w-full gap-2">
                        <Label>
                          Quanto a localização na matrícula, além do endereço,
                          há algo que identifique a localização mais
                          precisamente?
                        </Label>
                        <Controller
                          control={control}
                          name="more_accurate_informations"
                          render={({ field }) => {
                            const { value = [], onChange } = field;

                            const handleCheck = (val: string) => {
                              if (value.includes(val)) {
                                onChange(
                                  value.filter((v: string) => v !== val)
                                );
                              } else {
                                onChange([...value, val]);
                              }
                            };

                            return (
                              <div className="flex flex-col gap-2">
                                {moreAccurateOptions.map((option) => (
                                  <label
                                    key={option.value}
                                    className="flex items-center gap-2"
                                  >
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
                        <Label>
                          Documentos obrigatórios para prosseguir com a análise
                        </Label>
                        <Controller
                          control={control}
                          name="mandatory_documents_to_b"
                          render={({ field }) => {
                            const { value = [], onChange } = field;

                            const handleCheck = (val: string) => {
                              if (value.includes(val)) {
                                onChange(
                                  value.filter((v: string) => v !== val)
                                );
                              } else {
                                onChange([...value, val]);
                              }
                            };

                            return (
                              <div className="flex flex-col gap-2">
                                {mandatoryDocumentBOptions.map((option) => (
                                  <label
                                    key={option.value}
                                    className="flex items-center gap-2"
                                  >
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
                                onChange(
                                  value.filter((v: string) => v !== val)
                                );
                              } else {
                                onChange([...value, val]);
                              }
                            };

                            return (
                              <div className="flex flex-col gap-2">
                                {pciVerificationsOptions.map((option) => (
                                  <label
                                    key={option.value}
                                    className="flex items-center gap-2"
                                  >
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
                        <Label>
                          Verificações e comparação entre a ART e a PCI:
                        </Label>
                        <Controller
                          control={control}
                          name="pci_art_compare"
                          render={({ field }) => {
                            const { value = [], onChange } = field;

                            const handleCheck = (val: string) => {
                              if (value.includes(val)) {
                                onChange(
                                  value.filter((v: string) => v !== val)
                                );
                              } else {
                                onChange([...value, val]);
                              }
                            };

                            return (
                              <div className="flex flex-col gap-2">
                                {artPciVerificationOptions.map((option) => (
                                  <label
                                    key={option.value}
                                    className="flex items-center gap-2"
                                  >
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
                                onChange(
                                  value.filter((v: string) => v !== val)
                                );
                              } else {
                                onChange([...value, val]);
                              }
                            };

                            return (
                              <div className="flex flex-col gap-2">
                                {projectPermitVerificationOptions.map(
                                  (option) => (
                                    <label
                                      key={option.value}
                                      className="flex items-center gap-2"
                                    >
                                      <input
                                        type="checkbox"
                                        checked={value.includes(option.value)}
                                        onChange={() =>
                                          handleCheck(option.value)
                                        }
                                        className="accent-blue-500"
                                      />
                                      {option.label}
                                    </label>
                                  )
                                )}
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
                                  const rawValue = e.target.value.replace(
                                    ",",
                                    "."
                                  );
                                  const numericValue = parseFloat(rawValue);
                                  field.onChange(
                                    isNaN(numericValue)
                                      ? undefined
                                      : numericValue
                                  );
                                }}
                                value={field.value ?? ""}
                                placeholder="..."
                              />
                            )}
                          />

                          <Label>
                            m<sup>2</sup>
                          </Label>
                        </div>
                        <p className="text-red-warning">
                          {errors.built_area?.message}
                        </p>
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
                                  const rawValue = e.target.value.replace(
                                    ",",
                                    "."
                                  );
                                  const numericValue = parseFloat(rawValue);
                                  field.onChange(
                                    isNaN(numericValue)
                                      ? undefined
                                      : numericValue
                                  );
                                }}
                                value={field.value ?? ""}
                                placeholder="..."
                              />
                            )}
                          />
                          <Label>
                            m<sup>2</sup>
                          </Label>
                        </div>
                        <p className="text-red-warning">
                          {errors.terrain_area?.message}
                        </p>
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
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              value={field.value ?? ""}
                              placeholder="..."
                              min={0}
                            />
                          )}
                        />
                        <p className="text-red-warning">
                          {errors.rooms_number?.message}
                        </p>
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
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              value={field.value ?? ""}
                              placeholder="..."
                              min={0}
                            />
                          )}
                        />
                        <p className="text-red-warning">
                          {errors.bathrooms_number?.message}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-4 w-full flex items-center justify-between">
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={() => setIsOpen(false)}
                    className="w-[47%]"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    className="w-[47%]"
                  >
                    Check
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <Loading />
              </>
            )}
          </form>
        ) : (
          <>
            <Loading />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
