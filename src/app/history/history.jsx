"use client"
import React, { useState, useEffect } from 'react';

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Fetch bookings from local storage
  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(storedBookings);
  }, []);

  // Handle click on a booking to show details
  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-blue-500 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-extrabold text-white mb-6">📖 Booking History</h1>
      <ul className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <li
              key={index}
              onClick={() => handleBookingClick(booking)}
              className="p-4 border-b last:border-none cursor-pointer hover:bg-purple-100 transition-all duration-300 ease-in-out flex justify-between items-center"
            >
              <div>
                <div className="text-lg font-semibold text-purple-700">🕒 Slot: {booking.slot}</div>
                <div className="text-gray-600">📅 Booked on: {booking.date}</div>
              </div>
              <span className="text-sm bg-purple-500 text-white px-3 py-1 rounded-full">View</span>
            </li>
          ))
        ) : (
          <p className="p-6 text-gray-300 text-center">No bookings available.</p>
        )}
      </ul>

      {selectedBooking && (
        <div className="mt-8 w-full max-w-md bg-white shadow-2xl rounded-2xl p-6 transform transition-all scale-105">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">📜 Booking Details</h2>
          <p className="text-gray-800"><strong>🕒 Slot:</strong> {selectedBooking.slot}</p>
          <p className="text-gray-800"><strong>📍 Place:</strong> {selectedBooking.place || 'N/A'}</p>
          <p className="text-gray-800"><strong>⏳ Amount of Time:</strong> {selectedBooking.time || 'N/A'}</p>
          <p className="text-gray-800"><strong>💰 Cash:</strong> {selectedBooking.cash || 'N/A'}</p>
        </div>
      )}
    </div>
  );
}

export default BookingHistory;
