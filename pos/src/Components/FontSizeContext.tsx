import React, { createContext, useState, useContext, ReactNode } from 'react';

type FontSizeContextType = {
  fontSize: number;
  setFontSize: (size: number) => void;
};

const FontSizeContext = createContext<FontSizeContextType>({
  fontSize: 100, // Default font size in percentage
  setFontSize: () => {}
});

export const useFontSize = () => useContext(FontSizeContext);

export const FontSizeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [fontSize, setFontSize] = useState(100);

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export default FontSizeContext;
