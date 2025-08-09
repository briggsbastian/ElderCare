export const californiaData = {
  name: 'California',
  abbreviation: 'CA',
  powerOfAttorney: {
    forms: [
      {
        name: 'California Uniform Statutory Form Power of Attorney',
        url: 'https://oag.ca.gov/consumers/general/poa',
        description: 'Official California POA form from the Attorney General'
      }
    ],
    requirements: [
      'Must be signed by principal while mentally competent',
      'Must be notarized or witnessed by two witnesses',
      'Agent must sign acknowledgment of responsibilities',
      'Effective immediately unless specified otherwise'
    ],
    resources: [
      {
        name: 'California Department of Justice',
        url: 'https://oag.ca.gov/consumers/general/poa',
        description: 'State-specific POA legal guidance'
      },
      {
        name: 'California Courts Self-Help',
        url: 'https://www.courts.ca.gov/selfhelp-conservatorship.htm',
        description: 'Conservatorship and guardianship information'
      }
    ]
  },
  trusts: {
    // Will be populated later
  },
  healthcare: {
    // Will be populated later
  }
};
