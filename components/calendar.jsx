import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import 'react-calendar/dist/Calendar.css';

const CalendarPage = ({ isDarkMode }) => {
  const [date, setDate] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());

  // Helper function to get month/year options
  const getMonthYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i); // 2 years back, current, 2 years forward
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    return { years, months };
  };

  const { years, months } = getMonthYearOptions();
  const currentMonth = activeStartDate.getMonth();
  const currentYear = activeStartDate.getFullYear();

  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value);
    const newDate = new Date(currentYear, newMonth, 1);
    setActiveStartDate(newDate);
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value);
    const newDate = new Date(newYear, currentMonth, 1);
    setActiveStartDate(newDate);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const customTileContent = ({ date, view }) => {
    // You can add custom content to tiles here later
    // For example, dots for appointments, etc.
    return null;
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        <CalendarIcon size={32} className="mr-3 text-blue-500" />
        <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Calendar</h2>
      </div>

      {/* Month/Year Selection Bar */}
      <div className={`rounded-lg shadow-md p-6 mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <label className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Month:
            </label>
            <select
              value={currentMonth}
              onChange={handleMonthChange}
              className={`p-2 rounded-lg border text-lg ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-200`}
            >
              {months.map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Year:
            </label>
            <select
              value={currentYear}
              onChange={handleYearChange}
              className={`p-2 rounded-lg border text-lg ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-200`}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => {
              const today = new Date();
              setActiveStartDate(today);
              setDate(today);
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              isDarkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Today
          </button>
        </div>

        {/* Selected Date Display */}
        <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <span className="font-medium">Selected Date: </span>
            {date.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Calendar Component */}
      <div className={`rounded-lg shadow-md p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="calendar-wrapper">
          <Calendar
            onChange={handleDateChange}
            value={date}
            activeStartDate={activeStartDate}
            onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}
            tileContent={customTileContent}
            className={`${isDarkMode ? 'dark-calendar' : 'light-calendar'}`}
            calendarType="gregory"
            locale="en-US"
            navigationLabel={({ date, label, locale, view }) => (
              <span className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {label}
              </span>
            )}
            prevLabel={<ChevronLeft size={20} />}
            nextLabel={<ChevronRight size={20} />}
            prev2Label={null}
            next2Label={null}
          />
        </div>
      </div>

      {/* Future Features Placeholder */}
      <div className={`rounded-lg shadow-md p-6 mt-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Upcoming Features
        </h3>
        <div className={`p-4 rounded-lg border-l-4 border-blue-500 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
          <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <li>• Google Calendar integration</li>
            <li>• Add and view appointments</li>
            <li>• Medication reminders</li>
            <li>• Doctor appointment scheduling</li>
            <li>• Event notifications</li>
          </ul>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .calendar-wrapper .react-calendar {
          width: 100%;
          border: none;
          font-family: inherit;
          font-size: 16px;
          background: transparent;
        }

        .calendar-wrapper .react-calendar__navigation {
          margin-bottom: 1rem;
        }

        .calendar-wrapper .react-calendar__navigation button {
          color: ${isDarkMode ? '#ffffff' : '#374151'};
          background: ${isDarkMode ? '#374151' : '#f3f4f6'};
          border: 1px solid ${isDarkMode ? '#4b5563' : '#d1d5db'};
          padding: 0.5rem 1rem;
          margin: 0 0.25rem;
          border-radius: 0.5rem;
          font-size: 1rem;
          font-weight: 500;
        }

        .calendar-wrapper .react-calendar__navigation button:hover {
          background: ${isDarkMode ? '#4b5563' : '#e5e7eb'};
        }

        .calendar-wrapper .react-calendar__month-view__weekdays {
          text-align: center;
          font-weight: bold;
          color: ${isDarkMode ? '#d1d5db' : '#6b7280'};
          margin-bottom: 0.5rem;
        }

        .calendar-wrapper .react-calendar__tile {
          background: transparent;
          color: ${isDarkMode ? '#ffffff' : '#374151'};
          border: 1px solid ${isDarkMode ? '#4b5563' : '#e5e7eb'};
          padding: 1rem 0.5rem;
          margin: 1px;
          border-radius: 0.25rem;
          font-size: 1rem;
        }

        .calendar-wrapper .react-calendar__tile:hover {
          background: ${isDarkMode ? '#4b5563' : '#f3f4f6'};
        }

        .calendar-wrapper .react-calendar__tile--active {
          background: ${isDarkMode ? '#1d4ed8' : '#3b82f6'} !important;
          color: white !important;
          font-weight: bold;
        }

        .calendar-wrapper .react-calendar__tile--now {
          background: ${isDarkMode ? '#065f46' : '#dcfce7'};
          color: ${isDarkMode ? '#ffffff' : '#166534'};
          font-weight: bold;
        }

        .calendar-wrapper .react-calendar__tile--neighboringMonth {
          color: ${isDarkMode ? '#6b7280' : '#9ca3af'};
        }
      `}</style>
    </div>
  );
};

export default CalendarPage;
