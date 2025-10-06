import { useState } from 'react';
import Sidebar from '../Components/Connections/Sidebar'
import ShowAllUser from '../Components/Connections/Page/ShowAllUser';
import YourTotalConnection from '../Components/Connections/Page/YourTotalConnection';
import SendRequestConnection from '../Components/Connections/Page/SendRequestConnection';
import ReceiveRequestConnection from '../Components/Connections/Page/ReceiveRequestConnection';
import Blockuser from '../Components/Connections/Page/Blockuser';

const Connection = () => {
  const [displayName, setdisplayName] = useState(1);

  const values = [
    { id: 1, element: <ShowAllUser />  },
    { id: 2, element: <YourTotalConnection /> },
    { id: 3, element: <SendRequestConnection /> },
    { id: 4, element: <ReceiveRequestConnection /> },
    { id: 5, element: <Blockuser /> },
  ]

  return (
    <div className='grid lg:grid-cols-4 sm:grid-cols-1 gap-4'>
      <div className='mt-5'>
        <Sidebar setdisplayName={setdisplayName} />
      </div>

      <div className='lg:col-span-3 mt-5 mx-4'>
        
        { displayName === 1 ? (
            <ShowAllUser />
          ) : displayName === 2 ? (
            <YourTotalConnection />
          ) : displayName === 3 ? (
            <SendRequestConnection />
          ) : displayName === 4 ? (
            <ReceiveRequestConnection />
          ) : displayName === 5 ? (
            <Blockuser />
          ) : null
        }

      </div>
    </div>
  )
}

export default Connection
