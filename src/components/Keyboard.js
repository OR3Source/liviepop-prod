import React from 'react';
import './Keyboard.css';

const Keyboard = ({ onKeyPress, onEnter, onDelete, keyboardStatus = {}, disabled = false }) => {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
  ];

  const handleClick = (key) => {
    if (disabled) return;
    if (key === 'ENTER') {
      onEnter?.();
    } else if (key === '⌫') {
      onDelete?.();
    } else {
      onKeyPress?.(key);
    }
  };

  const getKeyClass = (key) => {
    const classes = ['keyboard-key'];
    if (key === 'ENTER') classes.push('key-enter');
    if (key === '⌫') classes.push('key-backspace');

    const status = keyboardStatus[key];
    if (status === 'correct') classes.push('key-correct');
    else if (status === 'present') classes.push('key-present');
    else if (status === 'absent') classes.push('key-absent');

    if (disabled && key !== 'ENTER' && key !== '⌫') classes.push('key-disabled');

    return classes.join(' ');
  };

  return (
    <div className="keyboard">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => (
            <button
              key={key}
              className={getKeyClass(key)}
              onClick={() => handleClick(key)}
              tabIndex="-1"
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;