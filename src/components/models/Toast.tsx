import { CircularProgress } from '@mui/material';
import React from 'react';

const Toast = ({
  cancel,
  save,
  loading,
}: {
  loading?: boolean;
  cancel: () => void;
  save: () => void;
}) => {
  return (
    <div className=' absolute top-16 w-screen z-50   bg-black/30 text-white p-2 flex justify-end gap-4 items-center'>
      <button
        className=' bg-gray-200 py-2 px-4 text-black rounded-lg'
        onClick={cancel}
      >
        cancel
      </button>
      <button
        className=' bg-primary py-2 px-4 rounded-lg'
        onClick={save}
      >
        {loading ? <CircularProgress size={20} /> : ' save'}
      </button>
    </div>
  );
};

export default Toast;
