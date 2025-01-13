import React, { useState } from 'react';
import BookCard from '../books/Bookcard';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import required modules
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

const categories = ['Choose a genre', 'Business', 'Fiction', 'Horror', 'Adventure'];

const TopSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState('Choose a genre');
  const { data: books = [] } = useFetchAllBooksQuery();

  const filteredBooks =
    selectedCategory === 'Choose a genre'
      ? books
      : books.filter((book) => book.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="py-16 px-6 bg-gradient-to-b from-blue-50 via-white to-gray-100 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">🌟 Top Sellers 🌟</h2>

      {/* Category Selector */}
      <div className="mb-8 flex justify-center">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="category"
          id="category"
          className="border border-gray-300 bg-white shadow-sm rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          {categories.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      {/* Swiper for Books */}
      {filteredBooks.length > 0 ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 40 },
            1024: { slidesPerView: 3, spaceBetween: 50 },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {filteredBooks.map((book, index) => (
            <SwiperSlide key={index}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-gray-600 text-lg mt-6">
          No books found for the selected category. Please try another genre.
        </p>
      )}
    </div>
  );
};

export default TopSellers;
