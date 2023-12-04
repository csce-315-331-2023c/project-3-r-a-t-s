// ScaleWrapper.tsx
import React, { useContext } from 'react';
import { ScaleContext } from './ScaleContext';

const ScaleWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { scale } = useContext(ScaleContext);

  const style = {
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
    width: `${100 / scale}%`,
    height: `${100 / scale}%`
  };

  return <div style={style}>{children}</div>;
};

export default ScaleWrapper;
