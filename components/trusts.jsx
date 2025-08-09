import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { getStateData, getAllStates } from '../stateData/';

const TrustsPage = ({ isDarkMode }) => {
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
        <Heart size={32} className="mr-3 text-purple-500" />
        <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Trusts & Estate Planning</h2>
      </div>
      
      {/* State Selection */}
      <div className={`rounded-lg shadow-md p-6 mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Select Your State</h3>
        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Estate planning laws, probate procedures, and trust requirements vary by state. Select your state for specific guidance.
        </p>
        <select 
          className={`w-full md:w-64 p-3 rounded-lg border text-lg ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-400' 
              : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'
          } focus:outline-none focus:ring-2 focus:ring-purple-200`}
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
      {stateData && stateData.trusts && (
        <div className={`rounded-lg shadow-md p-6 mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {stateData.name} Estate Planning Information
          </h3>
          
          {/* Requirements */}
          {stateData.trusts.requirements && stateData.trusts.requirements.length > 0 && (
            <div className="mb-6">
              <h4 className={`font-semibold text-lg mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Requirements in {stateData.name}
              </h4>
              <ul className={`list-disc list-inside space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {stateData.trusts.requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Forms */}
          {stateData.trusts.forms && stateData.trusts.forms.length > 0 && (
            <div className="mb-6">
              <h4 className={`font-semibold text-lg mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Official Forms & Documents
              </h4>
              <div className="grid gap-3">
                {stateData.trusts.forms.map((form, index) => (
                  <a 
                    key={index}
                    href={form.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 rounded-lg border transition-colors duration-200 hover:shadow-lg ${
                      isDarkMode 
                        ? 'border-gray-600 hover:border-purple-400 hover:bg-gray-700' 
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
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
          {stateData.trusts.resources && stateData.trusts.resources.length > 0 && (
            <div>
              <h4 className={`font-semibold text-lg mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {stateData.name} Resources
              </h4>
              <div className="grid gap-3">
                {stateData.trusts.resources.map((resource, index) => (
                  <a 
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 rounded-lg border transition-colors duration-200 hover:shadow-lg ${
                      isDarkMode 
                        ? 'border-gray-600 hover:border-purple-400 hover:bg-gray-700' 
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
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

      {/* General Information */}
      <div className={`rounded-lg shadow-md p-6 mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Estate Planning Basics</h3>
        <div className="grid gap-4">
          <div className={`p-4 rounded-lg border-l-4 border-purple-500 ${isDarkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
            <h4 className={`font-semibold text-lg mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              What is a Trust?
            </h4>
            <p className={`mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              A trust is a legal arrangement where one party (trustee) holds and manages assets for the benefit of another party (beneficiary). 
              Trusts can help avoid probate, minimize taxes, and provide ongoing management of assets.
            </p>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <p><strong>Types:</strong> Revocable Living Trust, Irrevocable Trust, Special Needs Trust</p>
              <p><strong>Benefits:</strong> Avoid probate, privacy, tax planning, asset protection</p>
            </div>
          </div>

          <div className={`p-4 rounded-lg border-l-4 border-blue-500 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
            <h4 className={`font-semibold text-lg mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Essential Estate Planning Documents
            </h4>
            <ul className={`list-disc list-inside space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li><strong>Last Will & Testament</strong> - Directs asset distribution and names guardians</li>
              <li><strong>Revocable Living Trust</strong> - Manages assets during lifetime and after death</li>
              <li><strong>Financial Power of Attorney</strong> - Authorizes financial decisions if incapacitated</li>
              <li><strong>Healthcare Power of Attorney</strong> - Authorizes medical decisions</li>
              <li><strong>Living Will/Advance Directive</strong> - States end-of-life care preferences</li>
              <li><strong>Beneficiary Designations</strong> - Updates on retirement accounts and insurance</li>
            </ul>
          </div>

          <div className={`p-4 rounded-lg border-l-4 border-green-500 ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
            <h4 className={`font-semibold text-lg mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Steps to Create an Estate Plan
            </h4>
            <ol className={`list-decimal list-inside space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>Take inventory of all assets and debts</li>
              <li>Consider your family situation and goals</li>
              <li>Decide between will-based or trust-based plan</li>
              <li>Choose trustees, executors, and guardians</li>
              <li>Draft necessary documents with qualified attorney</li>
              <li>Fund the trust (if applicable) and update beneficiaries</li>
              <li>Review and update plan regularly</li>
            </ol>
          </div>
        </div>
      </div>

      {/* National Resources */}
      <div className={`rounded-lg shadow-md p-6 mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>National Resources</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <a 
            href="https://www.americanbar.org/groups/real_property_trust_estate/resources/estate_planning/"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-4 rounded-lg border transition-colors duration-200 hover:shadow-lg ${
              isDarkMode 
                ? 'border-gray-600 hover:border-purple-400 hover:bg-gray-700' 
                : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
            }`}
          >
            <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              American Bar Association
            </h4>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Comprehensive estate planning resources and attorney directory
            </p>
          </a>

          <a 
            href="https://www.nolo.com/legal-encyclopedia/wills-trusts"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-4 rounded-lg border transition-colors duration-200 hover:shadow-lg ${
              isDarkMode 
                ? 'border-gray-600 hover:border-purple-400 hover:bg-gray-700' 
                : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
            }`}
          >
            <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Nolo Legal Encyclopedia
            </h4>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Free legal information about wills, trusts, and estate planning
            </p>
          </a>

          <a 
            href="https://www.irs.gov/businesses/small-businesses-self-employed/estate-and-gift-taxes"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-4 rounded-lg border transition-colors duration-200 hover:shadow-lg ${
              isDarkMode 
                ? 'border-gray-600 hover:border-purple-400 hover:bg-gray-700' 
                : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
            }`}
          >
            <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              IRS Estate & Gift Tax Info
            </h4>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Federal tax implications and requirements for estate planning
            </p>
          </a>

          <a 
            href="https://www.actec.org/"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-4 rounded-lg border transition-colors duration-200 hover:shadow-lg ${
              isDarkMode 
                ? 'border-gray-600 hover:border-purple-400 hover:bg-gray-700' 
                : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
            }`}
          >
            <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              ACTEC (Estate Planning Attorneys)
            </h4>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Find qualified estate planning attorneys and educational resources
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
              This information is for educational purposes only and does not constitute legal or tax advice. 
              Estate planning involves complex legal and tax considerations that vary by state and individual circumstances. 
              Always consult with qualified estate planning attorneys and tax professionals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustsPage;
