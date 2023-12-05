import React, { createContext, useContext, ReactNode } from 'react';

/**
 * Props for the ManagerEmailProvider component.
 * @interface
 * @property {ReactNode} children - The children components to be wrapped by the provider.
 */
interface ManagerEmailContextProps {
  children: ReactNode;
}

/**
 * Data structure for the ManagerEmailContext.
 * @interface
 * @property {string} ManagerEmail - The manager's email address.
 * @property {React.Dispatch<React.SetStateAction<string>>} setManagerEmail - Function to set the manager's email address.
 */
interface ManagerEmailContextData {
  ManagerEmail: string;
  setManagerEmail: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Context for managing the manager's email address.
 * @type {React.Context<ManagerEmailContextData | undefined>}
 */
const ManagerEmailContext = createContext<ManagerEmailContextData | undefined>(undefined);

/**
 * Provider component for managing the manager's email address.
 * @param {ManagerEmailContextProps} props - The props for the ManagerEmailProvider component.
 * @returns {JSX.Element} The rendered ManagerEmailProvider component.
 */
export const ManagerEmailProvider: React.FC<ManagerEmailContextProps> = ({ children }) => {
  const [ManagerEmail, setManagerEmail] = React.useState<string>('');

  return (
    <ManagerEmailContext.Provider value={{ ManagerEmail, setManagerEmail }}>
      {children}
    </ManagerEmailContext.Provider>
  );
};

/**
 * Hook for accessing the manager's email context.
 * @returns {ManagerEmailContextData} The manager's email context.
 * @throws {Error} Throws an error if used outside the ManagerEmailProvider.
 */
export const useManagerEmail = () => {
  const context = useContext(ManagerEmailContext);
  if (!context) {
    throw new Error('useManagerEmail must be used within a ManagerEmailProvider');
  }
  return context;
};
