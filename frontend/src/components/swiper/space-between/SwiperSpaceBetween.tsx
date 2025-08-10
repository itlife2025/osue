// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import {Autoplay, Pagination} from 'swiper/modules';

// 이미지
import timelineLayout01 from '../../../assets/images/swiper/timeline-layout-01.jpg';
import timelineLayout02 from '../../../assets/images/swiper/timeline-layout-02.jpg';
import timelineLayout03 from '../../../assets/images/swiper/timeline-layout-03.jpg';

export default function SwiperSpaceBetween() {
    return (
        <>
            <Swiper
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination, Autoplay]}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                className="mySwiper"
            >
                <SwiperSlide><img src={timelineLayout01} alt="타임라인 샘플 이미지 1" /></SwiperSlide>
                <SwiperSlide><img src={timelineLayout02} alt="타임라인 샘플 이미지 2" /></SwiperSlide>
                <SwiperSlide><img src={timelineLayout03} alt="타임라인 샘플 이미지 3" /></SwiperSlide>
            </Swiper>
        </>
    );
}
