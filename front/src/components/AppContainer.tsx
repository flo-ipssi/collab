import * as React from 'react';

interface AuthProviderProps {
    children: React.ReactNode;
}

const AppContainer: React.FC<AuthProviderProps> = ({ children }) => {
    return (
        <main className="flex flex-col min-h-dvh  bg-custom">
            {children}
        </main>
    );

}
export default AppContainer;
