"use client";
import { ref, set } from "firebase/database";
import { db } from "../../firebase/firebaseConfig";  
import React, { useState, useEffect } from "react";

const cellTypes = {
  P: { label: "Parking", color: "bg-green-500" },
  R: { label: "Road", color: "bg-gray-300" },
  E: { label: "Entrance", color: "bg-blue-500" },
  X: { label: "Exit", color: "bg-red-500" },
  B: { label: "Border", color: "bg-black" },
};

const numRows = 30;
const numCols = 30;

function CreateParkingLayout() {
  const [grid, setGrid] = useState(
    Array.from({ length: numRows }, () => Array(numCols).fill("R"))
  );
  const [slotLabels, setSlotLabels] = useState(
    Array.from({ length: numRows }, () => Array(numCols).fill(""))
  );
  const [isDragging, setIsDragging] = useState(false);
  const [selectedType, setSelectedType] = useState("P");

  useEffect(() => {
    assignSlotLabels();
  }, [grid]);

  const handleMouseDown = (rowIndex, colIndex) => {
    setIsDragging(true);
    updateCell(rowIndex, colIndex);
  };

  const handleMouseOver = (rowIndex, colIndex) => {
    if (isDragging) {
      getSelection().removeAllRanges();
      updateCell(rowIndex, colIndex);
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const updateCell = (rowIndex, colIndex) => {
    setGrid((prevGrid) =>
      prevGrid.map((row, rIdx) =>
        rIdx === rowIndex
          ? row.map((cell, cIdx) => (cIdx === colIndex ? selectedType : cell))
          : row
      )
    );
  };

  const assignSlotLabels = () => {
    let labelCounter = {};
    let currentLabel = "A";
    let visited = new Set();

    const newLabels = grid.map((row) => row.map(() => ""));

    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        if (grid[r][c] === "P" && !visited.has(`${r}-${c}`)) {
          labelCounter[currentLabel] = labelCounter[currentLabel] || 1;
          floodFill(r, c, currentLabel, labelCounter[currentLabel], newLabels, visited);
          labelCounter[currentLabel]++;
          currentLabel = String.fromCharCode(currentLabel.charCodeAt(0) + 1);
        }
      }
    }
    setSlotLabels(newLabels);
  };

  const floodFill = (r, c, label, count, newLabels, visited) => {
    if (r < 0 || r >= numRows || c < 0 || c >= numCols || grid[r][c] !== "P" || visited.has(`${r}-${c}`)) {
      return;
    }
    visited.add(`${r}-${c}`);
    newLabels[r][c] = `${label}${count++}`;
    floodFill(r + 1, c, label, count, newLabels, visited);
    floodFill(r - 1, c, label, count, newLabels, visited);
    floodFill(r, c + 1, label, count, newLabels, visited);
    floodFill(r, c - 1, label, count, newLabels, visited);
  };

  const handleSaveLayout = () => {
    const layoutData = {
      parkingLayout: {
        numRows,
        numCols,
        grid,
        slotLabels,
      },
    };

    set(ref(db, "parkingLayout"), layoutData)
      .then(() => alert("Parking layout saved!"))
      .catch((error) => console.error("Error saving layout:", error));
  };

  return (
    <div className="flex flex-col items-center p-5 overflow-x-auto" onMouseUp={handleMouseUp}>
      <div className="flex gap-3 mb-4 p-3 border bg-white shadow-md rounded">
        {Object.entries(cellTypes).map(([key, { label, color }]) => (
          <button
            key={key}
            className={`px-4 py-2 rounded ${color} text-white ${selectedType === key ? "border-4 border-black" : ""}`}
            onClick={() => setSelectedType(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="overflow-auto border shadow-lg" style={{ maxWidth: "90vw", maxHeight: "80vh" }}>
        <div className="grid" style={{ gridTemplateColumns: `repeat(${numCols}, 20px)` }}>
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`w-5 h-5 flex items-center justify-center border cursor-pointer text-white text-xs ${cellTypes[cell].color}`}
                onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                onMouseOver={() => handleMouseOver(rowIndex, colIndex)}
              >
                {slotLabels[rowIndex][colIndex]}
              </div>
            ))
          )}
        </div>
      </div>

      <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded" onClick={handleSaveLayout}>
        Save Layout
      </button>
    </div>
  );
}

export default CreateParkingLayout;
