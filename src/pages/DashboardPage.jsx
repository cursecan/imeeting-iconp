import { useEffect, useState } from "react"
import DatePicker from "react-datepicker"

import summaryJson from '../datas/summary.json'
import { Link } from "react-router-dom"
import currency from "currency.js"
import { CircularProgressbar } from "react-circular-progressbar"

import 'react-circular-progressbar/dist/styles.css';
import dayjs from "dayjs"

const IDR = value => currency(value, {symbol: 'Rp. ', separator: '.', precision:0})

const DashboardPage = () => {
    const [summaryData, setSummaryData] = useState([])
    const [startDate, setStartDate] = useState(new Date('2024-01-01'));

    const data = summaryData.filter(i => i.period == dayjs(startDate).format('MMM-YYYY'))

    useEffect(() => {
        setSummaryData(summaryJson)
    }, [])


    console.log(dayjs(startDate).format('MMM-YYYY'))

    return (
        <div>
            {/* main */}
            <div className="">
                <div className="fixed inset-0 top-0 bg-white z-10">
                    <div className="relative h-screen overflow-scroll">
                        <div className="px-6 flex py-3 items-center border-b shadow-sm">
                            <div className="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                                <span className="text-lg font-medium">Dashboard</span>
                            </div>
                            <div className="flex-1 flex items-center justify-end">
                                <Link to={'/'}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                        <div className="px-6 space-y-6 mt-6">
                            <div className="">
                                <div className="form-control">
                                    <label htmlFor="">Periode</label>
                                    <DatePicker 
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        dateFormat="MMMM yyyy"
                                        locale={'id'}
                                        showMonthYearPicker
                                        className="px-4 py-2 border rounded-xl border-sky-400 bg-sky-400/10 outline-none max-w-xs w-full" />
                                </div>
                            </div>

                            {/* content */}
                            <div className="">
                                {
                                    data.length > 0 && <div className="">
                                        <div className="grid grid-cols-5 gap-6">
                                            {
                                                data[0].data.map((i, index) => {
                                                    return (
                                                        <div className="" key={index}>
                                                            <div className="flex items-center font-semibold uppercase text-gray-500 gap-3">
                                                                <div className="relative flex border-2 rounded-full border-gray-400 ">
                                                                    <div className="">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                                <span>{i.officeName}</span>
                                                            </div>
                                                            <div className="mt-3 space-y-6">
                                                                {
                                                                    i.detailSummary.map((j, index2) => {
                                                                        return (
                                                                            <div className="rounded-xl overflow-hidden" key={index2}>
                                                                                <div className="bg-gray-200 p-4">
                                                                                    <div className="">{j.roomName}</div>
                                                                                    <div className="flex items-center justify-between">
                                                                                        <div className="flex-1 text-3xl font-bold">
                                                                                            <div className="text-sm font-normal">Presentase Pemakaian</div>
                                                                                            <div className="">
                                                                                                {parseFloat(j.averageOccupancyPerMonth/j.capacity).toFixed(4)*100} %
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="w-20">
                                                                                            <CircularProgressbar value={parseInt(j.averageOccupancyPerMonth/j.capacity*100)} text='' className="" strokeWidth={20} />;
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="text-3xl font-bold">
                                                                                        <div className="text-sm font-normal">Nominal Konsumsi</div>
                                                                                        <div className="">{IDR(j.totalConsumption.reduce((total, n) => total+parseInt(n.totalPrice), 0)).format()}</div>
                                                                                    </div>
                                                                                    <div className="">
                                                                                        {
                                                                                            j.totalConsumption.map((n, index3) => {
                                                                                                return (
                                                                                                    <div className="flex mt-4 items-center" key={index3}>
                                                                                                        <div className="flex-1 font-medium">{n.name}</div>
                                                                                                        <div className="flex-1">
                                                                                                            <div className="">{n.totalPackage}</div>
                                                                                                            <div className="p-1 rounded-xl bg-sky-500" style={{width: `${parseInt(n.totalPackage)/j.totalConsumption.reduce((total, m) => total+parseInt(m.totalPackage), 0)*100}%`}}></div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DashboardPage