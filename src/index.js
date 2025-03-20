import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './css/fonts.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GlobalStyles, ThemeProvider } from '@mui/material';
import customTheme from './component/main/ColorImplementation/customTheme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyles
      styles={{
        '[class*="Mui"]': { fontFamily: `'Rubik', sans-serif !important` },
      }}
    />
    <ThemeProvider theme={customTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
