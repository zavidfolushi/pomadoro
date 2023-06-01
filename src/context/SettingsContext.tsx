import React, { createContext, useState } from 'react';

interface SettingsState {
    focusMinutes: number;
    shortBreakMinutes: number;
    longBreakMinutes: number;
    mainMode: string;
    setFucusMinutes: (value: number) => void;
    setShortBreakMinutes: (value: number) => void;
    setLongBreakMinutes: (value: number) => void;
    setMainMode: (value: string) => void;
}
interface SettingsProvider {
    children: React.ReactNode
}
const initialState: SettingsState = {
    focusMinutes: 45,
    shortBreakMinutes: 5,
    longBreakMinutes: 25,
    mainMode: 'focus',
    setFucusMinutes: () => { },
    setShortBreakMinutes: () => { },
    setLongBreakMinutes: () => { },
    setMainMode: () => { }
};

const SettingsContext = createContext(initialState);

const SettingsProvider: React.FC<SettingsProvider> = ({ children }) => {
    const [focusMinutes, setFocusMinutes] = useState<number>(
        initialState.focusMinutes
    );
    const [shortBreakMinutes, setShortBreakMinutes] = useState<number>(
        initialState.shortBreakMinutes
    );
    const [longBreakMinutes, setLongBreakMinutes] = useState<number>(
        initialState.longBreakMinutes
    );
    const [mainMode, setMainMode] = useState<string>(initialState.mainMode);

    const updateFocusMinutes = (value: number) => {
        setFocusMinutes(value);
    };

    const updateShortBreakMinutes = (value: number) => {
        setShortBreakMinutes(value);
    };

    const updateLongBreakMinutes = (value: number) => {
        setLongBreakMinutes(value);
    };

    const updateMainMode = (value: string) => {
        setMainMode(value);
    };

    const contextValue: SettingsState = {
        focusMinutes,
        shortBreakMinutes,
        longBreakMinutes,
        mainMode,
        setFucusMinutes: updateFocusMinutes,
        setShortBreakMinutes: updateShortBreakMinutes,
        setLongBreakMinutes: updateLongBreakMinutes,
        setMainMode: updateMainMode
    };

    return (
        <SettingsContext.Provider value={contextValue}>
            {children}
        </SettingsContext.Provider>
    );
};

export { SettingsProvider, SettingsContext };
