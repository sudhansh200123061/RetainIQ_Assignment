import React from 'react'
import Image from 'next/image';
import { SearchIcon } from '@heroicons/react/outline';

const data = [
    {
        "img" : "/img1.jpeg",
        "txt" : "Anniversary Sale"
    },
    {
        "img" : "/img2.jpeg",
        "txt" : "Single image product"
    },
    {
        "img" : "/img3.jpeg",
        "txt" : "4 image - zero discount"
    },
    {
        "img" : "/img1.jpeg",
        "txt" : "Anniversary Sale"
    },
    {
        "img" : "/img2.jpeg",
        "txt" : "Single image product"
    },
    {
        "img" : "/img3.jpeg",
        "txt" : "4 image - zero discount"
    },
    {
        "img" : "/img1.jpeg",
        "txt" : "Anniversary Sale"
    },
    {
        "img" : "/img2.jpeg",
        "txt" : "Single image product"
    },
    {
        "img" : "/img3.jpeg",
        "txt" : "4 image - zero discount"
    },
    {
        "img" : "/img1.jpeg",
        "txt" : "Anniversary Sale"
    },
    {
        "img" : "/img2.jpeg",
        "txt" : "Single image product"
    },
    {
        "img" : "/img3.jpeg",
        "txt" : "4 image - zero discount"
    },
    {
        "img" : "/img1.jpeg",
        "txt" : "Anniversary Sale"
    },
    {
        "img" : "/img2.jpeg",
        "txt" : "Single image product"
    },
    {
        "img" : "/img3.jpeg",
        "txt" : "4 image - zero discount"
    }
]

function popupContent({onInsert}) {
    
    const handleInsertClick = (variant) => {
        onInsert(variant); // Call the parent function with the selected variant
    };
      

  return (
    <div className='h-[440px] rounded'>
        <div className='relative border-gray-100 border-2 h-40 bg-white overflow-hidden'>
            <div className='absolute top-[-28px] left-[-30px] w-[180px]'>
                <div className='border-gray-400 border-[1.5px] rounded-full w-[160px] h-[160px] flex justify-center items-center'>
                    <div className='border-gray-400 border-[1.5px] rounded-full w-[120px] h-[120px] flex justify-center items-center'>
                        <div className='border-gray-400 border-[1.5px] rounded-full w-[80px] h-[80px] flex justify-center items-center'>
                            <div className="w-8 h-8">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="green" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-image">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                    <polyline points="21 15 16 10 5 21"></polyline>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='absolute text-xl font-semibold top-[100px] left-[20px]'>Select a design to link</div>

            <div className='absolute top-[100px] left-[400px] w-[190px] h-[40px] border-blue-300 border-2 rounded-md flex items-center'>
                <SearchIcon/>
                <input type="text" placeholder='Search' className='ml-2 w-[150px] focus:outline-none' />
            </div >

        </div>
        <div className='h-full bg-white pt-4 pl-4 pr-4 flex flex-wrap gap-2 overflow-scroll'>
            {data.map((row,index)=>(               
                <div key={index} className='flex flex-col justify-between items-center'>
                    <div className='relative w-[132] h-[30px]px mt-4'>
                        <Image src={row.img} width={132} height={20} alt='' className='rounded-md'/>
                        <div className='absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300'>
                            <button onClick={() => handleInsertClick([row.img, row.txt])} className=' text-black bg-white text-sm rounded-md h-[40px] text-center p-2'>
                                Insert
                            </button>
                        </div>
                    </div>
                    <span className='mt-1 w-[132px] overflow-hidden text-ellipsis whitespace-nowrap text-center'>{row.txt}</span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default popupContent;