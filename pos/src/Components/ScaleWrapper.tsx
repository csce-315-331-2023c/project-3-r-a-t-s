// ScaleWrapper.tsx
import React, { useContext } from 'react';
import { ScaleContext } from './ScaleContext';

/**
 * Wrapper component that scales its children based on the scale value from the ScaleContext.
 * @param {Object} props - The properties for the ScaleWrapper.
 * @param {React.ReactNode} props.children - The child elements to be wrapped and scaled.
 * @returns {JSX.Element} The React component.
 */
const ScaleWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Access the scale value from the ScaleContext
  const { scale } = useContext(ScaleContext);

  // Style object to apply scaling
  const style = {
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
    width: `${100 / scale}%`,
    height: `${100 / scale}%`
  };
  
  // Render the wrapped children with the applied scale
  return <div style={style}>{children}</div>;
};

export default ScaleWrapper;
