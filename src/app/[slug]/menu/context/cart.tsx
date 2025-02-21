"use client"; // <-- Adicione esta linha no topo do arquivo 

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

interface CardProduct extends Product {
    quantity: number;
}

export interface ICardContext {
    isOpen: boolean;
    product: CardProduct[];
    toggleCart: () => void;
}

export const CardContext = createContext<ICardContext>({
    isOpen: false,
    product: [],
    toggleCart: () => {},
});

export const CardProvider = ({ children }: {children: ReactNode }) => {
    const [product, setProducts] = useState<CardProduct[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const toggleCart = () => {
        setIsOpen((prev) => !prev);
    };
    return(
    <CardContext.Provider value={{
        isOpen,
        product,
        toggleCart,
    }}
    >
        {children}
    </CardContext.Provider>
    );
};