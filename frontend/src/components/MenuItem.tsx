import React from 'react';

interface Props {
  name: string;
  imageSrc: string;
  onInfoClick: () => void;
}

const MenuItem: React.FC<Props> = ({ name, imageSrc, onInfoClick }) => (
  <div className="border p-4">
    <img src={imageSrc} alt={name} className="mb-2" />
    <div className="flex justify-between items-center">
      <span>{name}</span>
      <button onClick={onInfoClick} className="text-gray-500">
        i
      </button>
    </div>
  </div>
);

export default MenuItem;
