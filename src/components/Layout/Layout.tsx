import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BarChart2, ShoppingCart, TrendingUp, Settings, Package, ChevronDown, User, FileEdit } from 'lucide-react';
import { userData } from '../../utils/mockData';
import { supabase } from '../../lib/supabase';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(fileName, file);

      if (error) throw error;

      const { data: publicURL } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      userData.avatar = publicURL.publicUrl;
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };

  const handleNavClick = () => {
    setSidebarOpen(false);
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
                onClick={handleNavClick}
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
              </div>
              <div className="flex items-center">
                <div className="relative ml-3">
                  <div className="flex items-center">
                    <div className="relative">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                      />
                      <img
                        className="h-8 w-8 rounded-full object-cover cursor-pointer"
                        src={userData.avatar}
                        alt="User avatar"
                        onClick={() => fileInputRef.current?.click()}
                      />
                      <button
                        className="absolute bottom-0 right-0 bg-gray-100 rounded-full p-1 hover:bg-gray-200"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <User size={12} />
                      </button>
                    </div>
                    <div className="hidden md:flex ml-2 items-center cursor-pointer" onClick={handleProfileClick}>
                      <span className="text-sm font-medium text-gray-700">{userData.name}</span>
                      <ChevronDown size={16} className="ml-1 text-gray-500" />
                    </div>
                  </div>
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                      <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Profile Settings
                      </Link>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Sign out
                      </button>
                    </div>
                  )}
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
