"use client"

import Loading from "@/components/loading/Loading";
import Order from "@/components/orders/Order";
import { useGetOrderQuery } from "@/service/foods";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from "next/navigation";

export default function OrderDetail({ params: { orderId } }: { params: { orderId: number }}) {
    const router = useRouter();
    const { data: order, isLoading } = useGetOrderQuery({ orderId }, { selectFromResult:  ({ error, isLoading, data }) => ({
        error,
        isLoading,
        data: data?.data
    })});

    if (isLoading) return <Loading />

    return (
        <div className="my-4 w-full">
            <div className="cursor-pointer mb-4" onClick={() => router.back()}>
                <ArrowBackIcon fontSize="large" sx={{ color: '#4334CA' }} />
            </div>
            {order && <Order order={order}/>}
        </div>
    )
}