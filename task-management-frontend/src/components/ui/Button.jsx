import React from 'react';

export function Button({ children, type = 'button', ...props }) {
  return (
    <button
      type={type}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      {...props}
    >
      {children}
    </button>
  );
}
