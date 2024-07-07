import Logo from '../assets/pln_icon.png'
import Avatar from '../assets/avatar.png'

const TopNavbar = () => {
        
    return (
        <div className='fixed top-0 inset-x-0 z-10'>
            <div className="bg-gradient-to-r from-sky2-50 to-sky2-900 text-white">
                <div className="flex items-center h-[64px] px-[24px]">
                    <a href="" className="flex items-center gap-3 font-semibold">
                        <img src={Logo} alt="logo" />
                        <span>iMeeting</span>
                    </a>
                    <div className="flex-1 justify-end flex items-center gap-[12px] text-sm">
                        <a href="#" className='flex items-center gap-2 py-2 px-4 rounded-xl bg-white/10'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46" />
                            </svg>
                            <span>Kontak Aduan</span>
                        </a>
                        <a href="#" className='flex items-center justify-center p-2 rounded-full'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                            </svg>
                        </a>
                        <a href="#" className="flex items-center gap-3">
                            <img src={Avatar} className='rounded-full w-[40px] h-[40px]' alt="" />
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