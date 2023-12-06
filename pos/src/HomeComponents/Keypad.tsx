import React, { useState, useRef } from 'react';
import './Login.css';

/**
 * Interface representing the props for the NumericKeypad component.
 * @typedef {Object} NumericKeypadProps
 * @property {(number: number) => void} onNumberClick - Function called when a number is clicked.
 * @property {(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void} onEnterClick - Function called when the "Enter" button is clicked.
 * @property {(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void} onClearClick - Function called when the "Clear" button is clicked.
 */
interface NumericKeypadProps {
  onNumberClick: (number: number) => void;
  onEnterClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClearClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

/**
 * Component for displaying a numeric keypad.
 * @param {NumericKeypadProps} props - The properties for the component.
 * @returns {JSX.Element} The React component.
 */
const NumericKeypad: React.FC<NumericKeypadProps> = ({ onNumberClick, onEnterClick, onClearClick }) => {
  const [value, setValue] = useState('');
  const passwordInputRef = useRef<HTMLInputElement>(null);

  /**
   * Handles a numeric button click.
   * @param {number} number - The clicked number.
   */
  const handleNumberClick = (number: number) => {
    setValue((prevValue) => prevValue + number.toString());
    onNumberClick(number);
  };

  /**
   * Handles the clear button click.
   * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} e - The click event.
   */
  const handleClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setValue('');
    onClearClick(e);
  };

  /**
   * Handles the enter button click.
   * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} e - The click event.
   */
  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onEnterClick(e);
  };

   /**
     * Renders the NumericKeypad component.
     */
  return (
    <div className="NumericKeypad">
      <div className="NumericKeypad-row">
        <button onClick={() => handleNumberClick(1)}>1</button>
        <button onClick={() => handleNumberClick(2)}>2</button>
        <button onClick={() => handleNumberClick(3)}>3</button>
      </div>
      <div className="NumericKeypad-row">
        <button onClick={() => handleNumberClick(4)}>4</button>
        <button onClick={() => handleNumberClick(5)}>5</button>
        <button onClick={() => handleNumberClick(6)}>6</button>
      </div>
      <div className="NumericKeypad-row">
        <button onClick={() => handleNumberClick(7)}>7</button>
        <button onClick={() => handleNumberClick(8)}>8</button>
        <button onClick={() => handleNumberClick(9)}>9</button>
      </div>
      <div className="NumericKeypad-row">
        <button onClick={(e) => handleClear(e)}>C</button>
        <button onClick={() => handleNumberClick(0)}>0</button>
        <button onClick={(e) => handleConfirm(e)}>Enter</button>      
      </div>
    </div>
  );
};

export default NumericKeypad;
