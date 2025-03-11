"use client";

import {
   Drawer,
   DrawerContent,
   DrawerDescription,
   DrawerFooter,
   DrawerHeader,
   DrawerTitle,
   DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { isValidCpf } from "../helpers/validate-cpf";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PatternFormat } from "react-number-format";
import { ConsumptionMethod } from "@prisma/client";
import { useParams, useSearchParams } from 'next/navigation';
import { useContext, useState, useTransition } from "react";
import { CartContext } from "../contexts/cart";
import { createOrder } from "../actions/create-orders";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";



const formSchema = z.object({
   nome: z.string().trim().min(1, { message: "O nome é obrigatório!" }),
   cpf: z.string().refine((value) => isValidCpf(value), { message: "CPF inválido" }),
});

type FormSchema = z.infer<typeof formSchema>;

const FinishOrderButton = () => {
   const { slug } = useParams<{ slug: string }>();
   const { products } = useContext(CartContext);
   const searchParams = useSearchParams();
   const [isPending, startTransition] = useTransition();
   const form = useForm<FormSchema>({
      resolver: zodResolver(formSchema),
      mode: "onBlur",
      defaultValues: {
         nome: "",
         cpf: "",
      },
   });

   const [isOpen, setIsOpen] = useState(false);

   const onSubmit = async (data: FormSchema) => {
      try {
         const consumptionMethod = searchParams.get("consumptionMethod") as ConsumptionMethod;
         startTransition(async () => {
            await createOrder({
               consumptionMethod,
               customerName: data.nome,
               customerCpf: data.cpf,
               products,
               slug,
            });
            toast.success("Pedido finalizado com sucesso!");

            form.reset();
            setIsOpen(false);

         });

      } catch (error) {
         toast.error("Erro ao finalizar pedido!");
      }
   };

   return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
         <DrawerTrigger asChild>
            <Button className="w-full rounded-full" onClick={() => setIsOpen(true)}>Finalizar pedido</Button>
         </DrawerTrigger>
         <DrawerContent>
            <DrawerHeader>
               <DrawerTitle>Finalizar pedido</DrawerTitle>
               <DrawerDescription>Insira suas informações abaixo para finalizar pedido</DrawerDescription>
            </DrawerHeader>

            <div className="p-5">
               <FormProvider {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                     {/* Nome */}
                     <FormField
                        control={form.control}
                        name="nome"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Seu nome</FormLabel>
                              <FormControl>
                                 <Input placeholder="Digite seu nome..." {...field} className="rounded-full" />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     {/* CPF */}
                     <FormField
                        control={form.control}
                        name="cpf"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Seu CPF</FormLabel>
                              <FormControl>
                                 <PatternFormat
                                    placeholder="Digite seu CPF..."
                                    format="###.###.###-##"
                                    customInput={Input}
                                    {...field}
                                    className="rounded-full"
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <DrawerFooter>
                        <Button
                           type="submit"
                           variant="destructive"
                           className="rounded-full"
                           disabled={isPending}
                        >
                           {isPending && <Loader2Icon className="animate-spin" />}
                           Finalizar
                        </Button>

                        <Button
                           variant="outline"
                           className="rounded-full"
                           onClick={() => {
                              setIsOpen(false);
                              form.reset();
                           }}
                        >
                           Cancelar
                        </Button>
                     </DrawerFooter>
                  </form>
               </FormProvider>
            </div>
         </DrawerContent>
      </Drawer>
   );
};

export default FinishOrderButton;