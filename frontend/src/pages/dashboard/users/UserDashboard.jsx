import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useGetOrderByEmailQuery } from '../../../redux/features/orders/ordersApi';

const UserDashboard = () => {
    const { currentUser } = useAuth();
    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email);

    // Calculate stats
    const totalSpent = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    const averageOrderValue = orders.length > 0 ? totalSpent / orders.length : 0;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">There was an error loading your orders. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
                    <h1 className="text-2xl font-bold">Welcome back, {currentUser?.name || 'User'}!</h1>
                    <p className="text-blue-100 mt-1">Your personal dashboard</p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: 'Total Orders', value: orders.length },
                        { label: 'Total Spent', value: `$${totalSpent.toFixed(2)}` },
                        { label: 'Average Order', value: `$${averageOrderValue.toFixed(2)}` }
                    ].map((stat, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <p className="text-gray-500 text-sm">{stat.label}</p>
                            <p className="text-2xl font-bold mt-2">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Orders Section */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold mb-6">Recent Orders</h2>
                    <div className="overflow-y-auto max-h-[400px] pr-2">
                        {orders.length > 0 ? (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div 
                                        key={order._id} 
                                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-medium text-blue-600">#{order._id}</p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {new Date(order?.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                            <p className="text-lg font-bold text-green-600">
                                                ${order.totalPrice.toFixed(2)}
                                            </p>
                                        </div>
                                        <div className="mt-4">
                                            <p className="text-sm font-medium text-gray-500">Products:</p>
                                            <div className="mt-2 space-y-1">
                                                {order.productIds.map((productId) => (
                                                    <p 
                                                        key={productId} 
                                                        className="text-sm text-gray-600 pl-4 border-l-2 border-blue-200"
                                                    >
                                                        {productId}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <p>You haven't placed any orders yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;