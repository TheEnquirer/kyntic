import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonMenuButton,
} from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Mood from "../ui/Mood"
import React, { useState, useRef, useEffect } from 'react';
import { Controller } from 'swiper';



const Sub = () => {
    useEffect(() => {
	if (swiperRef.current) {
	    swiperRef.current.swiper.slideTo(2);
	}
    })

    const [controlledSwiper, setControlledSwiper] = useState(null);
    const swiperRef = useRef(null)

    return (
	<IonPage> <IonContent className="" fullscreen>
	    <Swiper className="absolute h-screen border-0 border-blue-500"
		modules={[Controller]} 
		ref={swiperRef}
		//controller={{ control: controlledSwiper }}
		onSwipe ={setControlledSwiper}
		spaceBetween={0}
		slidesPerView={1}
		onSlideChange={() => console.log('slide change')}
		//onSwiper={(swiper) => console.log(swiper, "yooo")}
		hashNavigation={{ replaceState: true }}
		history={true}
	    >
		{console.log(controlledSwiper)}
		<SwiperSlide> <Mood /> </SwiperSlide>
		<SwiperSlide> <Mood /> </SwiperSlide>
		<SwiperSlide>Slide 3</SwiperSlide>
		<SwiperSlide>Slide 4</SwiperSlide>
	    </Swiper>
	</IonContent> </IonPage>

    );
};
export default Sub;

