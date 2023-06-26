import { CheckoutContext } from "@/context/checkoutContext";
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from "react";
import CartItems from "./CartItems";
import { useGetItemsQuery, useSubmitOrdersMutation } from "@/service/foods";
import { formatCurrency } from "../products/Product";
import { CircularProgress } from "@mui/material";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useRouter } from "next/navigation";

export default function Checkout() {
  const { isSidebarOpen, closeSidebar } = useContext(CheckoutContext);
  const router = useRouter();
  const { data: products } = useGetItemsQuery(undefined, {
    selectFromResult: ({ data, error, isLoading }) => ({
      data: data?.data,
      error,
      isLoading
    })
  });
  const [submitOrders, { isLoading }] = useSubmitOrdersMutation();

  // Calculate the total cart items and amount
  const totalItems = products?.reduce(
    (total, product) => total + product.quantity,
    0
  );;
  const totalAmount = products?.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );

  const handleCheckout = async () => {
    try {
      if (products) {
        await submitOrders({ customerName: 'Michael Anggriawan', items: products }).unwrap();
        closeSidebar();
        router.push('/orders');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full w-full bg-black opacity-50 z-40 transition-opacity duration-300 ${
          isSidebarOpen ? 'visible' : 'invisible'
        }`}
        onClick={closeSidebar}
      ></div>
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg overflow-y-auto z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold">Cart</h2>
          {products && products.length > 0 ? (
            <div className="mt-8 flow-root">
              <CartItems products={products || []} />
            </div>
          ) : (
            <div className="text-gray-600 text-center mt-8">
              <span>Your cart is empty.</span>
            </div>
          )}
        </div>

        <div className="sticky bottom-0">
          {products && products.length > 0 && (
            <div className="p-4 bg-gray-100">
              <h3 className="text-xl font-bold mb-2">Order Summary</h3>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Items</span>
                <span className="text-gray-700">{totalItems}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Total Amount</span>
                <span className="text-gray-700">
                  Rp. {formatCurrency(totalAmount ?? 0, 'id-ID')}
                </span>
              </div>
              <button
                className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-600"
                onClick={handleCheckout}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress sx={{ color: 'white' }} size={20} />
                ) : (
                  'Checkout'
                )}
              </button>
            </div>
          )}
        </div>

        <div
          className="fixed top-1 right-4 p-2 cursor-pointer hover:bg-gray-300"
          onClick={closeSidebar}
        >
          <CloseIcon sx={{ color: '#333333' }} fontSize="large" />
        </div>
      </div>
    </>
  );
}
