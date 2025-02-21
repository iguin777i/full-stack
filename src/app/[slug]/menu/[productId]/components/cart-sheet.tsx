import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useContext } from "react";
import { CardContext } from "../../context/cart";

const CartSheet = () => {
    const { isOpen, toggleCart } = useContext(CardContext);
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
        </SheetContent>
      </Sheet>
     );
}
 
export default CartSheet;