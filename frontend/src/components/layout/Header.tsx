import logo from '../../assets/images/osue-logo.png';
import React, {useState} from "react";
import LoginModal from "@/components/modal/LoginModal";

interface IsLoginStatus {
    isLogin: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LoginModalProps {
    userId: string;
    result: boolean;
}

const Header: React.FC<IsLoginStatus> = ({ isLogin, setIsLogin }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loginResult, setLoginResult] = useState<LoginModalProps | null>(null);

    const handleLoginSuccess = (result: LoginModalProps) => {
        setLoginResult(result);
        setIsLogin(result.result);
        setIsModalOpen(false); // 모달 닫기
    };

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
                                <button className="logout-button" onClick={() => setIsModalOpen(false)}>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button className="login-button" onClick={() => setIsModalOpen(true)}>
                                    Login
                                </button>
                                <LoginModal
                                    isModalOpen={isModalOpen}
                                    onClose={() => setIsModalOpen(false)}
                                    onLoginSuccess={handleLoginSuccess}
                                />
                            </>
                        )
                    }
                </div>
            </div>
        </header>
    );
};

export default Header;