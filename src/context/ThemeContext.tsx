import React, { createContext, useState } from 'react';

interface ThemeState {
    theme: string;
    setTheme: (value: string) => void;
}

interface ThemeProvider {
    children: React.ReactNode
}

const initialState: ThemeState = {
    theme: localStorage.getItem('theme') || 'light',
    setTheme: () => { }
};

const ThemeContext = createContext(initialState);

const ThemeProvider: React.FC<ThemeProvider> = ({ children }) => {
    const [theme, setTheme] = useState<string>(initialState.theme);

    const updateTheme = (value: string) => {
        setTheme(value);
    };

    const contextValue: ThemeState = {
        theme,
        setTheme: updateTheme
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeProvider, ThemeContext };
