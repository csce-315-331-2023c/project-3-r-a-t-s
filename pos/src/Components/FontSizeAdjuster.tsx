import React from 'react';
import { useFontSize } from './FontSizeContext';

const FontSizeAdjuster: React.FC = () => {
  const { fontSize, setFontSize } = useFontSize();

  const increaseFontSize = () => setFontSize(fontSize + 10);
  const decreaseFontSize = () => setFontSize(Math.max(10, fontSize - 10));

  return (
    <div>
      <button onClick={increaseFontSize}>Increase Font Size</button>
      <button onClick={decreaseFontSize}>Decrease Font Size</button>
    </div>
  );
};

export default FontSizeAdjuster;
