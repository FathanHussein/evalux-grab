import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import WelcomePage from './components/WelcomePage';
import Questionnaire from './components/Questionnaire';
import Statements from './components/Statements';
import Analysis from './components/Analysis';
import Respondents from './components/Respondents';
import Dashboard from './components/Dashboard';
import Scores from './components/Scores';
import LoginModal from './components/LoginModal';
import Footer from './components/Footer';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const storedIsAdmin = localStorage.getItem('isAdmin');
    if (storedIsAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLogoutClick = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  const handleLogin = (isAdminStatus) => {
    setIsAdmin(isAdminStatus);
    localStorage.setItem('isAdmin', isAdminStatus);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onLoginClick={handleLoginClick} isAdmin={isAdmin} onLogoutClick={handleLogoutClick} />
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={handleCloseLoginModal} 
        onLogin={handleLogin} 
      />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={isAdmin ? <Navigate to="/dashboard" /> : <WelcomePage />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="/dashboard" element={isAdmin ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/listofstatements" element={isAdmin ? <Statements /> : <Navigate to="/" />} />
          <Route path="/analysis" element={isAdmin ? <Analysis /> : <Navigate to="/" />} />
          <Route path="/respondents" element={isAdmin ? <Respondents /> : <Navigate to="/" />} />
          <Route path="/scores" element={<Scores />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
