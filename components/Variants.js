import React, { useState } from 'react';
import Image from 'next/image';
import { PlusIcon,XIcon } from '@heroicons/react/solid';
import Modal from 'react-modal';
import PopupContent from './popupContent';

Modal.setAppElement('#__next');

function Variants({val, onInsert}) {

  const handleInsert = (newVariant) => {
    onInsert(newVariant); 
    closeModal(); 
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div>
      { 
        val.length ? (
            <div className='flex flex-col justify-between items-center'>
              <div className='w-[160] h-[30px]px mt-2'>
                <Image src={val[0]} width={160} height={30} className='rounded-md'/>
              </div>
              <span className='mt-1 w-[160px] overflow-hidden text-ellipsis whitespace-nowrap text-center'>{val[1]}</span>
            </div>
        ):
        (
          <div>
            {console.log(val.length)}
              <button onClick={openModal} className='border-grey-500 rounded border-2 flex items-center p-1'>
                <PlusIcon className='h-5 pr-1'/>
                Add design
              </button>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className='fixed inset-0 flex justify-center items-center z-50'
                overlayClassName='fixed inset-0 bg-black bg-opacity-50 z-50'
                contentClassName='relative bg-white flex justify-center items-center'
              >
                <div className='relative bg-black w-[600px] h-[600px] rounded'>
                  
                  <XIcon onClick={closeModal} className='absolute cursor-pointer h-6 w-6 top-4 right-4  rounded z-50'/>
                
                  <PopupContent onInsert={handleInsert}/>
                  hi
                </div>
              </Modal>

          </div>
        )
      }
    </div>
  )
}

export default Variants;