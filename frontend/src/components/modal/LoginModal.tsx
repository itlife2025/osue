import {useState} from "react";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginSuccess: () => void; // callback
    onLoginFail: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess, onLoginFail }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            //await axios.post("/login", { username, password });
            onLoginSuccess();
        } catch (error) {
            onLoginFail();
        }
    };

    if(!isOpen) return null; // isOpen이 false면 렌더링 안함

    return (
        <>
            <div className="modal-overlay" id="modal" style={{display: isOpen ? 'flex' : 'none'}}>
                <div className="modal">
                    <div className="modal-header">
                        <h3 className="modal-title">LOGIN</h3>
                        <button className="modal-close" onClick={onClose}>×</button>
                    </div>
                    <div className="modal-content">
                        <div className="mb-4">
                            <label className="text-sm font-medium mb-2" style={{display: 'block'}}>ID</label>
                            <input type="text" className="input" placeholder="아이디를 입력하세요" />
                        </div>
                        <div className="mb-4">
                            <label className="text-sm font-medium mb-2" style={{display: 'block'}}>PW</label>
                            <input type="text" className="input" placeholder="비밀번호를 입력하세요" />
                        </div>
                        <div className="flex gap-4">
                            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
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