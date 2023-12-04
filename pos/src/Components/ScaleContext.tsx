// ScaleContext.tsx
import React, { useState, createContext, ReactNode } from 'react';

type ScaleContextType = {
  scale: number;
  setScale: (scale: number) => void;
};

export const ScaleContext = createContext<ScaleContextType>({ scale: 1, setScale: () => {} });

export const ScaleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [scale, setScale] = useState(1);

  return (
    <ScaleContext.Provider value={{ scale, setScale }}>
      {children}
    </ScaleContext.Provider>
  );
};
