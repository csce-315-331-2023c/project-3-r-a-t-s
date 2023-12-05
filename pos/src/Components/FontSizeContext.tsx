import React, { createContext, useState, useContext, ReactNode } from 'react';

/**
 * Type definition for the FontSizeContext.
 */
type FontSizeContextType = {
  fontSize: number;
  setFontSize: (size: number) => void;
};

/**
 * Context for managing font size in the application.
 */
const FontSizeContext = createContext<FontSizeContextType>({
  fontSize: 100, // Default font size in percentage
  setFontSize: () => {}
});

/**
 * Hook to access the FontSizeContext values.
 * @returns {FontSizeContextType} The context values.
 */
export const useFontSize = () => useContext(FontSizeContext);

/**
 * FontSizeProvider component to wrap the application and provide font size context.
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @returns {JSX.Element} The React component.
 */
export const FontSizeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [fontSize, setFontSize] = useState(100);

  /**
   * Renders the FontSizeProvider component.
   */
  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export default FontSizeContext;
