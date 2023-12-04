import React, { useState, useRef } from 'react';
import './Login.css';

interface NumericKeypadProps {
  onNumberClick: (number: number) => void;
  onEnterClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClearClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const NumericKeypad: React.FC<NumericKeypadProps> = ({ onNumberClick, onEnterClick, onClearClick }) => {
  const [value, setValue] = useState('');
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleNumberClick = (number: number) => {
    setValue((prevValue) => prevValue + number.toString());
    onNumberClick(number);
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setValue('');
    onClearClick(e);
  };

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onEnterClick(e);
  };

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
