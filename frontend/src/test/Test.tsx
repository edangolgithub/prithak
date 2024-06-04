import React, { useState } from 'react';

const Test =() => {
  const [showElement, setShowElement] = useState(false);

  const handleShowElement = () => {
    setShowElement(true);
  };

  return (
    <div>
      <h1>Main</h1>
      <button onClick={handleShowElement}>Show element</button>
      <input placeholder="Enter text" />
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
      {showElement && <div>Conditional element</div>}
    </div>
  );
};

export default Test;
