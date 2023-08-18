'use client';

import { Fragment, useMemo, ReactNode } from 'react';

import { AiOutlineClose } from 'react-icons/ai';
import { Button } from '.';

export interface IModalActions {
  handleClose: () => void;
}

export interface IModal extends IModalActions {
  children: ReactNode;
  headerLabel?: string;
  isActive: boolean;
}

export const modalState = {
  active: 'pointer-events-auto opacity-1 scale-100',
  noActive: 'pointer-events-none opacity-0 scale-0',
};

export default function Modal({
  children,
  headerLabel = '',
  isActive,
  handleClose,
}: IModal) {
  const classes = useMemo(() => {
    const styles: string[] = [];

    if (isActive) {
      styles.push(modalState.active);
    } else {
      styles.push(modalState.noActive);
    }

    return styles.join(' ');
  }, [isActive]);

  return (
    <Fragment>
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 rounded-lg w-11/12 sm:w-[430px] transition-all duration-300 bg-white dark:bg-slate-800 z-30 ${classes}`}
      >
        <div className="flex items-center justify-between">
          <p>{headerLabel}</p>
          <Button
            size="small"
            color="blackedOpacity"
            variant="ghost"
            onClick={handleClose}
          >
            <AiOutlineClose size={22} />
          </Button>
        </div>
        <hr className="border-slate-300 dark:border-white" />
        <div className="p-2">{isActive && children}</div>
      </div>
      {isActive && (
        <div
          className="fixed inset-0 bg-stone-900/75 z-20"
          onClick={handleClose}
        />
      )}
    </Fragment>
  );
}
