import Image from "next/image";
import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ConsumptionMethodOption from "./components/consumption-method-option";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;
  const restaurant = await db.restaurant.findUnique({
    where: { slug },
  });

  if (!restaurant) {
    return notFound();
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      {/* logo e titulo */}
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant.avatarImageUrl}
          alt={restaurant.name}
          width={82}
          height={82}
        />
        <h2 className="font-semibold">{restaurant.name}</h2>
      </div>

      {/* BEM-VINDO */}
      <div className="space-y2 pt-24 text-center">
        <h3 className="text-2xl font-semibold">Seja bem-vindo!</h3>
        <p className="opacity-55">
          Escolha como prefere aproveitar sua refeição. Estamos oferecendo
          praticidade e sabor em cada detalhe.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-14">
        <ConsumptionMethodOption
          buttonText="Para comer aqui"
          imageUrl="/comer-aqui.png"
          imageAlt="Para comer aqui"
        />

        <ConsumptionMethodOption
          buttonText="Para levar"
          imageUrl="/para-levar.png"
          imageAlt="Para levar"
        />
      </div>
    </div>
  );
};

export default RestaurantPage;
