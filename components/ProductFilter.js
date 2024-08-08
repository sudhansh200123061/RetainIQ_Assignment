import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/solid';
import Modal from 'react-modal';

Modal.setAppElement('#__next');

function ProductFilter({ filter }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const openModal = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setModalPosition({
      top: rect.top + 35, // Adjust the value to position above the element
      left: rect.left + rect.width / 2,
    });
    setModalIsOpen(true);
    setTimeout(() => {
      setModalVisible(true);
    }, 10);
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => {
      setModalIsOpen(false);
    }, 300);
  };

  return (
    <div>
      {filter.length ? (
        <div onMouseEnter={openModal} className="flex flex-wrap justify-center gap-2 w-[300px]">
          {filter.map((fil, index) => (
            <div
              key={index}
              className={`text-xs p-1 border-2 rounded ${index % 2 === 1 ? 'border-green-200 bg-green-100' : ''}`}
            >
              {fil}
            </div>
          ))}
        </div>
      ) : (
        <div className="">
          <button className="border-grey-500 rounded border-2 flex items-center p-1">
            <PlusIcon className="h-5 pr-1" />
            Add Product Filters
          </button>
        </div>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={`fixed z-50 transition-opacity duration-300 ${modalVisible ? 'opacity-100' : 'opacity-0'}`}
        overlayClassName={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${modalVisible ? 'opacity-100' : 'opacity-0'}`}
        closeTimeoutMS={300}
        style={{
          content: {
            top: `${modalPosition.top}px`,
            left: `${modalPosition.left}px`,
            transform: 'translate(-35%, -70%)', // Adjust the position to be above the element
            width: 'auto',
            height: 'auto',
            padding: '0',
            borderRadius: '0.375rem', // Tailwind's rounded class
          },
          overlay: {
            zIndex: 50,
          },
        }}
      >
        <div onMouseLeave={closeModal} className="bg-white border-2 border-gray-200 p-4 rounded">
          <div className="flex justify-center gap-2">
            {filter.map((fil, index) => (
              <div
                key={index}
                className={`text-xs p-1 border-2 rounded ${index % 2 === 1 ? 'border-green-200 bg-green-100' : ''}`}
              >
                {fil}
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ProductFilter;
