import React from 'react';
import '../assets/styles/common.css';

import logo from '../assets/images/osue-logo.png';


interface HeaderProps {
    isLogin: boolean;
    onLoginClick?: () => void;
    onLogoutClick?: () => void;
}


const Header: React.FC<HeaderProps> = ({ isLogin, onLoginClick, onLogoutClick}) => {
    return (
        <header className="app-header">
            <div className="header-contents">
                <div className="header-left">
                    <div className="app-title">
                        <img src={ logo }
                            alt="osue"
                            style={{ height: '100px' }}
                        />
                    </div>
                </div>
                <div className="header-right">
                    {
                        isLogin ? (
                            <>
                                <span>My page</span>
                                <button className="logout-button" onClick={onLogoutClick}>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <button className="login-button" onClick={onLoginClick}>
                                Login
                            </button>
                        )
                    }
                </div>
            </div>
        </header>
    );
};

export default Header;