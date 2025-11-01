import React, {useRef, useState, useEffect} from "react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FormRef } from '../types/form';
import MealForm from "./health/MealForm";

import '../assets/styles/reset.css';
import '../assets/styles/common.css';
import '../assets/styles/style.css';
import '../assets/styles/content.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";


const Writing = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDetail, setSelectedDetail] = useState('');
    const formRef = useRef<FormRef>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
            navigate('/');
        }
    }, [navigate]);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
        setSelectedDetail(''); // 상위 카테고리 변경 시 하위 카테고리 초기화
    };

    const handleDetailChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDetail(e.target.value);
    };


    const saveData = async () => {
        if (!formRef.current) return;

        const token = localStorage.getItem('token');
        const data = formRef.current.getData();

        if ( data ) {
            try {
                const response = await axios.post('/v1/health/meal', data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                const result = response.data;
                console.log("저장 응답:", result);
                
                if (result.success) {
                    // 실제로 데이터가 저장된 경우
                    alert(result.message); // "식단이 성공적으로 저장되었습니다."
                    console.log('저장된 식사 ID들:', result.data.savedMealIds);
                    console.log('총 저장된 식사 개수:', result.data.totalSavedMeals);
                    
                    // 저장 후 폼 초기화
                    if (formRef.current) {
                        formRef.current.reset();
                    }
                } else if (response.status === 400) {
                    // 저장할 데이터가 없는 경우
                    alert(result.message); // "저장할 식단 데이터가 없습니다."
                } else {
                    // 서버 오류
                    alert(result.message); // 오류 메시지
                }
            } catch (error: any) {
                console.log("저장 실패:", error);

                // 토큰 만료나 인증 실패 시 (401, 403)
                if (error.response?.status === 401 || error.response?.status === 403) {
                    setIsLogin(false);
                    localStorage.removeItem('token');
                    navigate('/');
                } else {
                    console.error("저장 중 오류:", error);
                    
                    // 백엔드에서 오류 응답을 보낸 경우
                    if (error.response?.data?.message) {
                        alert(error.response.data.message);
                    } else {
                        alert("저장에 실패했습니다.");
                    }
                }
            }
        } else {
            alert("데이터를 작성해주세요");
        }
    };

    return (
        <div>

            <Header isLogin={isLogin} setIsLogin={setIsLogin} />

            <main className="container">
                <section className="section">
                    {/* 상단 버튼 영역 */}
                    <div className="flex justify-end mb-4">
                        <div className="inline-actions">
                            <button className="btn btn-secondary" onClick={() => history.go(-1)}>취소</button>
                            <button className="btn btn-primary" onClick={saveData}>저장</button>
                        </div>
                    </div>

                    <div className="card">
                        <label htmlFor="category">카테고리 선택</label>
                        <select
                            className="input-select"
                            id="category"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            <option value="">선택해주세요</option>
                            <option value="건강">건강</option>
                        </select>

                        {selectedCategory && (
                            <select
                                className="input-select m-3"
                                id="category-detail"
                                value={selectedDetail}
                                onChange={handleDetailChange}
                            >
                                <option value="">선택해주세요</option>
                                <option value="식단관리">식단관리</option>
                            </select>
                        )}
                    </div>

                    {/* 식단관리 선택 시 나타나는 폼(임시)) */}
                    {selectedDetail === '식단관리' && (
                        <MealForm ref={formRef} />
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Writing;