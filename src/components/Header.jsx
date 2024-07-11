import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header({ onLoginClick, isAdmin, onLogoutClick }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  return (
    <header className="flex justify-between items-center p-4 bg-green-500 text-white relative">
      <div className="flex items-center">
        <button onClick={toggleDropdown} className="mr-4 relative text-3xl">☰</button>
        <Link className="ml-5 text-2xl" to="/">EvalUX-GRAB</Link>
        {isDropdownOpen && (
          <div className="absolute bg-white text-black rounded shadow-lg top-full left-0">
            {isAdmin ? (
              <>
                <Link to="/dashboard" className="block m-2 px-4 py-2 hover:bg-green-500" onClick={closeDropdown}>Dashboard</Link>
                <Link to="/listofstatements" className="block m-2 px-4 py-2 hover:bg-green-500" onClick={closeDropdown}>Daftar Pernyataan</Link>
                <Link to="/analysis" className="block m-2 px-4 py-2 hover:bg-green-500" onClick={closeDropdown}>Analisis</Link>
                <Link to="/respondents" className="block m-2 px-4 py-2 hover:bg-green-500" onClick={closeDropdown}>Responden</Link>
              </>
            ) : (
              <>
                <Link to="/questionnaire" className="block m-2 px-4 py-2 hover:bg-green-500" onClick={closeDropdown}>Kuesioner</Link>
                <Link to="/scores" className="block m-2 px-4 py-2 hover:bg-green-500" onClick={closeDropdown}>Skor</Link>
              </>
            )}
          </div>
        )}
      </div>
      <div>
        {isAdmin ? (
          <>
            <button onClick={onLogoutClick} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">Logout</button>
          </>
        ) : (
          <button onClick={onLoginClick} className="bg-slate-200 px-4 py-2 rounded text-black hover:bg-slate-300">Login</button>
        )}
      </div>
    </header>
  );
}

export default Header;
