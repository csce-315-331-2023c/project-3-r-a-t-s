import React, { useState, createContext, ReactNode } from 'react';

/**
 * Type definition for the context value of the ScaleContext.
 */
type ScaleContextType = {
  scale: number;
  setScale: (scale: number) => void;
};

/**
 * Context object for managing the scale value.
 */
export const ScaleContext = createContext<ScaleContextType>({ scale: 1, setScale: () => {} });

/**
 * Provider component for the ScaleContext, managing the scale state.
 * @param {Object} props - The properties for the ScaleProvider.
 * @param {ReactNode} props.children - The child elements to be wrapped by the provider.
 * @returns {JSX.Element} The React component.
 */
export const ScaleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [scale, setScale] = useState(1);

  return (
    <ScaleContext.Provider value={{ scale, setScale }}>
      {children}
    </ScaleContext.Provider>
  );
};
