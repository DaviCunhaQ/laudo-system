
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { ComboboxDemo, IComboArrayItem } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMultiStep } from "@/context/Multistepper";
import { OccurrenceSchema, ViewDraftSchema } from "@/dtos";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import cuid from "cuid"

export default function Form1 ({draftData}: {draftData?:ViewDraftSchema}){
    const { goToNextStep, canGoToPrevStep, goToPrevStep, canGoToNextStep , currentStep , setFormValue , formData} =
    useMultiStep();

    const statusArray: IComboArrayItem[] = [
        {
            value: "ABERTO",
            label: "Aberto",
        },{
            value: "EM_PROGRESSO",
            label: "Sob Investigação",
        },{
            value: "ENCERRADO",
            label: "Concluído",
        }
    ]

    const trafficImpactArray: IComboArrayItem[] = [
        {
            value: "BLOQUEIO_PARCIAL",
            label: "Bloqueio parcial",
        },{
            value: "BLOQUEIO_TOTAL",
            label: "Bloqueio total",
        },{
            value: "CONGESTIONAMENTO_INTENSO",
            label: "Congestionamento intenso",
        },{
            value: "CONGESTIONAMENTO_LEVE",
            label: "Congestionamento leve",
        },{
            value: "CONGESTIONAMENTO_MODERADO",
            label: "Congestionamento moderado",
        },{
            value: "DESVIO_NECESSARIO",
            label: "Desvio necessário",
        },{
            value: "SEM_IMPACTO",
            label: "Sem impacto",
        },{
            value: "TRANSITO_LENTO",
            label: "Transito lento",
        }
    ]

    const categoryArray: IComboArrayItem[] = [
        {
            value: "Acidente",
            label: "Acidente",
        },{
            value: "Engarrafamento",
            label: "Engarrafamento",
        },{
            value: "Pane mecânica",
            label: "Pane mecânica",
        },{
            value: "Obstrução de via",
            label: "Obstrução de via",
        },{
            value: "Evento de Trânsito",
            label: "Evento de Trânsito",
        }
    ]

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting},
        control,
      } = useForm<OccurrenceSchema>({
        resolver: zodResolver(OccurrenceSchema),
        defaultValues: {
            id: draftData?.form1?.id ? draftData.form1.id : formData.form1?.id ? formData.form1.id : cuid(),
            accompaniment: draftData?.form1?.accompaniment ? draftData.form1.accompaniment : formData.form1?.accompaniment,
            category: draftData?.form1?.category ? draftData.form1.category : formData.form1?.category,
            comments: draftData?.form1?.comments ? draftData.form1.comments : formData.form1?.comments,
            description: draftData?.form1?.description ? draftData.form1.description : formData.form1?.description,
            details: draftData?.form1?.details ? draftData.form1.details : formData.form1?.details,
            materialDamage: draftData?.form1?.materialDamage ? draftData.form1.materialDamage : formData.form1?.materialDamage,
            registeredAt: draftData?.form1?.registeredAt ? (draftData.form1.registeredAt
                ? new Date(draftData.form1.registeredAt).toISOString().slice(0, 16) // Converte para "YYYY-MM-DDTHH:MM"
                : "") : formData.form1?.registeredAt
                ? new Date(formData.form1.registeredAt).toISOString().slice(0, 16) // Converte para "YYYY-MM-DDTHH:MM"
                : "",
            status: draftData?.form1?.status ? draftData.form1.status : formData.form1?.status,
            subcategory: draftData?.form1?.subcategory ? draftData.form1.subcategory : formData.form1?.subcategory,
            trafficImpact: draftData?.form1?.trafficImpact ? draftData.form1.trafficImpact : formData.form1?.trafficImpact,
        }
      });

      const onSubmit = (data: OccurrenceSchema) => {
        // createOccurrence.mutateAsync(data).then(()=>goToNextStep()).catch((error)=>{console.error(error)})
        setFormValue("form1" , data)
        goToNextStep()
      };

    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-6">
                <div className="w-full h-auto flex flex-col gap-[1rem]">
                    <div className="flex justify-between items-center w-full max-[1200px]:flex-col max-[1200px]:justify-center">
                        <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full max-[1200px]:mb-4">
                            <Label>
                                Categoria principal
                            </Label>
                            <ComboboxDemo 
                                control={control}
                                placeholder="Selecione..." 
                                searchPlaceholder="Procurar..." 
                                emptyMessage="Categoria não encontrada"
                                array={categoryArray}
                                {...register("category")}
                            />
                            <p className="text-red-warning">{errors.category?.message}</p>
                        </div>
                        <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full">
                            <Label>
                                Subcategoria (opcional)
                            </Label>
                            <Input {...register("subcategory")} type="text" placeholder="colisão traseira, colisão lateral, atropelamento de pedestre, tombamento de caminhão, etc. (caso seja necessário detalhar ainda mais)..."/>
                            <p className="text-red-warning">{errors.subcategory?.message}</p>
                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <Label>
                            Relato resumido
                        </Label>
                        <Textarea {...register("description")} placeholder="Breve descrição textual do que ocorreu..."/>
                        <p className="text-red-warning">{errors.description?.message}</p>
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <Label>
                            Detalhamento
                        </Label>
                        <Textarea {...register("details")} placeholder="Condições climáticas, estado da via, presença de buracos, sinalização deficiente, etc..."/>
                        <p className="text-red-warning">{errors.details?.message}</p>
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <Label>
                            Comentários adicionais
                        </Label>
                        <Textarea {...register("comments")} placeholder="perícia realizada, laudos emitidos ou outras diligências."/>
                        <p className="text-red-warning">{errors.comments?.message}</p>
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <Label>
                            Responsável pelo acompanhamento
                        </Label>
                        <Input {...register("accompaniment")} type="text" placeholder="órgão público, empresa privada, seguro, etc."/>
                        <p className="text-red-warning">{errors.accompaniment?.message}</p>
                    </div>
                    {/* <div className="flex flex-col w-full gap-2">
                        <Label>
                            Fotos/anexos (opcional)
                        </Label>
                        <Input type="file"/>
                    </div> */}
                    <div className="flex justify-between items-center w-full max-[1200px]:flex-col max-[1200px]:justify-center">
                        <div className="flex flex-col w-[30%] gap-2 max-[1200px]:w-full max-[1200px]:mb-4">
                            <Label>
                                Status
                            </Label>
                            <ComboboxDemo 
                            control={control}
                            placeholder="Selecione..." 
                            searchPlaceholder="Procurar status..." 
                            emptyMessage="Status não encontrado"
                            array={statusArray}
                            {...register("status")}
                            />
                            <p className="text-red-warning">{errors.status?.message}</p>
                        </div>
                        <div className="flex flex-col w-[30%] gap-2 max-[1200px]:w-full max-[1200px]:mb-4">
                            <Label>
                                Impacto no trânsito
                            </Label>
                            <ComboboxDemo 
                            control={control}
                            placeholder="Selecione..." 
                            searchPlaceholder="Procurar impacto..." 
                            emptyMessage="impacto não encontrado"
                            array={trafficImpactArray}
                            {...register("trafficImpact")}
                            />
                            <p className="text-red-warning">{errors.trafficImpact?.message}</p>
                        </div>
                        <div className="flex w-[30%] items-center justify-between max-[1200px]:w-full">
                            <div className="flex flex-col w-full gap-2">
                                <Label>
                                    Data e hora do ocorrido
                                </Label>
                                <Input {...register("registeredAt")} type="datetime-local"/>
                                <p className="text-red-warning">{errors.registeredAt?.message}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <Label>
                            Danos materiais
                        </Label>
                        <Textarea {...register("materialDamage")} placeholder="avarias em veículos ou infraestrutura..."/>
                        <p className="text-red-warning">{errors.materialDamage?.message}</p>
                    </div>
                    <CardFooter className={`flex px-0 pt-8 ${currentStep === 1 ? 'justify-between' : 'justify-end'} gap-4 w-full`}>
                        {currentStep === 1 && (
                            <Link to="/">
                            <Button type="button" variant={"outline"}>
                                Voltar
                            </Button>
                            </Link>
                        )}
                        {canGoToPrevStep && (
                            <Button onClick={goToPrevStep} variant={"outline"}>
                            <ChevronLeft /> Anterior
                            </Button>
                        )}
                        <Button type="submit" isLoading={isSubmitting} className="max-sm:w-[70px]">
                            {canGoToNextStep ? "Próximo" : "Finalizar"}
                            <ChevronRight className="max-sm:hidden"/>
                        </Button>
                    </CardFooter>
                </div>
                {/* <div className="w-[47%] h-auto flex flex-col gap-4">
                    <div className="w-full flex flex-col items-center gap-4">
                        <div className="flex w-full flex-col items-end justify-start gap-4">
                            <div className="flex items-center justify-between w-full">
                                <div className="flex flex-col w-[47%] gap-2">
                                    <Label>
                                        Rua
                                    </Label>
                                    <Input type="text" placeholder="Rua..."/>
                                </div>
                                <div className="flex flex-col w-[47%] gap-2">
                                    <Label>
                                        Ponto de referência
                                    </Label>
                                    <Input type="text" placeholder="Ponto de referência..."/>
                                </div>
                            </div>
                            <div className="flex items-center justify-between w-full">
                                <div className="flex flex-col w-[47%] gap-2">
                                    <Label>
                                        Estado
                                    </Label>
                                    <Input type="text" placeholder="Estado..."/>
                                </div>
                                <div className="flex flex-col w-[47%] gap-2">
                                    <Label>
                                        Número
                                    </Label>
                                    <Input type="number" placeholder="Número..."/>
                                </div>
                            </div>
                            <div className="flex items-center justify-between w-full">
                                <div className="flex flex-col w-[47%] gap-2">
                                    <Label>
                                        Bairro
                                    </Label>
                                    <Input type="text" placeholder="Bairro..."/>
                                </div>
                                <div className="flex flex-col w-[47%] gap-2">
                                    <Label>
                                        Cidade
                                    </Label>
                                    <Input type="text" placeholder="Cidade..."/>
                                </div>
                            </div>
                            <div className="flex flex-col w-full gap-2">
                                <Label>
                                    Geolocalização
                                </Label>
                                <Input type="text"/>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-row items-center justify-between">

                    </div>



                    <div className="flex w-full flex-col items-end justify-start gap-6">
                        
                        <div className="flex flex-col w-full gap-2">
                            <Label>
                                Agentes/viatura envolvidos
                            </Label>
                            <Input type="text" placeholder="Agentes envolvidos..."/>
                        </div>
                    </div>
                    <div className="flex w-full flex-col items-end justify-start gap-4">
                        <div className="flex flex-col w-full gap-2">
                            <Label>
                                Número de veículos envolvidos
                            </Label>
                            <Input type="text" placeholder="quantos carros, motos, caminhões, bicicletas, etc..."/>
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <Label>
                                Dados de cada veículo
                            </Label>
                            <Textarea placeholder="placa, modelo, cor, proprietário (pessoa física ou jurídica)..."/>
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <Label>
                                Dados do(s) condutor(es)
                            </Label>
                            <Textarea placeholder="nome, CNH, contato (telefone ou email), se estava habilitado ou não, e outras informações relevantes..."/>
                        </div>
                    </div>
                    <div className="flex w-full flex-col items-end justify-start gap-4">
                        <div className="flex flex-col w-full gap-2">
                            <Label>
                                Vítimas
                            </Label>
                            <Textarea placeholder="feridos ou óbitos, quantos, gravidade dos ferimentos..."/>
                        </div>
                    </div>
                    <div className="flex w-full flex-col items-end justify-start gap-4">
                        <div className="flex flex-col w-full gap-2">
                            <Label>
                                Autoridades acionadas
                            </Label>
                            <Textarea placeholder="polícia, bombeiros, SAMU, concessionária de rodovia..."/>
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <Label>
                                Tempo de resposta
                            </Label>
                            <Input type="text" placeholder="quanto tempo demorou para o atendimento chegar..."/>
                        </div>
                    </div>
                    <div className="flex w-full flex-col items-end justify-start gap-4">
                        
                        <div className="flex flex-col w-full gap-2">
                            <Label>
                                Responsável pelo acompanhamento
                            </Label>
                            <Input type="text" placeholder="órgão público, empresa privada, seguro, etc."/>
                        </div>
                    </div>
                    <div className="flex w-full flex-col items-end justify-start gap-4">
                        <div className="flex flex-col w-full gap-2">
                            <Label>
                                Assinatura digital (validação)
                            </Label>
                            <Input type="file"/>
                        </div>
                    </div>
                </div> */}
            </form>
        </>
    )
}