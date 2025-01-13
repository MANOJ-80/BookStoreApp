import React from 'react';
import bannerImg from '../../assets/banner.png';

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse items-center justify-between py-16 gap-12 bg-gradient-to-r from-blue-50 to-white shadow-lg rounded-lg">
      {/* Banner Image */}
      <div className="md:w-1/2 w-full flex items-center justify-center px-8">
        <img
          src={bannerImg}
          alt="Banner"
          className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Banner Content */}
      <div className="md:w-1/2 w-full px-8 text-center md:text-left">
        <h1 className="md:text-5xl text-3xl font-bold text-blue-900 mb-6 leading-tight animate-fade-in">
          Discover New Releases This Week
        </h1>
        <p className="text-gray-600 text-lg mb-8 animate-fade-in-delay">
          It's time to update your reading list with some of the latest and
          greatest releases in the literary world. From heart-pumping thrillers
          to captivating memoirs, this week's new releases offer something for
          everyone.
        </p>
        <button className="px-6 py-3 bg-primary text-black font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition-colors duration-300 animate-bounce">
          Subscribe Now
        </button>
      </div>
    </div>
  );
};

export default Banner;
