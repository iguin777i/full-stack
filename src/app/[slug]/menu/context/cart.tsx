"use client"; // <-- Necessário para rodar no lado do cliente

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

interface CardProduct extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

export interface ICardContext {
  isOpen: boolean;
  products: CardProduct[];
  toggleCart: () => void;
  addProduct: (product: CardProduct) => void;
}

export const CardContext = createContext<ICardContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
});

export const CardProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CardProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  const addProduct = (product: CardProduct) => {
    setProducts((prev) => [...prev, product]); 
  };

  return (
    <CardContext.Provider value={{ isOpen, products, toggleCart, addProduct }}>
      {children}
    </CardContext.Provider>
  );
};
