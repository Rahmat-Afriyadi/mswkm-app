import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';


import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import dynamic from 'next/dynamic';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/20/solid';

// import slide_image_1 from '/images/img_1.jpg';
// import slide_image_2 from '/images/img_2.jpg';
// import slide_image_3 from '/images/img_3.jpg';
// import slide_image_4 from '/images/img_4.jpg';
// import slide_image_5 from '/images/img_5.jpg';


const slide_image_1 = dynamic(()=>import("../../../../public/images/img_1.jpg"))

function App() {
  return (
    <div className="container">
      <h1 className="heading">HVC Anda</h1>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        loop={true}
        slidesPerView={'3'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        // pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        <SwiperSlide>
            <div className='shadow-lg bg-blue-400'></div>
        </SwiperSlide>
        <SwiperSlide>
            {/* <Image src={"/images/img_1.jpg"} layout='fill' objectFit='cover' alt='slide_1'/> */}
            <div className='shadow-lg bg-red-400'></div>
        </SwiperSlide>
        <SwiperSlide>
            {/* <Image src={"/images/img_1.jpg"} layout='fill' objectFit='cover' alt='slide_1'/> */}
            <div className='shadow-lg bg-yellow-400'></div>
        </SwiperSlide>
        <SwiperSlide>
            {/* <Image src={"/images/img_1.jpg"} layout='fill' objectFit='cover' alt='slide_1'/> */}
            <div className='shadow-lg bg-green-400'></div>
        </SwiperSlide>
        <SwiperSlide>
            {/* <Image src={"/images/img_1.jpg"} layout='fill' objectFit='cover' alt='slide_1'/> */}
            <div className='shadow-lg bg-slate-400'></div>
        </SwiperSlide>

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ArrowLeftCircleIcon className='h-6 w-6'/>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ArrowRightCircleIcon  className='h-6 2-6'/>
          </div>
          {/* <div className="swiper-pagination"></div> */}
        </div>
      </Swiper>
    </div>
  );
}

export default App;