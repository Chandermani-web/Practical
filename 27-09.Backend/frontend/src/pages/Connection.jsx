import React from 'react'
import Sidebar from '../Components/Connections/Sidebar'
import AllUser from '../Components/Connections/AllUser'

const Connection = () => {
  return (
    <div className='grid lg:grid-cols-4 sm:grid-cols-1 gap-4'>
      <div className='mt-5'>
        <Sidebar />
      </div>

      <div className='lg:col-span-3 mt-5 mx-4'>
        <h1 className='text-white text-2xl font-semibold ml-5'>Suggestion For You</h1>
      <AllUser />
      </div>
    </div>
  )
}

export default Connection
