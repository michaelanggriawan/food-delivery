import { useAddItemToCartMutation } from "@/service/foods";
import CircularProgress from '@mui/material/CircularProgress';
import Image from "next/image";

type ProductProps = {
    id: number;
    image: string;
    name: string;
    price: number;
}

export const formatCurrency = (num: number, currency: string) => new Intl.NumberFormat(currency).format(num);

export default function Product({ id, image, name, price }: ProductProps) {
    const [addItemToCart, { isLoading }] = useAddItemToCartMutation();

    const addItem = async ({ menuId, quantity }: { menuId: number; quantity: number; }) => {
      try {
        await addItemToCart({ menuId, quantity }).unwrap();
      } catch (err) {
        console.log(err);
      }
    }

    return (
        <article className="group relative">
          <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:h-80 lg:aspect-none">
            <Image
              className="w-full h-full object-center object-cover lg:w-full lg:h-full"
              src={image}
              alt=""
              width={100}
              height={100}
            />
          </div>
          <div className="mt-4 flex justify-between">
            <h2 className="text-sm text-gray-700">
              <span aria-hidden="true" className="absolute inset-0" />
              {name}
            </h2>
            <p className="text-sm font-medium text-gray-900">Rp. {formatCurrency(price, 'id-ID')}</p>
          </div>
          <button
            onClick={() => addItem({ menuId: id, quantity: 1})}
            className="mt-6 group outline-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            disabled={isLoading}
          >
            { isLoading ? <CircularProgress sx={{ color: 'white' }} size={20} /> : 'Add' }
          </button>
        </article>
      );
}