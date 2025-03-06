"use client";

import { Button } from '@/components/ui/button';
import FormatCurrency from '@/helpers/format-currency';
import { Prisma } from '@prisma/client';
import { ChevronLeftIcon, ChevronRightIcon, ChefHatIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ProductDetailsProps {
   product: Prisma.ProductGetPayload<{
      include: {
         restaurant: {
            select: {
               name: true;
               avatarImageUrl: true;
            };
         };
      };
   }>;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
   const [quantity, setQuantity] = useState<number>(1);

   const handleDecreaseQuantity = () => {
      setQuantity((prev) => Math.max(prev - 1, 1));
   };
   const handleIncreaseQuantity = () => {
      setQuantity((prev) => prev + 1);
   };

   return (
      <>
         <div className="relative z-50 mt-[-1.5rem] flex-auto flex-col rounded-t-3xl p-5">
            <div className="flex-auto overflow-hidden">
               {/* Restaurante */}
               <div className="flex items-center gap-1.5">
                  <Image
                     src={product.restaurant.avatarImageUrl}
                     alt={product.restaurant.name}
                     width={16}
                     height={16}
                     className="rounded-full"
                  />
                  <p className="gap-1 text-xs text-muted-foreground">
                     {product.restaurant.name}
                  </p>
               </div>

               {/* Nome do Produto */}
               <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>

               {/* Preço e quantidade */}
               <div className="mt-3 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                     {FormatCurrency(product.price)}
                  </h3>
                  <div className="flex items-center gap-3 text-center">
                     <Button
                        variant="outline"
                        className="h-8 w-8 rounded-xl"
                        onClick={handleDecreaseQuantity}
                     >
                        <ChevronLeftIcon />
                     </Button>

                     <p className="w-4">{quantity}</p>

                     <Button
                        variant="destructive"
                        className="h-8 w-8 rounded-xl"
                        onClick={handleIncreaseQuantity}
                     >
                        <ChevronRightIcon />
                     </Button>
                  </div>
               </div>

               <ScrollArea>
                  {/* Descrição */}
                  <div className="mt-6 space-y-3">
                     <h4 className="font-semibold">Sobre</h4>
                     <p className="text-xs mr-2 text-muted-foreground">
                        {product.description}
                     </p>
                  </div>

                  {/* Ingredientes */}
                  <div className="mt-6 space-y-3">
                     <div className="flex items-center gap-1.5">
                        <ChefHatIcon size={18} />
                        <h4 className="font-semibold">Ingredientes</h4>
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
         </div>

         {/* Adicionar ao carrinho */}
         <div className='m-2'>
            <Button className="rounded-full w-full">Adicionar à sacola</Button>
         </div>
      </>
   );
};

export default ProductDetails;

