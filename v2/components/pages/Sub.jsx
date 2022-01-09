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
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Mood from "../ui/Mood"


const Sub = () => {
    return (
	<IonPage> <IonContent className="" fullscreen>
	    <Swiper className="absolute h-screen border-0 border-blue-500"
		spaceBetween={0}
		slidesPerView={1}
		onSlideChange={() => console.log('slide change')}
		onSwiper={(swiper) => console.log(swiper)}
		hashNavigation={{ replaceState: true }}
		history={true}
	    >
		<SwiperSlide> <Mood /> </SwiperSlide>
		<SwiperSlide> <Mood /> </SwiperSlide>
		<SwiperSlide>Slide 3</SwiperSlide>
		<SwiperSlide>Slide 4</SwiperSlide>
	    </Swiper>
	</IonContent> </IonPage>

    );
};
export default Sub;
