import logo from '../../assets/images/osue-logo.png';
import React, {useEffect, useState} from "react";
import LoginModal from "../modal/LoginModal";
import {LoginResponse} from "../types/user";
import axios from "axios";

interface IsLoginStatus {
    isLogin: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<IsLoginStatus> = ({ isLogin, setIsLogin }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loginInfo, setLoginInfo] = useState<LoginResponse | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get("/auth/checkToken", {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            withCredentials: true
        })
            .then(res => {
                console.log("/loginCheck - true");
                setLoginInfo(res.data);
                setIsLogin(true);
            })
            .catch(() => {
                console.log("/loginCheck - false");
                setLoginInfo(null);
                setIsLogin(false);
            });

    }, []);

    const handleLoginSuccess = (data: LoginResponse) => {
        setLoginInfo(data);
        setIsLogin(true);
        setIsModalOpen(false); // 모달 닫기
    };

    const loginOut = async () => {
        try {
            const response = await axios.post<LoginResponse>("/v1/logOut", {
                    userId: loginInfo?.userId
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                });
            if (response.status === 200) {
                setLoginInfo(null);
                setIsLogin(false);
                alert("로그아웃 처리됨");
            } else {
                alert("아이디와 비밀번호를 다시 확인해주세요.");
            }
        } catch (error) {
            console.log("errors: " + error);
        }
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
                                <span>{loginInfo.userName}</span>
                                <span>My page</span>
                                <button className="logout-button" onClick={loginOut}>
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