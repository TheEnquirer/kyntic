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
import React, { useState, useRef, useEffect } from 'react';
import { Controller } from 'swiper';
import { useContext } from 'react'
import GlobalContext from '../../utils/global-context'
import pageStyles from "../../styles/Pages.module.css"
import { arrowBackOutline } from 'ionicons/icons';
import { useHistory } from "react-router-dom";
import Slide from '../ui/Slide';
import Mood from "../ui/Mood"
import Sleep from "../ui/Sleep"




const Sub = (props) => {
    const global = useContext(GlobalContext)
    const history = useHistory()

    useEffect(() => {
	console.log("mounting sliders")
	if (swiperRef.current) {
	    swiperRef.current.swiper.slideTo(global.targetSubPage);
	}
    })

    const [controlledSwiper, setControlledSwiper] = useState(null);
    const swiperRef = useRef(null)
    const tracks = [<Mood color={"#b2d4a7"} />, <Sleep color={"#a7aed4"} />, "slide3", "slide4", "slide5"]

    return (
	<IonPage> <IonContent className="" fullscreen>
	    <Swiper className="absolute h-screen border-0 border-blue-500"
		modules={[Controller]}
		ref={swiperRef}
		onSwipe ={setControlledSwiper}
		spaceBetween={30}
		//spaceBetween={0}
		slidesPerView={1}
		onSlideChange={() => console.log('slide change')}
		hashNavigation={{ replaceState: true }}
		history={true}
	    >
		{tracks.map((v, i) => {
		    return (
			<SwiperSlide>
			    <Slide>{v}{swiperRef}{i}</Slide>
			</SwiperSlide>
		    )
		})}
	    </Swiper>
	</IonContent> </IonPage>

    );
};
export default Sub;

