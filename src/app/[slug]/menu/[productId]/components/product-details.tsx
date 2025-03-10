"use client"

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Prisma } from '@prisma/client';
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { CartContext } from '../../contexts/cart';
import CartSheet from '../../components/cart-sheet';



interface ProductDetailsProps {
   product: Prisma.ProductGetPayload<{
      include: {
         restaurant: {
            select: {
               avatarImageUrl: true,
               name: true
            }
         }
      }
   }>
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
   const { toggleCart, addProduct } = useContext(CartContext);

   const [quantity, setQuantity] = useState<number>(1)

   const handleDecreaseQuantity = () => {
      setQuantity((prev) => Math.max(prev - 1, 1));
   };
   const handleIncreaseQuantity = () => {
      setQuantity((prev) => prev + 1);
   };

   const handleAddToCart = () => {
      addProduct({ ...product, quantity });
      toggleCart();
   }


   return (
      <>
         <div className="relative z-50 rounded-t-3xl py-5 mt-[-1.5rem] p-5 flex flex-col flex-auto overflow-hidden">

            <div className="flex-auto overflow-hidden">
               {/* Restaurant */}
               <div className="flex items-center gap-2 max-w-[80%]">
                  <Image
                     src={product.restaurant.avatarImageUrl}
                     alt={product.restaurant.name}
                     width={15}
                     height={15}
                     className="rounded-full"
                  />
                  <p className='text-xs text-muted-foreground'>
                     {product.restaurant.name}</p>
               </div>

               {/* Product Name */}
               <h2 className="mt-1 text-lg font-semibold">{product.name}</h2>

               {/* Price and quantity */}
               <div className="mt-3 flex items-center justify-between">
                  <h3 className="text-base font-semibold">
                     {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                     }).format(product.price)}
                  </h3>
                  <div className="flex items-center gap-3 text-center">
                     <Button
                        variant="outline"
                        className="h-7 w-7 rounded-xl"
                        onClick={handleDecreaseQuantity}>
                        <ChevronLeftIcon />
                     </Button>
                     <p className="w-5 text-base font-semibold">{quantity}</p>
                     <Button
                        variant="destructive"
                        className="h-7 w-7 rounded-xl"
                        onClick={handleIncreaseQuantity}>
                        <ChevronRightIcon />
                     </Button>
                  </div>
               </div>

               <ScrollArea className="h-full pb-16">
                  {/* Sobre o produto */}
                  <div className="mt-6 space-y-2">
                     <h4 className="font-semibold text-sm">Sobre</h4>
                     <p className="text-xs mr-2 text-muted-foreground">
                        {product.description}</p>
                  </div>
                  {/* Ingredients */}
                  <div className="mt-6 space-y-3">
                     <div className="flex items-center gap-1.5">
                        <ChefHatIcon size={18} />
                        <h4 className="font-semibold text-sm">Ingredientes</h4>
                     </div>
                     <div className="gap-1.5">
                        <ul className="list-disc px-5 mb-5 mr-1.2 text-xs text-muted-foreground">
                           {product.ingredients.map((ingredient) => (
                              <li key={ingredient}>{ingredient}</li>
                           ))}
                        </ul>
                     </div>
                  </div>
               </ScrollArea>

            </div>

            {/* Add order */}

            <Button className="mt-4 w-full rounded-full"
               onClick={handleAddToCart}>
               Adicionar à sacola
            </Button>
         </div>
         <CartSheet />
      </>
   );
};

export default ProductDetails;