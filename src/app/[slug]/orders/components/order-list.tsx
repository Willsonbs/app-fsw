"use client";

import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import FormatCurrency from "@/helpers/format-currency";
import { useRouter } from "next/navigation";


interface OrderListProps {
   orders: Array<
      Prisma.OrderGetPayload<{
         include: {
            restaurant: {
               select: {
                  name: true,
                  avatarImageUrl: true,
               };
            };
            orderProducts: {
               include: {
                  product: true,
               }
            }
         },
      }>
   >;
};

const getStatusLabel = (status: OrderStatus) => {
   switch (status) {
      case OrderStatus.PENDING:
         return "Pendente";
      case OrderStatus.IN_PREPARATION:
         return "Preparando";
      case OrderStatus.DELIVERED:
         return "Entregando";
      case OrderStatus.CANCELLED:
         return "Cancelado";
      case OrderStatus.FINISH:
         return "Concluído";
      default:
         return "Em andamento";
   }
}

const OrderList = ({ orders }: OrderListProps) => {


   const router = useRouter();
   const handleBackClick = () =>
      router.back();

   return (
      <div className="space-y-6 p-6">
         <Button
            size="icon"
            variant="secondary"
            className="rounded-full"
            onClick={handleBackClick}
         >
            <ChevronLeftIcon />
         </Button>
         <div className="flex items-center gap-3">
            <ScrollTextIcon />
            <h2 className="text-lg font-semibold">Meus Pedidos</h2>
         </div>
         {orders.map(order => (

            <Card key={order.id}>
               <CardContent className="p-5 space-y-5">
                  <p className="font-semibold ">Pedido: {order.id}</p>
                  <div className={`w-fit rounded-full px-2 text-xs font-semibold text-white p-1
                     ${order.status === OrderStatus.FINISH ? "bg-green-400 text-white" : "bg-gray-200 text-gray-500"}`
                  }>
                     {getStatusLabel(order.status)}
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="relative h-5 w-5">
                        <Image
                           src={order.restaurant.avatarImageUrl}
                           alt={order.restaurant.name}
                           className="rounded-sm"
                           fill />
                     </div>
                     <p className="text-sm font-semibold">{order.restaurant.name}</p>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                     {order.orderProducts.map(orderProduct => (
                        <div key={orderProduct.id} className="flex items-center gap-2">
                           <div className="h-5 w-5 flex items-center justify-center rounded-full bg-gray-400 text-xs font font-semibold text-white">
                              {orderProduct.quantity}
                           </div>
                           <p className="text-sm">{orderProduct.product.name}</p>
                        </div>
                     ))}
                  </div>
                  <Separator />
                  <p className="text-sm font-medium">{FormatCurrency(order.total)}</p>
               </CardContent>
            </Card>


         ))
         }
      </div >
   );
}

export default OrderList;