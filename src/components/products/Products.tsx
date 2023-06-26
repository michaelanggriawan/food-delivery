import Product from '@/components/products/Product';
import { useGetMenusQuery } from '@/service/foods';
import Loading from '@/components/loading/Loading';
import { useCallback, useEffect, useState } from 'react';

export default function Products() {
  const [page, setPage] = useState(1);
  const { data: products, isFetching, isLoading } = useGetMenusQuery({
    page,
    limit: 4,
  });
  const [data, setData] = useState<
    Array<{
      id: number;
      name: string;
      price: number;
      image: string;
    }> | never[]
  >([]);

  useEffect(() => {
    if (page === 1) {
      setData(products?.data ?? []);
    } else {
      setData((prevData) => [...prevData, ...(products?.data ?? [])]);
    }
  }, [products?.data]);

  const handleScroll = useCallback(() => {
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const documentHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.scrollY;
    if (windowBottom >= documentHeight) {
      if (products && !products?.meta?.pagination?.isLastPage) {
        if (!isFetching) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    }
  }, [isFetching, products]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="bg-white max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {data.map((product) => (
          <Product key={product.id} {...product} />
        ))}
        
      </div>
      {isFetching && <Loading />}
    </>
  );
}
