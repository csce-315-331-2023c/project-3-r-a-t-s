// GoogleTranslate.tsx
import React, { useEffect } from 'react';

const GoogleTranslate: React.FC = () => {
  useEffect(() => {
    // Function to initialize the Google Translate widget
    const googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: 'en', layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE },
        'google_translate_element'
      );
    };

    // Load the Google Translate script
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Set up the callback function
    (window as any).googleTranslateElementInit = googleTranslateElementInit;

    // Clean up function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;
