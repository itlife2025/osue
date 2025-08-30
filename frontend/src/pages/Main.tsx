// 1. React 및 기본 라이브러리

import React, {useEffect, useState} from 'react';
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
import { useNavigate } from "react-router-dom";

// Meal 데이터 타입 정의
interface MealData {
    regDate: string;
    mealType: string;
}

const Main = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState(new Date());
    const [isLogin, setIsLogin] = useState(false);
    const [viewMode, setViewMode] = useState('calendar'); // 버튼 토글처리 calendar/list
    const [mealData, setMealData] = useState<MealData[]>([]);

    // 오늘 날짜를 YYYY-MM-DD 형식으로 포맷팅
    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // API 호출 함수
    const fetchMealData = async (userId: string, startDate: string, endDate: string) => {
        try {
            console.log("fetchMealData call - startDate:", startDate, "endDate:", endDate);
            const response = await fetch(`/v1/health/meal/${userId}/${startDate}/${endDate}`);
            if (response.ok) {
                const data = await response.json();
                setMealData(data);
                console.log('res', data);
            } else {
                console.error('fail:', response.status);
            }
        } catch (error) {
            console.error('error:', error);
        }
    };

    // 컴포넌트 마운트 시 현재 월 첫날부터 오늘까지 API 호출
    useEffect(() => {
        if (isLogin) {
            const today = new Date();
            const startDate = formatDate(new Date(today.getFullYear(), today.getMonth(), 1));   // 현재 월의 첫날
            const endDate = formatDate(today);
            
            const userId = 'user001'; // 임시 userId (실제 로그인 시스템 구현 시 변경 필요)
            fetchMealData(userId, startDate, endDate);
        }
        else {
            // 로그인 상태 확인
            /*const fetchData = async () => {
                try {
                    const response = await axios.post("/v1/login", {
                        userId : 'admin',
                        userPw : 'admin1234',
                    });

                    if (response.data.success) {
                        console.log("로그인 성공!");
                    } else {
                        console.log("로그인 실패");
                    }
                } catch (error) {
                    console.log("errors");
                }
            };

            fetchData();*/
        }
    }, [isLogin]);

    return (
        <div>
            <Header isLogin={isLogin}
                    setIsLogin={setIsLogin}
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
                                    <button className="btn btn-primary" onClick={() => navigate('/writing')}>NEW</button>
                                </div>
                                <div className="card">
                                    {viewMode === 'calendar' ? (
                                        <Calendar
                                            value={date}
                                            tileClassName={({ date, view }) => {
                                                if (view === 'month') {
                                                    const day = date.getDay();
                                                    if (day === 0) return 'sunday'; // 일요일
                                                }
                                                return null;
                                            }}
                                            tileContent={({ date, view }) => {
                                                if (view === 'month') {
                                                    const target = mealData.filter(item => 
                                                        item.regDate.substring(0, 10) === formatDate(date)
                                                    );

                                                    if (!target || target.length === 0) return null;
                                                    
                                                    return (
                                                        <div className="calendar-log-content">
                                                            {target.map((meal, index) => (
                                                                <div key={index} className="log-row">
                                                                    <div className="log-new-column">
                                                                        {index === 0 && <span className="log-new-label">NEW</span>}
                                                                    </div>
                                                                    <div className="log-category-column">
                                                                        <div className="log-category">
                                                                            {/* 임시 (변경 예정) */}
                                                                            {meal.mealType}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
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
