import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const foodApi = createApi({
  reducerPath: 'food',
  tagTypes: ['GetItems', 'GetOrders' ],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fake-server-production.up.railway.app/',
  }),
  endpoints: (builder) => ({
    getMenus: builder.query<ApiResponse<Array<{
      id: number;
      name: string;
      price: number;
      image: string;
    }>> & {
      meta: {
        pagination: {
          page: number;
          limit: number;
          totalPages: number;
          isLastPage: boolean;
        }
      }
    }, { page?: number; limit?: number }>({
      query: ({ page, limit }) => ({
        url: `menus?page=${page}&limit=${limit}`,
        method: 'GET'
      }),
    }),
    addItemToCart: builder.mutation<ApiResponse<{
      id: number;
      menuId: number;
      name: string;
      price: number;
      image: string;
      amount: number;
      quantity: number;
    }>, { menuId: number; quantity: number }>({
      query: ({ menuId, quantity }) => ({
        url: 'cart/items', 
        method: 'POST',
        body: {
          menuId,
          quantity
        }
      }), 
      invalidatesTags: ['GetItems']
    }),
    getItems: builder.query<ApiResponse<Array<
    {
      id: number;
      menuId: number;
      name: string;
      price: number;
      image: string;
      amount: number;
      quantity: number;
    }>>, void>({
      query: () => ({
        url: 'cart/items',
        method: 'GET',
      }),
      providesTags: ['GetItems']
    }),
    removeItemFromTheCart: builder.mutation<ApiResponse<{
      id: number;
      menuId: number;
      name: string;
      price: number;
      image: string;
      amount: number;
      quantity: number;
    }>, { menuId: number, quantity: number }>({
      query: ({ menuId, quantity }) => ({
        url: 'cart/items',
        method: 'PUT',
        body: {
          menuId,
          quantity,
        }
      }),
      invalidatesTags: ['GetItems']
    }),
    submitOrders: builder.mutation<ApiResponse<{
      id: number;
      items: Array<{
        id: number;
        menuId: number;
        name: string;
        price: number;
        image: string;
        amount: number;
        quantity: number;
      }
      >;
      customerName: string;
    }>, {
      items: Array<{
        id: number;
        menuId: number;
        name: string;
        price: number;
        image: string;
        amount: number;
        quantity: number;
      }
      >;
      customerName: string;
    }>({
      query: (body) => ({
        url: 'orders',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['GetItems', 'GetOrders']  
    }),
    getOrders: builder.query<ApiResponse<Array<{
      id: number;
      items: Array<{
        id: number;
        menuId: number;
        name: string;
        price: number;
        image: string;
        amount: number;
        quantity: number;
      }
      >;
      customerName: string;
      totalAmount: number;
    }>>, void>({
      query: () => ({
        url: 'orders',
        method: 'GET'
      }),
      providesTags: ['GetOrders']
    }),
    getOrder: builder.query<ApiResponse<{
      id: number;
      items: Array<{
        id: number;
        menuId: number;
        name: string;
        price: number;
        image: string;
        amount: number;
        quantity: number;
      }
      >;
      customerName: string;
      totalAmount: number;
    }>, { orderId: number }>({
      query: ({ orderId }) => ({
        url: `order/${orderId}`,
        method: 'GET',
      })
    })
  }),
})

export const { useGetMenusQuery, useAddItemToCartMutation, useGetItemsQuery, useRemoveItemFromTheCartMutation, useSubmitOrdersMutation, useGetOrdersQuery, useGetOrderQuery } = foodApi

export default foodApi;