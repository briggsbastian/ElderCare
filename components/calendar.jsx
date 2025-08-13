import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, X, Clock, MapPin, Edit, Trash2 } from 'lucide-react';
import 'react-calendar/dist/Calendar.css';

const CalendarPage = ({ isDarkMode, elderlyProfiles = [], selectedProfile = 'all', setSelectedProfile }) => {
  const [date, setDate] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [events, setEvents] = useState([
    // Sample events with profile assignments
    {
      id: 1,
      title: "Doctor Appointment",
      date: new Date().toDateString(),
      time: "10:00 AM",
      location: "Medical Center",
      type: "medical",
      description: "Annual checkup",
      profileId: 1 // Margaret Smith
    },
    {
      id: 2,
      title: "Blood Pressure Medication",
      date: new Date(Date.now() + 86400000).toDateString(),
      time: "8:00 AM",
      location: "",
      type: "medication",
      description: "Take morning medication",
      profileId: 1 // Margaret Smith
    },
    {
      id: 3,
      title: "Physical Therapy",
      date: new Date(Date.now() + 172800000).toDateString(),
      time: "2:00 PM",
      location: "Rehab Center",
      type: "medical",
      description: "Weekly PT session",
      profileId: 2 // Robert Johnson
    }
  ]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    type: 'appointment',
    description: '',
    profileId: elderlyProfiles.length > 0 ? elderlyProfiles[0].id : null,
    // Medication reminder fields
    isRecurring: false,
    frequency: 'daily', // daily, weekly, monthly
    duration: 30, // days
    times: ['08:00'] // array of times for medication
  });

  // Helper function to get month/year options
  const getMonthYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);
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
    setNewEvent(prev => ({
      ...prev,
      date: newDate.toDateString()
    }));
  };

  const getEventsForDate = (checkDate) => {
    const dateEvents = events.filter(event => event.date === checkDate.toDateString());
    
    // Filter by selected profile
    if (selectedProfile === 'all') {
      return dateEvents;
    } else {
      return dateEvents.filter(event => event.profileId === parseInt(selectedProfile));
    }
  };

  const customTileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayEvents = getEventsForDate(date);
      if (dayEvents.length > 0) {
        return (
          <div className="flex flex-wrap gap-1 mt-1">
            {dayEvents.slice(0, 2).map((event, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  event.type === 'medical' ? 'bg-red-500' :
                  event.type === 'medication' ? 'bg-green-500' :
                  'bg-blue-500'
                }`}
                title={event.title}
              />
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs font-bold text-blue-600">
                +{dayEvents.length - 2}
              </div>
            )}
          </div>
        );
      }
    }
    return null;
  };

  const openEventModal = (eventToEdit = null) => {
    if (eventToEdit) {
      setEditingEvent(eventToEdit);
      setNewEvent({
        title: eventToEdit.title,
        date: eventToEdit.date,
        time: eventToEdit.time,
        location: eventToEdit.location,
        type: eventToEdit.type,
        description: eventToEdit.description,
        profileId: eventToEdit.profileId,
        isRecurring: eventToEdit.isRecurring || false,
        frequency: eventToEdit.frequency || 'daily',
        duration: eventToEdit.duration || 30,
        times: eventToEdit.times || [eventToEdit.time]
      });
    } else {
      setEditingEvent(null);
      setNewEvent({
        title: '',
        date: date.toDateString(),
        time: '',
        location: '',
        type: 'appointment',
        description: '',
        profileId: elderlyProfiles.length > 0 ? elderlyProfiles[0].id : null,
        isRecurring: false,
        frequency: 'daily',
        duration: 30,
        times: ['08:00']
      });
    }
    setShowEventModal(true);
  };

  const closeEventModal = () => {
    setShowEventModal(false);
    setEditingEvent(null);
    setNewEvent({
      title: '',
      date: '',
      time: '',
      location: '',
      type: 'appointment',
      description: '',
      profileId: elderlyProfiles.length > 0 ? elderlyProfiles[0].id : null,
      isRecurring: false,
      frequency: 'daily',
      duration: 30,
      times: ['08:00']
    });
  };

  const saveEvent = () => {
    if (!newEvent.title) {
      alert('Please enter a title for the event');
      return;
    }

    // For medication reminders with recurring option
    if (newEvent.type === 'medication' && newEvent.isRecurring) {
      if (newEvent.times.length === 0 || newEvent.times.some(time => !time)) {
        alert('Please specify at least one time for the medication');
        return;
      }

      const startDate = new Date(newEvent.date || date.toDateString());
      const newEvents = [];

      // Generate recurring events
      for (let day = 0; day < newEvent.duration; day++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + day);

        newEvent.times.forEach((time, timeIndex) => {
          newEvents.push({
            id: editingEvent ? `${editingEvent.id}-${day}-${timeIndex}` : `${Date.now()}-${day}-${timeIndex}`,
            title: newEvent.title,
            date: currentDate.toDateString(),
            time: time,
            location: newEvent.location,
            type: newEvent.type,
            description: newEvent.description,
            isRecurring: true,
            parentId: editingEvent ? editingEvent.id : Date.now()
          });
        });
      }

      if (editingEvent && editingEvent.isRecurring) {
        // Remove all old recurring events with same parentId
        setEvents(prev => prev.filter(event => 
          !(event.isRecurring && event.parentId === editingEvent.parentId)
        ));
      }

      // Add all new recurring events
      setEvents(prev => [...prev, ...newEvents]);
    } else {
      // Regular single event
      if (!newEvent.date || !newEvent.time) {
        alert('Please fill in all required fields (Date, Time)');
        return;
      }

      if (editingEvent) {
        setEvents(prev => prev.map(event => 
          event.id === editingEvent.id 
            ? { ...newEvent, id: editingEvent.id }
            : event
        ));
      } else {
        setEvents(prev => [...prev, {
          ...newEvent,
          id: Date.now()
        }]);
      }
    }
    
    closeEventModal();
  };

  const deleteEvent = (eventId) => {
    const eventToDelete = events.find(e => e.id === eventId);
    
    if (eventToDelete && eventToDelete.isRecurring) {
      const message = 'This is a recurring medication reminder. Do you want to delete:\n\n' +
                     '• Just this occurrence (click Cancel, then delete individual)\n' +
                     '• All occurrences of this medication (click OK)';
      
      if (window.confirm(message)) {
        // Delete all events with same parentId
        setEvents(prev => prev.filter(event => 
          !(event.isRecurring && event.parentId === eventToDelete.parentId)
        ));
      }
    } else {
      if (window.confirm('Are you sure you want to delete this event?')) {
        setEvents(prev => prev.filter(event => event.id !== eventId));
      }
    }
  };

  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'medical': 
        return isDarkMode 
          ? 'bg-red-800 border-red-600 text-red-200' 
          : 'bg-red-100 border-red-300 text-red-800';
      case 'medication': 
        return isDarkMode 
          ? 'bg-green-800 border-green-600 text-green-200' 
          : 'bg-green-100 border-green-300 text-green-800';
      default: 
        return isDarkMode 
          ? 'bg-blue-800 border-blue-600 text-blue-200' 
          : 'bg-blue-100 border-blue-300 text-blue-800';
    }
  };

  const selectedDateEvents = getEventsForDate(date);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <CalendarIcon size={32} className="mr-3 text-blue-500" />
          <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Calendar
          </h2>
        </div>
        <button
          onClick={() => openEventModal()}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            isDarkMode
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          <Plus size={20} />
          Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Section */}
        <div className="lg:col-span-2">
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
        </div>

        {/* Upcoming Events Panel */}
        <div className="lg:col-span-1">
          <div className={`rounded-lg shadow-md p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Upcoming Events
              </h3>
              <button
                onClick={() => openEventModal()}
                className={`text-sm underline ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
              >
                Add Event
              </button>
            </div>
            
            <div className="space-y-3 max-h-[calc(100vh-400px)] overflow-y-auto">
              {(() => {
                // Get all events from today onwards, sorted by date and time
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                let upcomingEvents = events
                  .filter(event => {
                    const eventDate = new Date(event.date);
                    eventDate.setHours(0, 0, 0, 0);
                    return eventDate >= today;
                  });

                // Filter by selected profile
                if (selectedProfile !== 'all') {
                  upcomingEvents = upcomingEvents.filter(event => 
                    event.profileId === parseInt(selectedProfile)
                  );
                }

                upcomingEvents = upcomingEvents
                  .sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    if (dateA.getTime() === dateB.getTime()) {
                      return a.time.localeCompare(b.time);
                    }
                    return dateA - dateB;
                  })
                  .slice(0, 10); // Show only next 10 events
                
                if (upcomingEvents.length === 0) {
                  return (
                    <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <p>No upcoming events scheduled</p>
                      {selectedProfile !== 'all' && (
                        <p className="text-sm mt-1">
                          for {elderlyProfiles.find(p => p.id === parseInt(selectedProfile))?.name}
                        </p>
                      )}
                    </div>
                  );
                }
                
                return upcomingEvents.map((event) => {
                  const eventDate = new Date(event.date);
                  const isToday = eventDate.toDateString() === new Date().toDateString();
                  const isTomorrow = eventDate.toDateString() === new Date(Date.now() + 86400000).toDateString();
                  const profile = elderlyProfiles.find(p => p.id === event.profileId);
                  
                  let dateLabel;
                  if (isToday) {
                    dateLabel = 'Today';
                  } else if (isTomorrow) {
                    dateLabel = 'Tomorrow';
                  } else {
                    dateLabel = eventDate.toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: eventDate.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
                    });
                  }
                  
                  return (
                    <div
                      key={event.id}
                      className={`p-3 rounded-lg border ${getEventTypeColor(event.type)}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm truncate">
                            {event.title}
                          </h4>
                          <div className={`text-xs mt-1 space-y-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            <p>{dateLabel}</p>
                            {profile && selectedProfile === 'all' && (
                              <p className="font-medium">{profile.name}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1 ml-2">
                          <button
                            onClick={() => openEventModal(event)}
                            className={`p-1 rounded opacity-70 hover:opacity-100 ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
                            title="Edit event"
                          >
                            <Edit size={12} />
                          </button>
                          <button
                            onClick={() => deleteEvent(event.id)}
                            className={`p-1 rounded opacity-70 hover:opacity-100 ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
                            title="Delete event"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                      <div className="text-sm space-y-1">
                        <div className="flex items-center gap-1">
                          <Clock size={10} />
                          <span className="text-xs">{formatTime(event.time) || event.time}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-1">
                            <MapPin size={10} />
                            <span className="text-xs truncate">{event.location}</span>
                          </div>
                        )}
                        {event.description && (
                          <p className="mt-1 text-xs opacity-80 line-clamp-2">{event.description}</p>
                        )}
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {editingEvent ? 'Edit Event' : 'Add New Event'}
                </h3>
                <button
                  onClick={closeEventModal}
                  className={`p-1 rounded ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                    Title *
                  </label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                    className={`w-full p-3 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-200`}
                    placeholder="Event title"
                  />
                </div>

                {/* Care Profile Selection */}
                {elderlyProfiles.length > 0 && (
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                      Care Profile *
                    </label>
                    <select
                      value={newEvent.profileId || ''}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, profileId: parseInt(e.target.value) }))}
                      className={`w-full p-3 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-blue-200`}
                    >
                      <option value="">Select care profile</option>
                      {elderlyProfiles.map((profile) => (
                        <option key={profile.id} value={profile.id}>
                          {profile.name} ({profile.relationship})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                    Type
                  </label>
                  <select
                    value={newEvent.type}
                    onChange={(e) => {
                      const newType = e.target.value;
                      setNewEvent(prev => ({ 
                        ...prev, 
                        type: newType,
                        isRecurring: newType === 'medication' ? prev.isRecurring : false
                      }));
                    }}
                    className={`w-full p-3 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-200`}
                  >
                    <option value="appointment">Appointment</option>
                    <option value="medical">Medical</option>
                    <option value="medication">Medication</option>
                  </select>
                </div>

                {/* Recurring medication options */}
                {newEvent.type === 'medication' && (
                  <div className={`p-4 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-blue-50 border-blue-200'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <input
                        type="checkbox"
                        id="isRecurring"
                        checked={newEvent.isRecurring}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, isRecurring: e.target.checked }))}
                        className="rounded"
                      />
                      <label htmlFor="isRecurring" className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                        Recurring medication reminder
                      </label>
                    </div>
                    
                    {newEvent.isRecurring && (
                      <div className="space-y-3">
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                            Duration (days)
                          </label>
                          <input
                            type="number"
                            value={newEvent.duration}
                            onChange={(e) => setNewEvent(prev => ({ ...prev, duration: parseInt(e.target.value) || 30 }))}
                            min="1"
                            max="365"
                            className={`w-full p-2 rounded border text-sm ${
                              isDarkMode 
                                ? 'bg-gray-600 border-gray-500 text-white' 
                                : 'bg-white border-gray-300 text-gray-900'
                            } focus:outline-none focus:ring-1 focus:ring-blue-200`}
                          />
                        </div>
                        
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                            Times per day
                          </label>
                          <div className="space-y-2">
                            {newEvent.times.map((time, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <input
                                  type="time"
                                  value={time}
                                  onChange={(e) => {
                                    const newTimes = [...newEvent.times];
                                    newTimes[index] = e.target.value;
                                    setNewEvent(prev => ({ ...prev, times: newTimes }));
                                  }}
                                  className={`flex-1 p-2 rounded border text-sm ${
                                    isDarkMode 
                                      ? 'bg-gray-600 border-gray-500 text-white' 
                                      : 'bg-white border-gray-300 text-gray-900'
                                  } focus:outline-none focus:ring-1 focus:ring-blue-200`}
                                />
                                {newEvent.times.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newTimes = newEvent.times.filter((_, i) => i !== index);
                                      setNewEvent(prev => ({ ...prev, times: newTimes }));
                                    }}
                                    className={`p-2 rounded text-red-500 hover:bg-red-100 ${isDarkMode ? 'hover:bg-red-900' : ''}`}
                                  >
                                    <X size={14} />
                                  </button>
                                )}
                              </div>
                            ))}
                            {newEvent.times.length < 4 && (
                              <button
                                type="button"
                                onClick={() => {
                                  setNewEvent(prev => ({ ...prev, times: [...prev.times, '12:00'] }));
                                }}
                                className={`text-sm px-3 py-1 rounded border border-dashed ${
                                  isDarkMode 
                                    ? 'border-gray-500 text-gray-300 hover:bg-gray-600' 
                                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                                }`}
                              >
                                + Add time
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Regular time field for non-recurring or non-medication events */}
                {!(newEvent.type === 'medication' && newEvent.isRecurring) && (
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                      Time *
                    </label>
                    <input
                      type="time"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                      className={`w-full p-3 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-blue-200`}
                    />
                  </div>
                )}

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                    Location
                  </label>
                  <input
                    type="text"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                    className={`w-full p-3 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-200`}
                    placeholder="Event location"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                    Description
                  </label>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                    className={`w-full p-3 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-200`}
                    rows={3}
                    placeholder="Event description"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={saveEvent}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                    isDarkMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  {editingEvent ? 'Update Event' : 'Add Event'}
                </button>
                <button
                  onClick={closeEventModal}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors duration-200 border ${
                    isDarkMode
                      ? 'border-gray-600 bg-gray-700 hover:bg-gray-600 text-white'
                      : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
          position: relative;
          height: 80px;
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