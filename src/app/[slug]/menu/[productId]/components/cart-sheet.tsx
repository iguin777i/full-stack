import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useContext } from "react";
import { CardContext } from "../../context/cart";
import CartProductItem from "./cart-product-item";

const CartSheet = () => {
    const { isOpen, toggleCart, products } = useContext(CardContext);
    return ( 
        <Sheet open={isOpen} onOpenChange={toggleCart}>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent className="w-[85%]">
          <SheetHeader>
            <SheetTitle className="text-left">Carrinho</SheetTitle>
            
          </SheetHeader>
          <div className="py-5">
          {products.map(products => (
            <CartProductItem key={products.id} product={products} />
          ))}
          </div>
        </SheetContent>
      </Sheet>
     );
}
 
export default CartSheet;