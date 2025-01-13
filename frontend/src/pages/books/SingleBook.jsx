import React from 'react';
import { FiShoppingCart, FiArrowLeft } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';

const SingleBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <p className="text-red-600">Error occurred while loading book information.</p>
                    <button 
                        onClick={() => navigate(-1)}
                        className="mt-4 text-blue-500 hover:text-blue-600 flex items-center gap-2 mx-auto"
                    >
                        <FiArrowLeft /> Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <button 
                    onClick={() => navigate(-1)}
                    className="mb-6 text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors"
                >
                    <FiArrowLeft /> Back to Books
                </button>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="md:flex">
                        {/* Image Section */}
                        <div className="md:w-1/2 p-6 bg-gray-50">
                            <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-md">
                                <img
                                    src={`${getImgUrl(book.coverImage)}`}
                                    alt={book.title}
                                    className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="md:w-1/2 p-8">
                            <div className="space-y-6">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
                                    <p className="mt-2 text-xl text-gray-500">by {book.author || 'admin'}</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize">
                                            {book?.category}
                                        </span>
                                        <span className="text-gray-500 text-sm">
                                            Published: {new Date(book?.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>

                                    <div className="prose prose-gray">
                                        <h2 className="text-xl font-semibold text-gray-900">Description</h2>
                                        <p className="text-gray-600 leading-relaxed">
                                            {book.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-200">
                                    <button 
                                        onClick={() => handleAddToCart(book)} 
                                        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 
                                                 flex items-center justify-center gap-2 transition-colors duration-200"
                                    >
                                        <FiShoppingCart className="text-xl" />
                                        <span className="font-medium">Add to Cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleBook;