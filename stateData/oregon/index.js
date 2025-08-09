export const oregonData = {
  name: 'Oregon',
  abbreviation: 'OR',
  powerOfAttorney: {
    forms: [
      {
        name: 'Oregon Statutory Power of Attorney Form',
        url: 'https://www.oregonlaws.org/ors/127.005',
        description: 'Official Oregon statutory power of attorney form as defined in ORS 127.005'
      },
      {
        name: 'Oregon Advance Directive',
        url: 'https://www.oregon.gov/oha/ph/providerpartnerresources/emsttraumasystems/pages/advance-directives.aspx',
        description: 'Combined healthcare power of attorney and living will form'
      }
    ],
    requirements: [
      'Principal must be at least 18 years old and mentally competent',
      'Must be signed by principal in presence of notary public or two witnesses',
      'Witnesses cannot be related to principal or named as agent',
      'Agent must be at least 18 years old',
      'Document becomes effective when signed unless otherwise specified',
      'Agent must keep records of all transactions made on behalf of principal'
    ],
    resources: [
      {
        name: 'Oregon State Bar',
        url: 'https://www.osbar.org/',
        description: 'Legal resources and certified attorney referral service'
      },
      {
        name: 'Oregon Department of Human Services - Aging and Disability',
        url: 'https://www.oregon.gov/dhs/seniors-disabilities/pages/index.aspx',
        description: 'State resources for seniors and disability services'
      },
      {
        name: 'Oregon Health Authority - Advance Directives',
        url: 'https://www.oregon.gov/oha/ph/providerpartnerresources/emstraulmasystems/pages/advance-directives.aspx',
        description: 'Healthcare decision-making and advance directive information'
      },
      {
        name: 'Legal Aid Services of Oregon',
        url: 'https://lasoregon.org/',
        description: 'Free legal assistance for low-income Oregonians, including elder law'
      }
    ]
  },
  trusts: {
    // Will be populated later when building trusts component
  },
  healthcare: {
    // Will be populated later when building healthcare component
  }
};
