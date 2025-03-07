import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { useContext } from "react";
import { CartContext } from "../contexts/cart";
import CartProductItem from "./cart-product-item";

const CartSheet = () => {
   const { isOpen, toggleCart, products } = useContext(CartContext);
   return (
      <Sheet open={isOpen} onOpenChange={toggleCart}>
         <SheetContent className="w-[90%]">
            <SheetHeader>
               <SheetTitle className="text-left">Confira o seu pedido!</SheetTitle>
               <SheetDescription>
                  
               </SheetDescription>
            </SheetHeader>
           <div className="py-5">
               {products.map(product => (
                  <CartProductItem key={product.id} product={product} />
               ))}
           </div>
         </SheetContent>

      </Sheet>
   );
}

export default CartSheet;