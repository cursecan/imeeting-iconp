import { useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import UnitJson from '../datas/unit.json'
import ruangJson from '../datas/ruang.json'
import konsumJson from '../datas/konsumsi.json'

import dayjs from "dayjs"
import currency from "currency.js"


const IDR = value => currency(value, {symbol: '', decimal:'.', precision:0})

const HomePage = () => {
    const [showCreateForm, setShowCreateForm] = useState(false)
    
    const FormBox = () => {
        const [error, setError] = useState('')
        const [unit, setUnit] = useState([])
        const [ruang, setRuang] = useState([])
        const [konsumsi, setKonsumsi] = useState([])
        const [postForm, setPostForm] = useState(false)


        const [selectedUnit, setSelectedUnit] = useState('')
        const [selectedRoom, setSelectedRoom] = useState('')
        const [roomObj, setRoomObj] = useState(null)
        const [startDate, setStartDate] = useState(new Date());
        const [startHour, setStartHour] = useState('')
        const [endHour, setEndHour] = useState('')
        const [peserta, setPeserta] = useState('')
        const [checked, setChecked] = useState([false, false, false])

        // computed
        const startDateTime = dayjs(startDate).set('hour', startHour)
        const endDateTime = dayjs(startDate).set('hour', endHour)
        const subtotal = checked.reduce((sum, curstate, index) => {
            if (curstate == true) {
                return sum + konsumsi[index].maxPrice
            }
            return sum
        }, 0)
        const total = subtotal * (peserta ? parseInt(peserta) : 0)
        const validasi = new Date() < startDateTime && startDateTime < endDateTime && peserta >0 && peserta <= (roomObj ? roomObj.capacity : 0)

        useEffect(() => {
            const dt = new Date()
            if (unit.length == 0 || ruang.length ==0) {
                setUnit(UnitJson)
                setRuang(ruangJson)
                setKonsumsi(konsumJson)
            }
            if (startHour !== '' && endHour !=='' && roomObj) {
                if (startDateTime.get('hour')<11 && endDateTime.get('hour')<11) {
                    setChecked([true, false, false])
                } else if (startDateTime.get('hour')<11 && endDateTime.get('hour')<=14) {
                    setChecked([true, true, false])
                } else if (startDateTime.get('hour')<11 && endDateTime.get('hour')>14) {
                    setChecked([true, true, true])
                } else if (startDateTime.get('hour')>=11 && endDateTime.get('hour')<=14) {
                    setChecked([false, true, false])
                } else if (startDateTime.get('hour')>=11 && endDateTime.get('hour')>14) {
                    setChecked([false, true, true])
                } else if (startDateTime.get('hour')>14 && endDateTime.get('hour')>14) {
                    setChecked([false, false, true])
                }


                if (startDateTime<=dt) {
                    setError('Waktu mulai tidak boleh lebih kecil dari hari ini')
                } else if (startDateTime>endDateTime) {
                    setError('Waktu mulai tidak boleh lebih besar dari waktu selesai')
                } else if (peserta > roomObj.capacity) {
                    setError('Jumlah peserta melebihi kapasitas ruangan')
                }
            }
            
        }, [selectedRoom, startDate, startHour, endHour, peserta])

        const SubmitPostBox = () => {
            return (
                <div className="fixed inset-0 z-10">
                    <div className="relative"></div>
                    <div className="flex items-center justify-center h-screen bg-white/70">
                        <div className="max-w-xl w-full rounded-xl border shadow overflow-hidden">
                            <div className="px-6 py-4 bg-white">
                                <p>Simpan dan lanjutkan proses?</p>
                                <div className="flex items-center justify-end mt-3 gap-3">
                                    <button onClick={() => setPostForm(false)} className="btn">Batal</button>
                                    <button className="btn btn-blue">Ya, lanjutkan</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }


        return (
            <div className="">
                <div className="content-box">
                    {/* content box */}
                    <form className="space-y-[36px]" onSubmit={(e) => {e.preventDefault(); setPostForm(true)}} action="">
                        {/* info ruang */}
                        <div className="">
                            <div className="space-y-[16px]">
                                <div className="font-medium">Informasi Ruang Meeting</div>
                                <div className="flex gap-[20px]">
                                    {
                                        unit.length > 0 && <div className="form-control max-w-xs w-full">
                                            <label htmlFor="">Unit</label>
                                            <select required className={`select ${selectedUnit == '' ? 'bg-gray-200 text-gray-400' : 'bg-white'}`} value={selectedUnit} onChange={(e) => {setSelectedUnit(e.target.value); setSelectedRoom('')}} defaultValue={''} name="" id="">
                                                <option value="">Pilih Unit</option>
                                                {
                                                    unit.map((i, index) => {
                                                        return (
                                                            <option className="text-black" key={index} value={i.id}>{i.officeName}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    }
                                    {
                                        ruang.length > 0 && <div className="form-control max-w-xs w-full">
                                            <label htmlFor="">Ruang Meeting</label>
                                            <select required className={`select ${selectedRoom == '' ? 'bg-gray-200 text-gray-400' : 'bg-white'}`} value={selectedRoom} onChange={(e) => {setSelectedRoom(e.target.value); setRoomObj(ruang.find(a => a.id == e.target.value))}} defaultValue={''} name="" id="">
                                                <option value="">Pilih Ruang Metting</option>
                                                {
                                                    ruang.filter(a => a.officeId==selectedUnit).map((i, index) => {
                                                        return (
                                                            <option className="text-black" key={index} value={i.id}>{i.roomName}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    }
                                </div>
                                <div className="form-control max-w-[268px] w-full">
                                    <label htmlFor="">Kapasitas</label>
                                    <input disabled className="disabled input w-full" type="text" value={roomObj ? roomObj.capacity : 0} />
                                </div>
                            </div>
                        </div>
                        <div className="border-b-2"></div>
                        {/* info rapat */}
                        <div className="">                            
                            <div className="space-y-[16px]">
                                <div className="font-medium">Informasi Rapat</div>
                                <div className="flex gap-[20px]">
                                    <div className="form-control max-w-[268px] w-full">
                                        <label htmlFor="">Tanggal Rapat <span className="text-red-500">*</span></label>
                                        <div className="flex rounded-xl border bg-white">
                                            <div className="flex px-3 items-center justify-center text-sky2-50">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <DatePicker dateFormat={'dd MMM YYYY'} className="pr-4 h-[42px] w-full outline-none" selected={startDate} onChange={(date) => setStartDate(date)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-control max-w-[268px] w-full">
                                        <label htmlFor="">Waktu Mulai</label>
                                        <select required value={startHour} onChange={(e) => setStartHour(e.target.value)} className={`select w-full bg-white ${startHour == '' ? 'text-gray-400' : 'text-black'}`} name="" id="">
                                            <option value="">Pilih Waktu Mulai</option>
                                            {
                                                [...Array(24)].map((i,index) => {
                                                    return (
                                                        <option className="text-black" key={index} value={index}>{("0"+index).slice(-2)}:00</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-control max-w-[268px] w-full">
                                        <label htmlFor="">Waktu Selesai</label>
                                        <select required value={endHour} onChange={(e) => setEndHour(e.target.value)} className={`select w-full bg-white ${endHour == '' ? 'text-gray-400' : 'text-black'}`} name="" id="">
                                        <option value="">Pilih Waktu Selesai</option>
                                            {
                                                [...Array(24)].map((i,index) => {
                                                    return (
                                                        <option className="text-black" key={index} value={index}>{("0"+index).slice(-2)}:00</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="form-control max-w-[268px] w-full">
                                    <label htmlFor="">Jumlah Peserta</label>
                                    <input required className="w-full input" type="number"  placeholder="Masukan Jumlah Peserta" value={peserta} onChange={(e) => setPeserta(e.target.value)} />
                                </div>
                                <div className="form-control max-w-[268px] w-full">
                                    <label htmlFor="">Jenis Konsumsi</label>
                                    <div className="space-y-1">
                                        {
                                            konsumsi.map((i,index) => {
                                                return (
                                                    <div key={index} className="flex items-center gap-3">
                                                        <input disabled checked={checked[index]} value={i.maxPrice} className="bg-rose-400" type="checkbox" name={i.name} id="" /> <span className="flex-1">{i.name}</span>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="form-control max-w-[268px] w-full">
                                    <label htmlFor="">Nominal Konsumsi</label>
                                    <div className="flex rounded-xl overflow-hidden border">
                                        <div className="flex items-center bg-gray-300 px-4">
                                            Rp.
                                        </div>
                                        <div className="bg-white px-4 h-[42px] flex items-center">{IDR(total).format()}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border-b-2"></div>
                        {/* action */}
                        <div className="flex items-center justify-end gap-6">
                            <button type="button" onClick={() => setShowCreateForm(false)} className="">Batal</button>
                            <button disabled={!validasi} className={`px-6 h-[43px] rounded-xl border ${validasi ? 'bg-sky2-100 text-white' : 'bg-gray-300'}`}>Simpan</button>
                        </div>
                    </form>
                </div>

                {/* Submit post */}
                {
                    postForm && <SubmitPostBox />
                }


                {/* error */}
                {
                    error && <div className="fixed inset-0 bg-white/80 z-10">
                        <div className="relative"></div>
                        <div className="h-screen flex items-center justify-center">
                            <div className="bg-red-500/10 border border-red-500/50 max-w-xl w-full rounded-xl overflow-hidden">
                                <div className="py-3 px-6">
                                    <p className="text-center">{error}</p>
                                    <div className="flex items-center justify-center mt-3">
                                        <button  className="px-6 py-2 rounded-xl bg-red-500 text-white" onClick={()=> setError('')}>Tutup</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }



    return (
        <div>
            {/* Main */}
            <div className="mt-[64px]">
                <div className="box-container">
                    <div className="">
                        <div className="flex gap-[16px]">
                            {
                                showCreateForm && <div className="flex items-stretch justify-center">
                                    <button onClick={() => setShowCreateForm(false)} className="bg-sky2-100 text-white w-[42px] h-[42px] rounded-xl flex justify-center items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                        </svg>
                                    </button>
                                </div>
                            }
                            <div className="">
                                <div className="header font-semibold">{ showCreateForm ? 'Pengajuan Perangkat' : 'Ruang Meeting'}</div>
                                {
                                    showCreateForm ? <div className="subheader text-gray-400 flex mt-1 items-center gap-3">
                                        <span className="">Pengajuan Perangkat</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                        </svg>
                                        <span className="text-sky2-100">Perangakat Baru</span>
                                    </div> : <div className="subheader text-sm text-sky2-100 mt-1">Ruang Metting</div>
                                }
                            </div>
                            <div className="flex-1 flex items-center justify-end">
                                {
                                    !showCreateForm && <button onClick={() => setShowCreateForm(true)} className="btn btn-blue">
                                        <div className="flex items-center gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                            <span>Pesan Ruangan</span>
                                        </div>
                                    </button>
                                }
                            </div>
                        </div>
                    </div>

                    {
                        // content
                        showCreateForm && <FormBox />
                    }
                </div>
            </div>
        </div>
    )
}

export default HomePage