import React, { createContext, useContext, ReactNode } from 'react';

interface ManagerEmailContextProps {
  children: ReactNode;
}

interface ManagerEmailContextData {
  ManagerEmail: string;
  setManagerEmail: React.Dispatch<React.SetStateAction<string>>;
}

const ManagerEmailContext = createContext<ManagerEmailContextData | undefined>(undefined);

export const ManagerEmailProvider: React.FC<ManagerEmailContextProps> = ({ children }) => {
  const [ManagerEmail, setManagerEmail] = React.useState<string>('');

  return (
    <ManagerEmailContext.Provider value={{ ManagerEmail, setManagerEmail }}>
      {children}
    </ManagerEmailContext.Provider>
  );
};

export const useManagerEmail = () => {
  const context = useContext(ManagerEmailContext);
  if (!context) {
    throw new Error('useManagerEmail must be used within a ManagerEmailProvider');
  }
  return context;
};
