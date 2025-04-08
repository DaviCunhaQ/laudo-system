import Loading from "@/components/icons/loading";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMultiStep } from "@/context/Multistepper";
import { ServiceOrderFormTwoSchema, ViewDraftSchema } from "@/dtos";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";

export default function Form2({draftData}: {draftData?:ViewDraftSchema}) {
  const {
    goToNextStep,
    canGoToPrevStep,
    goToPrevStep,
    canGoToNextStep,
    currentStep,
    formData,
    setFormValue,
  } = useMultiStep();
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>(draftData?.form2?.property_type ? draftData.form2.property_type : (formData.form2?.property_type? formData.form2.property_type: ''))
  const [selectedPropertyStatus, setSelectedPropertyStatus] = useState<string>(draftData?.form2?.property_status ? draftData.form2.property_status as string : (formData.form2?.property_status? formData.form2.property_status as string : ''))
  const [selectedRegistrationOnSystem, setSelectedRegistrationOnSystem] = useState<string>(draftData?.form2?.registration_on_system ? draftData.form2.registration_on_system as string : (formData.form2?.registration_on_system? formData.form2.registration_on_system as string : ''))
  const [selectedSiopiCoincides, setSelectedSiopiCoincides] = useState<string>(draftData?.form2?.siopi_coincides ? draftData.form2.siopi_coincides as string : (formData.form2?.siopi_coincides? formData.form2.siopi_coincides as string : ''))
  const [selectedRegistrationType, setSelectedRegistrationType] = useState<string>(draftData?.form2?.registration_type ? draftData.form2.registration_type as string : (formData.form2?.registration_type? formData.form2.registration_type as string : ''))
  const [soType, setSoType] = useState<string>("")
  const onlyNumbers = (value: string) => value.replace(/\D/g, "");

  const documentOptions = [
    { label: "Matrícula", value: "Matrícula" },
    { label: "Habite-se", value: "Habite-se" },
    { label: "ART/RRT/TRT de Execução e Projeto", value: "ART/RRT/TRT de Execução e Projeto" },
    { label: "Declaração de Execução de Elementos Construtivos e Qualificação (Padrão Caixa)", value: "Declaração de Execução de Elementos Construtivos e Qualificação (Padrão Caixa)" },
    { label: "Todos estão legíveis", value: "Todos estão legíveis" }
  ];

  const dwellRegistrationOptions = [
    { label: "Endereço", value: "Endereço" },
    { label: "Proprietário", value: "Proprietário" },
    { label: "Área construída", value: "Área construída" },
    { label: "Está assinado pela prefeitura", value: "Está assinado pela prefeitura" }
  ];

  const artRegistrationCompareOptions = [
    { label: "Endereço da obra", value: "Endereço da obra" },
    { label: "Proprietário", value: "Proprietário" },
    { label: "Área construída", value: "Área construída" },
    { label: "Presença de serviços de Projeto e Execução", value: "Presença de serviços de Projeto e Execução" },
    { label: "O Documento deve estar assinado pelo Responsável Técnico", value: "O Documento deve estar assinado pelo Responsável Técnico" }
  ];

  const decRegistrationCompareOptions = [
    { label: "OBS:Proponente pode não estar coincidindo", value: "OBS:Proponente pode não estar coincidindo" },
    { label: "Responsável técnico é o mesmo da ART", value: "Responsável técnico é o mesmo da ART" },
    { label: "Número da ART", value: "Número da ART" },
    { label: "Todas as opções do documento estão marcadas", value: "Todas as opções do documento estão marcadas" },
    { label: "O documento deve estar assinado pelo responsável técnico", value: "O documento deve estar assinado pelo responsável técnico" }
  ];

  const minimalDocumentOptions = [
    { label: "PLS da etapa", value: "PLS da etapa" },
    { label: "Alvará de Construção", value: "Alvará de Construção" },
    { label: "Matrícula da Obra no CNO", value: "Matrícula da Obra no CNO" }
  ];

  const plsVerificationsOptions = [
    { label: "Os dados do proprietário do imóvel estão coincidentes com os demais documentos", value: "Os dados do proprietário do imóvel estão coincidentes com os demais documentos" },
    { label: "O Endereço está coincidindo com os demais documentos", value: "O Endereço está coincidindo com os demais documentos" },
    { label: "O RT está coincidindo com os demais documentos", value: "O RT está coincidindo com os demais documentos" },
    { label: "Dados da matrícula são coincidentes", value: "Dados da matrícula são coincidentes" },
    { label: "Data de assinatura do contrato está preenchida", value: "Data de assinatura do contrato está preenchida" },
    { label: "Porcentagens de incidência está coincidente com o Laudo aprovado", value: "Porcentagens de incidência está coincidente com o Laudo aprovado" },
    { label: "PLS está assinada pelo cliente e pelo RT", value: "PLS está assinada pelo cliente e pelo RT" }
  ];

  const moreAccurateOptions = [
    { label: "Distância para a esquina", value: "Distância para a esquina" },
    { label: "Coordenadas geográficas", value: "Coordenadas geográficas" }
  ];

  const mandatoryDocumentBOptions = [
    { label: "Proposta Construção Individual – PCI em Exel", value: "Proposta Construção Individual – PCI em Exel" },
    { label: "Proposta Construção Individual – PCI em PDF", value: "Proposta Construção Individual – PCI em PDF" },
    { label: `Projeto Legal aprovado pela Prefeitura Municipal (Obrigatório para B437, ou opcional para B438 desde que tenha a seguinte observação:"Enquadramento na condição excepcional informada na CE SUHAF/GEHAS/GEHAF 0036/2022")`, value: `Projeto Legal aprovado pela Prefeitura Municipal (Obrigatório para B437, ou opcional para B438 desde que tenha a seguinte observação:"Enquadramento na condição excepcional informada na CE SUHAF/GEHAS/GEHAF 0036/2022")` },
    { label: `Alvará (Obrigatório para B437, ou opcional para B438 desde que tenha a seguinte observação:"Enquadramento na condição excepcional informada na CE SUHAF/GEHAS/GEHAF 0036/2022")`, value: `Alvará (Obrigatório para B437, ou opcional para B438 desde que tenha a seguinte observação:"Enquadramento na condição excepcional informada na CE SUHAF/GEHAS/GEHAF 0036/2022")` },
    { label: "Matrícula do terreno", value: "Matrícula do terreno" },
    { label: "ART/RRT/TRT do projeto legal", value: "ART/RRT/TRT do projeto legal" },
    { label: "ART/RRT/TRT dos projetos estrutural, elétrico e hidrossanitário;", value: "ART/RRT/TRT dos projetos estrutural, elétrico e hidrossanitário;" },
    { label: "ART/RRT/TRT de Execução", value: "ART/RRT/TRT de Execução" },
  ];

  const pciVerificationsOptions = [
    { label: "Vigência da planilha (Última nov/2024)", value: "Vigência da planilha (Última nov/2024)" },
    { label: "Todos os campos obrigatórios em Roxo claro foram preenchidos (Existem alguns que não são obrigatórios)", value: "Todos os campos obrigatórios em Roxo claro foram preenchidos (Existem alguns que não são obrigatórios)" },
    { label: "Identificação está preenchida e coincidindo com os demais documentos (ART e Alvará)", value: "Identificação está preenchida e coincidindo com os demais documentos (ART e Alvará)" },
    { label: "Número da ART está correto", value: "Número da ART está correto" },
    { label: "Área construída está coincidente aos demais documentos", value: "Área construída está coincidente aos demais documentos" },
    { label: "Área do terreno está igual a matrícula", value: "Área do terreno está igual a matrícula" },
    { label: "A informação sobre o alvará está correta", value: "A informação sobre o alvará está correta" },
    { label: "As Incidências estão dentro dos limites aceitáveis", value: "As Incidências estão dentro dos limites aceitáveis" },
    { label: "Resumo dos custos está todo preenchido (Automático)", value: "Resumo dos custos está todo preenchido (Automático)" },
    { label: "Número de meses está coincidindo com o número de etapas no cronograma", value: "Número de meses está coincidindo com o número de etapas no cronograma" },
    { label: "O cronograma está fechado em 100%", value: "O cronograma está fechado em 100%" },
    { label: "Excel está igual ao PDF", value: "Excel está igual ao PDF" },
    { label: "Versão em PDF está legível e assiado pelo RT e pelo Cliente", value: "Versão em PDF está legível e assiado pelo RT e pelo Cliente" }
  ];

  const artPciVerificationOptions =[
    { label: "Endereço da obra", value: "Endereço da obra" },
    { label: "Proprietário", value: "Proprietário" },
    { label: "Área construída", value: "Área construída" },
    { label: "Presença de serviços de Projeto e Execução (Elétrico, Hidrossanitário e Estrutural)", value: "Presença de serviços de Projeto e Execução (Elétrico, Hidrossanitário e Estrutural)" },
    { label: "O Documento deve estar assinado pelo Responsável Técnico", value: "O Documento deve estar assinado pelo Responsável Técnico" }
  ]

  const projectPermitVerificationOptions =[
    { label: "Verificar Endereço", value: "Verificar Endereço" },
    { label: "Proprietário é o mesmo da ART e da PCI", value: "Proprietário é o mesmo da ART e da PCI" },
    { label: "Responsável técnico é o mesmo da ART e da PCI", value: "Responsável técnico é o mesmo da ART e da PCI" },
    { label: "Área construída está compatível", value: "Área construída está compatível" },
    { label: "Foi apresentado no mínimo projeto arquitetônico", value: "Foi apresentado no mínimo projeto arquitetônico" },
    { label: "O Projeto está assinado pelo responsável técnico e carimbado pela prefeitura.", value: "O Projeto está assinado pelo responsável técnico e carimbado pela prefeitura." },
    { label: "O Alvará está válido", value: "O Alvará está válido" }
  ]


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
      art_registration_compare: draftData?.form2?.art_registration_compare ? draftData.form2.art_registration_compare : formData.form2?.art_registration_compare,
      averbation_exists: draftData?.form2?.averbation_exists ? draftData.form2.averbation_exists : formData.form2?.averbation_exists,
      bathrooms_number: draftData?.form2?.bathrooms_number ? draftData.form2.bathrooms_number : formData.form2?.bathrooms_number,
      built_area: draftData?.form2?.built_area ? draftData.form2.built_area : formData.form2?.built_area,
      built_area_presents: draftData?.form2?.built_area_presents ? draftData.form2.built_area_presents : formData.form2?.built_area_presents,
      cpf: draftData?.form2?.cpf ? draftData.form2.cpf : formData.form2?.cpf,
      cnpj: draftData?.form2?.cnpj ? draftData.form2.cnpj : formData.form2?.cnpj,
      dec_registration_compare: draftData?.form2?.dec_registration_compare ? draftData.form2.dec_registration_compare : formData.form2?.dec_registration_compare,
      dwell_registration_compare: draftData?.form2?.dwell_registration_compare ? draftData.form2.dwell_registration_compare : formData.form2?.dwell_registration_compare,
      mandatory_documents: draftData?.form2?.mandatory_documents ? draftData.form2.mandatory_documents : formData.form2?.mandatory_documents,
      more_accurate_informations: draftData?.form2?.more_accurate_informations ? draftData.form2.more_accurate_informations : formData.form2?.more_accurate_informations,
      pci_art_compare: draftData?.form2?.pci_art_compare ? draftData.form2.pci_art_compare : formData.form2?.pci_art_compare,
      pci_verifications: draftData?.form2?.pci_verifications ? draftData.form2.pci_verifications : formData.form2?.pci_verifications,
      property_status: draftData?.form2?.property_status ? draftData.form2.property_status : formData.form2?.property_status,
      property_type: draftData?.form2?.property_type ? draftData.form2.property_type : formData.form2?.property_type,
      registration_date: draftData?.form2?.registration_date ? draftData.form2.registration_date : formData.form2?.registration_date,
      registration_on_system: draftData?.form2?.registration_on_system ? draftData.form2.registration_on_system : formData.form2?.registration_on_system,
      registration_type: draftData?.form2?.registration_type ? draftData.form2.registration_type : formData.form2?.registration_type,
      rooms_number: draftData?.form2?.rooms_number ? draftData.form2.rooms_number : formData.form2?.rooms_number,
      siopi_coincides: draftData?.form2?.siopi_coincides ? draftData.form2.siopi_coincides : formData.form2?.siopi_coincides,
      total_measured: draftData?.form2?.total_measured ? draftData.form2.total_measured : formData.form2?.total_measured,
      minimal_documentation: draftData?.form2?.minimal_documentation ? draftData.form2.minimal_documentation : formData.form2?.minimal_documentation,
      pls_verifications: draftData?.form2?.pls_verifications ? draftData.form2.pls_verifications : formData.form2?.pls_verifications,
      pls_built_situation: draftData?.form2?.pls_built_situation ? draftData.form2.pls_built_situation : formData.form2?.pls_built_situation,
      project_permit_verifications: draftData?.form2?.project_permit_verifications ? draftData.form2.project_permit_verifications : formData.form2?.project_permit_verifications,
      terrain_area: draftData?.form2?.terrain_area ? draftData.form2.terrain_area : formData.form2?.terrain_area,
      mandatory_documents_to_b: draftData?.form2?.mandatory_documents_to_b ? draftData.form2.mandatory_documents_to_b : formData.form2?.mandatory_documents_to_b,
    },
  });

  const [value, setValueLocal] = useState(draftData?.form2?.cpf ? draftData.form2.cpf : draftData?.form2?.cnpj ? draftData.form2.cnpj : formData.form2?.cpf ? formData.form2.cpf : formData.form2?.cnpj ? formData.form2.cnpj : "");

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
    console.log(data)
    setFormValue("form2", data);
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
