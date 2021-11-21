import React from 'react';
import useAnimation from '../useHooks/useAnimation';
import './Circle.css';
function Circle() {
  const [className, start] = useAnimation('circle', 'active');
  return <div className={className} onClick={start}></div>;
}
export default Circle;
