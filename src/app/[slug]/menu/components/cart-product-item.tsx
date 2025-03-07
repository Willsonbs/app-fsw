import Image from "next/image";
import { CartProduct } from "../contexts/cart";
import FormatCurrency from "@/helpers/format-currency";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";


interface CartItemProps {
   product: CartProduct;
};
const CartProductItem = ({ product }: CartItemProps) => {
   return (
      <div className="flex items-center justify-between">
         {/* Imagem do produto - esquerda*/}
         <div className="flex items-center gap-3">
            <div className="relative h-20 w-20 rounded-xl bg-gray-100">
               <Image src={product.imageUrl} alt={product.name} fill />
            </div>
            <div className="space-y-1">
               <p className="max-w-[90%] truncade text-ellipsis text-xs">{product.name}</p>
               <p className="text-sm font-semibold">{FormatCurrency(product.price)}</p>
               {/* Quantidade*/}
               <div className="flex items-center gap-1">
                  <Button className="h-7 w-7 rounded-lg" variant="outline">
                     <ChevronLeftIcon />
                  </Button>

                  <p className="ml-2 w-5 text-xs">{product.quantity}</p>

                  <Button className="h-7 w-7 rounded-lg" variant="destructive">
                     <ChevronRightIcon />
                  </Button>
               </div>
            </div>
         </div>
         {/* lixeira - direita*/}
         <Button className="w-7 h-7 rounded-lg" variant="outline">
            <TrashIcon />
         </Button>
      </div>
   );
}

export default CartProductItem; 