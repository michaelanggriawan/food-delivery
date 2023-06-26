import CartItem from "@/components/cart/CartItem";

type CartItemsProps = {
    products: Array<{
        id: number;
        name: string;
        price: number;
        image: string;
        amount: number;
        menuId: number;
        quantity: number;
    }>
}

export default function CartItems({ products }: CartItemsProps) {
    return (
        <ul className="-my-6 divide-y divide-gray-200">
            {products.map((product) => (
                <CartItem key={product.id} {...product} />
            ))}
      </ul>
    )
}