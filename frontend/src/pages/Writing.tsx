import React, {useState} from "react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import '../assets/styles/reset.css';
import '../assets/styles/common.css';
import '../assets/styles/style.css';
import '../assets/styles/content.css';


const Writing = () => {
    const [isLogin, setIsLogin] = useState(true);

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
                        <select className="input-select" id="category">
                            <option></option>
                        </select>
                        <select className="input-select m-3" id="category-detail">
                            <option></option>
                        </select>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Writing;