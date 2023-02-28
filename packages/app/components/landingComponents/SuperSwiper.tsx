// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import React from 'react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import nft1 from '../../images/nft1.png';
import nft2 from '../../images/nft2.png';
import nft3 from '../../images/nft3.png';
import nft4 from '../../images/nft4.png';
import nft5 from '../../images/nft5.png';
import nft6 from '../../images/nft6.png';
import nft7 from '../../images/nft7.png';

function SuperSwiper() {
  return (
    <div>
      <div className='my-0 mx-auto max-w-6xl py-3 px-1 hidden md:inline-flex'>
        <Swiper
          centeredSlides={true}
          className='relative h-[500px] p-1 '
          coverflowEffect={{
            depth: 100,
            modifier: 2.5,
            rotate: 0,
            stretch: 0
          }}
          effect={'coverflow'}
          grabCursor={true}
          loop={true}
          modules={[EffectCoverflow, Pagination, Navigation]}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
            // clickable: true,
          }}
          pagination={{
            el: '.swiper-pagination',
            type: 'bullets'
          }}
          slidesPerView={3}
        >
          <SwiperSlide className='relative h-52 w-52'>
            <div className='relative p-2 bg-gradient-to-br from-yellow-400 to-purple-600 rounded-xl'>
              <img alt='slide_image'
                className='object-cover w-full h-full rounded-lg'
                src={nft1.src} />
            </div>
          </SwiperSlide>
          <SwiperSlide className='relative h-52 w-52'>
            <div className='relative p-2 bg-gradient-to-br from-yellow-400 to-purple-600 rounded-xl'>
              <img alt='slide_image'
                className='object-cover w-full h-full rounded-lg'
                src={nft2.src} />
            </div>
          </SwiperSlide>
          <SwiperSlide className='relative h-52 w-52'>
            <div className='relative p-2 bg-gradient-to-br from-yellow-400 to-purple-600 rounded-xl'>
              <img alt='slide_image'
                className='object-cover w-full h-full rounded-lg'
                src={nft3.src} />
            </div>
          </SwiperSlide>
          <SwiperSlide className='relative h-52 w-52'>
            <div className='relative p-2 bg-gradient-to-br from-yellow-400 to-purple-600 rounded-xl'>
              <img alt='slide_image'
                className='object-cover w-full h-full rounded-lg'
                src={nft4.src} />
            </div>
          </SwiperSlide>
          <SwiperSlide className='relative h-52 w-52'>
            <div className='relative p-2 bg-gradient-to-br from-yellow-400 to-purple-600 rounded-xl'>
              <img alt='slide_image'
                className='object-cover w-full h-full rounded-lg'
                src={nft5.src} />
            </div>
          </SwiperSlide>
          <SwiperSlide className='relative h-52 w-52'>
            <div className='relative p-2 bg-gradient-to-br from-yellow-400 to-purple-600 rounded-xl'>
              <img alt='slide_image'
                className='object-cover w-full h-full rounded-lg'
                src={nft6.src} />
            </div>
          </SwiperSlide>
          <SwiperSlide className='relative h-52 w-52'>
            <div className='relative p-2 bg-gradient-to-br from-yellow-400 to-purple-600 rounded-xl'>
              <img alt='slide_image'
                className='object-cover w-full h-full rounded-lg'
                src={nft7.src} />
            </div>
          </SwiperSlide>

          <div className='relative bottom-16 h-10 w-[360px] mx-auto flex items-center justify-center  z-50'>

            <div className='slider-controler h-full w-full '>
              <div className='swiper-button-prev slider-arrow relative'>
                <ChevronLeftIcon className=' text-[#0170BF] h-10 w-10 ' />

              </div>
              <div className='swiper-button-next slider-arrow '>
                <ChevronRightIcon className=' text-[#0170BF] h-10 w-10 ' />

              </div>
              <div className='swiper-pagination'></div>

            </div>

          </div>

        </Swiper>
      </div>

      <div className='my-0 sm:my-3 mx-auto max-w-6xl py-3 px-1 md:hidden'>
        <Swiper
          centeredSlides={true}
          className='relative w-[280px] sm:w-[300px] h-[340px] sm:h-[390px] p-1 '
          coverflowEffect={{
            depth: 100,
            modifier: 2.5,
            rotate: 0,
            stretch: 0
          }}
          effect={'coverflow'}
          grabCursor={true}
          loop={true}
          modules={[EffectCoverflow, Pagination, Navigation]}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
            // clickable: true,
          }}
          pagination={{
            el: '.swiper-pagination',
            type: 'bullets'
          }}
          slidesPerView={1}
        >
          <SwiperSlide className='relative '>
            <div className='relative p-2 bg-gradient-to-br from-yellow-400 to-purple-600 rounded-xl'>
              <img alt='slide_image'
                className='object-cover w-full h-full rounded-lg'
                src={nft1.src} />
            </div>
          </SwiperSlide>
          <SwiperSlide className='relative '>
            <div className='relative p-2 bg-gradient-to-br from-yellow-400 to-purple-600 rounded-xl'>
              <img alt='slide_image'
                className='object-cover w-full h-full rounded-lg'
                src={nft2.src} />
            </div>
          </SwiperSlide>
          <SwiperSlide className='relative '>
            <div className='relative p-2 bg-gradient-to-br from-yellow-400 to-purple-600 rounded-xl'>
              <img alt='slide_image'
                className='object-cover w-full h-full rounded-lg'
                src={nft3.src} />
            </div>
          </SwiperSlide>
          <SwiperSlide className='relative '>
            <div className='relative p-2 bg-gradient-to-br from-yellow-400 to-purple-600 rounded-xl'>
              <img alt='slide_image'
                className='object-cover w-full h-full rounded-lg'
                src={nft4.src} />
            </div>
          </SwiperSlide>
          <SwiperSlide className='relative '>
            <div className='relative p-2 bg-gradient-to-br from-yellow-400 to-purple-600 rounded-xl'>
              <img alt='slide_image'
                className='object-cover w-full h-full rounded-lg'
                src={nft5.src} />
            </div>
          </SwiperSlide>
          <SwiperSlide className='relative '>
            <div className='relative p-2 bg-gradient-to-br from-yellow-400 to-purple-600 rounded-xl'>
              <img alt='slide_image'
                className='object-cover w-full h-full rounded-lg'
                src={nft6.src} />
            </div>
          </SwiperSlide>
          <SwiperSlide className='relative '>
            <div className='relative p-2 bg-gradient-to-br from-yellow-400 to-purple-600 rounded-xl'>
              <img alt='slide_image'
                className='object-cover w-full h-full rounded-lg'
                src={nft7.src} />
            </div>
          </SwiperSlide>

          <div className='relative bottom-4 h-10 w-[260px] sm:w-[300px] md:w-[360px] mx-auto flex items-center justify-center  z-50'>

            <div className='slider-controler h-full w-full '>
              <div className='swiper-button-prev slider-arrow relative'>
                <ChevronLeftIcon className=' text-[#0170BF] h-10 w-10 ' />

              </div>
              <div className='swiper-button-next slider-arrow '>
                <ChevronRightIcon className=' text-[#0170BF] h-10 w-10 ' />

              </div>
              {/* <div className="swiper-pagination hidden sm:inline-flex"></div> */}

            </div>

          </div>

        </Swiper>
      </div>

    </div>
  );
}

export default SuperSwiper;
