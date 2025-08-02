import SwiperSpaceBetween from "../components/SwiperSpaceBetween";

export default function MainWithoutLogin() {
    return (
            <>
                <section className="section">
                    <h2 className="title-visually-hidden">편리한 메모 Template 소개</h2>
                    <div className="flex justify-between">
                        <div className="template-start-text">
                            <h3 className="text-primary text-4xl">편리한 메모 Template</h3>
                            <p className="text-primary text-sm font-light">언제 어디서나 손쉽게 원하는 Template을 골라 작성해보세요.</p>
                        </div>
                        <div>
                            <button className="btn btn-primary">Template 시작하기</button>
                        </div>
                    </div>
                </section>
                <section className="section main-tab">
                    <h2 className="title-visually-hidden">Template Sample Tab</h2>
                    <div className="tab-container">
                        <div className="tab-list">
                            <button className="tab-item text-lg" data-tab="tab1">건강</button>
                            <button className="tab-item text-lg active" data-tab="tab2">업무</button>
                            <button className="tab-item text-lg" data-tab="tab3">취미</button>
                            <button className="tab-item text-lg" data-tab="tab4">자기개발</button>
                        </div>
                        <div className="tab-content" id="tab1">
                            <p>
                                첫 번째 탭의 내용입니다. 여기에는 탭 1과 관련된 정보가 표시됩니다.
                            </p>
                        </div>
                        <div className="tab-content p-6 active" id="tab2">
                            <h3 className='pb-4'>타임라인</h3>
                            <SwiperSpaceBetween />
                        </div>
                        <div className="tab-content" id="tab3">
                            <p>
                                세 번째 탭의 내용입니다. 탭 3과 관련된 내용이 여기에 있습니다.
                            </p>
                        </div>
                        <div className="tab-content" id="tab4">
                            <p>
                                세 번째 탭의 내용입니다. 탭 3과 관련된 내용이 여기에 있습니다.
                            </p>
                        </div>
                    </div>
                </section>
            </>
    );
}