import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Bookcard from '../books/Bookcard';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

const Recommended = () => {
  const { data: books = [] } = useFetchAllBooksQuery();

  return (
    <div className="py-16 px-6 bg-gradient-to-b from-blue-50 via-white to-gray-100 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
        📚 Recommended for You 📚
      </h2>

      {/* Swiper Slider */}
      {books.length > 0 ? (
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
          {books.slice(8, 18).map((book, index) => (
            <SwiperSlide key={index}>
              <Bookcard book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-gray-600 text-lg mt-6">
          No recommendations available at the moment. Check back later!
        </p>
      )}
    </div>
  );
};

export default Recommended;
