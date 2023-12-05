// // TextSizeAdjuster.tsx
// import React, { useState } from 'react';

// const TextSizeAdjuster: React.FC = () => {
//   const [textSize, setTextSize] = useState(100); // Percentage

//   const updateTextSize = (newSize: number) => {
//     setTextSize(newSize);
//     document.documentElement.style.setProperty('--text-size', `${newSize}%`);
//   };

//   const increaseTextSize = () => updateTextSize(textSize + 10);
//   const decreaseTextSize = () => updateTextSize(Math.max(100, textSize - 10));

//   return (
//     <div>
//       <button onClick={increaseTextSize}>A+</button>
//       <button onClick={decreaseTextSize}>A-</button>
//     </div>
//   );
// };

// export default TextSizeAdjuster;
// import React, { useState } from 'react';

// const TextSizeAdjuster: React.FC = () => {
//   const [textSize, setTextSize] = useState(2); // Starting with a base size in vw

//   const updateTextSize = (newSize: number) => {
//     setTextSize(newSize);
//     document.documentElement.style.setProperty('--text-size', `${newSize}vw`);
//   };

//   const increaseTextSize = () => updateTextSize(textSize + 0.1);
//   const decreaseTextSize = () => updateTextSize(Math.max(1, textSize - 0.1));

//   return (
//     <div>
//       <button onClick={increaseTextSize}>A+</button>
//       <button onClick={decreaseTextSize}>A-</button>
//     </div>
//   );
// };

// export default TextSizeAdjuster;

// TextSizeAdjuster.tsx\

import React, { useState, useContext } from 'react';
import { ScaleContext } from './ScaleContext';
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

const TextSizeAdjuster: React.FC = () => {
  const { scale, setScale } = useContext(ScaleContext);

  const increaseSize = () => setScale(scale + 0.1);
  const decreaseSize = () => setScale(Math.max(1, scale - 0.1));

  return (
    <div className='home' 
      style={{
        color: "white", 
        border: "4px solid white", 
        height: "6vh", 
        width: "15vw", 
        borderRadius: "25px", 
        margin: "2vh 0vw 0vh 5.5vw"
        }}>
      
      <div style={{ display: 'flex', alignItems: 'center', width: '100%', fontSize: '35px'}}>
      <button onClick={decreaseSize} style={{
        flex: 1,
        color: "white", 
        border: "none",
        height: "4vh",
        borderRadius: "40px", 
        marginTop: "-1.5vw",
        padding: "0vh 0vh",
        background: "none",
        
        }}>
          <CiCircleMinus />
        </button>

        <b style={{
          fontSize: "3vh"
        }}
        >Zoom</b> 

      <button onClick={increaseSize}style={{
        flex: 1,
        color: "white", 
        border: "none",
        height: "4vh",
        borderRadius: "40px", 
        marginTop: "-1.5vw",
        padding: "0vh 0vh",
        background: "none",
        }}>
        <CiCirclePlus />
      </button>
      </div>
    </div>
  );
};

export default TextSizeAdjuster;

