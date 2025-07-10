import React, { useState } from "react";

const Modal = ({ date, onClose }) => {

    const birthdayData = [
        {
            name: "Minor Last",
            code: "YUJNDSHUI",
            mobile: "+919876543210",
            email: "Minor@mailinator.com",
            dob: "06 Jul 2023",
            age: 2,
        },
        {
            name: "Minor Two",
            code: "ABC123XYZ",
            mobile: "+919123456789",
            email: "second@mailinator.com",
            dob: "06 Jul 2022",
            age: 3,
        },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    const totalPages = Math.ceil(birthdayData.length / recordsPerPage);
    const startIndex = (currentPage - 1) * recordsPerPage;
    const visibleRecords = birthdayData.slice(startIndex, startIndex + recordsPerPage);

    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded shadow-lg w-full max-w-6xl">
                <div className="bg-blue-500 text-white px-6 py-3 flex justify-between items-center rounded-t">
                    <h2 className="text-lg font-semibold">
                        Birthdays - ({date})
                    </h2>
                    <button
                        className="text-white text-xl font-bold hover:text-gray-300"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>

                <div className="p-4 overflow-x-auto">
                    <table className="min-w-full text-left text-sm border">
                        <thead className="bg-gray-100 text-blue-500 font-bold">
                            <tr>
                                <th className="px-4 py-2 border-b text-center">Sr. No.</th>
                                <th className="px-4 py-2 border-b">Name</th>
                                <th className="px-4 py-2 border-b">Mobile No</th>
                                <th className="px-4 py-2 border-b">Email ID</th>
                                <th className="px-4 py-2 border-b">DOB</th>
                                <th className="px-4 py-2 border-b text-center">Age (Yrs)</th>
                                <th className="px-4 py-2 border-b text-center">Preview & Send</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleRecords.map((record, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border-b text-center">
                                        {startIndex + index + 1}
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        <div>
                                            <div className="font-medium text-gray-800">{record.name}</div>
                                            <div className="text-xs text-gray-800 uppercase">{record.code}</div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 border-b text-blue-600">{record.mobile}</td>
                                    <td className="px-4 py-2 border-b">{record.email}</td>
                                    <td className="px-4 py-2 border-b">{record.dob}</td>
                                    <td className="px-4 py-2 border-b text-center">{record.age}</td>
                                    <td className="px-4 py-2 border-b text-center">
                                        <button className="text-gray-700">
                                            <i className="far fa-edit"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-between items-center mt-4">
                        <span className="text-sm text-gray-700">
                            Showing {startIndex + 1} to {Math.min(startIndex + recordsPerPage, birthdayData.length)} of {birthdayData.length} entries
                        </span>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setCurrentPage(1)}
                                className="px-2 py-1 border rounded disabled:opacity-50"
                                disabled={currentPage === 1}
                            >
                                &laquo;
                            </button>

                            <button
                                onClick={handlePrev}
                                className="px-2 py-1 border rounded disabled:opacity-50"
                                disabled={currentPage === 1}
                            >
                                &lsaquo;
                            </button>

                            {Array.from({ length: totalPages }).map((_, i) => {
                                const page = i + 1;
                                const isStart = page <= 2;
                                const isEnd = page >= totalPages - 1;
                                const isNear = Math.abs(currentPage - page) <= 1;

                                if (isStart || isEnd || isNear) {
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`px-3 py-1 border rounded ${currentPage === page ? "bg-blue-500 text-white" : "text-gray-700"
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                }

                                if (
                                    (page === 3 && currentPage > 4) ||
                                    (page === totalPages - 2 && currentPage < totalPages - 3)
                                ) {
                                    return (
                                        <span key={page} className="px-2 py-1 text-gray-400 select-none">
                                            ...
                                        </span>
                                    );
                                }

                                return null;
                            })}

                            <button
                                onClick={handleNext}
                                className="px-2 py-1 border rounded disabled:opacity-50"
                                disabled={currentPage === totalPages}
                            >
                                &rsaquo;
                            </button>

                            <button
                                onClick={() => setCurrentPage(totalPages)}
                                className="px-2 py-1 border rounded disabled:opacity-50"
                                disabled={currentPage === totalPages}
                            >
                                &raquo;
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;