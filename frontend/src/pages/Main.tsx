// 1. React 및 기본 라이브러리
import React, {useState} from 'react';
import Calendar from 'react-calendar';

// 2. 외부 라이브러리
// 3. 내부 컴포넌트
import Header from '../components/Header';
import MainWithoutLogin from './MainWithoutLogin';

// 4. 스타일
import '../assets/styles/reset.css';
import '../assets/styles/common.css';
import '../assets/styles/style.css';
import '../assets/styles/content.css';
import 'react-calendar/dist/Calendar.css';

// 5. 이미지
import ico_calendar_wh from "../assets/images/common/ico-calendar-wt.png";
// import ico_calendar_bk from "../assets/images/common/ico-calendar-bk.png";
import ico_list_bk from "../assets/images/common/ico-list-bk.png";
// import ico_list_wh from "../assets/images/common/ico-list-wt.png";

const Main = () => {
    const [date, setDate] = useState(new Date());
    const [isLogin, setIsLogin] = useState(false);
    const [viewMode, setViewMode] = useState('calendar'); // 버튼 토글처리 calendar/list

    const handleLogin = () => setIsLogin(true);
    const handleLogout = () => setIsLogin(false);

    return (
        <div>
            <Header isLogin={isLogin}
                    onLoginClick={handleLogin}
                    onLogoutClick={handleLogout}
            />

            <main className="container">
                <section className="section">
                    <h2 className='title-visually-hidden'>Main Page</h2>
                    {
                        isLogin ? (
                            //로그인 상태
                            <>
                                <div className="flex justify-end mb-3">
                                    <div className="inline-actions">
                                        {/*버튼 토글처리 해야함*/}
                                        <button className="btn-icon-active">
                                            <img src={ico_calendar_wh} />
                                        </button>
                                        <button className="btn-icon">
                                            <img src={ico_list_bk} />
                                        </button>
                                    </div>
                                </div>
                                <hr className="mb-3" />
                                <div className="flex justify-end mb-4">
                                    <button className="btn btn-primary">NEW</button>
                                </div>
                                <div className="card">
                                    <Calendar value={date} />
                                </div>
                            </>
                        ) : (
                            //로그아웃 상태
                            <MainWithoutLogin />
                        )
                    }
                </section>
            </main>


        </div>
    );
};

export default Main;
