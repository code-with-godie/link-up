import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import React from 'react';
const ShareIconItem = ({
  Icon,
  label,
  flag,
  onclickHandler,
}: {
  Icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
    muiName: string;
  };
  label: string;
  flag?: string;
  onclickHandler?: () => void;
}) => {
  return (
    <div
      className=' flex items-center gap-2 cursor-pointer p-2'
      onClick={onclickHandler}
    >
      <Icon
        className={`${flag === 'two' ? 'text-green-400' : 'text-red-400'}`}
      />
      <p className=' text-black/70'> {label} </p>
    </div>
  );
};

export default ShareIconItem;
