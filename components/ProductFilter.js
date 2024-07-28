import React from 'react'

function ProductFilter({filter}) {
  return (
    <div>
        <button className='flex justify-center'>
            {filter}
        </button>
    </div>
  )
}

export default ProductFilter;