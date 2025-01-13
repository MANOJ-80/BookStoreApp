import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { getImgUrl } from '../../utils/getImgUrl';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="rounded-lg transition-shadow duration-300 hover:shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4">
        {/* Book Cover */}
        <div className="sm:h-72 sm:flex-shrink-0 border rounded-md overflow-hidden">
          <Link to={`/books/${book._id}`}>
            <img
              src={getImgUrl(book?.coverImage)}
              alt={`${book?.title} cover`}
              className="w-full h-full object-cover p-2 cursor-pointer hover:scale-105 transition-transform duration-200"
            />
          </Link>
        </div>

        {/* Book Details */}
        <div className="flex-1">
          <Link to={`/books/${book._id}`}>
            <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
              {book?.title}
            </h3>
          </Link>
          <p className="text-gray-600 mb-5">
            {book?.description.length > 80
              ? `${book.description.slice(0, 80)}...`
              : book.description}
          </p>
          <p className="font-medium text-lg mb-5">
            ${book?.newPrice}{' '}
            <span className="line-through font-normal text-sm text-gray-500 ml-2">
              ${book?.oldPrice}
            </span>
          </p>
          <button
            onClick={() => handleAddToCart(book)}
            className="btn-primary px-6 flex items-center gap-2"
          >
            <FiShoppingCart />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
