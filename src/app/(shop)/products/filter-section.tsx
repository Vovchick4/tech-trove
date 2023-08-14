'use client';

import { useRouter, useParams } from 'next/navigation';
import useSWR, { Fetcher } from 'swr';

import Loading from './loading';
import { Accardion, CheckBox } from '@/components';

export interface IFilterData {
  name: string;
  slug: string;
  sub_categories: any[];
}

const fetcher: Fetcher<IFilterData[], string> = (...args) =>
  fetch(...args).then(async (res) => (await res.json()).categories);

export default function FilterSection() {
  const router = useRouter();
  const { slug } = useParams();

  const { data: categories, isLoading } = useSWR(
    slug !== undefined && typeof slug[0] === 'string'
      ? `/api/categories?category_slug=${slug[0]}`
      : '/api/categories',
    fetcher
  );

  if (isLoading) {
    return <Loading.ListOfFilter />;
  }

  return (
    <div className="flex flex-col gap-4">
      {categories &&
        categories.map(({ name, slug: slugg, sub_categories }) => (
          <Accardion
            key={slugg}
            title={name}
            list={sub_categories}
            RenderLabelList={(item) => {
              return (
                <CheckBox
                  title={item.name}
                  isActive={slug?.includes(item.slug)}
                  handlerClick={() => {
                    let href = !slug
                      ? '/' + slugg + '/' + item.slug
                      : (slug as string[]).find((s) => s === item.slug)
                      ? (slug as string[])
                          .filter((s) => s !== item.slug)
                          .join('/')
                      : [...(slug as string[]), item.slug].join('/');
                    router.replace(`/products/${href}`);
                  }}
                />
              );
            }}
          />
        ))}
    </div>
  );
}
