import jsonServerProvider from 'ra-data-json-server';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const dataProvider = jsonServerProvider(API_URL);

export default dataProvider;