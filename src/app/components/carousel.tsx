'use client';

import React from 'react';
import Slider from 'react-slick';
//import ProductCard from './product-card';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const products = [
  { title: 'Logitech C-700', describe: 'Web-cam', price: '100$' },
  { title: 'Product 2', describe: 'Description 2nsmfnsnamfn', price: '200$' },
  { title: 'Product 3', describe: 'Description 3', price: '300$' },
  { title: 'Product 4', describe: 'Description 4', price: '400$' },
  { title: 'Product 5', describe: 'Description 5s,mmnmnsanjg', price: '400$' },
  { title: 'Product 6', describe: 'Description 6', price: '400$' },
  {
    title: 'Product 7',
    describe: 'Description 7sgnnsnamgns,agb,sabngbsnmbgmna',
    price: '400$',
  },
  { title: 'Product 8', describe: 'Description 8', price: '400$' },
  { title: 'Product 9', describe: 'Description 9', price: '400$' },
];

export default function MultiItemCarousel() {
  var settings = {
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

  return (
    <Slider {...settings}>
      {products.map((product, index) => (
        <div key={index} className="px-2">
          <ProductCard
            title={product.title}
            describe={product.describe}
            price={product.price}
          />
        </div>
      ))}
    </Slider>
  );
}
