import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Mood from "../ui/Mood"


//const Mood = () => {
//    console.log("yeah?")
//    return (
//        <div 
//            className="absolute z-10 h-screen"
//        >
//            mood tracking
//        </div>
//    );
//}
//export default Mood;

const Sub = () => {
    console.log("im rendering!!")
    return (
	<div className="absolute z-20 w-screen h-screen">
	    please.
	{/*<Swiper className="absolute h-screen border-0 border-blue-500"
	    spaceBetween={50}
	    slidesPerView={1}
	    onSlideChange={() => console.log('slide change')}
	    onSwiper={(swiper) => console.log(swiper)}
	    //hashNavigation={{ replaceState: true }}
	    history={true}
	>
	    [><SwiperSlide> <Mood /> </SwiperSlide><]
	    <SwiperSlide>Slide 2</SwiperSlide>
	    <SwiperSlide>Slide 3</SwiperSlide>
	    <SwiperSlide>Slide 4</SwiperSlide>
	    ...
	</Swiper>*/}
	</div>
    );
};
export default Sub;
