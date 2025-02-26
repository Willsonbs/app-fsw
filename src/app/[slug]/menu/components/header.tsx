"use client";


import { Button } from "@/components/ui/button";
import { Restaurant } from "@prisma/client";
import Image from "next/image";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import { useRouter } from "next/navigation";


interface RestaurantHeaderProps {
   restaurant: Pick<Restaurant, "name">
}

const RestaurantHeader = ({ restaurant }: RestaurantHeaderProps) => {
   const router = useRouter();
   const handleBackClick = () => router.back();
   return (
      <div className="relative h-[250px] w-full">
         <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 left-4 rounded-full z-50"
            onClick={() => router.back()}
         >
            <ChevronLeftIcon />
         </Button>

         <Image
            src="/fsw-donalds.png"
            alt={restaurant?.name || "Imagem do restaurant "}
            fill
            className="object-cover"
         />

         <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 rounded-full z-50"
         >
            <ScrollTextIcon />
         </Button>
      </div>
   );
}

export default RestaurantHeader;