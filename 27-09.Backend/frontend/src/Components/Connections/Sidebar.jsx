import 'remixicon/fonts/remixicon.css';

const Sidebar = ({ setdisplayName }) => {
  return (
    <div className='bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen p-6 shadow-2xl'>
        <div className='flex flex-col rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg'>
            
            <button className='py-5 px-3 border-b border-white/10 leading-10 text-lg font-semibold text-white hover:bg-blue-600/20 transition-all duration-300 ease-in-out hover:translate-x-2 group' onClick={() => setdisplayName(1)}>
                <div className='flex items-center space-x-4'>
                    <div className='w-10 h-10 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg shadow-lg shadow-emerald-500/25 flex items-center justify-center group-hover:shadow-emerald-400/40 transition-all duration-300'>
                        <i className="ri-user-line text-white text-lg"></i>
                    </div>
                    <span>Show All Users</span>
                </div>
            </button>
            
            <button className='py-5 px-3 border-b border-white/10 leading-10 text-lg font-semibold text-white hover:bg-purple-600/20 transition-all duration-300 ease-in-out hover:translate-x-2 group' onClick={() => setdisplayName(2)}>
                <div className='flex items-center space-x-4'>
                    <div className='w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg shadow-lg shadow-purple-500/25 flex items-center justify-center group-hover:shadow-purple-400/40 transition-all duration-300'>
                        <i className="ri-link-m text-white text-lg"></i>
                    </div>
                    <span>Your Total Connections</span>
                </div>
            </button>
            <button className='py-5 px-3 border-b border-white/10 leading-10 text-lg font-semibold text-white hover:bg-green-600/20 transition-all duration-300 ease-in-out hover:translate-x-2 group' onClick={() => setdisplayName(3)}>
                <div className='flex items-center space-x-4'>
                    <div className='w-10 h-10 bg-gradient-to-r from-green-400 to-teal-400 rounded-lg shadow-lg shadow-green-500/25 flex items-center justify-center group-hover:shadow-green-400/40 transition-all duration-300'>
                        <i className="ri-arrow-right-up-line text-white text-lg"></i>
                    </div>
                    <span>Send Connection Request</span>
                </div>
            </button>

            <button className='py-5 px-3 border-b border-white/10 leading-10 text-lg font-semibold text-white hover:bg-orange-600/20 transition-all duration-300 ease-in-out hover:translate-x-2 group' onClick={() => setdisplayName(4)}>
                <div className='flex items-center space-x-4'>
                    <div className='w-10 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg shadow-lg shadow-orange-500/25 flex items-center justify-center group-hover:shadow-orange-400/40 transition-all duration-300'>
                        <i className="ri-arrow-left-down-line text-white text-lg"></i>
                    </div>
                    <span>Receive Connection Request</span>
                </div>
            </button>

            <button className='py-5 px-3 border-b border-white/10 leading-10 text-lg font-semibold text-white hover:bg-red-600/20 transition-all duration-300 ease-in-out hover:translate-x-2 group' onClick={() => setdisplayName(5)}>
                <div className='flex items-center space-x-4'>
                    <div className='w-10 h-10 bg-gradient-to-r from-red-400 to-rose-400 rounded-lg shadow-lg shadow-red-500/25 flex items-center justify-center group-hover:shadow-red-400/40 transition-all duration-300'>
                        <i className="ri-spam-2-line text-white text-lg"></i>
                    </div>
                    <span>Block User</span>
                </div>
            </button>
        </div>
    </div>
  )
}

export default Sidebar