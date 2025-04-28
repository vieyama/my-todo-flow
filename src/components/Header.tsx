import React from 'react';
import { CheckSquare } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-center py-6 ">
      <div className="flex items-center gap-2">
        <span className="text-sky-600">
          <CheckSquare size={32} />
        </span>
        <h1 className="text-2xl font-bold text-gray-800">
          TodoFlow
        </h1>
      </div>
    </header>
  );
};

export default Header;