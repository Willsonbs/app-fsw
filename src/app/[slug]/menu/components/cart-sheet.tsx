import { useContext } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
} from "@/components/ui/sheet";
import FormatCurrency from "@/helpers/format-currency";

import { CartContext } from "../contexts/cart";
import CartProductItem from "./cart-product-item";
import FinishOrderButton from "./finisher-order-button";

const CartSheet = () => {
   const { isOpen, toggleCart, products, total } = useContext(CartContext);
   return (
      <Sheet open={isOpen} onOpenChange={toggleCart}>
         <SheetContent className="w-[90%]">
            <SheetHeader>
               <SheetTitle className="text-left">Confira o seu pedido!</SheetTitle>
               <SheetDescription>

               </SheetDescription>
            </SheetHeader>
            <div className="space-y-2 py-5 flex flex-col h-full">
               <div className="flex-auto">
                  {products.map(product => (
                     <CartProductItem key={product.id} product={product} />
                  ))}
               </div>
               <Card className="mb-6">
                  <CardContent className="p-5">
                     <div className="flex justify-between">
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="font-semibold text-sm">{FormatCurrency(total)}</p>
                     </div>
                  </CardContent>
               </Card>
               <FinishOrderButton />
            </div>
         </SheetContent>

      </Sheet>
   );
}

export default CartSheet;