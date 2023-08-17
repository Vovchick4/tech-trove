'use client';

import { useRef, useState, useEffect, Fragment, ReactNode } from 'react';
import useSWR, { Fetcher } from 'swr';

import { AiOutlineSearch } from 'react-icons/ai';

import { Input, Spinner } from '.';
import { useTheme } from '@/hooks';

export interface IAutoComplete<T> {
  fetcher: Fetcher<T[], string>;
  RenderOptions: (arg: any) => ReactNode;
}

const dropdownClasses = {
  active: 'scale-100 opacity-1',
  default: 'scale-0 opacity-0',
};

export default function Autocomplate<T>({
  fetcher = async (...arg) =>
    fetch(...arg).then(async (res) => await res.json()),
  RenderOptions = (arg) => <p></p>,
}: IAutoComplete<T>) {
  const { isDark } = useTheme();
  const ref = useRef<HTMLInputElement | null>(null);
  const [searchText, setSetsearchText] = useState<string>('');
  const [classes, setClasses] = useState(dropdownClasses.default);

  const { data, isLoading, error } = useSWR(
    `/api/search/${searchText}`,
    fetcher,
    {
      isPaused: () => searchText.trim().length === 0,
    }
  );

  useEffect(() => {
    const input = ref.current;
    if (!input) return;

    input.addEventListener('focusin', (e) => {
      setClasses(dropdownClasses.active);
    });

    input.addEventListener('focusout', () =>
      setClasses(dropdownClasses.default)
    );

    return () => {
      input.removeEventListener('focusin', () =>
        setClasses(dropdownClasses.active)
      );
      input.removeEventListener('focusout', () =>
        setClasses(dropdownClasses.default)
      );
    };
  }, [ref]);

  return (
    <div className="relative">
      <Input
        customRef={ref}
        type="text"
        roundedFull
        placeholder="Search"
        isValidIcons={false}
        leftIcon={
          <Fragment>
            {isLoading && searchText.trim().length !== 0 && <Spinner text="" />}
            {(!isLoading || searchText.trim().length === 0) && (
              <AiOutlineSearch size={20} color={!isDark ? 'black' : 'white'} />
            )}
          </Fragment>
        }
        value={searchText}
        onChange={(e) => setSetsearchText(e.target.value)}
      />

      <ul
        className={`absolute top-12 left-0 right-0 rounded-lg bg-white dark:bg-slate-800 transition-all duration-300 ${classes}`}
      >
        {error && <p>{error}</p>}
        {data &&
          data?.length !== 0 &&
          data.map((item: any, index: number) => (
            <li key={index}>
              <RenderOptions {...item} index={index} />
            </li>
          ))}
      </ul>
    </div>
  );
}
