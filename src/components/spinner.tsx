import React from 'react';

export default function Spinner() {
  return (
    <React.Fragment>
      <span
        className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-bg-slate-800 dark:text-white rounded-full"
        role="status"
        aria-label="loading"
      ></span>
      <span className="ml-2 text-bg-slate-800 dark:text-white">Loading</span>
    </React.Fragment>
  );
}
