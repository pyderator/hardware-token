import React from "react";

export const H1 = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className="font-bold text-3xl md:text-4xl text-gray-800 pb-2">
      {children}
    </h1>
  );
};
