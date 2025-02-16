// pages/select-location.js
"use client"
// pages/select-location.js
import { useState } from 'react';

const SelectLocation = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [destinationName, setDestinationName] = useState('');
  const [filteredDestinations, setFilteredDestinations] = useState([]);

  // States and districts data (simplified for example)
  const states = [
    { id: 'ca', name: 'California' },
    { id: 'ny', name: 'New York' },
    { id: 'il', name: 'Illinois' },
  ];

  const districts = {
    ca: [
      { id: 'sf', name: 'San Francisco' },
      { id: 'la', name: 'Los Angeles' },
    ],
    ny: [
      { id: 'nyc', name: 'New York City' },
      { id: 'buffalo', name: 'Buffalo' },
    ],
    il: [
      { id: 'chi', name: 'Chicago' },
      { id: 'naperville', name: 'Naperville' },
    ],
  };

  // Destination names for each district
  const districtDestinations = {
    sf: ['Golden Gate Bridge', 'Alcatraz Island', 'Fisherman\'s Wharf'],
    la: ['Santa Monica Pier', 'Hollywood Sign', 'Griffith Observatory'],
    nyc: ['Times Square', 'Central Park', 'Empire State Building'],
    buffalo: ['Niagara Falls', 'Buffalo Zoo', 'Canalside'],
    chi: ['Millennium Park', 'Navy Pier', 'Willis Tower'],
    naperville: ['Naperville Riverwalk', 'Centennial Beach', 'Downtown Naperville'],
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedDistrict(''); // Reset district when state changes
    setDestinationName('');
    setFilteredDestinations([]);
    console.log("state changed")
  };

  const handleDistrictChange = (event) => {
    const districtId = event.target.value;
    setSelectedDistrict(districtId);
    setDestinationName('');
    setFilteredDestinations([]);
  };

  const handleDestinationChange = (event) => {
    const value = event.target.value;
    setDestinationName(value);

    // Filter destinations based on the selected district and input value
    if (selectedDistrict && value) {
      const filtered = districtDestinations[selectedDistrict].filter((destination) =>
        destination.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDestinations(filtered);
    } else {
      setFilteredDestinations([]);
    }
  };

  const handleSubmit = () => {
    if (selectedState && selectedDistrict && destinationName) {
      alert(`You selected ${destinationName}, ${selectedDistrict}, ${selectedState}`);
    } else {
      alert('Please select all fields and enter a destination name.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-10">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Select Your Desired Location</h1>

      {/* State Dropdown */}
      <div className="mb-6">
        <label htmlFor="state" className="block text-lg font-medium text-gray-700 mb-2">
          Choose a State:
        </label>
        <select
          id="state"
          value={selectedState}
          onChange={handleStateChange}
          className="w-64 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
        >
          <option value="">--Select a State--</option>
          {states.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      {/* District Dropdown */}
      {selectedState && (
        <div className="mb-6">
          <label htmlFor="district" className="block text-lg font-medium text-gray-700 mb-2">
            Choose a District:
          </label>
          <select
            id="district"
            value={selectedDistrict}
            onChange={handleDistrictChange}
            className="w-64 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
          >
            <option value="">--Select a District--</option>
            {districts[selectedState]?.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Destination Name Input with Suggestions */}
      <div className="mb-6">
        <label htmlFor="destination" className="block text-lg font-medium text-gray-700 mb-2">
          Enter Destination Name:
        </label>
        <input
          type="text"
          id="destination"
          value={destinationName}
          onChange={handleDestinationChange}
          className="w-64 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
          placeholder="e.g., Central Park"
        />

        {/* Display suggestions */}
        {destinationName && filteredDestinations.length > 0 && (
          <ul className="mt-2 max-h-40 overflow-y-auto border border-gray-300 rounded-md bg-white shadow-md">
            {filteredDestinations.map((destination, index) => (
              <li
                key={index}
                className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-indigo-100"
                onClick={() => setDestinationName(destination)}
              >
                {destination}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-4 py-2 px-6 bg-indigo-600 text-white text-lg font-semibold rounded-md hover:bg-indigo-700 transition duration-300"
      >
        Find Parking Slots
      </button>
    </div>
  );
};

export default SelectLocation;
