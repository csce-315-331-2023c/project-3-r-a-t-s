import React from 'react';
import { useFontSize } from './FontSizeContext';


/**
 * Component for adjusting the font size.
 * @returns {JSX.Element} The React component.
 */
const FontSizeAdjuster: React.FC = () => {
  const { fontSize, setFontSize } = useFontSize();

  /**
   * Increases the font size by 10 units.
   */
  const increaseFontSize = () => setFontSize(fontSize + 10);

  /**
   * Decreases the font size by 10 units, with a minimum font size of 10 units.
   */
  const decreaseFontSize = () => setFontSize(Math.max(10, fontSize - 10));

   /**
   * Renders the FontSizeAdjuster component.
   */
  return (
    <div>
      <button onClick={increaseFontSize}>Increase Font Size</button>
      <button onClick={decreaseFontSize}>Decrease Font Size</button>
    </div>
  );
};

export default FontSizeAdjuster;
