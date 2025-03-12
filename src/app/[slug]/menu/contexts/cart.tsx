"use client"

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct
   extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
   quantity: number;
};

export interface ICartContext {
   isOpen: boolean;
   products: CartProduct[];
   toggleCart: () => void;
   total: number;
   totalQuantity: number;
   addProduct: (product: CartProduct) => void;
   decreaseProductQuantity: (productId: string) => void;
   increaseProductQuantity: (productId: string) => void;
   removeProduct: (productId: string) => void;  // Remove um produto do carrinho (not implemented)
};


export const CartContext = createContext<ICartContext>({
   isOpen: false,
   products: [],
   total: 0,
   totalQuantity: 0,
   toggleCart: () => { },
   addProduct: () => { },  // Add product to the cart (not implemented)
   decreaseProductQuantity: () => { },
   increaseProductQuantity: () => { },  // Incrementa a quantidade de um produto (not implemented)
   removeProduct: () => { },  // Remove um produto do carrinho (not implemented)
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
   const [products, setProducts] = useState<CartProduct[]>([]);
   const [isOpen, setIsOpen] = useState<boolean>(false);

   const total = products.reduce((acc, product) => {
      return (
         acc + (product.quantity * product.price)
      )
   }, 0);

   const totalQuantity = products.reduce((acc, product) => {
      return acc + product.quantity;
   }, 0);

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

   const decreaseProductQuantity = (productId: string) => {
      setProducts((prev) =>
         prev.map(p =>
            p.id === productId && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
         )
      );
   };

   const increaseProductQuantity = (productId: string) => {
      setProducts((prev) =>
         prev.map(p => p.id === productId ? { ...p, quantity: p.quantity + 1 } : p)
      );
   };

   const removeProduct = (productId: string) => {
      setProducts((prev) => prev.filter(p => p.id !== productId));
   };


   return (
      <CartContext.Provider
         value={{
            isOpen,
            products,
            total,
            toggleCart,
            addProduct,
            decreaseProductQuantity,
            increaseProductQuantity,
            removeProduct,
            totalQuantity
         }}
      >
         {children}
      </CartContext.Provider>
   )
}