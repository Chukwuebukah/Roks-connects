import React from 'react';

const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  const handleCheckboxChange = (gender) => {
    onCheckboxChange(gender);
  };

  return (
    <div className="flex">
      <div className="form-control">
        {["male", "female"].map((gender) => (
          <label
            key={gender}
            className={`cursor-pointer label gap-2 ${selectedGender === gender ? "selected" : ""}`}
          >
            <span className="label-text">{gender.charAt(0).toUpperCase() + gender.slice(1)}</span>
            <input
              type="checkbox"
              className="checkbox border-slate-900"
              checked={selectedGender === gender}
              onChange={() => handleCheckboxChange(gender)}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default GenderCheckbox;