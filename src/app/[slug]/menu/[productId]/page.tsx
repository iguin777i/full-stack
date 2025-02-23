
import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ProductDetails from "./components/products-details";
import ProductHeader from "./components/products-header";

interface ProductPageProps {
  params: { slug: string; productId: string };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  // Não é necessário usar 'await' em params porque já é um objeto direto
  const { slug, productId } = params;

  // Buscar o produto no banco de dados
  const product = await db.product.findUnique({
    where: { id: productId },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
          slug: true,
        },
      },
    },
  });

  // Se o produto não for encontrado, retorna erro 404
  if (!product) {
    return notFound();
  }

  // Verifica se o slug do restaurante corresponde ao slug da URL
  if (product.restaurant.slug.toUpperCase() !== slug.toUpperCase()) {
    return notFound();
  }

  // Renderiza os componentes de cabeçalho e detalhes do produto
  return (
    <div className="flex h-full flex-col">
      <ProductHeader product={product} />
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductPage;
