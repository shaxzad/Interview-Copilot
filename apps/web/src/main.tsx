import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthClient, createMemoryStorage } from '@company/auth-client';
import { AuthProvider } from '@company/auth-react';
import App from './App';
import './index.css';

const authClient = new AuthClient({
  baseUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/v1',
  clientId: 'interview-copilot-web',
  storage: createMemoryStorage(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider client={authClient}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
