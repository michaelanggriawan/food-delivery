import Image from "next/image";
import { formatCurrency } from "../products/Product";

type OrdersProps = {
  order: {
    id: number;
    customerName: string;
    items: Array<{
      id: number;
      menuId: number;
      name: string;
      price: number;
      image: string;
      amount: number;
      quantity: number;
    }>;
    totalAmount: number;
  };
};

export default function Order({ order }: OrdersProps) {
  const { id, customerName, items, totalAmount } = order;

  return (
    <div className="border p-4">
      <h2 className="text-lg font-bold">Order ID: {id}</h2>
      <p className="mb-2">Customer Name: {customerName}</p>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center mb-4">
            <Image
              src={item.image}
              alt={item.name}
              className="w-16 h-16 mr-2"
              width={200}
              height={200}
            />
            <div>
              <p className="font-bold">{item.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Amount: Rp. {formatCurrency(item.amount, "id-ID")}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="font-bold mt-4">Total Amount: Rp. {formatCurrency(totalAmount, "id-ID")}</p>
    </div>
  );
}
