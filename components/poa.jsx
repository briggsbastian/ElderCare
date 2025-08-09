import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { getStateData, getAllStates } from '../stateData/';;

const PowerOfAttorneyPage = ({ isDarkMode }) => {
  const [selectedState, setSelectedState] = useState('');
  const [stateData, setStateData] = useState(null);
  const allStates = getAllStates();

  useEffect(() => {
    if (selectedState) {
      const data = getStateData(selectedState);
      setStateData(data);
    } else {
      setStateData(null);
    }
  }, [selectedState]);

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        <FileText size={32} className="mr-3 text-green-500" />
        <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Power of Attorney Resources</h2>
      </div>
      
      {/* State Selection */}
      <div className={`rounded-lg shadow-md p-6 mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Select Your State</h3>
        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Power of Attorney laws vary by state. Select your state to see specific resources and requirements.
        </p>
        <select 
          className={`w-full md:w-64 p-3 rounded-lg border text-lg ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600 text-white focus:border-green-400' 
              : 'bg-white border-gray-300 text-gray-900 focus:border-green-500'
          } focus:outline-none focus:ring-2 focus:ring-green-200`}
          value={selectedState}
          onChange={handleStateChange}
        >
          <option value="">Choose a state...</option>
          {allStates.map((state) => (
            <option key={state.code} value={state.code}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      {/* State-Specific Information */}
      {stateData && stateData.powerOfAttorney && (
        <div className={`rounded-lg shadow-md p-6 mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {stateData.name} Specific Information
          </h3>
          
          {/* Requirements */}
          {stateData.powerOfAttorney.requirements && stateData.powerOfAttorney.requirements.length > 0 && (
            <div className="mb-6">
              <h4 className={`font-semibold text-lg mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Requirements in {stateData.name}
              </h4>
              <ul className={`list-disc list-inside space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {stateData.powerOfAttorney.requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Forms */}
          {stateData.powerOfAttorney.forms && stateData.powerOfAttorney.forms.length > 0 && (
            <div className="mb-6">
              <h4 className={`font-semibold text-lg mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Official Forms
              </h4>
              <div className="grid gap-3">
                {stateData.powerOfAttorney.forms.map((form, index) => (
                  <a 
                    key={index}
                    href={form.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 rounded-lg border transition-colors duration-200 hover:shadow-lg ${
                      isDarkMode 
                        ? 'border-gray-600 hover:border-blue-400 hover:bg-gray-700' 
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <h5 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      {form.name}
                    </h5>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {form.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* State Resources */}
          {stateData.powerOfAttorney.resources && stateData.powerOfAttorney.resources.length > 0 && (
            <div>
              <h4 className={`font-semibold text-lg mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {stateData.name} Resources
              </h4>
              <div className="grid gap-3">
                {stateData.powerOfAttorney.resources.map((resource, index) => (
                  <a 
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 rounded-lg border transition-colors duration-200 hover:shadow-lg ${
                      isDarkMode 
                        ? 'border-gray-600 hover:border-green-400 hover:bg-gray-700' 
                        : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                    }`}
                  >
                    <h5 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      {resource.name}
                    </h5>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {resource.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* General Resources */}
      <div className={`rounded-lg shadow-md p-6 mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>General Resources</h3>
        <div className="grid gap-4">
          <div className={`p-4 rounded-lg border-l-4 border-green-500 ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
            <h4 className={`font-semibold text-lg mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              What is Power of Attorney?
            </h4>
            <p className={`mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              A Power of Attorney (POA) is a legal document that allows someone (the "agent" or "attorney-in-fact") 
              to make decisions on behalf of another person (the "principal") when they become unable to do so themselves.
            </p>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <p><strong>Types:</strong> Financial, Healthcare, General, Limited</p>
              <p><strong>When needed:</strong> Incapacity, illness, or inability to make decisions</p>
            </div>
          </div>

          <div className={`p-4 rounded-lg border-l-4 border-blue-500 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
            <h4 className={`font-semibold text-lg mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Steps to Obtain Power of Attorney
            </h4>
            <ol className={`list-decimal list-inside space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>Discuss with your loved one while they can still make decisions</li>
              <li>Determine the type of POA needed (financial, healthcare, or both)</li>
              <li>Choose a trusted agent/attorney-in-fact</li>
              <li>Complete the appropriate legal forms for your state</li>
              <li>Have the document properly witnessed and notarized</li>
              <li>Provide copies to relevant parties (banks, healthcare providers)</li>
            </ol>
          </div>
        </div>
      </div>

      {/* National Resources */}
      <div className={`rounded-lg shadow-md p-6 mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>National Resources</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <a 
            href="https://www.nia.nih.gov/health/legal-and-financial-planning-people-alzheimers-disease"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-4 rounded-lg border transition-colors duration-200 hover:shadow-lg ${
              isDarkMode 
                ? 'border-gray-600 hover:border-green-400 hover:bg-gray-700' 
                : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
            }`}
          >
            <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              National Institute on Aging
            </h4>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Comprehensive guide to legal and financial planning for older adults
            </p>
          </a>

          <a 
            href="https://www.americanbar.org/groups/real_property_trust_estate/resources/estate_planning/"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-4 rounded-lg border transition-colors duration-200 hover:shadow-lg ${
              isDarkMode 
                ? 'border-gray-600 hover:border-green-400 hover:bg-gray-700' 
                : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
            }`}
          >
            <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              American Bar Association
            </h4>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Legal resources and state-specific POA information
            </p>
          </a>

          <a 
            href="https://www.naela.org/"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-4 rounded-lg border transition-colors duration-200 hover:shadow-lg ${
              isDarkMode 
                ? 'border-gray-600 hover:border-green-400 hover:bg-gray-700' 
                : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
            }`}
          >
            <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Elder Law Attorney Directory
            </h4>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Find qualified attorneys specializing in elder law in your area
            </p>
          </a>

          <a 
            href="https://www.cms.gov/Medicare/Medicare-General-Information/MedicareApprovedFacilitie"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-4 rounded-lg border transition-colors duration-200 hover:shadow-lg ${
              isDarkMode 
                ? 'border-gray-600 hover:border-green-400 hover:bg-gray-700' 
                : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
            }`}
          >
            <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Medicare Resources
            </h4>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Healthcare power of attorney information and resources
            </p>
          </a>
        </div>
      </div>

      {/* Warning/Important Note */}
      <div className={`rounded-lg shadow-md p-6 border-l-4 border-yellow-500 ${isDarkMode ? 'bg-gray-800' : 'bg-yellow-50'}`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-500 mt-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Important Legal Notice</h4>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              This information is for educational purposes only and does not constitute legal advice. 
              Laws vary by state and individual circumstances. Always consult with a qualified attorney 
              before making important legal decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerOfAttorneyPage;
