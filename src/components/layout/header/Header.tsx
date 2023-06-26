import Logo from "@/components/layout/logo/Logo";
import { CheckoutContext } from "@/context/checkoutContext";
import { useGetItemsQuery } from "@/service/foods";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';
import { useContext } from "react";
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useRouter } from "next/navigation";

export default function Header() {
  const { openSidebar } = useContext(CheckoutContext);
  const router = useRouter();
  const { data: cartItemsCount } = useGetItemsQuery(undefined, { selectFromResult: ({ data, error, isLoading }) => ({
    data: data?.data.reduce((acc, val) => acc + val.quantity, 0),
    error,
    isLoading
  })});
  
  return (
    <header className="sticky top-0 bg-white z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <Logo />
          <div className="flex items-center">
            <div className="mr-10 cursor-pointer" onClick={() => router.push('orders')}>
              <ReceiptIcon sx={{ color: '#4334CA' }} fontSize="large" />
            </div>
            <div
              className="md:flex items-center justify-end md:flex-1 lg:w-0 cursor-pointer"
              onClick={openSidebar}
            >
              <>
                <Badge badgeContent={cartItemsCount} color="primary">
                  <ShoppingCartIcon sx={{ color: '#4334CA' }} fontSize="large" />
                </Badge>
              </>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
