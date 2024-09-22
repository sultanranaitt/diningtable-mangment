import React, { useState, useEffect } from 'react';
import x from "../../assets/x.png";

const SeatModal = ({ open,Data,SeatNumber,SetRefresh }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: 'admin@gmail.com', // Hardcoded as per your API example
        dish: '1',
        drink: '1',
        comment: '',
    });

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        var token = localStorage.getItem("Logtoken");
        // Prepare the data to match the API format
        const requestData = {
            name: formData.name,
            order_number: SeatNumber, // Assuming you generate an order number, or pass it in props
            email: formData.email,
            dish_id: formData.dish, // You should map these values to correct dish and drink IDs
            drink_id: formData.drink,
            table_id: 1, // Assuming a fixed table ID, can be dynamic based on your needs
            comment: formData.comment,
        };

        try {
            const response = await fetch('https://diningtable.sharpbody-p.com/api/seats_store', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Add the token to the Authorization header
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Success:', data);
                // Optionally close the modal after success
                SetRefresh(true);
                closeModal();
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (open) {
            openModal();
        } else {
            closeModal();
        }
    }, [open]);

    return (
        <div className="flex justify-center items-center h-screen">
            {isOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                        <div className='flex justify-between'>
                            <h2 className="text-2xl font-semibold mb-4">Seat 1</h2>
                            <img className='w-5 h-5 cursor-pointer' onClick={closeModal} src={x} alt='close' />
                        </div>
                        <form className='table-modal-ui' onSubmit={handleSubmit}>
                            <label className="block mb-3">
                                <span className="text-gray-700">Name:</span>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border rounded-lg"
                                    required
                                />
                            </label>

                            <label className="block mb-3">
                                <span className="text-gray-700">Email:</span>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border rounded-lg"
                                    disabled
                                />
                            </label>

                            <label className="block mb-3">
                                <span className="text-gray-700">Dish:</span>
                                <select
                                    name="dish"
                                    value={formData.dish}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border rounded-lg"
                                    required
                                >
                                    <option value="">Select Dish</option>
                                    <option value="1">Dish 1</option> {/* Map these values to IDs */}
                                    {/* <option value="2">Dish 2</option> */}
                                </select>
                            </label>

                            <label className="block mb-3">
                                <span className="text-gray-700">Drink:</span>
                                <select
                                    name="drink"
                                    value={formData.drink}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border rounded-lg"
                                    required
                                >
                                    <option value="">Select Drink</option>
                                    <option value="1">Drink 1</option> {/* Map these values to IDs */}
                                    {/* <option value="2">Drink 2</option> */}
                                </select>
                            </label>

                            <label className="block mb-3">
                                <span className="text-gray-700">Comment:</span>
                                <input
                                    type="text"
                                    name="comment"
                                    value={formData.comment}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border rounded-lg"
                                />
                            </label>

                            <div className="flex justify-end space-x-4">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 modal-btn mt-10"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SeatModal;
