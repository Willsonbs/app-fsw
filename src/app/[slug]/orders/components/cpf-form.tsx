"use client"
import {
   Drawer,
   DrawerContent,
   DrawerClose,
   DrawerFooter,
   DrawerHeader,
   DrawerTrigger,
   DrawerTitle,
   DrawerDescription,
} from "@/components/ui/drawer";

import { Input } from "@/components/ui/input"
import { z } from "zod";
import { isValidCpf, removeCpfPontuation } from "../../menu/helpers/validate-cpf";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { PatternFormat } from "react-number-format";
import { usePathname, useRouter } from "next/navigation"

import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"



const formSchema = z.object({

   cpf: z.string().refine((value) => isValidCpf(value), { message: "CPF inválido" }),
});

type FormSchema = z.infer<typeof formSchema>;
const CpfForm = () => {
   const form = useForm<FormSchema>({
      resolver: zodResolver(formSchema),

   });

   const router = useRouter()

   const pathname = usePathname();

   const onSubmit = (data: FormSchema) => {
      router.push(`${pathname}?cpf=${removeCpfPontuation(data.cpf)}`)
   };

   const handleCancel = () => {
      router.back();
   };

   return (
      <Drawer open>
         <DrawerTrigger>Open</DrawerTrigger>
         <DrawerContent>
            <DrawerHeader>
               <DrawerTitle>Visualizar pedido</DrawerTitle>
               <DrawerDescription>Insira seu CPF para visualizar o pedido</DrawerDescription>

               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                     <FormField
                        control={form.control}
                        name="cpf"
                        render={({ field }) => (
                           <FormItem className="px-4">
                              <FormLabel></FormLabel>
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
                        <Button variant="destructive" className="w-full rounded-full">
                           Confirmar
                        </Button>
                        <DrawerClose asChild>
                           <Button variant="outline" className="w-full rounded-full" onClick={handleCancel}>
                              Cancelar
                           </Button>
                        </DrawerClose>
                     </DrawerFooter>
                  </form>
               </Form>
            </DrawerHeader>
         </DrawerContent>
      </Drawer>

   );
}

export default CpfForm;