import { DialogHeader } from "@/components/TailwindDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/TailwindDialog";
import { useRef, useState } from "react";
import { FaCopy } from "react-icons/fa";
import { ServiceOrderListSchema, UpdateMessageSchema } from "@/dtos";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUpdateOrderService } from "@/hooks/order-services/useUpdateOrderService";
import { MdMessage } from "react-icons/md";
import { Textarea } from "@/components/ui/textarea";
import { IoLogoWhatsapp } from "react-icons/io";
import { useSendMessage } from "@/hooks/whatsapp/useSendMessage";
import { generateLinkForm } from "../HandleNewOrderServiceDialog";
import { useGetSoTypes } from "@/hooks/cities-sotypes/useGetSoTypes";

export default function HandleMessageDialog({
  orderData,
  id,
}: {
  orderData: ServiceOrderListSchema;
  id: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>();
  const updateOrderService = useUpdateOrderService();
  const sendMessage = useSendMessage();
  const { data: soTypes } = useGetSoTypes();

  const formLinkRef = useRef<HTMLInputElement>(null); // <-- Referência para o input

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateMessageSchema>({
    resolver: zodResolver(UpdateMessageSchema),
    defaultValues: {
      form_message: orderData?.form_message,
      hello_message: orderData?.hello_message,
    },
  });

  const onSubmit = (data: UpdateMessageSchema) => {
    updateOrderService
      .mutateAsync({
        id,
        ...data,
      })
      .then(() => {
        toast.success("Mensagem atualizada com sucesso!");
      });
  };

  const handleSendWhatsApp = () => {
    const number = "55" + orderData.contact_number?.replace(/\D/g, ""); // Remove tudo que não é número
    if (!number) return toast.error("Número de telefone inválido");

    const hello = orderData.hello_message || "";
    const form = orderData.form_message || "";

    const fullMessage = `${hello}\n\n${form}`;

    const payload = {
      number,
      body: fullMessage,
    };

    sendMessage.mutateAsync(payload);
  };

  const handleCopy = () => {
    if (formLinkRef.current) {
      navigator.clipboard.writeText(formLinkRef.current.value);
      toast.success("Link copiado com sucesso!");
    }
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
              <div className="w-full aspect-[2/1] bg-green-main rounded-md flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out shadow-[0px_8px_8px_0px_rgba(0,_0,_0,_0.1)]">
                <MdMessage color="#fff" size={26} />
                <p className="text-white font-semibold max-[500px]:hidden">
                  Mensagens
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Mensagens</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className="max-sm:!w-[400px] max-[500px]:!w-[300px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="max-[500px]:hidden">
          <h1 className="text-[1.5rem] text-secondary-color font-bold">
            Mensagens para o cliente
          </h1>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-6 max-sm:mt-10"
        >
          <div className="w-full h-auto flex flex-col gap-[1rem]">
            <div className="flex flex-col gap-4 items-center w-full max-[1200px]:flex-col max-[1200px]:justify-center">
              <div className="flex flex-col w-full gap-2 max-[1200px]:w-full">
                <Label>Link do Formulário</Label>
                <div className="w-full flex items-center gap-2">
                  <Input
                    ref={formLinkRef}
                    style={{ width: "100%" }}
                    type="text"
                    readOnly
                    value={generateLinkForm(
                      orderData.company,
                      soTypes?.find((item) => item.id === orderData.order_type)
                        ?.code as string
                    )}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-[36px] h-[36px] p-0"
                    onClick={handleCopy}
                  >
                    <FaCopy size={18} />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col w-full gap-2 max-[1200px]:w-full">
                <Label>Mensagem de Apresentação</Label>
                <Textarea
                  className="h-[120px] min-h-[120px] max-h-[120px] min-w-full max-w-full"
                  {...register("hello_message")}
                  placeholder="Mensagem de Apresentação..."
                />
                {errors.hello_message?.message && (
                  <p className="text-red-warning">
                    {errors.hello_message?.message}
                  </p>
                )}
                <div className="w-full flex items-center justify-center gap-2">
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    className="w-1/2"
                  >
                    Atualizar
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-[36px] h-[36px] p-0"
                    onClick={() => {
                      const text = orderData.hello_message || "";
                      navigator.clipboard.writeText(text);
                      toast.success("Mensagem de apresentação copiada!");
                    }}
                  >
                    <FaCopy size={18} />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col w-full gap-2 max-[1200px]:w-full">
                <Label>Mensagem do Formulário</Label>
                <Textarea
                  className="h-[145px] min-h-[145px] max-h-[145px] min-w-full max-w-full"
                  {...register("form_message")}
                  placeholder="Mensagem do Formulário..."
                />
                {errors.form_message?.message && (
                  <p className="text-red-warning">
                    {errors.form_message?.message}
                  </p>
                )}
                <div className="w-full flex items-center justify-center gap-2">
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    className="w-1/2"
                  >
                    Atualizar
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-[36px] h-[36px] p-0"
                    onClick={() => {
                      const text = orderData.form_message || "";
                      navigator.clipboard.writeText(text);
                      toast.success("Mensagem com formulário copiada!");
                    }}
                  >
                    <FaCopy size={18} />
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-4 w-full flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="w-[47%]"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSendWhatsApp}
                type="button"
                isLoading={isSubmitting}
                className="w-[47%]"
              >
                Enviar <IoLogoWhatsapp />
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
