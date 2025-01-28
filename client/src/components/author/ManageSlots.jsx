import React, { useState, useEffect } from 'react';
import AddSlots from './AddSlots';
import { DateTime } from 'luxon';

const ManageSlots = () => {
    const [slotData, setSlotData] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const convertUnixToDateUTC = (unixTimestamp) => {
        const localDateTime = DateTime.fromSeconds(unixTimestamp).setZone('UTC');
        return localDateTime.toFormat('dd, MMM');
    };

    const formatTime = (hour, minute) => {
        const amPm = hour < 12 ? 'AM' : 'PM';
        let hour12 = hour % 12;
        if (hour12 === 0) hour12 = 12;
        return `${hour12.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${amPm}`;
    };

    const getData = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_HOST}/author/get-all-slots`, {
                method: 'GET',
                credentials: 'include',
            });
            if (!res.ok) throw new Error('slotData response not ok!');
            const data = await res.json();
            setSlotData(data.slotList);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleTimeChange = (type, part, value) => {
        setSelectedSlot({
            ...selectedSlot,
            slots: {
                ...selectedSlot.slots,
                [type]: {
                    ...selectedSlot.slots[type],
                    [part]: value,
                },
            },
        });
    };

    const handleSubmit = () => {
        setIsEditing(null);
        setSelectedSlot(null);
    };

    const handleEditClick = (slot) => {
        setSelectedSlot(slot);
        setIsEditing(slot._id);
    };

    const handleDetailsClick = (slot) => {
        setSelectedSlot(slot);
    };

    const handleCloseModal = () => {
        setSelectedSlot(null);
        setIsEditing(null);
    };

    return (
        <section id="slots" className="p-6">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    {/* AddSlots Component */}
                    <AddSlots />


                    {slotData.length === 0 ? (
                        <div className="text-center py-12">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No slots available</h3>
                            <p className="mt-1 text-sm text-gray-500">Start by creating a new slot.</p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 text-center">
                                    <thead>
                                        <tr className="bg-gray-50 text-center">
                                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Start Time
                                            </th>
                                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                End Time
                                            </th>
                                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Max Capacity
                                            </th>
                                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Elastic Capacity
                                            </th>
                                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Current Bookings
                                            </th>
                                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {slotData.map((slot) => (
                                            <tr key={slot._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">{convertUnixToDateUTC(new Date(slot.date).getTime())}</td>
                                                <td className="px-6 py-4">
                                                    {formatTime(slot.slots.startTime.hour, slot.slots.startTime.minute)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {formatTime(slot.slots.endTime.hour, slot.slots.endTime.minute)}
                                                </td>
                                                <td className="px-6 py-4">{slot.maxCapacity}</td>
                                                <td className="px-6 py-4">{slot.elasticCapacity}</td>
                                                <td className="px-6 py-4">{slot.currentBookings}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => handleDetailsClick(slot)}
                                                            className="text-indigo-600 hover:text-indigo-900 font-medium"
                                                        >
                                                            Details
                                                        </button>
                                                        <button
                                                            onClick={() => handleEditClick(slot)}
                                                            className="text-green-600 hover:text-green-900 font-medium"
                                                        >
                                                            Edit
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>

                {selectedSlot && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-lg w-full">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                {isEditing ? 'Edit Slot' : 'Slot Details'}
                            </h3>

                            {isEditing ? (
                                <>
                                    <div className="mb-4">
                                        <label className="block font-medium text-gray-700">Start Time:</label>
                                        <div className="flex space-x-2">
                                            <input
                                                type="number"
                                                value={selectedSlot.slots.startTime.hour}
                                                onChange={(e) => handleTimeChange('startTime', 'hour', e.target.value)}
                                                className="w-16 p-2 border border-gray-300 rounded-md"
                                                min="0"
                                                max="23"
                                            />
                                            <span>:</span>
                                            <input
                                                type="number"
                                                value={selectedSlot.slots.startTime.minute}
                                                onChange={(e) => handleTimeChange('startTime', 'minute', e.target.value)}
                                                className="w-16 p-2 border border-gray-300 rounded-md"
                                                min="0"
                                                max="59"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block font-medium text-gray-700">End Time:</label>
                                        <div className="flex space-x-2">
                                            <input
                                                type="number"
                                                value={selectedSlot.slots.endTime.hour}
                                                onChange={(e) => handleTimeChange('endTime', 'hour', e.target.value)}
                                                className="w-16 p-2 border border-gray-300 rounded-md"
                                                min="0"
                                                max="23"
                                            />
                                            <span>:</span>
                                            <input
                                                type="number"
                                                value={selectedSlot.slots.endTime.minute}
                                                onChange={(e) => handleTimeChange('endTime', 'minute', e.target.value)}
                                                className="w-16 p-2 border border-gray-300 rounded-md"
                                                min="0"
                                                max="59"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block font-medium text-gray-700">Max Capacity:</label>
                                        <input
                                            type="number"
                                            value={selectedSlot.maxCapacity}
                                            onChange={(e) => setSelectedSlot({ ...selectedSlot, maxCapacity: e.target.value })}
                                            className="w-32 p-2 border border-gray-300 rounded-md"
                                            min="1"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block font-medium text-gray-700">Elastic Capacity:</label>
                                        <input
                                            type="number"
                                            value={selectedSlot.elasticCapacity}
                                            onChange={(e) => setSelectedSlot({ ...selectedSlot, elasticCapacity: e.target.value })}
                                            className="w-32 p-2 border border-gray-300 rounded-md"
                                            min="1"
                                        />
                                    </div>

                                    <div className="flex space-x-4">
                                        <button
                                            onClick={handleCloseModal}
                                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSubmit}
                                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p><strong>Date:</strong> {new Date(selectedSlot.date).toDateString()}</p>
                                    <p><strong>Start Time:</strong> {formatTime(selectedSlot.slots.startTime.hour, selectedSlot.slots.startTime.minute)}</p>
                                    <p><strong>End Time:</strong> {formatTime(selectedSlot.slots.endTime.hour, selectedSlot.slots.endTime.minute)}</p>
                                    <p><strong>Max Capacity:</strong> {selectedSlot.maxCapacity}</p>
                                    <p><strong>Elastic Capacity:</strong> {selectedSlot.elasticCapacity}</p>
                                    <p><strong>Current Bookings:</strong> {selectedSlot.currentBookings}</p>

                                    <div className="flex space-x-4 mt-4">
                                        <button
                                            onClick={handleCloseModal}
                                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ManageSlots;
