import React, {useState} from "react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MealForm from "./health/MealForm";

import '../assets/styles/reset.css';
import '../assets/styles/common.css';
import '../assets/styles/style.css';
import '../assets/styles/content.css';


const Writing = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDetail, setSelectedDetail] = useState('');

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
        setSelectedDetail(''); // 상위 카테고리 변경 시 하위 카테고리 초기화
    };

    const handleDetailChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDetail(e.target.value);
    };

    return (
        <div>

            <Header isLogin={isLogin} setIsLogin={setIsLogin} />

            <main className="container">
                <section className="section">
                    {/* 상단 버튼 영역 */}
                    <div className="flex justify-end mb-4">
                        <div className="inline-actions">
                            <button className="btn btn-secondary">취소</button>
                            <button className="btn btn-primary">저장</button>
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
                        <MealForm />
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Writing;