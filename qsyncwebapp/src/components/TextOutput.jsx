import React, { useState } from 'react';
import './print.css';
import QRCodeGenerator from './QRCodeGenerator';
import { CiSaveDown2 } from "react-icons/ci";

const TextOutput = ({ data }) => {
    const [printing, setPrinting] = useState(false);
    if (!data) {
        return <div>Loading...</div>;
    }

    const handlePrint = () => {
        setPrinting(true);
        setTimeout(() => {
            setPrinting(false);
        }, 1000);
    };

    return (
        <>
            <div className=" font-custom">
                <div className="container mx-auto px-80 mt-2 mb-2">
                    <div className="columns-2">
                        <div className="flex justify-start text-xs">
                            <h5>โรงงานอาหารสัตว์เครือเบทาโกร</h5>
                        </div>
                        <div className="flex justify-end text-xs">
                            <h5>FM-FB-QA-01-01-09:01/12/66 Rev.5</h5>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-80 mt-2 mb-2 ">
                    <div className="columns-1">
                        <div className="flex justify-center mb-4 text-2xl">
                            <h1>ใบบันทึกการตรวจรับ</h1>
                        </div>
                            <form>
                                <div className="grid gap-2 mb-2 md:grid-cols-3">
                                    <div className="flex items-center">
                                        <label htmlFor="ReceivingPlant" className="w-20 text-sm font-medium text-gray-900 dark:text-black">โรงงาน:</label>
                                        <input 
                                            type="text" 
                                            id="ReceivingPlant" 
                                            className="block w-full p-2 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="ReceivingPlant" 
                                            value={data.ReceivingPlant || ""}
                                            readOnly
                                            />
                                    </div>
                                    <div className="flex items-center">
                                        <label htmlFor="QueueDate" className="w-20 text-sm font-medium text-gray-900 dark:text-black">วันที่:</label>
                                        <input 
                                            type="text" 
                                            id="QueueDate" 
                                            className="block w-full p-2 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={data.QueueDate || ""}
                                            placeholder="QueueDate"
                                            readOnly
                                            />
                                    </div>
                                    <div className="flex items-center">
                                        <label htmlFor="QueueNo" className="w-20 text-sm font-medium text-gray-900 dark:text-black">ลำดับคิว:</label>
                                        <input 
                                            type="text" 
                                            id="QueueNo" 
                                            className="block w-full p-2 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="ReceivingPlant"
                                            value={data.QueueNo || ""} 
                                            readOnly
                                            />
                                    </div>
                                    <div className="flex items-center">
                                        <label htmlFor="InspectionLot" className="w-20 text-sm font-medium text-gray-900 dark:text-black">Ins. Lot:</label>
                                        <input 
                                            type="text" 
                                            id="InspectionLot" 
                                            className="block w-full p-2 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="InspectionLot"
                                            value={data.InspectionLot || ""} 
                                            readOnly
                                            />
                                    </div>
                                    <div className="flex items-center">
                                        <label htmlFor="Batch" className="w-20 text-sm font-medium text-gray-900 dark:text-black">Batch:</label>
                                        <input 
                                            type="text" 
                                            id="Batch" 
                                            className="block w-full p-2 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Batch"
                                            value={data.Batch || ""} 
                                            readOnly
                                            />
                                    </div>
                                    <div className="flex items-center">
                                        <label htmlFor="ReceiptNumber" className="w-20 text-sm font-medium text-gray-900 dark:text-black">เลขที่รับ:</label>
                                        <input 
                                            type="text" 
                                            id="ReceiptNumber" 
                                            className="block w-full p-2 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="ReceiptNumber"
                                            value={data.ReceiptNumber || ""}
                                            readOnly
                                            />
                                    </div>
                                </div>
                            </form>
                        </div>
                    <hr />
                </div>

                <div className="container mx-auto px-80 mt-2 mb-2">
                    <div className="columns-2">
                        <div className="flex justify-center text-base">
                            <QRCodeGenerator data={data} />
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-80 mt-2 mb-2">
                    <div className="columns-2">
                        <div className="flex justify-center text-base">
                            <h5>--- ตรวจสอบรอบแรก ---</h5>
                        </div>
                        <div className="flex justify-center text-base">
                            <h5>--- ตรวจสอบรอบสอง ---</h5>
                        </div>
                    </div>
                    <hr />
                </div>

                <div className="container mx-auto px-80 mt-2 mb-2">
                    <form>
                        <div className="grid gap-2 mb-2 md:grid-cols-2">
                            <div className="flex items-center gap-4">
                                <label htmlFor="PlateNoHead" className="w-40 text-sm font-medium text-gray-900 dark:text-black">ทะเบียนรถ(หัว):</label>
                                <input 
                                    type="text" 
                                    id="PlateNoTail" 
                                    className="block w-full p-2 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="PlateNoHead"
                                    value={data.PlateNoHead || ""} 
                                    readOnly
                                    />
                            </div>
                            <div className="flex items-center gap-4">
                                <label htmlFor="ActualReceived" className="w-40 text-sm font-medium text-gray-900 dark:text-black">จำนวนที่รับจริง:</label>
                                <input 
                                    type="text" 
                                    id="ActualReceived" 
                                    className="block w-full p-2 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder=""
                                    value="" 
                                    readOnly
                                    />
                            </div>
                            <div className="flex items-center gap-4">
                                <label htmlFor="PlateNoTail" className="w-40 text-sm font-medium text-gray-900 dark:text-black">ทะเบียนรถ(ท้าย):</label>
                                <input 
                                    type="text" 
                                    id="PlateNoTail" 
                                    className="block w-full p-2 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="PlateNoTail" 
                                    value={data.PlateNoTail || ""}
                                    readOnly
                                    />
                            </div>
                            <div className="flex items-center gap-4">
                                <label htmlFor="ReturnQuantity" className="w-40 text-sm font-medium text-gray-900 dark:text-black">จำนวนที่ส่งคืน:</label>
                                <input 
                                    type="text" 
                                    id="ReturnQuantity" 
                                    className="block w-full p-2 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder=""
                                    value="" 
                                    readOnly
                                    />
                            </div>
                            <div className="flex items-center gap-4">
                                <label htmlFor="MaterialDescription" className="w-40 text-sm font-medium text-gray-900 dark:text-black">ชื่อวัตถุดิบ:</label>
                                <input 
                                    type="text" 
                                    id="MaterialDescription" 
                                    className="block w-full p-2 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="MaterialDescription"
                                    value={data.MaterialDescription || ""} 
                                    readOnly
                                    />
                            </div>
                            <div className="flex items-center gap-4">
                                <label htmlFor="Position" className="w-40 text-sm font-medium text-gray-900 dark:text-black">ตำแหน่ง:</label>
                                <input 
                                    type="text" 
                                    id="Position" 
                                    className="block w-full p-2 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder=""
                                    value="" 
                                    readOnly
                                    />
                            </div>
                            <div className="flex items-center gap-4">
                                <label htmlFor="Material" className="w-40 text-sm font-medium text-gray-900 dark:text-black">CODE:</label>
                                <input 
                                    type="text" 
                                    id="Material" 
                                    className="block w-full p-2 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Material" 
                                    value={data.Material || ""}
                                    readOnly
                                    />
                            </div>
                            <div className="flex items-center gap-4">
                                <label htmlFor="PalletCount" className="w-40 text-sm font-medium text-gray-900 dark:text-black">จำนวนพาเลท:</label>
                                <input 
                                    type="text" 
                                    id="PalletCount" 
                                    className="block w-full p-2 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="" 
                                    value=""
                                    readOnly
                                    />
                            </div>
                            <div className="flex items-center gap-4">
                                <label htmlFor="VendorName" className="w-40 text-sm font-medium text-gray-900 dark:text-black">ชื่อผู้ส่ง:</label>
                                <input 
                                    type="text" 
                                    id="VendorName" 
                                    className="block w-full p-2 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="VendorName" 
                                    value={data.VendorName || ""}
                                    readOnly
                                    />
                            </div>
                            <div className="flex items-center gap-4">
                                <label htmlFor="PalletWeight" className="w-40 text-sm font-medium text-gray-900 dark:text-black">น้ำหนักพาเลท:</label>
                                <input 
                                    type="text" 
                                    className="block w-full p-2 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="" 
                                    value=""
                                    readOnly
                                    />
                            </div>
                            <div className="flex items-center gap-4">
                                <label htmlFor="Vendor" className="w-40 text-sm font-medium text-gray-900 dark:text-black">CODE ผู้ส่ง:</label>
                                <input 
                                    type="text" 
                                    id="Vendor" 
                                    className="block w-full p-2 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Vendor" 
                                    value={data.Vendor || ""}
                                    readOnly
                                    />
                            </div>
                            <div className="flex items-center gap-4">
                                <input 
                                    id="default-checkbox" 
                                    type="checkbox" 
                                    value="" 
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-black-900 dark:text-black">รถโฟร์คลิฟท์ตักลง</label>
                            </div>
                            <div className="flex items-center gap-4">
                                <label htmlFor="Moisture" className="w-40 text-sm font-medium text-gray-900 dark:text-black">ความชื้นข้าวโพด:</label>
                                <input 
                                    type="text" 
                                    id="Moisture" 
                                    className="block w-full p-2 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Moisture" 
                                    value={data.Moisture || ""}
                                    readOnly
                                    />
                            </div>
                            <div className="flex items-center gap-4">
                                <input 
                                    id="default-checkbox" 
                                    type="checkbox" 
                                    value="" 
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-black-900 dark:text-black">พนง.เบทาโกรลงของ</label>
                            </div>
                            <div className="flex items-center gap-4">
                                <label htmlFor="remarkfirst" className="w-40 text-sm font-medium text-gray-900 dark:text-black">หมายเหตุ:</label>
                                <input 
                                    type="text" 
                                    id="remarkfirst" 
                                    className="block w-full p-2 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="" 
                                    value=""
                                    readOnly
                                    />
                            </div>
                            <div className="flex items-center gap-4">
                                <input 
                                    id="default-checkbox" 
                                    type="checkbox" 
                                    value="" 
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-black-900 dark:text-black">พนง.ขับรถลงของ</label>
                            </div>
                            <div className="flex items-center gap-4">
                                <label htmlFor="qscore" className="w-40 text-sm font-medium text-gray-900 dark:text-black">Q-Score:</label>
                                <input 
                                    type="text" 
                                    id="qscore" 
                                    className="block w-full p-2 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="qscore" 
                                    value={data.q_score || ""}
                                    readOnly
                                    />
                            </div>
                            <div className="flex items-center gap-4">
                                <label htmlFor="remarksecond" className="w-40 text-sm font-medium text-gray-900 dark:text-black">หมายเหตุ:</label>
                                <input 
                                    type="text" id="remarksecond" 
                                    className="block w-full p-2 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="" 
                                    value=""
                                    readOnly
                                    />
                            </div>
                            <div className="flex items-center gap-4">
                                <label htmlFor="sampling" className="w-40 text-sm font-medium text-gray-900 dark:text-black">Sampling:</label>
                                <input 
                                    type="text" 
                                    id="sampling" 
                                    className="block w-full p-2 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="sampling" 
                                    value={data.sampling || ""}
                                    readOnly
                                    />
                            </div>
                            <div className="flex items-center gap-4">
                                <label htmlFor="singqcsecond" className="w-40 text-sm font-medium text-gray-900 dark:text-black">ลงชื่่อ(QC):</label>
                                <input 
                                    type="text" 
                                    id="singqcsecond" 
                                    className="block w-full p-2 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="" 
                                    value=""
                                    readOnly
                                    />
                            </div>
                            <div className="flex items-center gap-4">
                                <label htmlFor="singqcfirst" className="w-40 text-sm font-medium text-gray-900 dark:text-black">ลงชื่่อ(QC):</label>
                                <input 
                                    type="text" 
                                    id="singqcfirst" 
                                    className="block w-full p-2 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="" 
                                    value=""
                                    readOnly
                                    />
                            </div>
                            <div className="flex items-center gap-4">
                                <label htmlFor="SignatureWH" className="w-40 text-sm font-medium text-gray-900 dark:text-black">ลงชื่่อ(WH):</label>
                                <input 
                                    type="text" 
                                    id="SignatureWH" 
                                    className="block w-full p-2 text-black border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="" 
                                    value=""
                                    readOnly
                                    />
                            </div>
                        </div>
                        <hr />
                    </form>
                    <div className="flex justify-end w-full ">
                        <button  onClick={(handlePrint) => window.print()}
                            className="print-button bg-teal-700 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded-xl mt-4 text-input-section"
                            
                            > 
                            <CiSaveDown2 className="inline-block mr-1" /> Save as 
                            </button>
                    </div>
                </div>
        </div>
    </>    
    );
};

export default TextOutput;
