import React, { useState } from 'react';
import './App.css';

function App() {
  const [expression, setExpression] = useState('happy'); // Default expression

  const handleExpressionChange = (newExpression) => {
    setExpression(newExpression);
  };

  return (
    <div className="app">
      <div className="face">
        <div className="eyes">
          {/* Adjust eye shape based on expression */}
          {expression === 'happy' && <div className="eye happy-eye"></div>}
          {expression === 'sad' && <div className="eye sad-eye"></div>}
          {expression === 'angry' && <div className="eye angry-eye"></div>}
          {/* ... other expressions */}
        </div>
        <div className="mouth">
          {/* Adjust mouth shape based on expression */}
          {expression === 'happy' && <div className="mouth happy-mouth"></div>}
          {expression === 'sad' && <div className="mouth sad-mouth"></div>}
          {expression === 'angry' && <div className="mouth angry-mouth"></div>}
          {/* ... other expressions */}
        </div>
      </div>

      <div className="controls">
        <button onClick={() => handleExpressionChange('happy')}>Happy</button>
        <button onClick={() => handleExpressionChange('sad')}>Sad</button>
        <button onClick={() => handleExpressionChange('angry')}>Angry</button>
        {/* ... other expression buttons */}
      </div>
    </div>
  );
}

export default App;
