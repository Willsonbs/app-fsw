import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { useContext } from "react";
import { CartContext } from "../contexts/cart";

const CartSheet = () => {
   const { isOpen, toggleCart } = useContext(CartContext);
   return (
      <Sheet open={isOpen} onOpenChange={toggleCart}>
         <SheetContent>
            <SheetHeader>
               <SheetTitle>Você tem certeza?</SheetTitle>
               <SheetDescription>
                  Essa ação não pode ser desfeita.
               </SheetDescription>
            </SheetHeader>
         </SheetContent>

      </Sheet>
   );
}

export default CartSheet;