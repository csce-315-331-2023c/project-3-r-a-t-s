// useScript.ts
import { useEffect } from 'react';

const UseScript = (url: string) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

export default UseScript;
