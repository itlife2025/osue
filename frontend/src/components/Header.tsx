// 1. 이미지
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
                    <h1 className="app-title">
                        <img
                            className="flex items-center gap-4 logo-image"
                            src={ logo }
                            alt="OSUE Logo"
                        />
                        <span className="text-secondary">OSUE</span>
                    </h1>
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