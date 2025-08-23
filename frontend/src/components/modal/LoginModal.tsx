import {useState} from "react";

interface LoginModalProps {
    isModalOpen: boolean;
    onClose: () => void;
    onLoginSuccess: (result: { userId: string; result: boolean }) => void;
}

interface LoginInfo {
    userId: string;
    result: boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({ isModalOpen, onClose, onLoginSuccess }) => {

    if(!isModalOpen) return null; // isModalOpen이 false면 렌더링 안함

    const [userId, setUserId] = useState("");
    const [userPw, setUserPw] = useState("");
    const [loginResult, setLoginResult] = useState<LoginInfo>();

    /*const loginProcess = async () => {
        try {
            const response = await axios.post<LoginInfo>("/v1/login", {
                userId, userPw
            });

            if (response.status === 200) {
                console.log("로그인 성공");
                setLoginResult(response.data);
                onLoginSuccess(loginResult);
            } else {
                console.log("로그인 실패");
            }
        } catch (error) {
            console.log("errors: " + error);
        }
    };*/

    const loginProcess = () => {
        // 로그인 API 호출 대신 성공 가정
        const mockResult = {
            userId,
            result: true
        };
        onLoginSuccess(mockResult);
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