import { IMaskInput } from "react-imask";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMultiStep } from "@/context/Multistepper";
import { ServiceOrderFormOneSchema, ViewDraftSchema } from "@/dtos";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useContext, useEffect, useState } from "react";
import { useGetCities } from "@/hooks/cities-sotypes/useGetCities";
import { useGetSoTypes } from "@/hooks/cities-sotypes/useGetSoTypes";
import { AuthContext } from "@/context/authContext";

export default function Form1 ({draftData}: {draftData?:ViewDraftSchema}){
    const { goToNextStep, canGoToPrevStep, goToPrevStep, canGoToNextStep , currentStep , setFormValue , formData} =
    useMultiStep();

    const {company} = useContext(AuthContext)

    const { data: cities } = useGetCities()
    const { data: osTypes } = useGetSoTypes()

    const [selectedCity , setSelectedCity] = useState<string>(draftData?.form1?.city ? draftData.form1.city : (formData.form1?.city? formData.form1.city: ''))
    const [selectedOrderType , setSelectedOrderType] = useState<string>(draftData?.form1?.order_type ? draftData.form1?.order_type : (formData.form1?.order_type? formData.form1?.order_type: ''))
    const [isValueVisible, setIsValueVisible] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors, isSubmitting},
      } = useForm<ServiceOrderFormOneSchema>({
        resolver: zodResolver(ServiceOrderFormOneSchema),
        defaultValues: {
            displacement_value: draftData?.form1?.displacement_value ? draftData.form1.displacement_value : formData.form1?.displacement_value ? formData.form1.displacement_value : "",
            service_value: draftData?.form1?.service_value ? draftData.form1.service_value : formData.form1?.service_value ? formData.form1.service_value : "",
            city: draftData?.form1?.city ? draftData.form1.city : formData.form1?.city,
            client_name: draftData?.form1?.client_name ? draftData.form1.client_name : formData.form1?.client_name,
            company: company,
            contact_name: draftData?.form1?.contact_name ? draftData.form1.contact_name : formData.form1?.contact_name,
            contact_number: draftData?.form1?.contact_number ? draftData.form1.contact_number : formData.form1?.contact_number,
            order_number: draftData?.form1?.order_number ? draftData.form1.order_number : formData.form1?.order_number,
            order_type: draftData?.form1?.order_type ? draftData.form1.order_type : formData.form1?.order_type,
            opening_date: draftData?.form1?.opening_date ? draftData.form1.opening_date : formData.form1?.opening_date,
            rgi_registration: draftData?.form1?.rgi_registration ? draftData.form1.rgi_registration : formData.form1?.rgi_registration,
        }
      });

      useEffect(()=>{
        if(selectedOrderType){
            const selectedOsType = osTypes?.find((osType) => osType.id === selectedOrderType)
            if(selectedOsType?.service_value === null){
                setIsValueVisible(true)
            }else{
                setIsValueVisible(false)
                setValue("service_value", "")
                setValue("displacement_value", "")
            }
        }else{
            setIsValueVisible(false)
            setValue("service_value", "")
            setValue("displacement_value", "")
        }
    },[selectedOrderType])

      const onSubmit = (data: ServiceOrderFormOneSchema) => {
        // createOccurrence.mutateAsync(data).then(()=>goToNextStep()).catch((error)=>{console.error(error)})
        const osTypeCode = osTypes?.find((osType) => osType.id === selectedOrderType)?.code
        localStorage.setItem('currentOsType', osTypeCode as string)
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
                                Cidade
                            </Label>
                            <Controller
                            control={control}
                            name="city"
                            render={({ field }) => (
                                <Select 
                                    {...field}
                                    value={selectedCity} 
                                    onValueChange={(value) => {
                                        setSelectedCity(value as string)
                                        field.onChange(value)
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione uma cidade..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {cities?.map((city)=>{
                                            return(
                                                <SelectItem value={city.id}>{city.name}</SelectItem>
                                            )
                                        })}
                                    </SelectContent>
                                </Select>
                            )}/>
                            <p className="text-red-warning">{errors.city?.message}</p>
                        </div>
                        <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full">
                            <Label>
                                Tipo de O.S.
                            </Label>
                            <Controller 
                            control = {control}	
                            name="order_type"
                            render={({ field }) => (
                                <Select 
                                {...field}
                                value={selectedOrderType} 
                                onValueChange={(value) => {
                                    setSelectedOrderType(value as string)
                                    field.onChange(value)
                                }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Tipo de O.S..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {osTypes?.map((osType)=>{
                                            return(
                                                <SelectItem value={osType.id}>{osType.code}</SelectItem>
                                            )
                                        })}
                                    </SelectContent>
                                </Select>
                            )}
                            />
                            <p className="text-red-warning">{errors.order_type?.message}</p>
                        </div>
                    </div>
                    {isValueVisible && (
                        <div className="flex justify-between items-center w-full max-[1200px]:flex-col max-[1200px]:justify-center">
                            <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full max-[1200px]:mb-4">
                                <Label>
                                    Valor do Serviço
                                </Label>
                                <Input type="text" {...register("service_value")} placeholder="Valor do Serviço..." required/>
                                <p className="text-red-warning">{errors.service_value?.message}</p>
                            </div>
                            <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full">
                                <Label>
                                    Valor do Deslocamento
                                </Label>
                                <Input type="text" {...register("displacement_value")} placeholder="Valor do Deslocamento..." required/>
                                <p className="text-red-warning">{errors.displacement_value?.message}</p>
                            </div>
                        </div>
                    )}
                    
                    <div className="flex justify-between items-center w-full max-[1200px]:flex-col max-[1200px]:justify-center">
                        <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full max-[1200px]:mb-4">
                            <Label>
                                Número da O.S.
                            </Label>
                            <Input type="text" {...register("order_number")} placeholder="Número da O.S..."/>
                            <p className="text-red-warning">{errors.order_number?.message}</p>
                        </div>
                        <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full">
                            <Label>
                                Nome do cliente
                            </Label>
                            <Input type="text" {...register("client_name")} placeholder="Nome do cliente..."/>
                            <p className="text-red-warning">{errors.client_name?.message}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center w-full max-[1200px]:flex-col max-[1200px]:justify-center">
                        <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full max-[1200px]:mb-4">
                            <Label>
                                Matrícula do RGI
                            </Label>
                            <Input type="text" {...register("rgi_registration")} placeholder="Matrícula do RGI..."/>
                            <p className="text-red-warning">{errors.rgi_registration?.message}</p>
                        </div>
                        <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full">
                            <Label>
                                Data de abertura
                            </Label>
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
                            <p className="text-red-warning">{errors.opening_date?.message}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center w-full max-[1200px]:flex-col max-[1200px]:justify-center">
                        <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full max-[1200px]:mb-4">
                            <Label>
                                Nome do contato
                            </Label>
                            <Input type="text" {...register("contact_name")} placeholder="Nome do contato..."/>
                            <p className="text-red-warning">{errors.contact_name?.message}</p>
                        </div>
                        <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full">
                            <Label>
                                Número do Contato
                            </Label>
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
                            <p className="text-red-warning">{errors.contact_number?.message}</p>
                        </div>
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
            </form>
        </>
    )
}