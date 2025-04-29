import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BarChart2, ShoppingCart, TrendingUp, Settings, Package, ChevronDown, User, Bell, Search, FileEdit } from 'lucide-react';
import { userData } from '../../utils/mockData';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <BarChart2 size={20} /> },
    { path: '/sales', label: 'Sales Record', icon: <TrendingUp size={20} /> },
    { path: '/purchases', label: 'Purchases', icon: <ShoppingCart size={20} /> },
    { path: '/stock', label: 'Stock', icon: <Package size={20} /> },
    { path: '/admin', label: 'Admin', icon: <FileEdit size={20} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Mobile */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
        onClick={toggleSidebar}
      >
        <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 bg-[var(--primary)] rounded-md">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <h1 className="ml-3 text-xl font-semibold text-[var(--primary)]">T-Phil Autos</h1>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md lg:hidden hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        <div className="h-full overflow-y-auto">
          <nav className="px-2 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-link ${
                  location.pathname === item.path ? 'active' : ''
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={toggleSidebar}
                  className="p-2 rounded-md lg:hidden hover:bg-gray-100"
                >
                  <Menu size={20} />
                </button>
                <div className="hidden md:block ml-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={20} className="text-gray-400" />
                    </div>
                    <input
                      className="input pl-10 w-72"
                      type="text"
                      placeholder="Search..."
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <button className="p-2 mr-2 text-gray-500 rounded-full hover:bg-gray-100">
                  <Bell size={20} />
                </button>
                <div className="relative ml-3">
                  <div className="flex items-center">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={userData.avatar}
                      alt="User avatar"
                    />
                    <div className="hidden md:flex ml-2 items-center">
                      <span className="text-sm font-medium text-gray-700">{userData.name}</span>
                      <ChevronDown size={16} className="ml-1 text-gray-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;