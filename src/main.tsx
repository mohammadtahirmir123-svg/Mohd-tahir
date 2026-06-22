import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { seedBaselinePortfolioContent } from './lib/offlineDb.ts';
import './index.css';

// Initialize offline databases and register Service Workers
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => {
        console.log('⚡ [Service Worker] Registration accomplished with scope:', reg.scope);
      })
      .catch((err) => {
        console.error('❌ [Service Worker] Registration failed:', err);
      });
  });
}

// Seed latest textual assets to indexedDB immediately on start
seedBaselinePortfolioContent()
  .then((success) => {
    if (success) {
      console.log('⚡ [IndexedDB Cache] Online state synced with local storage successfully.');
    }
  })
  .catch((err) => console.warn('[IndexedDB Cache] Initial validation skipped:', err));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);

