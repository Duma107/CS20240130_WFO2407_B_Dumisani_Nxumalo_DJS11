import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ShowDetailPage } from './pages/ShowDetailPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { Header } from './components/Header';
import { AudioPlayer } from './components/AudioPlayer';
import { useThemeStore } from './store/themeStore';

/**
 * Root component of the application.
 * Handles routing and global theme management.
 * Includes persistent audio player and header across all routes.
 */
function App() {
  const { isDarkMode } = useThemeStore();

  // Apply dark mode class to root HTML element when theme changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <BrowserRouter>
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
        <Header />
        <main className="pb-24">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/show/:id" element={<ShowDetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </main>
        <AudioPlayer />
      </div>
    </BrowserRouter>
  );
}

export default App;