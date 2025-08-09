import { washingtonData } from './washington/index.js';
import { oregonData } from './oregon/index.js';
import { californiaData } from './california/index.js';

export const statesData = {
  'WA': washingtonData,
  'OR': oregonData,
  'CA': californiaData
};

export const getStateData = (stateCode) => {
  return statesData[stateCode] || null;
};

export const getAllStates = () => {
  return Object.keys(statesData).map(code => ({
    code,
    name: statesData[code].name
  })).sort((a, b) => a.name.localeCompare(b.name));
};
