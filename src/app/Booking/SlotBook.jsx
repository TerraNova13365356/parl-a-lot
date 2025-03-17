"use client";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebaseConfig";
import { ref, onValue, set } from "firebase/database";

const ParkingLot = () => {
  const [parkingData, setParkingData] = useState({ grid: [], slotLabels: [], numRows: 0, numCols: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState("Not selected");
  const [isSelected, setisSelected] = useState(true)
  const [slot,setSlot]=useState(null)

  useEffect(() => {
    const parkRef = ref(db, "parkingLayout");

    const unsubscribe = onValue(parkRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()["parkingLayout"];
        if (data && Array.isArray(data.grid)) {
          setParkingData({
            grid: data.grid,
            slotLabels: Array.isArray(data.slotLabels) ? data.slotLabels : [],
            numRows: data.numRows || 0,
            numCols: data.numCols || 0,
          });

          // Find the currently selected slot
          let foundSelected = null;
          data.grid.forEach((row, rowIndex) =>
            row.forEach((cell, colIndex) => {
              if (cell === "S") foundSelected = { rowIndex, colIndex };
            })
          );
          setSelectedSlot(foundSelected);
        } else {
          console.error("Invalid data format in Firebase");
          setParkingData({ grid: [], slotLabels: [], numRows: 0, numCols: 0 });
        }
      } else {
        console.log("No parking data available");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSlotClick = async (rowIndex, colIndex) => {
    if (!Array.isArray(parkingData.grid) || !parkingData.grid[rowIndex]) return;

    if (parkingData.grid[rowIndex][colIndex] === "P") {

      try {
        // Reset the previous slot
        if (selectedSlot) {
          console.log("ewpkfoerjkf0")
          const prevSlotRef = ref(db, `parkingLayout/parkingLayout/grid/${selectedSlot.rowIndex}/${selectedSlot.colIndex}`);
          await set(prevSlotRef, "P").then(() => {
            console.log("Slot reset to P")
          });
        }

        // Set the new slot as selected
        const slotRef = ref(db, `parkingLayout/parkingLayout/grid/${rowIndex}/${colIndex}`);
        await set(slotRef, "S")
          .then(() => {
            console.log("Slot set to S");
            setSelectedSlot({ rowIndex, colIndex });
            setSlot()
          });
        ;

        setSelectedSlot({ rowIndex, colIndex });
      } catch (error) {
        console.error("Error updating slot:", error);
        alert("Something Went Wrong");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Parking Lot Layout</h1>

      {loading ? (
        <p>Loading parking lot...</p>
      ) : parkingData.grid.length === 0 ? (
        <p>No parking lot data found.</p>
      ) : (
        <div className="border-4 border-gray-700 p-2 bg-gray-800">
          {parkingData.grid.map((row, rowIndex) => (
            <div key={rowIndex} className="flex">
              {Array.isArray(row) &&
                row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`w-8 h-8 flex items-center justify-center border border-gray-600 text-white text-xs font-bold 
                      ${cell === "P" ? "bg-green-600 cursor-pointer" :
                        cell === "S" ? "bg-yellow-600" :
                          cell === "B" ? "bg-gray-700" :
                            cell === "R" ? "bg-gray-600" :
                              cell === "E" ? "bg-blue-600" :
                                cell === "X" ? "bg-red-600" : "bg-gray-900"}
                    `}
                    onClick={() => handleSlotClick(rowIndex, colIndex)}
                  >
                    {parkingData.slotLabels?.[rowIndex]?.[colIndex] || ""}
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}
      {isSelected ? <div className="max-w-xl mx-auto p-6 bg-gray-800 rounded-lg shadow-md text-center fixed bottom-0">
        <p className="text-gray-200 mb-4">Are you sure you want to book this parking slot?</p>
        <p className="text-gray-200 mb-4">Selected Slot:{selectedSlot ? `${slot}` : "Not selected"}</p>
        <div className="flex justify-center space-x-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Confirm
          </button>
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div> : <div>not selected</div>}
    </div>
  );
};

export default ParkingLot;
