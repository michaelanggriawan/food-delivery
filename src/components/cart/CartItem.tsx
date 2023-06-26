import { useAddItemToCartMutation, useRemoveItemFromTheCartMutation } from "@/service/foods";
import Image from "next/image";
import { formatCurrency } from "../products/Product";

type CartItemProps = {
  id: number;
  name: string;
  price: number;
  image: string;
  amount: number;
  menuId: number;
  quantity: number;
};

function CartItem({ id, name, price, image, quantity, menuId }: CartItemProps) {
  const [addItemToCart, { isLoading }] = useAddItemToCartMutation();
  const [removeItemFromCart] = useRemoveItemFromTheCartMutation();
  const handleAddQuantity = async ({ menuId, quantity }: { menuId: number; quantity: number}) => {
    try {
        await addItemToCart({ menuId, quantity }).unwrap();
      } catch (err) {
        console.log(err);
    }
  };

  const handleReduceQuantity = async ({ menuId, quantity }: { menuId: number; quantity: number}) => {
    try {
        await removeItemFromCart({ menuId, quantity }).unwrap();
    } catch (err) {
        console.log(err);
    }
  };

  return (
    <li className="py-6 flex">
      <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
        <Image
          src={image}
          alt=""
          className="w-full h-full object-center object-cover"
          width={200}
          height={200}
        />
      </div>
      <div className="ml-4 flex-1 flex flex-col">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3 className="flex-1">{name}</h3>
          <p className="ml-4">Rp. {formatCurrency(price, 'id-ID')}</p>
        </div>
        <div className="flex items-end justify-between text-sm mt-auto">
          <div className="flex">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500 mr-2"
              onClick={() => handleReduceQuantity({ menuId, quantity: 1 })}
            >
              -
            </button>
            <span className="text-gray-700">{quantity}</span>
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500 ml-2"
              onClick={() => handleAddQuantity({ menuId, quantity: 1 }) }
            >
              +
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
