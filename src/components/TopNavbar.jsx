import Logo from '../assets/pln_icon.png'
import Avatar from '../assets/avatar.png'

const TopNavbar = () => {
        
    return (
        <div className='fixed top-0 inset-x-0 z-10'>
            <div className="bg-gradient-to-r from-sky-400 to-sky-600 text-white">
                <div className="flex items-center h-20 px-6">
                    <a href="" className="flex items-center gap-3 text-xl">
                        <img src={Logo} alt="logo" />
                        <span>iMeeting</span>
                    </a>
                    <div className="flex-1 justify-end flex items-center gap-6">
                        <a href="#" className='flex items-center justify-center bg-white/10 p-2 rounded-full'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                            </svg>
                        </a>
                        <a href="#" className="flex items-center gap-3">
                            <img src={Avatar} className='rounded-full w-10 h-10' alt="" />
                            <span>Anderi Setiawan</span>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopNavbar