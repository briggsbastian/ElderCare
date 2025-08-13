import React, { useState } from 'react';
import { User, Clock, Lock, Users, Plus, Trash2, Edit3, Save, X, ArrowLeft } from 'lucide-react';

const AccountSettingsPage = ({ isDarkMode, onBack, currentUser, onUpdateUser, elderlyProfiles, onUpdateElderlyProfiles }) => {
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);
  const [showAddProfile, setShowAddProfile] = useState(false);
  
  // Form states
  const [userForm, setUserForm] = useState({
    name: currentUser.name,
    email: currentUser.email,
    timezone: currentUser.timezone || 'Pacific/US'
  });
  
  const [newProfileForm, setNewProfileForm] = useState({
    name: '',
    relationship: '',
    birthDate: '',
    notes: ''
  });
  
  const [editProfileForm, setEditProfileForm] = useState({
    name: '',
    relationship: '',
    birthDate: '',
    notes: ''
  });

  const timezones = [
    { value: 'Pacific/US', label: 'Pacific Time (US)' },
    { value: 'Mountain/US', label: 'Mountain Time (US)' },
    { value: 'Central/US', label: 'Central Time (US)' },
    { value: 'Eastern/US', label: 'Eastern Time (US)' },
    { value: 'Hawaii/US', label: 'Hawaii Time (US)' },
    { value: 'Alaska/US', label: 'Alaska Time (US)' }
  ];

  const relationships = [
    'Parent', 'Grandparent', 'Spouse', 'Relative', 'Friend', 'Client', 'Other'
  ];

  const handleSaveUser = () => {
    onUpdateUser(userForm);
    setIsEditing(false);
  };

  const handleAddProfile = () => {
    if (newProfileForm.name.trim()) {
      const newProfile = {
        id: Date.now().toString(),
        ...newProfileForm,
        createdAt: new Date().toISOString()
      };
      onUpdateElderlyProfiles([...elderlyProfiles, newProfile]);
      setNewProfileForm({ name: '', relationship: '', birthDate: '', notes: '' });
      setShowAddProfile(false);
    }
  };

  const handleEditProfile = (profile) => {
    setEditingProfile(profile.id);
    setEditProfileForm(profile);
  };

  const handleSaveEditProfile = () => {
    const updatedProfiles = elderlyProfiles.map(profile =>
      profile.id === editingProfile ? editProfileForm : profile
    );
    onUpdateElderlyProfiles(updatedProfiles);
    setEditingProfile(null);
  };

  const handleDeleteProfile = (profileId) => {
    if (window.confirm('Are you sure you want to remove this profile? This action cannot be undone.')) {
      const updatedProfiles = elderlyProfiles.filter(profile => profile.id !== profileId);
      onUpdateElderlyProfiles(updatedProfiles);
    }
  };

  const sections = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'elderly', label: 'Elderly Profiles', icon: Users },
    { id: 'security', label: 'Security', icon: Lock }
  ];

  const renderProfileSettings = () => (
    <div className={`rounded-lg shadow-md p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Profile Information
        </h3>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit3 size={16} className="mr-2" />
            Edit
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSaveUser}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save size={16} className="mr-2" />
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setUserForm({ name: currentUser.name, email: currentUser.email, timezone: currentUser.timezone || 'Pacific/US' });
              }}
              className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <X size={16} className="mr-2" />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Full Name
          </label>
          {isEditing ? (
            <input
              type="text"
              value={userForm.name}
              onChange={(e) => setUserForm({...userForm, name: e.target.value})}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            />
          ) : (
            <p className={`px-4 py-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {currentUser.name}
            </p>
          )}
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Email Address
          </label>
          {isEditing ? (
            <input
              type="email"
              value={userForm.email}
              onChange={(e) => setUserForm({...userForm, email: e.target.value})}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            />
          ) : (
            <p className={`px-4 py-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {currentUser.email}
            </p>
          )}
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Timezone
          </label>
          {isEditing ? (
            <select
              value={userForm.timezone}
              onChange={(e) => setUserForm({...userForm, timezone: e.target.value})}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              {timezones.map(tz => (
                <option key={tz.value} value={tz.value}>{tz.label}</option>
              ))}
            </select>
          ) : (
            <p className={`px-4 py-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {timezones.find(tz => tz.value === (currentUser.timezone || 'Pacific/US'))?.label}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const renderElderlyProfiles = () => (
    <div className={`rounded-lg shadow-md p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Elderly Care Profiles
          </h3>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage the elderly individuals you're caring for
          </p>
        </div>
        <button
          onClick={() => setShowAddProfile(true)}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus size={16} className="mr-2" />
          Add Profile
        </button>
      </div>

      {/* Add Profile Form */}
      {showAddProfile && (
        <div className={`mb-6 p-4 border-2 border-dashed rounded-lg ${
          isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'
        }`}>
          <h4 className={`font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Add New Profile
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name *"
              value={newProfileForm.name}
              onChange={(e) => setNewProfileForm({...newProfileForm, name: e.target.value})}
              className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isDarkMode ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' : 'bg-white border-gray-300'
              }`}
            />
            <select
              value={newProfileForm.relationship}
              onChange={(e) => setNewProfileForm({...newProfileForm, relationship: e.target.value})}
              className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isDarkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value="">Select Relationship</option>
              {relationships.map(rel => (
                <option key={rel} value={rel}>{rel}</option>
              ))}
            </select>
            <input
              type="date"
              placeholder="Birth Date"
              value={newProfileForm.birthDate}
              onChange={(e) => setNewProfileForm({...newProfileForm, birthDate: e.target.value})}
              className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isDarkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'
              }`}
            />
            <textarea
              placeholder="Notes (optional)"
              value={newProfileForm.notes}
              onChange={(e) => setNewProfileForm({...newProfileForm, notes: e.target.value})}
              className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isDarkMode ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' : 'bg-white border-gray-300'
              }`}
              rows="2"
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => {
                setShowAddProfile(false);
                setNewProfileForm({ name: '', relationship: '', birthDate: '', notes: '' });
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddProfile}
              disabled={!newProfileForm.name.trim()}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Profile
            </button>
          </div>
        </div>
      )}

      {/* Profiles List */}
      <div className="space-y-4">
        {elderlyProfiles.length === 0 ? (
          <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <Users size={48} className="mx-auto mb-4 opacity-50" />
            <p>No profiles added yet. Create your first profile to get started.</p>
          </div>
        ) : (
          elderlyProfiles.map(profile => (
            <div key={profile.id} className={`border rounded-lg p-4 ${
              isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
            }`}>
              {editingProfile === profile.id ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={editProfileForm.name}
                    onChange={(e) => setEditProfileForm({...editProfileForm, name: e.target.value})}
                    className={`px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDarkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'
                    }`}
                  />
                  <select
                    value={editProfileForm.relationship}
                    onChange={(e) => setEditProfileForm({...editProfileForm, relationship: e.target.value})}
                    className={`px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDarkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'
                    }`}
                  >
                    <option value="">Select Relationship</option>
                    {relationships.map(rel => (
                      <option key={rel} value={rel}>{rel}</option>
                    ))}
                  </select>
                  <input
                    type="date"
                    value={editProfileForm.birthDate}
                    onChange={(e) => setEditProfileForm({...editProfileForm, birthDate: e.target.value})}
                    className={`px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDarkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'
                    }`}
                  />
                  <textarea
                    value={editProfileForm.notes}
                    onChange={(e) => setEditProfileForm({...editProfileForm, notes: e.target.value})}
                    className={`px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDarkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'
                    }`}
                    rows="2"
                    placeholder="Notes"
                  />
                  <div className="col-span-full flex justify-end space-x-2">
                    <button
                      onClick={() => setEditingProfile(null)}
                      className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveEditProfile}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {profile.name}
                    </h4>
                    <div className={`text-sm space-y-1 mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {profile.relationship && <p>Relationship: {profile.relationship}</p>}
                      {profile.birthDate && <p>Birth Date: {profile.birthDate}</p>}
                      {profile.notes && <p>Notes: {profile.notes}</p>}
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEditProfile(profile)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                      title="Edit Profile"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteProfile(profile.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors"
                      title="Delete Profile"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className={`rounded-lg shadow-md p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h3 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Security Settings
      </h3>
      <div className="space-y-6">
        <div>
          <h4 className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Change Password
          </h4>
          <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Update your password to keep your account secure
          </p>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Lock size={16} className="mr-2" />
            Change Password
          </button>
        </div>
        
        <div className={`border-t pt-6 ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
          <h4 className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Account Security
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Two-Factor Authentication</span>
              <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">
                Enable
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Login Notifications</span>
              <button className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors">
                Enabled
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
          className={`mr-4 p-3 rounded-lg transition-colors border ${
            isDarkMode 
              ? 'hover:bg-gray-700 text-gray-300 border-gray-600 hover:border-gray-500' 
              : 'hover:bg-gray-100 text-gray-600 border-gray-300 hover:border-gray-400'
          }`}
          title="Go back to dashboard"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Account Settings
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage your account preferences and elderly care profiles
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <nav className={`rounded-lg shadow-md p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            {sections.map(section => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left mb-2 transition-colors ${
                    activeSection === section.id
                      ? isDarkMode
                        ? 'bg-blue-900 text-blue-300'
                        : 'bg-blue-100 text-blue-700'
                      : isDarkMode
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={18} className="mr-3" />
                  {section.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          {activeSection === 'profile' && renderProfileSettings()}
          {activeSection === 'elderly' && renderElderlyProfiles()}
          {activeSection === 'security' && renderSecuritySettings()}
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsPage;