import React, { useEffect, useState } from 'react'
import Banner from './Banner'
import TopSellers from './TopSellers'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Bookcard from '../books/Bookcard';

const Recommended = () => {

        const [books, setBooks] = useState([]);
       
    
        useEffect(() => {
          fetch('books.json')
           .then(response => response.json())
           .then(data => setBooks(data))
        }, [])
    

  return (
    <div className='py-16'>
  
   <h2 className='text-3xl font-semibold mb-6'>Recommended for you </h2>
   
   <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180:{
            slidesPerView: 3,
            spaceBetween: 50,
          }
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >

                   {
                       books.length > 0 && books.slice(8, 18).map((book, index) => (
                            <SwiperSlide key={index}>
                                <Bookcard book={book}/>
                            </SwiperSlide>
                   
                        ))
                    }
        
     
      </Swiper>
   
    </div>
  )
}

export default Recommended