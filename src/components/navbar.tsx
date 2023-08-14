'use client';

import { IFilterData } from '@/app/(shop)/products/filter-section';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import useSWR from 'swr';
import ContentLoader from 'react-content-loader';

export default function Navbar() {
  const pathname = usePathname();
  console.log('🚀 ~ file: navbar.tsx:11 ~ Navbar ~ pathname:', pathname);
  const { slug: slugs } = useParams();
  const { data: categories, isLoading } = useSWR('/api/categories', (...args) =>
    fetch(...args).then(async (res) => (await res.json()).categories)
  );

  return (
    <nav
      className="-top-px bg-white text-sm font-medium text-black ring-1 ring-gray-900 ring-opacity-5 border-t shadow-sm shadow-gray-100 pt-6 md:pb-6 -mt-px dark:bg-slate-900 dark:border-gray-800 dark:shadow-slate-700/[.7]"
      aria-label="Jump links"
    >
      <div className="max-w-7xl snap-x w-full flex items-center overflow-x-auto scrollbar-x px-4 sm:px-6 lg:px-8 pb-4 md:pb-0 mx-auto dark:scrollbar-x">
        <div className="snap-center shrink-0 pr-5 sm:pr-8 sm:last-pr-0">
          <Link
            className={
              'inline-flex items-center gap-x-2 hover:text-gray-500 dark:hover:text-gray-500 tarnsition-colors ' +
              `${
                pathname === '/products'
                  ? 'text-gray-800 dark:text-gray-300'
                  : 'text-gray-400 dark:text-gray-400'
              }`
            }
            href={`/products`}
          >
            Products
          </Link>
        </div>
        {isLoading && (
          <ContentLoader
            className="animate-pulse"
            height={20}
            width={834}
            viewBox="0 0 834 20"
            backgroundColor="#d9d9d9"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="4" ry="4" width="75" height="20" />
            <rect x="107" y="0" rx="4" ry="4" width="75" height="20" />
            <rect x="214" y="0" rx="4" ry="4" width="75" height="20" />
            <rect x="321" y="0" rx="4" ry="4" width="75" height="20" />
          </ContentLoader>
        )}

        {!isLoading &&
          categories &&
          categories.map(({ name, slug }: IFilterData) => {
            const isActive = slugs?.includes(slug);
            const classes = isActive
              ? 'text-gray-800 dark:text-gray-300'
              : 'text-gray-400 dark:text-gray-400';

            return (
              <div
                key={`/products/${slug}`}
                className="snap-center shrink-0 pr-5 sm:pr-8 sm:last-pr-0"
              >
                <Link
                  className={
                    classes +
                    ' inline-flex items-center gap-x-2 hover:text-gray-500 dark:hover:text-gray-500 tarnsition-colors'
                  }
                  href={`/products/${slug}`}
                >
                  {name}
                </Link>
              </div>
            );
          })}
      </div>
    </nav>
  );
}
