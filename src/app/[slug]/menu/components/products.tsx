import { Product } from "@prisma/client"
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface ProductsProps {
   products: Product[]
}
const Products = ({ products }: ProductsProps) => {
   const { slug } = useParams<{ slug: string }>();
   return (
      <div className="space-y-3 px-4"> {/*  posso colocar um pt-5*/}
         {/* Render products here */}
         {products.map(product => (
            <Link
               key={product.id}
               href={`/${slug}/menu/${product.id}`}
               className="flex items-center justify-between gap-10 border-b py-3"
            >
               {/* Parte da esquerda*/}
               <div>
                  <h3 className="text-sm font-medium">
                     {product.name}
                  </h3>
                  <p className="line-clamp-3 text-sm text-muted-foreground">
                     {product.description}
                  </p>
                  <p className="pt-3 font-bold">
                     {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                     }).format(product.price)}
                  </p>
               </div>

               {/* Parte da direita - imagem*/}
               <div className="relative min-h-[82px] min-w-[120px]">
                  <Image
                     src={product.imageUrl}
                     alt={product.name}
                     fill
                     className="rounded-lg object-contain"
                  />
               </div>
            </Link>
         ))}
      </div >
   );
};

export default Products;