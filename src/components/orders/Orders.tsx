import { useGetOrdersQuery } from '@/service/foods';
import { formatCurrency } from "../products/Product";
import Loading from "@/components/loading/Loading";
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Orders() {
  const router = useRouter();
  const { data: orders, isLoading } = useGetOrdersQuery(undefined, {
    selectFromResult: ({ error, isLoading, data }) => ({
      error,
      isLoading,
      data: data?.data,
    })
  });

  if (isLoading) return <Loading />;

  const handleOrderDetail = (orderId: number) => {
    router.push(`orders/${orderId}`)
  };

  return (
    <div className="my-4 w-full">
        <div className="cursor-pointer mb-4" onClick={() => router.back()}>
            <ArrowBackIcon fontSize="large" sx={{ color: '#4334CA' }} />
        </div>
      {orders &&
        orders.map((order) => (
          <div className="border p-4 mb-4" key={order.id}>
            <h2 className="text-lg font-bold">Order ID: {order.id}</h2>
            <p>Customer Name: {order.customerName}</p>
            <p className="mb-2">
              Total Amount: Rp. {formatCurrency(order.totalAmount, "id-ID")}
            </p>
            <button
              className="bg-indigo-500 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-600"
              onClick={() => handleOrderDetail(order.id)}
            >
              View Details
            </button>
          </div>
        ))}
    </div>
  );
}
