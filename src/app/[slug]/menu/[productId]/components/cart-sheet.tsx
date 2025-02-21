import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useContext } from "react";
import { CardContext } from "../../context/cart";

const CartSheet = () => {
    const { isOpen, toggleCart, products } = useContext(CardContext);
    return ( 
        <Sheet open={isOpen} onOpenChange={toggleCart}>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
          {products.map(products => (
            <h1 key={products.id}>{products.name} - {products.quantity}</h1>
          ))}
        </SheetContent>
      </Sheet>
     );
}
 
export default CartSheet;