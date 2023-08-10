'use client';

import { ProductCard } from '@/components';
import Checkbox from '@/components/checkbox';
import { useState } from 'react';

export default function Product() {
  const initialCheckboxData = [
    { label: 'Xiaomi', checked: false },
    { label: 'Samsung', checked: false },
    { label: 'Nokia', checked: false },
    { label: 'Apple', checked: false },
    { label: 'Poco', checked: false },
  ];

  const handleCheckboxChange = (index: number) => (checked: boolean) => {
    const newData = [...checkboxData];
    newData[index].checked = checked;
    setCheckboxData(newData);
  };

  const [checkboxData, setCheckboxData] = useState(initialCheckboxData);

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-7xl text-black dark:text-white p-3">
        SHOP ALL
      </h1>
      <div className="flex flex-row justify-between content-center  p-3">
        <h4 className="text-3xl text-black dark:text-white"> Filter by</h4>
        <div className="hs-dropdown ">
          <button
            id="hs-dropdown-basic"
            type="button"
            className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
          >
            Sort by
            <svg
              className="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-gray-600"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
          <div
            className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 w-56 hidden z-10 mt-2 min-w-[15rem] bg-white shadow-md rounded-lg p-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700"
            aria-labelledby="hs-dropdown-basic"
          >
            <a
              className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
              href="#"
            >
              Newest
            </a>
            <a
              className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
              href="#"
            >
              Price(low to high)
            </a>
            <a
              className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
              href="#"
            >
              Price(high to low)
            </a>
            <a
              className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
              href="#"
            >
              Name A-Z
            </a>
            <a
              className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
              href="#"
            >
              Name Z-A
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="flex-none flex-col px-3 sm:w-1/6">
          <div className="hs-accordion-group">
            <div className="hs-accordion active" id="hs-basic-heading-brands">
              <button
                className="hs-accordion-toggle hs-accordion-active:text-blue-600 group py-3 inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400"
                aria-controls="hs-basic-collapse-one"
              >
                <svg
                  className="hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.62421 7.86L13.6242 7.85999"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M8.12421 13.36V2.35999"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
                <svg
                  className="hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.62421 7.86L13.6242 7.85999"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
                <p className="text-2xl">Brands</p>
              </button>
              <div
                id="hs-basic-heading-brands"
                className="hs-accordion-content w-full text-xl overflow-hidden transition-[height] duration-300"
                aria-labelledby="hs-basic-heading-brands"
              >
                {checkboxData.map((item, index) => (
                  <Checkbox
                    key={index}
                    label={item.label}
                    checked={item.checked}
                    onChange={handleCheckboxChange(index)}
                  />
                ))}
              </div>
            </div>

            <div className="hs-accordion" id="hs-basic-heading-price">
              <button
                className="hs-accordion-toggle hs-accordion-active:text-blue-600 group py-3 inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400"
                aria-controls="hs-basic-collapse-three"
              >
                <svg
                  className="hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.62421 7.86L13.6242 7.85999"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M8.12421 13.36V2.35999"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
                <svg
                  className="hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.62421 7.86L13.6242 7.85999"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
                <p className="text-2xl">Price</p>
              </button>
              <div
                id="hs-basic-heading-price"
                className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                aria-labelledby="hs-basic-heading-price"
              >
                <input
                  id="small-range"
                  type="range"
                  className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
                ></input>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Card Blog --> */}
        <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto sm:w-5/6 ">
          <div className="flex flex-col">
            {/* <!-- Grid --> */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <ProductCard
                name="Logitech C-700"
                describe="Web-cam"
                price="100$"
                slug="1"
              ></ProductCard>
              <ProductCard
                name="Razer Viper 8KHz - Black"
                describe="Ambidextrous Esports Gaming Mouse with 8000Hz Polling Rate"
                price="145$"
                slug="1"
              ></ProductCard>
              <ProductCard
                name="Razer Viper V2 Pro - Black"
                describe="Ultra-lightweight, Ultra-fast Wireless Esports Mouse"
                price="200$"
                slug="1"
              ></ProductCard>
              <ProductCard
                name="RAZER BLACKSHARK V2 PRO"
                describe="RAZER BLACKSHARK V2 PRO"
                price="145$"
                slug="1"
              ></ProductCard>
            </div>
            {/* <!-- End Grid --> */}
          </div>
          {/* <!-- End Card Blog --> */}
        </div>
      </div>
    </div>
  );
}
