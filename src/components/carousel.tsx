'use client';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React, { Fragment } from 'react';
import Slider from 'react-slick';
import useSWR, { Fetcher } from 'swr';

import { Spinner } from '.';
import { useCart } from '@/context/cart-context';
import ProductCard, { ICardProps } from './product-card';

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

const fetchProduct: Fetcher<ICardProps[], string> = async (...arg) =>
  (await (await fetch(...arg)).json()).products.data;

export default function MultiItemCarousel({}: {}) {
  const { addToCart } = useCart();

  const { data: products, isLoading } = useSWR('/api/products', fetchProduct);

  return (
    <Fragment>
      {isLoading && <Spinner />}
      {!isLoading && products && (
        <Slider {...settings}>
          {products.map((product, index) => (
            <div key={index} className="px-2">
              <ProductCard {...product} addToCart={addToCart} />
            </div>
          ))}
        </Slider>
      )}
    </Fragment>
  );
}
