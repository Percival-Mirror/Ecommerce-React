import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../css/main.css'
import { ProductsSwiper } from '../components/SwiperProducts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useContext, useRef, } from "react"

export const ShopMainPage = () => {

  return (
    <main>
      <section>
        <div className='main-slider'>
          <Swiper
            navigation={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 5000,
            }}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div></div>
            </SwiperSlide>
            <SwiperSlide>
              <div></div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
      <section>
        <div className='container pb-5'>
          <ProductsSwiper categoria="men's clothing"></ProductsSwiper>
          <ProductsSwiper categoria="women's clothing"></ProductsSwiper>
          <ProductsSwiper categoria="jewelery"></ProductsSwiper>
          <ProductsSwiper categoria="electronics"></ProductsSwiper>
        </div>
      </section>
    </main>
  )
}
