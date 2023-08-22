'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { ImExit } from 'react-icons/im';
import { GiMoon } from 'react-icons/gi';
import { CiLogin } from 'react-icons/ci';
import { FaOpencart } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { BiPurchaseTag, BiSolidUserAccount, BiSun } from 'react-icons/bi';

import { useTheme } from '@/hooks';
import { AutoComplate, Button } from '.';
import { useCart } from '@/context/cart-context';

export default function Header() {
  const router = useRouter();
  const { cart } = useCart();
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
            <AutoComplate
              fetcher={(...arg) =>
                fetch(...arg).then(async (res) => (await res.json()).result)
              }
              RenderOptions={({ name, data }) => (
                <Fragment>
                  {data && data.length !== 0 && (
                    <Fragment>
                      <p className="p-2 text-md font-bold text-black dark:text-white">
                        {name}
                      </p>
                      <hr className="border-slate-300" />

                      <ul>
                        {data.map(({ name: label, slug }: any) => (
                          <Button
                            key={slug}
                            fullWidth
                            color="blackedOpacity"
                            variant="ghost"
                            size="small"
                            style={{ justifyContent: 'flex-start' }}
                            onClick={() => {
                              if (name === 'Category') {
                                router.push(`/products/${slug}`);
                              } else if (name === 'Product') {
                                router.push(`/product-info/${slug}`);
                              }
                            }}
                          >
                            {label}
                          </Button>
                        ))}
                      </ul>
                    </Fragment>
                  )}
                </Fragment>
              )}
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
              onClick={() => router.push('/cart')}
              style={{ padding: 0 }}
              className="relative h-[2.375rem] w-[2.375rem]"
              color="blackedOpacity"
              roundedFull
            >
              <FaOpencart size={18} />
              {cart.length !== 0 && (
                <div className="absolute -top-2 right-0 w-5 h-5 text-sm rounded-full text-white bg-black dark:text-black dark:bg-white">
                  {cart.length}
                </div>
              )}
            </Button>

            {status === 'authenticated' ? (
              <div
                className="hs-dropdown relative inline-flex"
                data-hs-dropdown-placement="bottom-right"
              >
                <Button
                  style={{ padding: 0 }}
                  className="h-[2.375rem] w-[2.375rem]"
                  color="blackedOpacity"
                  roundedFull
                  onClick={() => router.push('/login')}
                >
                  <CiLogin size={18} />
                </Button>
              ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
