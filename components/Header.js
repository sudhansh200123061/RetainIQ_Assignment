import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/solid';

function Header() {
  
  return (
    <div className='fixed top-0 left-[80px] right-0 flex justify-between h-[100px] items-center px-7 bg-white z-50'>
      <div className='flex items-center'>
        <button>
          <ArrowLeftIcon className='h-6 w-6 mr-4' />
        </button>
        <input
          type="text"
          placeholder='Test 3_staging'
          className="text-3xl font-bold bg-transparent border-b-2 border-gray-400 pb-2 w-[400px] focus:outline-none focus:border-black"
          style={{ fontFamily: 'Recoleta, sans-serif' }}
        />
        <button className="border-blue-500 border-2 ml-4 w-[90px] text-xs rounded-full text-blue-500 font-semibold pb-[2px]">
          Primary Feed
        </button>
      </div>
      <div>
        <button className='border-green-500 border-2 rounded-md w-[110px] h-[45px] bg-green-500 text-white'>
          Publish Feed
        </button>
      </div>
    </div>
  );
}

export default Header;
