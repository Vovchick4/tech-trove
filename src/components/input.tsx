'use client';

import React from 'react';
import {
  AiTwotoneEye,
  AiTwotoneEyeInvisible,
  AiFillInfoCircle,
  AiOutlineCheck,
} from 'react-icons/ai';
import Button, { SizeType } from './button';

export interface IInput
  extends Omit<React.ComponentPropsWithoutRef<'input'>, 'size'> {
  isValidIcons?: boolean;
  rightIcon?: React.ReactNode;
  size?: keyof SizeType;
  roundedFull?: boolean;
  className?: string;
  label?: string;
  helperText?: string;
  error?: string;
}

export const InputSize: SizeType = {
  small: 'py-3 px-3',
  default: 'py-3 px-4',
  large: 'py-3 px-4 sm:p-5',
};

const InputPassword = (
  props: Pick<IInput, 'isValidIcons' | 'helperText' | 'label' | 'error'>
) => {
  const [isPass, setIsPass] = React.useState(true);
  return (
    <Input
      type={!isPass ? 'text' : 'password'}
      {...props}
      rightIcon={
        <Button
          style={{ backgroundColor: 'transparent', padding: '3.4px' }}
          size="small"
          onClick={() => setIsPass((prev) => !prev)}
        >
          {!isPass ? <AiTwotoneEye /> : <AiTwotoneEyeInvisible />}
        </Button>
      }
    />
  );
};

const TextArea = (props: React.ComponentPropsWithoutRef<'textarea'>) => {
  return (
    <textarea
      className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
      rows={3}
      {...props}
    ></textarea>
  );
};

export default function Input({
  size = 'default',
  roundedFull = false,
  isValidIcons = true,
  rightIcon,
  className = '',
  label = '',
  helperText = '',
  error = '',
  ...rest
}: IInput) {
  const styles = React.useMemo(() => {
    const classes: string[] = [];
    classes.push(InputSize[size]);

    if (roundedFull) {
      classes.push('rounded-full');
    }

    if (rightIcon && isValidIcons) {
      classes.push('pr-16');
    } else if (rightIcon || isValidIcons) {
      classes.push('pr-8');
    }

    if (isValidIcons) {
      if (error) {
        classes.push('focus:border-red-500 dark:focus:border-red-500');
      } else {
        classes.push('focus:border-green-500 dark:focus:border-green-500');
      }
    }

    return classes.join(' ');
  }, [size, error, rightIcon, roundedFull, isValidIcons]);

  return (
    <React.Fragment>
      {label && (
        <label className="block text-sm font-medium mb-2 dark:text-white">
          {label}
        </label>
      )}
      {helperText && <p className="text-sm text-gray-500 my-2">{helperText}</p>}
      <div className="relative">
        <input
          className={
            'block w-full outline-none text-black border-2 border-gray-500 rounded-md transition-all focus:border-blue-500 dark:focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400' +
            ` ${styles} ` +
            className
          }
          {...rest}
        />
        <div className="flex items-center gap-2 absolute top-1/2 right-2 -translate-y-1/2">
          {isValidIcons && (error ? <AiFillInfoCircle /> : <AiOutlineCheck />)}
          {rightIcon && rightIcon}
        </div>
      </div>
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
    </React.Fragment>
  );
}

Input.TextArea = TextArea;
Input.Password = InputPassword;
