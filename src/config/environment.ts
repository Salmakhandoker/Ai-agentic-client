const rawUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const cleanUrl = rawUrl.replace(/\/+$/, '');
const apiUrl = cleanUrl.endsWith('/api') ? cleanUrl : `${cleanUrl}/api`;

export const config = {
  apiUrl,
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
};
