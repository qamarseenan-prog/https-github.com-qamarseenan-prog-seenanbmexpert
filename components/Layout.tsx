import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Info, 
  Phone, 
  HelpCircle, 
  LogOut, 
  Menu, 
  X,
  Briefcase
} from 'lucide-react';
import { PageView, User } from '../types';
import { APP_NAME } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  user: User;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate, user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: PageView.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: PageView.ABOUT, label: 'About AI', icon: Info },
    { id: PageView.CONTACT, label: 'Contact Us', icon: Phone },
    { id: PageView.HELP, label: 'Help & Support', icon: HelpCircle },
  ];

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-slate-900 text-white overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-slate-900/90 backdrop-blur-md z-50 border-b border-slate-800 p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
           <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
              <Briefcase size={20} className="text-white" />
            </div>
          <span className="font-bold text-lg tracking-tight">{APP_NAME}</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-slate-950 border-r border-slate-800 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex items-center gap-3 border-b border-slate-800/50">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg shadow-blue-500/20">
            <Briefcase size={24} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight">{APP_NAME}</h1>
            <p className="text-xs text-slate-400">Business Edition</p>
          </div>
        </div>

        <nav className="p-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                ${currentPage === item.id 
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' 
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`}
            >
              <item.icon size={20} className={currentPage === item.id ? 'text-blue-400' : 'text-slate-500 group-hover:text-white'} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800 bg-slate-950">
          <div className="flex items-center gap-3 mb-4 px-2">
            <img 
              src={user.avatar} 
              alt="User" 
              className="w-10 h-10 rounded-full border-2 border-slate-700"
            />
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-red-900/20 hover:text-red-400 text-slate-400 py-2 rounded-lg transition-colors text-sm font-medium border border-slate-800"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative pt-16 md:pt-0 bg-slate-900">
        <div className="h-full overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;