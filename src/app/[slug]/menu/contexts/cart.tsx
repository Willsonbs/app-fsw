"use client"

import { Product } from "@prisma/client";
import { ReactNode, createContext, useState } from "react";

interface CartProduct
   extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
   quantity: number;
};

export interface ICartContext {
   isOpen: boolean;
   products: CartProduct[];
   toggleCart: () => void;
   addProduct: (product: CartProduct) => void;
};


export const CartContext = createContext<ICartContext>({
   isOpen: false,
   products: [],
   toggleCart: () => { },
   addProduct: () => { },  // Add product to the cart (not implemented)
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
   const [products, setProducts] = useState<CartProduct[]>([]);
   const [isOpen, setIsOpen] = useState<boolean>(false);

   const toggleCart = () => {
      setIsOpen(prev => !prev)
   };

   const addProduct = (product: CartProduct) => {
      setProducts((prev) => {
         const existingProduct = prev.find(p => p.id === product.id);

         if (existingProduct) {
            // Atualiza a quantidade se o produto já estiver no carrinho
            return prev.map(p =>
               p.id === product.id ? { ...p, quantity: p.quantity + product.quantity } : p
            );
         } else {
            // Adiciona o novo produto ao carrinho
            return [...prev, product];
         }
      });
   };


   return (
      <CartContext.Provider
         value={{
            isOpen,
            products,
            toggleCart,
            addProduct,
         }}
      >
         {children}
      </CartContext.Provider>
   )
}