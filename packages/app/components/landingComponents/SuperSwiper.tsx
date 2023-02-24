import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper';
import nft from '../../images/nft.png';


function SuperSwiper() {
  return (
    <div className="my-0 mx-auto max-w-6xl py-3 px-1 ">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{
          el: '.swiper-pagination',
          type: 'bullets',
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="relative h-96 p-1 "
      >
        <SwiperSlide className='relative h-52 w-52'>
          <img src={nft.src} className='object-cover w-full h-full rounded-lg' alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide className='relative h-52 w-52'>
          <img src={nft.src} className='object-cover w-full h-full rounded-lg' alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide className='relative h-52 w-52'>
          <img src={nft.src} className='object-cover w-full h-full rounded-lg' alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide className='relative h-52 w-52'>
          <img src={nft.src} className='object-cover w-full h-full rounded-lg' alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide className='relative h-52 w-52'>
          <img src={nft.src} className='object-cover w-full h-full rounded-lg' alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide className='relative h-52 w-52'>
          <img src={nft.src} className='object-cover w-full h-full rounded-lg' alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide className='relative h-52 w-52'>
          <img src={nft.src} className='object-cover w-full h-full rounded-lg' alt="slide_image" />
        </SwiperSlide>


        <div className="relative flex items-center justify-center bottom-4 w-20">
          <div className="swiper-button-prev slider-arrow">
            {/* <p>go</p> */}
          </div>
          <div className="swiper-button-next slider-arrow">
            {/* <p>go</p> */}
          </div>
          <div className="swiper-pagination w-20 h-20 bg-red-300"></div>
        </div>
      </Swiper>
    </div>
  );
}

export default SuperSwiper;
