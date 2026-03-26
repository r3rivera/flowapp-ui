import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import CustomApp from './CustomApp';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CustomApp />
  </StrictMode>,
)
