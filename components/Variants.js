import React from 'react';
import Image from 'next/image';

function Variants({img, text}) {
  return (
    <div className='flex flex-col justify-between items-center'>
        <Image src={img} width={160} height={30}/>
        <span className='border-gray-400 border-2 mt-1 rounded'>{text}</span>
    </div>
  )
}

export default Variants;