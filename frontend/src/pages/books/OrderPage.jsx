import React from 'react';
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi';
import { useAuth } from '../../context/AuthContext';
import { Package, MapPin, Phone, Mail, DollarSign, Box } from 'lucide-react';

const OrderPage = () => {
  const { currentUser } = useAuth();
  const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser.email);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="m-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
        <p className="text-sm">
          There was an error retrieving your orders. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Orders</h1>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
          Total Orders: {orders.length}
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-lg shadow">
          <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg text-gray-600">No orders found!</p>
          <p className="text-sm text-gray-500 mt-2">Your order history will appear here</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order, index) => (
            <div 
              key={order._id} 
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
            >
              <div className="bg-gray-50 p-4 rounded-t-lg">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">
                    Order #{index + 1}
                  </h2>
                  <span className="text-sm text-gray-500">ID: {order._id}</span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{order.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{order.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      <span className="text-lg font-semibold text-green-600">
                        ${order.totalPrice}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                      <span className="text-gray-600">
                        {order.address.city}, {order.address.state},
                        <br />
                        {order.address.country}, {order.address.zipcode}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Box className="h-4 w-4 text-gray-500" />
                    <h3 className="font-semibold">Products</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {order.productIds.map((productId) => (
                      <div
                        key={productId}
                        className="bg-gray-50 rounded p-2 text-sm text-gray-600 truncate"
                        title={productId}
                      >
                        {productId}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;