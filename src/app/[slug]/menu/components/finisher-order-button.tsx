
"use client"

import {
   Drawer,
   DrawerClose,
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
import { FormProvider, useForm, Form } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PatternFormat } from "react-number-format"; 


const formSchema = z.object({
   nome: z.string().trim().min(1, { message: "O nome é obrigatório!" }),
   cpf: z.string().refine((value) => isValidCpf(value), { message: "CPF inválido" }),

});

type FormSchema = z.infer<typeof formSchema>

const FinishOrderButton = () => {
   const form = useForm<FormSchema>({
      resolver: zodResolver(formSchema),
      mode: "onBlur",
      defaultValues: {
         nome: "",
         cpf: "",
      },
   });

   const onSubmit = (data: FormSchema) => {
      console.log(data);
   };

   return (
      <Drawer>
         <DrawerTrigger asChild>
            <Button className="w-full rounded-full">Finalizar pedido</Button>
         </DrawerTrigger>
         <DrawerContent>
            <DrawerHeader>
               <DrawerTitle>Finalizar pedido</DrawerTitle>
               <DrawerDescription>Insira suas informações abaixo para finalizar pedido</DrawerDescription>
            </DrawerHeader>


            <div className="p-5">
               <FormProvider {...form}>
                  {/*Nome*/}
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                     <FormField
                        control={form.control}
                        name="nome"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Seu nome</FormLabel>
                              <FormControl>
                                 <Input placeholder="Digite seu nome..." {...field} className="rounded-full"/>
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     {/*CPF*/}
                     <FormField
                        control={form.control}
                        name="cpf"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel> Seu CPF</FormLabel>
                              <FormControl>
                                 <PatternFormat 
                                 placeholder="Digite seu CPF..." 
                                 format="###.###.###-##"
                                 customInput={Input}
                                 {...field}
                                 className="rounded-full"/>
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <DrawerFooter>
                        <Button type="submit" variant="destructive" className="rounded-full">Finalizar</Button>
                        <DrawerClose asChild>
                           <Button variant="outline" className="rounded-full" onClick={() => form.reset()}>Cancelar</Button>
                        </DrawerClose>
                     </DrawerFooter>
                  </form>
               </FormProvider>
            </div>



         </DrawerContent>
      </Drawer>

   );
}

export default FinishOrderButton;