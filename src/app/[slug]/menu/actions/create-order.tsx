"use server";

import { db } from "@/lib/prisma";
import { consumptionMethod } from "@prisma/client";
import { removeCpfPunctuation } from "../helpers/cpf";
import { redirect } from "next/navigation";

interface CreateOrderInput {
  customerName: string;
  customerCPF: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;
  consumptionMethod: consumptionMethod;
  slug: string;
}

export const createOrder = async (input: CreateOrderInput) => {
  console.log("🔍 Buscando restaurante com slug:", input.slug);

  const restaurant = await db.restaurant.findUnique({
    where: {
      slug: input.slug,
    },
  });

  if (!restaurant) {
    console.error(`❌ Restaurante não encontrado para o slug: ${input.slug}`);
    throw new Error("Restaurante não encontrado");
  }

  console.log("✅ Restaurante encontrado:", restaurant.name);

  if (!input.consumptionMethod) {
    console.error("❌ Método de consumo é obrigatório.");
    throw new Error("Método de consumo não pode ser nulo.");
  }

  const productsWithPrices = await db.product.findMany({
    where: {
      id: {
        in: input.products.map((product) => product.id),
      },
    },
  });

  if (productsWithPrices.length === 0) {
    console.error("❌ Nenhum produto encontrado para os IDs fornecidos.");
    throw new Error("Nenhum produto encontrado");
  }

  const productsWithPricesAndQuantities = input.products.map((product) => {
    const foundProduct = productsWithPrices.find((p) => p.id === product.id);
    if (!foundProduct) {
      console.error(`❌ Produto com ID ${product.id} não encontrado`);
      throw new Error(`Produto com ID ${product.id} não encontrado`);
    }

    return {
      productId: product.id,
      quantity: product.quantity,
      price: foundProduct.price,
    };
  });

  console.log("✅ Produtos processados:", productsWithPricesAndQuantities);

  const totalPrice = productsWithPricesAndQuantities.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const order = await db.order.create({
    data: {
      status: "PENDENTE",
      customerName: input.customerName,
      customerCPF: removeCpfPunctuation(input.customerCPF),
      orderProducts: {
        createMany: {
          data: productsWithPricesAndQuantities,
        },
      },
      total: totalPrice,
      consumptionMethod: input.consumptionMethod, // 🔹 Garantindo que não seja null
      restaurantId: restaurant.id, // 🔹 Somente `restaurantId`, sem `restaurant`
    },
  });  

  redirect(`/${input.slug}/orders?cpf=${removeCpfPunctuation(input.customerCPF)}`);


};
