import { createContext, useContext, useState } from "react";

// Context to store and manage the captain's data and state throughout the application
export const CaptainDataContext = createContext();

/**
 * CaptainContext component provides the context for captain-related data and actions.
 * It includes states for captain information, loading status, error handling, online status,
 * current location, and current trip. It also provides functions to update these states.
 *
 * @param {React.ReactNode} children - The child components that will consume the context.
 */
const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCaptain = (captainData) => setCaptain(captainData);

  const value = {
    captain,
    setCaptain,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateCaptain,
  };

  return (
    <>
      <CaptainDataContext.Provider value={value}>
        {children}
      </CaptainDataContext.Provider>
    </>
  );
};

export default CaptainContext;
