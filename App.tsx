import React, { useState } from 'react';
import Login from './components/Login';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import { ContactPage, AboutPage, HelpPage } from './components/InfoPages';
import { PageView, User } from './types';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageView>(PageView.DASHBOARD);
  
  // Simulated User Data
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'Business User',
    email: 'user@example.com',
    avatar: 'https://picsum.photos/200/200'
  });

  const handleLogin = () => {
    // In a real app, this would handle Google OAuth
    setIsLoggedIn(true);
    setCurrentPage(PageView.DASHBOARD);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case PageView.DASHBOARD:
        return <Dashboard />;
      case PageView.ABOUT:
        return <AboutPage />;
      case PageView.CONTACT:
        return <ContactPage />;
      case PageView.HELP:
        return <HelpPage />;
      default:
        return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout 
      currentPage={currentPage} 
      onNavigate={setCurrentPage} 
      user={user}
      onLogout={handleLogout}
    >
      {renderPage()}
    </Layout>
  );
}

export default App;