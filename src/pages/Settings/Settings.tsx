import React, { useState } from 'react';
import { User, Shield, Database, Bell, Lock } from 'lucide-react';
import { userData } from '../../utils/mockData';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'security', label: 'Security', icon: <Lock size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'backup', label: 'Backup & Restore', icon: <Database size={18} /> },
    { id: 'access', label: 'Access Control', icon: <Shield size={18} /> },
  ];

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Tabs */}
        <div className="md:w-1/4">
          <div className="card">
            <div className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`flex items-center gap-2 w-full text-left px-4 py-3 rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-secondary text-white'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="md:w-3/4">
          <div className="card">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold border-b pb-3">User Profile</h2>
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="sm:w-1/3 flex flex-col items-center">
                    <div className="relative">
                      <img
                        src={userData.avatar}
                        alt="User Avatar"
                        className="w-32 h-32 rounded-full object-cover"
                      />
                      <button className="absolute bottom-0 right-0 bg-secondary text-white p-2 rounded-full hover:bg-opacity-90">
                        <User size={16} />
                      </button>
                    </div>
                    <h3 className="mt-3 font-semibold text-lg">{userData.name}</h3>
                    <p className="text-gray-500">{userData.role}</p>
                  </div>
                  <div className="sm:w-2/3 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="input w-full"
                        defaultValue={userData.name}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        className="input w-full"
                        defaultValue={userData.email}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="input w-full"
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Role
                      </label>
                      <select className="input w-full">
                        <option>Administrator</option>
                        <option>Manager</option>
                        <option>Sales Agent</option>
                        <option>Accountant</option>
                      </select>
                    </div>
                    <div className="pt-4">
                      <button className="btn btn-primary">Save Changes</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold border-b pb-3">Security Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <input type="password" className="input w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input type="password" className="input w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input type="password" className="input w-full" />
                  </div>
                  <div className="pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span>Enable two-factor authentication</span>
                    </label>
                  </div>
                  <div className="pt-4">
                    <button className="btn btn-primary">Update Password</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold border-b pb-3">Notification Preferences</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Email Notifications</h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span>New sales notifications</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span>Inventory updates</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" />
                        <span>Daily summary reports</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span>System alerts</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">In-App Notifications</h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span>Real-time sales alerts</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span>Low inventory warnings</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span>Task assignments</span>
                      </label>
                    </div>
                  </div>
                  <div className="pt-4">
                    <button className="btn btn-primary">Save Preferences</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'backup' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold border-b pb-3">Backup & Restore</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Automatic Backups</h3>
                    <p className="text-gray-600 mb-3">
                      Configure automatic backups of your dealership data
                    </p>
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span>Enable automatic backups</span>
                      </label>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Backup Frequency
                        </label>
                        <select className="input w-full sm:w-auto">
                          <option>Daily</option>
                          <option>Weekly</option>
                          <option>Monthly</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Retention Period
                        </label>
                        <select className="input w-full sm:w-auto">
                          <option>30 days</option>
                          <option>60 days</option>
                          <option>90 days</option>
                          <option>Indefinitely</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Manual Backup</h3>
                    <p className="text-gray-600 mb-3">
                      Create a backup of your current system data
                    </p>
                    <button className="btn btn-primary">Create Backup Now</button>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Restore from Backup</h3>
                    <p className="text-gray-600 mb-3">
                      Select a previous backup to restore
                    </p>
                    <div className="space-y-3">
                      <select className="input w-full">
                        <option>Backup - May 15, 2023 (08:30 AM)</option>
                        <option>Backup - May 14, 2023 (08:30 AM)</option>
                        <option>Backup - May 13, 2023 (08:30 AM)</option>
                      </select>
                      <button className="btn bg-warning text-white hover:bg-[#E67E22]">
                        Restore Selected Backup
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'access' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold border-b pb-3">Access Control</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">User Roles</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-5 font-medium text-sm text-gray-600 pb-2">
                        <div className="col-span-2">Role</div>
                        <div>Users</div>
                        <div>Last Modified</div>
                        <div></div>
                      </div>
                      <div className="grid grid-cols-5 items-center border-b pb-3">
                        <div className="col-span-2">
                          <p className="font-medium">Administrator</p>
                          <p className="text-xs text-gray-500">Full system access</p>
                        </div>
                        <div>2</div>
                        <div className="text-sm">May 12, 2023</div>
                        <div>
                          <button className="text-secondary hover:underline">Edit</button>
                        </div>
                      </div>
                      <div className="grid grid-cols-5 items-center border-b pb-3">
                        <div className="col-span-2">
                          <p className="font-medium">Manager</p>
                          <p className="text-xs text-gray-500">Limited administrative access</p>
                        </div>
                        <div>3</div>
                        <div className="text-sm">Apr 28, 2023</div>
                        <div>
                          <button className="text-secondary hover:underline">Edit</button>
                        </div>
                      </div>
                      <div className="grid grid-cols-5 items-center border-b pb-3">
                        <div className="col-span-2">
                          <p className="font-medium">Sales Agent</p>
                          <p className="text-xs text-gray-500">Sales and inventory access</p>
                        </div>
                        <div>8</div>
                        <div className="text-sm">Apr 15, 2023</div>
                        <div>
                          <button className="text-secondary hover:underline">Edit</button>
                        </div>
                      </div>
                      <div className="grid grid-cols-5 items-center">
                        <div className="col-span-2">
                          <p className="font-medium">Accountant</p>
                          <p className="text-xs text-gray-500">Financial access only</p>
                        </div>
                        <div>2</div>
                        <div className="text-sm">Mar 22, 2023</div>
                        <div>
                          <button className="text-secondary hover:underline">Edit</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-3">
                    <button className="btn btn-primary">Add New Role</button>
                    <button className="btn border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                      Manage Users
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;