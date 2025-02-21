import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductHeader from "./components/products-header";

interface ProductPageProps {
  params: { slug: string; productId: string };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug, productId } = await params;
  const product = await db.product.findUnique({
    where: { id: productId },
  });
  if (!product) {
    return notFound();
  }
  return (
    <>
    <ProductHeader product={product}/>
      <h1>Product Page</h1>
      {slug}
      {productId}
    </>
  );
};

export default ProductPage;
