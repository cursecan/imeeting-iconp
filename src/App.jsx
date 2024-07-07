import { Link, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import TopNavbar from "./components/TopNavbar"
import DashboardPage from "./pages/DashboardPage"

function App() {
    return (
        <div>
            {/* Navbar */}
            <TopNavbar />

            <main>
                <div className="flex min-h-screen">
                    <div className="w-20 drop-shadow-lg shadow-lg bg-white">
                        <div className="mt-20 py-6">
                            <ul className="space-y-4">
                                <li className="flex items-center justify-center">
                                    <Link to={'/dashboard'} className="block p-2">
                                        <div className="flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                            </svg>
                                        </div>
                                    </Link>
                                </li>
                                <li className="flex items-center justify-center">
                                    <Link to={'/'} className="block p-2 text-white bg-sky-500 rounded-xl">
                                        <div className="flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />                                            </svg>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex-1">
                        <Routes>
                            <Route path="/"  Component={HomePage}/>
                            <Route path="/dashboard" Component={DashboardPage} />
                        </Routes>
                    </div>
                </div>
            </main>

            

        </div>
    )
}

export default App
