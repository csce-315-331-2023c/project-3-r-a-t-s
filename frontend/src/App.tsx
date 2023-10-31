import './App.css';
import React, { useState } from 'react';
import './App.css';
import MenuSection from './components/MenuSection';
import MenuItem from './components/MenuItem';
import CustomizationPopup from './components/CustomizationPopup';
import carbonaraImage from './images/carbonara.png';

function App() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="p-8">
      <MenuSection title="Pasta">
        <MenuItem 
          name="Carbonara" 
          imageSrc={carbonaraImage} 
          onInfoClick={() => setShowPopup(true)}
        />
        {/* I will eventually add other items similarly */}
      </MenuSection>
      {/* I will eventually add other sections similarly */}
      
      {showPopup && <CustomizationPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
}

export default App;