"use client"; // <-- Necessário para rodar no lado do cliente

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CardProduct
  extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

export interface ICardContext {
  isOpen: boolean;
  products: CardProduct[];
  toggleCart: () => void;
  addProduct: (product: CardProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (producId: string) => void;
  
}

export const CardContext = createContext<ICardContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {}
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CardProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };
  const addProduct = (product: CardProduct) => {
    const productIsAlreadyOnTheCart = products.some(
      (prevProduct) => prevProduct.id === product.id,
    );
    if (!productIsAlreadyOnTheCart) {
      return setProducts((prev) => [...prev, product]);
    }
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id === product.id) {
          return {
            ...prevProduct,
            quantity: prevProduct.quantity + product.quantity,
          };
        }
        return prevProduct;
      });
    });
  };

  const decreaseProductQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProducts) => {
        if (prevProducts.id != productId) {
          return prevProducts;
        }

        if (prevProducts.quantity === 1) {
          return prevProducts;
        }
        return { ...prevProducts, quantity: prevProducts.quantity - 1 };
      });
    });
  };

  const increaseProductQuantity = (productsId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProducts) => {
        if (prevProducts.id != productsId) {
          return prevProducts;
        }

        if (prevProducts.quantity === 1) {
          return prevProducts;
        }
        return { ...prevProducts, quantity: prevProducts.quantity + 1 };
      });
    });
  }
  return (
    <CardContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        addProduct,
        decreaseProductQuantity,
        increaseProductQuantity,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
