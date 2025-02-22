import Image from "next/image";
import { CardContext, CardProduct } from "../../context/cart";
import { formatCurrency } from "@/helpers/format-currency";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsRightIcon,
  TrashIcon,
} from "lucide-react";
import { useContext } from "react";


interface CartItemProps {
  product: CardProduct;
}

const CartProductItem = ({ product }: CartItemProps) => {
    const {decreaseProductQuantity, increaseProductQuantity, removeProduct} = useContext(CardContext)
    return (
    <div className="flex items-center justify-between">
      {/* esquerda */}
      <div className="flex items-center gap-3">
        <div className="relative h-20 w-20 rounded-xl bg-gray-100">
          <Image src={product.imageUrl} alt={product.name} fill />
        </div>
        <div className="space-y-1">
          <p className="text-xs max-w-[90%] truncate text-ellipsis">{product.name}</p>
          <p className="text-sm font-semibold">
            {formatCurrency(product.price)}
          </p>
          <div className="flex items-center gap-1 text-center">
            {/* quantidade */}
            <Button className="h-7 w-7 rounded-lg" variant="outline" onClick={() => decreaseProductQuantity(product.id)}>
              <ChevronLeftIcon size={14} />
            </Button>
            <p className="w-7 text-xs">{product.quantity}</p>
            <Button className="h-7 w-7 rounded-lg" variant="destructive" onClick={() => increaseProductQuantity(product.id)}>
              <ChevronRightIcon size={14} />
            </Button>
          </div>
        </div>
      </div>

      {/* DELETAR */}

      <Button className="w-7 h-7 rounded-lg p-2" variant="outline" onClick={() => removeProduct(product.id)} >
        <TrashIcon />
      </Button>
    </div>
  );
};

export default CartProductItem;
