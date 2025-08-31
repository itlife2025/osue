import React, {useState} from "react";
import {LoginResponse} from "../types/user";
import axios from "axios";

interface LoginModalProps {
    isModalOpen: boolean;
    onLoginSuccess: (data: LoginResponse) => void;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isModalOpen, onLoginSuccess, onClose }) => {
    const [userId, setUserId] = useState("");
    const [userPw, setUserPw] = useState("");

    const loginProcess = async () => {
        try {
            const response = await axios.post<LoginResponse>("/v1/login", {
                    userId: userId,
                    userPw: userPw
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

            if (response.data.result) {
                onLoginSuccess(response.data);
            } else {
                alert("아이디와 비밀번호를 다시 확인해주세요.");
            }
        } catch (error) {
            console.log("errors: " + error);
        }
    };

    return (
        <>
            <div className="modal-overlay" id="modal" style={{display: isModalOpen ? 'flex' : 'none'}}>
                <div className="modal">
                    <div className="modal-header">
                        <h3 className="modal-title">LOGIN</h3>
                        <button className="modal-close" onClick={onClose}>×</button>
                    </div>
                    <div className="modal-content">
                        <div className="mb-4">
                            <label className="text-sm font-medium mb-2" style={{display: 'block'}}>ID</label>
                            <input type="text"
                                   className="input"
                                   onChange={(e) => { setUserId(e.target.value) }}
                                   placeholder="아이디를 입력하세요" />
                        </div>
                        <div className="mb-4">
                            <label className="text-sm font-medium mb-2" style={{display: 'block'}}>PW</label>
                            <input type="password"
                                   className="input"
                                   onChange={(e) => { setUserPw(e.target.value) }}
                                   placeholder="비밀번호를 입력하세요" />
                        </div>
                        <div className="flex gap-4">
                            <button className="btn btn-primary" onClick={loginProcess}>Login</button>
                            <button className="btn btn-secondary" onClick={onClose}>
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginModal;