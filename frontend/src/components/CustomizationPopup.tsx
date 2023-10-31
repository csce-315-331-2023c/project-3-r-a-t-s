import React from 'react';

interface Props {
  onClose: () => void;
}

const CustomizationPopup: React.FC<Props> = ({ onClose }) => (
  <div className="fixed inset-0 bg-gray-700 bg-opacity-70 flex justify-center items-center">
    <div className="bg-white p-8 rounded">
      {/* Add your customization options here */}
      <button onClick={onClose} className="mt-4">Close</button>
    </div>
  </div>
);

export default CustomizationPopup;
