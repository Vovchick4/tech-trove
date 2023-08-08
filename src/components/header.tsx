'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import { GiMoon } from 'react-icons/gi';
import { CiLogin } from 'react-icons/ci';
import { FaOpencart } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { BiPurchaseTag, BiSolidUserAccount, BiSun } from 'react-icons/bi';

import { Button, Input } from '.';
import { useTheme } from '@/context/theme-context';

export default function Header() {
  const { status } = useSession();
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white border-b text-sm py-2.5 sm:py-4 dark:bg-slate-900 dark:border-gray-700">
      <nav
        className="max-w-7xl flex basis-full items-center w-full mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="mr-5 md:mr-8">
          <Link
            className="flex-none text-xl text-black font-semibold dark:text-white"
            aria-label="Brand"
            href="/"
          >
            TechTrove
          </Link>
        </div>

        <div className="w-full flex items-center justify-end gap-2 ml-auto sm:justify-between sm:gap-x-3 sm:order-3">
          <div className="sm:hidden">
            <Button
              color="blackedOpacity"
              style={{ padding: 0 }}
              className="h-[2.375rem] w-[2.375rem]"
              roundedFull
            >
              <AiOutlineSearch size={17} />
            </Button>
          </div>

          <div className="hidden sm:block">
            <Input
              type="text"
              roundedFull
              placeholder="Search"
              isValidIcons={false}
              leftIcon={
                <AiOutlineSearch
                  size={20}
                  color={!isDark ? 'black' : 'white'}
                />
              }
            />
          </div>

          <div className="flex flex-row items-center justify-end gap-2">
            <Button
              type="button"
              onClick={toggleTheme}
              style={{ padding: 0 }}
              className="h-[2.375rem] w-[2.375rem]"
              variant="ghost"
              color="blackedOpacity"
              roundedFull
            >
              {isDark ? <BiSun size={22} /> : <GiMoon size={22} />}
            </Button>

            <Button
              style={{ padding: 0 }}
              className="h-[2.375rem] w-[2.375rem]"
              color="blackedOpacity"
              roundedFull
            >
              <IoMdNotificationsOutline size={22} />
            </Button>

            <Button
              style={{ padding: 0 }}
              className="h-[2.375rem] w-[2.375rem]"
              color="blackedOpacity"
              roundedFull
            >
              <FaOpencart size={18} />
            </Button>

            {status === 'authenticated' ? (
              <div
                className="hs-dropdown relative inline-flex"
                data-hs-dropdown-placement="bottom-right"
              >
                <Button
                  id="hs-dropdown-default"
                  style={{ padding: 0 }}
                  className="hs-dropdown-toggle h-[2.375rem] w-[2.375rem]"
                  color="blackedOpacity"
                  roundedFull
                >
                  <Image
                    width={200}
                    height={200}
                    className="inline-block h-[2.375rem] w-[2.375rem] rounded-full ring-2 ring-white dark:ring-gray-800"
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                    alt="DropImage"
                  />
                </Button>

                <div
                  className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] z-10 bg-white shadow-md rounded-lg p-2 dark:bg-gray-800 dark:border dark:border-gray-700"
                  aria-labelledby="hs-dropdown-with-header"
                >
                  <div className="py-3 px-5 -m-2 bg-gray-100 rounded-t-lg dark:bg-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Signed in as
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-300">
                      james@site.com
                    </p>
                  </div>
                  <div className="mt-2 py-2 first:pt-0 last:pb-0">
                    <a
                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                      href="#"
                    >
                      <BiSolidUserAccount size={18} />
                      Account
                    </a>
                  </div>
                  <div className="mt-2 py-2 first:pt-0 last:pb-0">
                    <a
                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                      href="#"
                    >
                      <BiPurchaseTag size={18} />
                      Purchases
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <Button
                style={{ padding: 0 }}
                className="h-[2.375rem] w-[2.375rem]"
                color="blackedOpacity"
                roundedFull
              >
                <CiLogin size={18} />
              </Button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
