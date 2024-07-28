import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DotsVerticalIcon, PlusIcon, TrashIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { ClipLoader } from 'react-spinners';
import ProductFilter from './ProductFilter.js';
import Variants from './Variants.js'

const initialRows = [
  {
    id: 1,
    filter: 'Anarkali Kurtas',
    'Primary Variant': ['/img1.jpeg' ,'Anniversary Sale'],
    'Variant 2': ['/img2.jpeg' ,'2 image - zero discount'],
    'Variant 3': ['/img3.jpeg' ,'Multi Image - fallback']
  },
  {
    id: 2,
    filter: 'pekka',
    'Primary Variant': ['/img1.jpeg' ,'Single image product'],
    'Variant 2': ['/img2.jpeg' ,'4 image - zero discount'],
    'Variant 3': ['/img3.jpeg' ,'Multi Image - No Tag']
  },
  {
    id: 3,
    filter: 'king',
    'Primary Variant': ['/img1.jpeg' ,'Single e product'],
    'Variant 2': ['/img2.jpeg' ,'4 image - zero discount'],
    'Variant 3': ['/img3.jpeg' ,'Multi Image - No Tag']
  },
];

function Body() {
  const [rows, setRows] = useState(initialRows);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visibleDropdownColumn, setVisibleDropdownColumn] = useState(null);

  const SortableRow = ({ id, children }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id, handle: '.drag-handle' });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {children}
      </div>
    );
  };

  const toggleDropdown = (columnKey) => {
    if (visibleDropdownColumn === columnKey) {
      setVisibleDropdownColumn(null);
    } else {
      setVisibleDropdownColumn(columnKey);
    }
  };

  const addRow = () => {
    setLoading(true);
    const newId = rows.length ? rows[rows.length - 1].id + 1 : 1;
    const keys = Object.keys(rows[rows.length - 1]);

    const newRow = keys.reduce((acc, key) => {
      if (key === 'id') {
        acc[key] = newId;
      } else if(key == 'filter'){
        acc[key] = key; // or any default value you want to set
      }
      else {
        acc[key] = ['/img3.jpeg' ,'Multi Image - fallback'];
      }
      return acc;
    }, {});

    setTimeout(() => {
      setRows([...rows, newRow]);
      setLoading(false);
    }, 400);
  };

  const addColumn = () => {
    setLoading(true);
    const newCol = `Variant ${Object.keys(rows[0]).length - 1 + 1}`;

    const updatedRows = rows.map(row => ({
      ...row,
      [newCol]: ['/img3.jpeg' ,'Multi Image - fallback'],
    }));

    setTimeout(() => {
      setRows(updatedRows);
      setLoading(false);
    }, 400);
  };

  const deleteColumn = (columnKey) => {
    const updatedRows = rows.map(row => {
      const newRow = { ...row };
      const keys = Object.keys(newRow);
      const columnIndex = keys.indexOf(columnKey);

      // Shift the remaining columns
      for (let i = columnIndex; i < keys.length - 1; i++) {
        newRow[keys[i]] = newRow[keys[i + 1]];
      }

      // Delete the last column
      delete newRow[keys[keys.length - 1]];

      return newRow;
    });

    setRows(updatedRows);
    setVisibleDropdownColumn(null);
  };

  const deleteRow = (id) => {
    const updatedRows = rows
      .filter(row => row.id !== id) // Filter out the row to be deleted
      .map((row, index) => ({
        ...row,
        id: index + 1
      }));

    setRows(updatedRows);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setRows((rows) => {
        const oldIndex = rows.findIndex((row) => row.id === parseInt(active.id));
        const newIndex = rows.findIndex((row) => row.id === parseInt(over.id));
        const newRows = arrayMove(rows, oldIndex, newIndex);
  
        // Adjust IDs to reflect their new positions
        return newRows.map((row, index) => ({ ...row, id: index + 1 }));
      });
    }
  };

  console.log(rows);

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={rows.map(row => row.id.toString())} strategy={rectSortingStrategy}>
        <div className='bg-gray-50 border-gray-300 border-[1px] mx-3 mt-[120px] overflow-x-clip'>
          <div className='flex'>
            <div className='w-[550px] sticky left-20 bg-gray-50 z-10'>
              <div className='flex mt-3 mb-3 ml-10 items-center'>
                <div className='border-gray-300 border-r-[1px] font-bold text-gray-400 ml-[60px] flex justify-center w-[450px]'>Product Filter</div>
              </div>
              {rows.map(row => (
                <SortableRow key={row.id} id={row.id.toString()}>
                  <div
                    id={row.id}
                    className='flex items-center h-60 ml-20'
                    onMouseEnter={() => setHoveredRow(row.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <div className='border-gray-300 border-r-[1px] pr-3 h-52 w-[41px] relative flex flex-col justify-center'>
                      {hoveredRow === row.id && (
                        <button
                          className='absolute top-12 left-1'
                          onClick={() => deleteRow(row.id)}
                        >
                          <TrashIcon className='h-6 w-6 text-red-600' />
                        </button>
                      )}
                      <div className='flex items-center justify-center'>
                        <span className='font-bold text-2xl' style={{ fontFamily: 'Recoleta, sans-serif' }}>{row.id} </span>
                        <Image className="drag-handle" src="/3x3dots.svg" alt="My Icon" width={20} height={20} />
                      </div>
                    </div>

                    <div className='border-gray-300 border-r-[1px] flex justify-center h-52 items-center w-[430px]'>
                      <div className='border-gray-400 border-[2px] border-dotted w-[370px] ml-3 h-40 rounded-sm'>
                        <ProductFilter filter={row.filter}/>
                      </div>
                    </div>
                  </div>
                </SortableRow>
              ))}

              <div className='flex items-center h-20 ml-16'>
                <div className='flex pr-3 items-center'>
                  <button onClick={addRow} disabled={loading}>
                    {loading ? (
                      <ClipLoader size={24} color={"#000"} />
                    ) : (
                      <PlusIcon className='h-10 w-10 border-gray-300 border-2 rounded bg-white' />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className=''>
              <div className={`flex-col ${Object.keys(rows[0]).length > 4 ? 'overflow-x-auto' : ''}`}>
                <div className='flex mt-3 mb-3 items-center'>
                  {rows.length > 0 && Object.keys(rows[0]).map((key, index) => (
                    index > 1 && (
                      key === 'Primary Variant' ? (
                        <div key={key} className='border-gray-300 border-r-[1px] font-bold text-gray-400 flex justify-center w-[245px] items-center'>
                          <span>Primary Variant</span>
                          <div className='relative'>
                            <button onClick={() => toggleDropdown(key)}>
                              <DotsVerticalIcon className='w-4 h-4 ml-24' />
                            </button>
                            {visibleDropdownColumn === key && (
                              <div className='absolute ml-24 bg-white border border-gray-300 rounded shadow-lg'>
                                <button onClick={() => deleteColumn(key)}><TrashIcon className='h-6 w-6 text-red-600' /></button>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div key={key} className='border-gray-300 border-r-[1px] font-bold text-gray-400 flex w-[245px] justify-center items-center'>
                          <span>{key}</span>
                          <div className='relative'>
                            <button onClick={() => toggleDropdown(key)}>
                              <DotsVerticalIcon className='w-4 h-4 ml-24' />
                            </button>
                            {visibleDropdownColumn === key && (
                              <div className='absolute ml-24 bg-white border border-gray-300 rounded shadow-lg'>
                                <button onClick={() => deleteColumn(key)}><TrashIcon className='h-6 w-6 text-red-600' /></button>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    )
                  ))}
                </div>

                {rows.map(row => (
                  <SortableRow key={row.id} id={row.id.toString()}>
                    <div
                      key={row.id}
                      id={row.id}
                      className='flex'
                      onMouseEnter={() => setHoveredRow(row.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      {Object.keys(row).map((key, index) => (
                        index > 1 && (
                          <div key={key} className='flex items-center h-60'>
                            <div className='border-gray-300 border-r-[1px] flex justify-center h-52 items-center w-[245px]'>
                              <div className='border-gray-400 border-[2px] border-dotted w-[190px] ml-3 h-40 rounded-sm'>
                                
                                <Variants img={row[key][0]} text={row[key][1]} />
                              </div>
                            </div>
                          </div>
                        )
                      ))}
                      <div className='flex items-center h-60'>
                        <div className='flex justify-center h-52 items-center w-[150px]'>
                          <button onClick={addColumn} disabled={loading}>
                            {loading ? (
                              <ClipLoader size={24} color={"#000"} />
                            ) : (
                              <PlusIcon className='h-10 w-10 border-gray-300 border-2 rounded bg-white' />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </SortableRow>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default Body;
