import React, { useContext, useEffect } from 'react';
import './App.scss';
import Timer from './components/Timer/Timer';
import { SettingsProvider } from './context/SettingsContext';
import { ThemeContext, ThemeProvider } from './context/ThemeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NotificationProvider } from './context/NotificationContext';

const App = () => {
  const { theme } = useContext(ThemeContext)
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [])

  return (
    <SettingsProvider>
      <ThemeProvider>
        <NotificationProvider>
          <Timer />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </NotificationProvider>
      </ThemeProvider>
    </SettingsProvider>

  );
};

export default App;