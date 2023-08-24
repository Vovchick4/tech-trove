import Bio from '@/components/bio';
import ContactsBio from '@/components/contacts-bio';
import React, { Fragment } from 'react';

export default function Account() {
  return (
    <div className="flex flex-col">
      <h1 className="text-slate-800 font-bold text-xl dark:text-white">
        Personal Data
      </h1>
      <div className="hs-accordion-group m-3">
        <div
          className="hs-accordion active"
          id="hs-basic-with-title-and-arrow-stretched-heading-one"
        >
          <button
            className="hs-accordion-toggle hs-accordion-active:text-blue-600 group py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400"
            aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
          >
            BIO
            <svg
              className="hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
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
            <svg
              className="hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
          <div
            id="hs-basic-with-title-and-arrow-stretched-collapse-one"
            className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
            aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
          >
            <Bio
              initialData={{
                firstName: 'Bar',
                lastName: 'Snickers',
                gender: 'M',
                birthDate: '2023-08-01',
              }}
            />
          </div>
        </div>

        <div
          className="hs-accordion"
          id="hs-basic-with-title-and-arrow-stretched-heading-two"
        >
          <button
            className="hs-accordion-toggle hs-accordion-active:text-blue-600 group py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400"
            aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-two"
          >
            Contacts
            <svg
              className="hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
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
            <svg
              className="hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
          <div
            id="hs-basic-with-title-and-arrow-stretched-collapse-two"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-two"
          >
            <p className="text-gray-800 dark:text-gray-200">
              <ContactsBio
                initialData={{
                  phNumber: '+380676733444',
                  email: 'Bar_Snickers@gmail.com',
                  address:
                    'Нова Пошта. Поштомат №4176 м. Львів, Львівська область',
                }}
              />
            </p>
          </div>
        </div>

        <div
          className="hs-accordion"
          id="hs-basic-with-title-and-arrow-stretched-heading-three"
        >
          <button
            className="hs-accordion-toggle hs-accordion-active:text-blue-600 group py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400"
            aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-three"
          >
            Security
            <svg
              className="hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
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
            <svg
              className="hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
          <div
            id="hs-basic-with-title-and-arrow-stretched-collapse-three"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-three"
          >
            <p className="text-gray-800 dark:text-gray-200">
              Change/Retrive password
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
