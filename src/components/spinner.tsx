import React from 'react';

export interface ISpinnser {
  text?: string;
}

export default function Spinner({ text = 'Loading' }: ISpinnser) {
  return (
    <React.Fragment>
      <span
        className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-slate-800 dark:text-white rounded-full"
        role="status"
        aria-label="loading"
      ></span>
      {text && (
        <span className="ml-2 text-bg-slate-800 dark:text-white">{text}</span>
      )}
    </React.Fragment>
  );
}
