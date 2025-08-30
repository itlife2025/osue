import logo from '../../assets/images/osue-logo.png';
import React, {useState} from "react";
import LoginModal from "../modal/LoginModal";
import {LoginResponse} from "../types/user";

interface IsLoginStatus {
    isLogin: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<IsLoginStatus> = ({ isLogin, setIsLogin }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loginInfo, setLoginInfo] = useState<LoginResponse | null>(null);

    const handleLoginSuccess = (data: LoginResponse) => {
        setLoginInfo(data);
        setIsLogin(data.result);
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
                        loginInfo ? (
                            <>
                                <span>My page</span>
                                <button className="logout-button">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button className="login-button" onClick={() => setIsModalOpen(true)}>
                                    Login
                                </button>
                                {
                                    isModalOpen && ( <LoginModal
                                                            isModalOpen={isModalOpen}
                                                            onLoginSuccess={handleLoginSuccess}
                                                            onClose={() => setIsModalOpen(false)}
                                                    /> )
                                }

                            </>
                        )
                    }
                </div>
            </div>
        </header>
    );
};

export default Header;