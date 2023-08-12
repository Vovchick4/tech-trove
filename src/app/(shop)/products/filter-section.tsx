'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Loading from './loading';
import { Accardion, CheckBox } from '@/components';
import setToCache from '@/app/lib/cache';

const getCategories = async () => {
  return setToCache(
    'categories',
    async () =>
      await (await fetch('http://localhost:3000/api/categories')).json()
  );
};

export default function FilterSection() {
  const router = useRouter();
  const { slug } = useParams();

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setLoading(false);
    try {
      (async () => {
        setCategories((await getCategories()).categories);
      })();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
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
            renderLabelList={(item) => (
              <CheckBox
                title={item.name}
                isActive={slug?.includes(item.slug)}
                handlerClick={() =>
                  router.push(
                    !slug
                      ? '/products/' + item.slug
                      : '/products/' + (slug as string[]).join('/')
                  )
                }
              />
            )}
          />
        ))}
    </div>
  );
}
