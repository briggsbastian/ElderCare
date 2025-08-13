import React, { useState, useRef, useEffect } from 'react';
import { Calendar, FileText, Heart, Clock, Sun, Moon, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import PowerOfAttorneyPage from '../components/poa.jsx';
import TrustsPage from '../components/trusts.jsx';
import CalendarPage from '../components/calendar.jsx';
import AccountSettingsPage from '../components/user_settings.jsx';

const App = () => {
  const [activeTab, setActiveTab] = useState('calendar');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState('all'); // For calendar filtering
  const dropdownRef = useRef(null);
  
  // Mock user data - replace with real user data from your auth system
  const [currentUser, setCurrentUser] = useState({
    name: "John Smith",
    email: "john.smith@email.com",
    timezone: "Pacific/US"
  });

  // State for elderly profiles
  const [elderlyProfiles, setElderlyProfiles] = useState([
    {
      id: "1",
      name: "Margaret Smith",
      relationship: "Mother",
      birthDate: "1945-03-15",
      notes: "Has diabetes, needs medication reminders",
      createdAt: new Date().toISOString()
    },
    {
      id: "2", 
      name: "Robert Johnson",
      relationship: "Father-in-law",
      birthDate: "1942-07-22",
      notes: "Weekly doctor visits, mobility issues",
      createdAt: new Date().toISOString()
    }
  ]);

  const tabs = [
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'poa', label: 'Power of Attorney', icon: FileText },
    { id: 'trusts', label: 'Trusts & Estate', icon: Heart },
    { id: 'doctor', label: 'Doctor Appointments', icon: Clock }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAccountDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAccountSettings = () => {
    setShowAccountDropdown(false);
    setActiveTab('settings');
  };

  const handleLogout = () => {
    setShowAccountDropdown(false);
    if (window.confirm('Are you sure you want to log out?')) {
      console.log('Logging out...');
      // Your logout logic here
    }
  };

  const handleUpdateUser = (updatedUser) => {
    setCurrentUser(updatedUser);
    // Here you would typically make an API call to update the user
    console.log('Updating user:', updatedUser);
  };

  const handleUpdateElderlyProfiles = (updatedProfiles) => {
    setElderlyProfiles(updatedProfiles);
    // Here you would typically make an API call to update the profiles
    console.log('Updating elderly profiles:', updatedProfiles);
  };

  const handleBackFromSettings = () => {
    setActiveTab('calendar');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'calendar':
        return (
          <CalendarPage 
            isDarkMode={isDarkMode} 
            elderlyProfiles={elderlyProfiles}
            selectedProfile={selectedProfile}
            onProfileChange={setSelectedProfile}
          />
        );
      case 'poa':
        return <PowerOfAttorneyPage isDarkMode={isDarkMode} />;
      case 'trusts':
        return <TrustsPage isDarkMode={isDarkMode} />;
      case 'settings':
        return (
          <AccountSettingsPage
            isDarkMode={isDarkMode}
            onBack={handleBackFromSettings}
            currentUser={currentUser}
            onUpdateUser={handleUpdateUser}
            elderlyProfiles={elderlyProfiles}
            onUpdateElderlyProfiles={handleUpdateElderlyProfiles}
          />
        );
      case 'doctor':
        return (
          <div className="p-8">
            <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Doctor Appointments</h2>
            <div className={`rounded-lg shadow-md p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <Clock size={64} className="mx-auto mb-4 text-red-500" />
              <p className={`text-lg text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Appointment scheduling coming soon...</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-8">
            <h2 className="text-2xl">Welcome to ElderCare Dashboard</h2>
          </div>
        );
    }
  };

  // Don't render navigation when in settings
  const showNavigation = activeTab !== 'settings';

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Top Navigation Bar */}
      {showNavigation && (
        <nav className={`shadow-sm border-b ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className={`text-2xl font-bold py-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>ElderCare Dashboard</h1>
              
              <div className="flex items-center space-x-4">
                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                
                {/* Tab Navigation */}
                <div className="flex space-x-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                          activeTab === tab.id
                            ? isDarkMode
                              ? 'bg-blue-900 text-blue-300 border-b-2 border-blue-400'
                              : 'bg-blue-100 text-blue-700 border-b-2 border-blue-500'
                            : isDarkMode
                              ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                        }`}
                      >
                        <Icon size={18} className="mr-2" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Account Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isDarkMode
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                    aria-label="Account settings"
                  >
                    <User size={18} className="mr-2" />
                    <span className="hidden sm:block">{currentUser.name.split(' ')[0]}</span>
                    <ChevronDown size={16} className={`ml-1 transition-transform duration-200 ${showAccountDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {showAccountDropdown && (
                    <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 ${
                      isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                    }`}>
                      <div className="py-1">
                        {/* Username (non-interactive) */}
                        <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                          <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {currentUser.name}
                          </p>
                          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {currentUser.email}
                          </p>
                        </div>

                        {/* Account Settings */}
                        <button
                          onClick={handleAccountSettings}
                          className={`w-full text-left px-4 py-2 text-sm flex items-center transition-colors duration-200 ${
                            isDarkMode
                              ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <Settings size={16} className="mr-3" />
                          Account Settings
                        </button>

                        {/* Divider */}
                        <hr className={`my-1 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`} />

                        {/* Log Out */}
                        <button
                          onClick={handleLogout}
                          className={`w-full text-left px-4 py-2 text-sm flex items-center transition-colors duration-200 ${
                            isDarkMode
                              ? 'text-red-400 hover:bg-red-900 hover:text-red-300'
                              : 'text-red-600 hover:bg-red-50'
                          }`}
                        >
                          <LogOut size={16} className="mr-3" />
                          Log Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;