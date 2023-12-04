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

const TextSizeAdjuster: React.FC = () => {
  const { scale, setScale } = useContext(ScaleContext);

  const increaseSize = () => setScale(scale + 0.1);
  const decreaseSize = () => setScale(Math.max(1, scale - 0.1));

  return (
    <div>
      <button onClick={increaseSize}>A+</button>
      <button onClick={decreaseSize}>A-</button>
    </div>
  );
};

export default TextSizeAdjuster;

