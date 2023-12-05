// useScript.ts
import { useEffect } from 'react';

/**
 * A custom hook for dynamically adding scripts to the document.
 * @param {string} url - The URL of the script to be added.
 */
const UseScript = (url: string) => {
  useEffect(() => {
    // Create a new script element
    const script = document.createElement('script');
    script.src = url;
    script.async = true;

    // Append the script element to the body of the document
    document.body.appendChild(script);

    // Clean up function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

export default UseScript;
