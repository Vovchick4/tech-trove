import { CgCheck, CgRadioCheck } from 'react-icons/cg';

export interface ICheckBoxProps {
  title: string;
  isActive: boolean;
  handlerClick?: () => void;
}

const Checkbox: React.FC<ICheckBoxProps> = ({
  title,
  isActive = false,
  handlerClick,
}) => {
  return (
    <button
      className="flex items-center justify-between w-full"
      onClick={handlerClick}
    >
      <span>{title}</span>
      <div className="relative">
        <CgRadioCheck size={26} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {isActive && <CgCheck size={20} />}
        </div>
      </div>
    </button>
  );
};

export default Checkbox;
