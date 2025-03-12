import { db } from "@/lib/prisma";

import { isValidCpf, removeCpfPontuation } from "../menu/helpers/validate-cpf";
import CpfForm from "./components/cpf-form";
import OrderList from "./components/order-list";

interface OrdersPageProps {
   searchParams: Promise<{ cpf: string }>;
}

const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
   const { cpf } = await searchParams;
   if (!cpf) {
      return <CpfForm />;
   }
   if (!isValidCpf(cpf)) {
      return <CpfForm />;
   }

   const orders = await db.order.findMany({
      where: { customerCpf: removeCpfPontuation(cpf) },
      include: {
         restaurant: {
            select: {
               name: true,
               avatarImageUrl: true,
            }
         },
         orderProducts: {
            include: {
               product: true,
            },
         },
      },
      orderBy: { id: "asc" },
      //{status: "asc"},{id: "desc"} exibir os pedidos concluídos no final e os pedidos mais recentes primeiro dentro de cada categoria.
   });

   return (
      <OrderList orders={orders} />
   );
};

export default OrdersPage;