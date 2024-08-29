import * as React from 'react';

interface AuthProviderProps {
    children: React.ReactNode;
}

const MainContainer: React.FC<AuthProviderProps> = ({ children }) => {
    return (
        <div className="mt-24">
            {children}
        </div>
    );

}
export default MainContainer;
