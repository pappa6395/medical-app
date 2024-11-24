"use client"
import React, { useEffect, useState } from 'react';

const TransitionalText = ({TEXTS}:{TEXTS:string[]}) => {

  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % TEXTS.length);
        setIsVisible(true);
      },500);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    
    <span className={`text-center text-blue-500 transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {TEXTS[index]}
    </span>

  )
}

export default TransitionalText