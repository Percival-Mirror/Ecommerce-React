import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ProductsContext } from "../context/productsContext"
import { useContext, useEffect, useRef } from "react"
import { Card } from "./Card"
import { SwiperCustomButtons } from './SwiperCustomButtons';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export const ProductsSwiper = ({ categoria }) => {

    const { products } = useContext(ProductsContext)

    const { addPurchase } = useContext(CartContext)

    const handleAddPurchase = (purchase, selectedQuantity) => {
        addPurchase(purchase, selectedQuantity)
    }

    return (
        <div className="category-container">
            <div className='category-top'>
                <h2>{categoria.toUpperCase()}</h2>
                <hr></hr>
            </div>

            <Swiper
                modules={[Navigation]}
                spaceBetween={15}
                breakpoints={{
                    300: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 50,
                    },
                }}
                className="mySwiper">
                {products.filter(product => product.category == categoria).map(filteredProduct => (
                    <SwiperSlide>
                        <Card
                            id={filteredProduct.id}
                            key={filteredProduct.id}
                            image={filteredProduct.image}
                            title={filteredProduct.title}
                            price={filteredProduct.price}
                            grid={true}
                            description={filteredProduct.description}
                            handleAdd={() => handleAddPurchase(filteredProduct, 1)}
                        >
                        </Card>
                    </SwiperSlide>
                ))}

                <div className='category-bottom'>
                    <Link>See more</Link>
                    {products.filter(product => product.category == categoria).length < 6 ?
                        <div></div>
                        :
                        <div>
                            <SwiperCustomButtons></SwiperCustomButtons>
                        </div>
                    }
                </div>



            </Swiper>
        </div>
    )
}
