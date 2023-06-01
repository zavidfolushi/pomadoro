import React, { createContext, useState } from 'react';

interface NotificationState {
    notification: boolean;
    setNotification: (value: boolean) => void;
}

interface NotificationProviderProps {
    children: React.ReactNode;
}

const initialState: NotificationState = {
    notification: false,
    setNotification: () => { },
};

export const NotificationContext = createContext(initialState);

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
    const [notification, setNotification] = useState<boolean>(initialState.notification);

    const updateNotification = (value: boolean) => {
        setNotification(value);
    };

    const contextValue: NotificationState = {
        notification,
        setNotification: updateNotification,
    };

    return <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>;
};
