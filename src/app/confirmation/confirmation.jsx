"use client"
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useLocation } from 'react-router-dom';

function Confirmation() {
//   const location = useLocation();
  const booking = 1 //location.state?.booking;

  if (!booking) {
    return <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-700">No booking details found.</div>;
  }

  const qrData = JSON.stringify(booking);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-purple-700 mb-4">✅ Booking Confirmation</h1>
        <div className="text-gray-700 text-lg space-y-2 border-b pb-4 mb-4">
          <p><strong>🕒 Slot:</strong> {booking.slot}</p>
          <p><strong>📍 Place:</strong> {booking.place}</p>
          <p><strong>⏳ Time:</strong> {booking.time}</p>
          <p><strong>💰 Cash:</strong> {booking.cash}</p>
          <p><strong>📅 Date:</strong> {booking.date}</p>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">📌 Scan QR Code at Parking Place</h2>
          <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <QRCodeSVG value={qrData} size={200} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
