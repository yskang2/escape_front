import React from 'react';

const VRContent = () => {
  // Function to handle button click
  const handleClick = () => {
    window.location.href = 'nursingxr://';
  };

  return (
    <div style={{ height: '100vh' }}>
      <button
        type="button"
        onClick={handleClick}
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '15px 32px',
          textAlign: 'center',
          textDecoration: 'none',
          display: 'inline-block',
          fontSize: '16px',
          margin: '4px 2px',
          cursor: 'pointer',
          borderRadius: '12px',
        }}
      >
        실행
      </button>
    </div>
  );
};

export default VRContent;
