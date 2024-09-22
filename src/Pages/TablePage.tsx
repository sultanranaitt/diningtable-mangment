import React, { useState, useEffect } from 'react';
import tableImage from '../assets/DiningTable.png';
import { jsPDF } from "jspdf";
import * as XLSX from 'xlsx';
import Header from "../components/auth/header.tsx";
import SeatModal from "../components/auth/modal.tsx";
const TablePage = () => {
    const [seatModalOpen, SetSeatModalOpen] = useState(false);
    const [seats, SetSeats] = useState<any>([]);
    const [seatnum, SetSeatnum] = useState<any>("");
    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text("Table Layout", 10, 10);
        doc.addImage(tableImage, "PNG", 15, 40, 180, 160);
        doc.save("table-layout.pdf");
    };

    const exportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet([
            { "Seat": 1, "Name": "Empty" },
            { "Seat": 2, "Name": "Empty" },
            { "Seat": 3, "Name": "Empty" },
            { "Seat": 4, "Name": "Empty" },
            { "Seat": 5, "Name": "Empty" },
            { "Seat": 6, "Name": "Empty" },
        ]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Table");
        XLSX.writeFile(workbook, "table-layout.xlsx");
    };

    const handleSubmit = async () => {
        var token = localStorage.getItem("Logtoken");
        try {
            const response = await fetch('https://diningtable.sharpbody-p.com/api/diningtable', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Add the token to the Authorization header
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Success:', data);
                SetSeats(data.data[0]?.seat)

            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        handleSubmit();
    }, []);
    const getUserByOrderNumber = (orderNumber) => {
        if (seats) {
            const seat = seats.find(seat => seat.order_number === orderNumber);
            return seat && seat.users ? seat.users.name : null;
        } else {
            return false;
        }
    };
    const SetRefreshFun = (data) => {
        if (data) {
            handleSubmit();
        }
    }
    return (
        <>
            <Header />
            <div className="w-full table-section">
                <div className="flex space-x-4 mb-4 table-btn-ui absolute top-[100px] right-[20px]">
                    <button onClick={exportPDF} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Export PDF</button>
                    <button onClick={exportExcel} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Export Excel</button>
                </div>
                <div className='flex flex-col items-center min-h-screen justify-center Table-flow-over'>
                    <div className="relative inline-block">
                        <img src={tableImage} alt="Table" className="w-full max-w-3xl h-auto" />

                        <div
                            onClick={!getUserByOrderNumber('1') ? () => { SetSeatModalOpen(!seatModalOpen); SetSeatnum('1') } : undefined}
                            className={`absolute top-[12px] left-[220px] flex items-center justify-center w-8 h-8 rounded-full font-bold cursor-pointer ${!getUserByOrderNumber('1') ? 'bg-white bg-opacity-70' : ''}`}
                        >
                            {getUserByOrderNumber("1") || "1"}
                        </div>

                        <div
                            onClick={!getUserByOrderNumber('2') ? () => { SetSeatModalOpen(!seatModalOpen); SetSeatnum('2') } : undefined}
                            className={`absolute top-[12px] right-[220px] flex items-center justify-center w-8 h-8 rounded-full font-bold cursor-pointer ${!getUserByOrderNumber('2') ? 'bg-white bg-opacity-70' : ''}`}
                        >
                            {getUserByOrderNumber("2") || "2"}
                        </div>

                        <div
                            onClick={!getUserByOrderNumber('3') ? () => { SetSeatModalOpen(!seatModalOpen); SetSeatnum('3') } : undefined}
                            className={`absolute top-[220px] right-[10px] flex items-center justify-center w-8 h-8 rounded-full font-bold cursor-pointer ${!getUserByOrderNumber('3') ? 'bg-white bg-opacity-70' : ''}`}
                        >
                            {getUserByOrderNumber("3") || "3"}
                        </div>

                        <div
                            onClick={!getUserByOrderNumber('4') ? () => { SetSeatModalOpen(!seatModalOpen); SetSeatnum('4') } : undefined}
                            className={`absolute bottom-[10px] right-[220px] flex items-center justify-center w-8 h-8 rounded-full font-bold cursor-pointer ${!getUserByOrderNumber('4') ? 'bg-white bg-opacity-70' : ''}`}
                        >
                            {getUserByOrderNumber("4") || "4"}
                        </div>

                        <div
                            onClick={!getUserByOrderNumber('5') ? () => { SetSeatModalOpen(!seatModalOpen); SetSeatnum('5') } : undefined}
                            className={`absolute bottom-[10px] left-[220px] flex items-center justify-center w-8 h-8 rounded-full font-bold cursor-pointer ${!getUserByOrderNumber('5') ? 'bg-white bg-opacity-70' : ''}`}
                        >
                            {getUserByOrderNumber("5") || "5"}
                        </div>

                        <div
                            onClick={!getUserByOrderNumber('6') ? () => { SetSeatModalOpen(!seatModalOpen); SetSeatnum('6') } : undefined}
                            className={`absolute top-[230px] left-[10px] flex items-center justify-center w-8 h-8 rounded-full font-bold cursor-pointer ${!getUserByOrderNumber('6') ? 'bg-white bg-opacity-70' : ''}`}
                        >
                            {getUserByOrderNumber("6") || "6"}
                        </div>
                    </div>
                </div>
            </div>
            {seatModalOpen && <div className='absolute'><SeatModal open={seatModalOpen} Data={seats} SeatNumber={seatnum} SetRefresh={SetRefreshFun} /></div>}
        </>
    );
};

export default TablePage;
