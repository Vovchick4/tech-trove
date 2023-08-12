'use client';

import { useMemo, useState } from 'react';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import { Button } from '.';

export interface IAccardion {
  title: string;
  list: any[];
  renderLabelList: (item: any) => any;
}

export default function Accardion({
  title,
  list,
  renderLabelList,
}: IAccardion) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const styles = useMemo(() => {
    const classes: string[] = [];

    if (!isOpen) {
      classes.push('h-0');
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
        <span>{title}</span>
        {isOpen ? (
          <MdKeyboardArrowUp size={22} />
        ) : (
          <MdKeyboardArrowDown size={22} />
        )}
      </Button>
      <ul
        style={isOpen ? { height: list.length * 48 } : {}}
        className={
          'w-full overflow-hidden transition-[height] duration-300 bg-gray-900 last:rounded-b-lg' +
          ' ' +
          styles
        }
      >
        {list.map((item, i) => (
          <li key={i} className="px-4 py-3 pl-8 text-sm">
            {renderLabelList(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}
