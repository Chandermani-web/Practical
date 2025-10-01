import React from 'react'

const Sidebar = () => {
  return (
    <div className=''>
        <div className='flex flex-col'>
            <button className='py-5 border-b-2 border-t-2 leading-10 text-lg font-semibold hover:bg-gray-800'>Online User</button>
            <button className='py-5 border-b-2 leading-10 text-lg font-semibold hover:bg-gray-800'>Total Connection</button>
            <button className='py-5 border-b-2 leading-10 text-lg font-semibold hover:bg-gray-800'>Send Connection Request</button>
            <button className='py-5 border-b-2 leading-10 text-lg font-semibold hover:bg-gray-800'>Receive Connection Request</button>
            <button className='py-5 border-b-2 leading-10 text-lg font-semibold hover:bg-gray-800'>Block User</button>
            <button className='py-5 border-b-2 leading-10 text-lg font-semibold hover:bg-gray-800'>Following</button>
        </div>
    </div>
  )
}

export default Sidebar
