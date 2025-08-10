// 1. React 및 기본 라이브러리
import React, {useState} from 'react';
import Calendar from 'react-calendar';

// 2. 외부 라이브러리
// 3. 내부 컴포넌트
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MainWithoutLogin from './MainWithoutLogin';

// 4. 스타일
import '../assets/styles/reset.css';
import '../assets/styles/common.css';
import '../assets/styles/style.css';
import '../assets/styles/content.css';
import 'react-calendar/dist/Calendar.css';

// 5. 아이콘
import {HiCalendarDays, HiListBullet} from 'react-icons/hi2';

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
                                        <button
                                            className={viewMode === 'calendar' ? "btn-icon-active" : "btn-icon"}
                                            onClick={() => setViewMode('calendar')}
                                        >
                                            {HiCalendarDays({size:20})}
                                        </button>
                                        <button 
                                            className={viewMode === 'list' ? "btn-icon-active" : "btn-icon"}
                                            onClick={() => setViewMode('list')}
                                        >
                                            {HiListBullet({size:20})}
                                        </button>
                                    </div>
                                </div>
                                <hr className="mb-3" />
                                <div className="flex justify-end mb-4">
                                    <button className="btn btn-primary">NEW</button>
                                </div>
                                <div className="card">
                                    {viewMode === 'calendar' ? (
                                        <Calendar value={date} />
                                    ) : (
                                        <div className="list-view">
                                            <h3>리스트 뷰</h3>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            //로그아웃 상태
                            <MainWithoutLogin />
                        )
                    }
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Main;
