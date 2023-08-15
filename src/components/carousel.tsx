'use client';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { use } from 'react';
import Slider from 'react-slick';
import setToCache from '@/app/lib/cache';
import { useCart } from '@/context/cart-context';
import ProductCard, { CardProps } from './product-card';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 750,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
  ],
};

const fetchProduct = async () => {
  const products: CardProps[] = await setToCache(
    'products',
    async () =>
      (
        await (
          await fetch('http://localhost:3000/api/products', {
            cache: 'no-cache',
          })
        ).json()
      ).products
  );
  return products;
};

export default function MultiItemCarousel({}: {}) {
  const { addToCart } = useCart();
  const products = use(fetchProduct());

  return (
    <Slider {...settings}>
      {products &&
        products.map((product, index) => (
          <div key={index} className="px-2">
            <ProductCard {...product} addToCart={addToCart} />
          </div>
        ))}
    </Slider>
  );
}
