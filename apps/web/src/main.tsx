import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, AppWrapper } from '@companyio/platform-ui';
import './index.css';
import 'swiper/css/bundle';
import 'flatpickr/dist/flatpickr.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AppWrapper>
        <App />
      </AppWrapper>
    </ThemeProvider>
  </StrictMode>
);
