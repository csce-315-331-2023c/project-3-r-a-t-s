import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
}

const MenuSection: React.FC<Props> = ({ title, children }) => (
  <div className="my-4">
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    <div className="grid grid-cols-3 gap-4">{children}</div>
  </div>
);

export default MenuSection;