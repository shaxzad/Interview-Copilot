import React, { useState } from 'react';

export const App: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Interview Copilot</h1>
      <p>Welcome to your AI-powered interview preparation platform</p>
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => setCount((count) => count + 1)}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Count: {count}
        </button>
      </div>
    </div>
  );
};

export default App;
