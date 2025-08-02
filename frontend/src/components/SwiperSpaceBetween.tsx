// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import {Pagination} from 'swiper/modules';

// 이미지 (user name test땜에 추가함 다시 지울것)
import timelineLayout01 from '../assets/images/swiper-images/timeline-layout-01.jpg';
import timelineLayout02 from '../assets/images/swiper-images/timeline-layout-02.jpg';
import timelineLayout03 from '../assets/images/swiper-images/timeline-layout-03.jpg';

export default function SwiperSpaceBetween() {
    return (
        <>
            <Swiper
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide><img src={timelineLayout01} alt="타임라인 샘플 이미지 1" /></SwiperSlide>
                <SwiperSlide><img src={timelineLayout02} alt="타임라인 샘플 이미지 2" /></SwiperSlide>
                <SwiperSlide><img src={timelineLayout03} alt="타임라인 샘플 이미지 3" /></SwiperSlide>
            </Swiper>
        </>
    );
}
