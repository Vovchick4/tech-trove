'use client';

import { useMemo, useState, ReactNode } from 'react';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import { Button } from '.';

export interface IAccardion {
  title: string | ReactNode;
  rightTitle?: string | ReactNode;
  list: any[];
  RenderLabelList: (item: any) => any;
}

export default function Accardion({
  title,
  rightTitle = undefined,
  list,
  RenderLabelList,
}: IAccardion) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const styles = useMemo(() => {
    const classes: string[] = [];

    if (!isOpen) {
      classes.push('h-0 opacity-20');
    } else {
      classes.push('opacity-100');
    }

    return classes.join(' ');
  }, [isOpen]);

  function toggleIsOpen() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div className="w-full">
      <Button
        style={{
          justifyContent: 'space-between',
          borderBottomRightRadius: isOpen ? 0 : 2,
          borderBottomLeftRadius: isOpen ? 0 : 2,
          transition: 'all 300ms',
        }}
        variant="solid"
        color="blackedOpacity"
        fullWidth
        onClick={toggleIsOpen}
      >
        {typeof title === 'string' ? <span>{title}</span> : title}
        <div className="flex gap-4">
          {rightTitle && rightTitle}
          {isOpen ? (
            <MdKeyboardArrowUp size={22} />
          ) : (
            <MdKeyboardArrowDown size={22} />
          )}
        </div>
      </Button>
      <ul
        style={isOpen ? { height: list.length * 48 } : {}}
        className={
          'w-full overflow-hidden transition-all duration-300 ease-in-out bg-gray-900 last:rounded-b-lg' +
          ' ' +
          styles
        }
      >
        {list.map((item, i) => (
          <li key={i} className="px-4 py-3 pl-8 text-sm">
            {<RenderLabelList {...item} i={i} />}
          </li>
        ))}
      </ul>
    </div>
  );
}
