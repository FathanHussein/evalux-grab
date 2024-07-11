import React, { useState } from 'react';

function LoginModal({ isOpen, onClose, onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '322322') {
      onLogin(true);
      onClose();
    } else {
      alert('Login failed!');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded">
        <h2 className="text-xl mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className="w-full px-2 py-1 border border-[#EDEEF0] bg-[#F9FAFC] rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full px-2 py-1 border border-[#EDEEF0] bg-[#F9FAFC] rounded"
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Login</button>
          <button type="button" onClick={onClose} className="w-full mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
