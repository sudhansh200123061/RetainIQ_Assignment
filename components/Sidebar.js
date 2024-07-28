import React from 'react'
import Image from 'next/image';
import { LightningBoltIcon} from '@heroicons/react/outline';

function Sidebar() {
  return (
    <div className="h-full min-w-[80px] bg-neutral-950 fixed flex flex-col justify-between z-50">
        <div className='flex flex-col items-center'>
          <button className='pt-5 '>
            <Image src="/complogo.png" width={55} height={55}/>
          </button>
          <button className='pt-7 '>
            <Image src="/zap.svg" alt="My Icon" width={25} height={25}  className=''/>
          </button>
          <button className='pt-7 '>
            <Image src="/image.svg" alt="My Icon" width={25} height={25}  className=''/>
          </button>
          <button className='pt-7 '>
            <Image src="/meta.svg" alt="My Icon" width={25} height={25}  />
          </button>
          <button className='pt-7 '>
            <Image src="/shirt.svg" alt="My Icon" width={25} height={25} className='' />
          </button>
        </div>
        <div className='flex flex-col items-center'>
          <button className='pt-7 '>
            <Image src="/card.svg" alt="My Icon" width={25} height={25} />
          </button>
          <button className='pt-7 pb-5'>
            <Image src="/gear.svg" alt="My Icon" width={25} height={25} />
          </button>
        </div>
    </div>
  )
}

export default Sidebar;