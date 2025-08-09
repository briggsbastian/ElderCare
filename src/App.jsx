import React, { useState } from 'react';
import { Calendar, FileText, Heart, Clock, Sun, Moon } from 'lucide-react';
import PowerOfAttorneyPage from '../components/poa.jsx';
import TrustsPage from '../components/trusts.jsx';
import CalendarPage from '../components/calendar.jsx';

const App = () => {
  const [activeTab, setActiveTab] = useState('calendar');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const tabs = [
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'poa', label: 'Power of Attorney', icon: FileText },
    { id: 'trusts', label: 'Trusts & Estate', icon: Heart },
    { id: 'doctor', label: 'Doctor Appointments', icon: Clock }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'calendar':
        return (
          <CalendarPage isDarkMode={isDarkMode} />
        );
      case 'poa':
        return <PowerOfAttorneyPage isDarkMode={isDarkMode} />;
      case 'trusts':
        return (
          <TrustsPage isDarkMode={isDarkMode} />
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

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Top Navigation Bar */}
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
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
