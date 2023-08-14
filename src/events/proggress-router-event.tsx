'use client';

import { useEffect, Fragment } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';

const ProgressIndicator = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
    return () => {
      NProgress.start();
    };
  }, [pathname, searchParams]);

  return <Fragment></Fragment>; // An empty fragment, as the component doesn't render anything
};

export default ProgressIndicator;
