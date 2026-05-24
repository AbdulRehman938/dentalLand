import React, { createContext, useContext, useState } from 'react';

export type Screen = 'home' | 'services' | 'clinic' | 'dentists' | 'news';

interface NavigationContextType {
  currentScreen: Screen;
  navigate: (screen: Screen) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
    // Instantly scroll to the top of the page on screen change
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <NavigationContext.Provider value={{ currentScreen, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
