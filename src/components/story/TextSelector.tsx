import React from 'react';
import TextBgSelector from './TextBgSelector';

const TextSelector = ({
  setColor,
  setText,
  text,
}: {
  setColor: (value: string) => void;
  setText: (value: string) => void;
  text: string;
}) => {
  return (
    <div className=' p-2 flex flex-col gap-2'>
      <textarea
        onChange={e => setText(e.target.value)}
        value={text}
        className='  p-2 rounded-lg border border-gray-200 max-h-[250px] resize-none outline-none'
        placeholder='start typing...'
      />
      <div className=' p-2 rounded-lg border border-gray-300'>font family</div>
      <div className=' w-full h-60'>
        <TextBgSelector setColor={setColor} />
      </div>
    </div>
  );
};

export default TextSelector;
