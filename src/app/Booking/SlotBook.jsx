'use client';
import React, { useState, useEffect } from "react";

const ParkingLot = () => {
  const [bookedSlots, setBookedSlots] = useState(new Set());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [parkingData, setParkingData] = useState({ grid: [], slotLabels: [] });

  useEffect(() => {
    fetch("/park.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setParkingData(data);
        console.log("Loaded Parking Data:", data);
      })
      .catch((error) => console.error("Error loading parking data:", error));
  }, []);

  const handleSlotClick = (rowIndex, colIndex) => {
    const slotKey = `${rowIndex}-${colIndex}`;
    if (parkingData.grid[rowIndex][colIndex] === "P") {
      setSelectedSlot(slotKey);
    }
  };

  const handleConfirmBooking = () => {
    if (selectedSlot) {
      setBookedSlots((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(selectedSlot)) {
          newSet.delete(selectedSlot);
        } else {
          newSet.add(selectedSlot);
        }
        return newSet;
      });
      setSelectedSlot(null); // Reset after booking
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Parking Lot Layout</h1>

      {/* Display loading message until parking data is fetched */}
      {parkingData.grid.length === 0 ? (
        <p>Loading parking lot...</p>
      ) : (
        <div className="border-4 border-gray-700 p-2 bg-gray-800">
          {parkingData.grid.map((row, rowIndex) => (
            <div key={rowIndex} className="flex">
              {row.map((cell, colIndex) => {
                const slotKey = `${rowIndex}-${colIndex}`;
                const isBooked = bookedSlots.has(slotKey);
                return (
                  <div
                    key={slotKey}
                    className={`w-8 h-8 flex items-center justify-center border border-gray-600 text-white text-xs font-bold ${
                      isBooked
                        ? "bg-yellow-600"
                        : cell === "P"
                        ? "bg-green-600 cursor-pointer"
                        : cell === "B"
                        ? "bg-gray-700"
                        : cell === "R"
                        ? "bg-gray-600"
                        : cell === "E"
                        ? "bg-blue-600"
                        : cell === "X"
                        ? "bg-red-600"
                        : "bg-gray-900"
                    }`}
                    onClick={() => handleSlotClick(rowIndex, colIndex)}
                  >
                    {parkingData.slotLabels?.[rowIndex]?.[colIndex] || ""}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* Booking Confirmation Modal */}
      {selectedSlot && (
        <div className="mt-4 p-4 bg-gray-800 border-2 border-gray-600 rounded-md">
          <h2 className="text-xl font-semibold">Confirm Booking</h2>
          <p className="mt-2">Do you want to confirm the booking for slot {selectedSlot}?</p>
          <div className="mt-4 flex space-x-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
              onClick={handleConfirmBooking}
            >
              Confirm
            </button>
            <button
              className="bg-gray-600 text-white px-4 py-2 rounded-md"
              onClick={() => setSelectedSlot(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParkingLot;
