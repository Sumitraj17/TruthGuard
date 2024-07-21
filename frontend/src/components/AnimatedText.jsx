// AnimatedText.js
import React, { useState, useEffect } from 'react';

const AnimatedText = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, index + 1));
      setIndex((prevIndex) => (prevIndex + 1) % (text.length + 1));
    }, 200); 
    return () => clearInterval(interval);
  }, [index, text]);

  return (
    <div className="text-5xl font-mono flex justify-center items-center ">
      {displayText}
    </div>
  );
};

export default AnimatedText;
