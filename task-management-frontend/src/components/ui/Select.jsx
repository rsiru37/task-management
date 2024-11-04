import React from 'react';

export function Select({ children, ...props }) {
  return (
    <select
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    >
      {children}
    </select>
  );
}

export function SelectItem({ children, ...props }) {
  return <option {...props}>{children}</option>;
}