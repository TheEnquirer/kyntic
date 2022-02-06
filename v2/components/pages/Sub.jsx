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
import { useContext } from 'react';
import GlobalContext from '../../utils/global-context';
import pageStyles from '../../styles/Pages.module.css';
import { arrowBackOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import Slide from '../ui/Slide';
import { PermissionStatus } from '@capacitor/filesystem';
import Mood from '../ui/Mood';
import Sleep from '../ui/Sleep';
import Exercise from '../ui/Exercise';
import ScreenTime from '../ui/ScreenTime';
import Activities from '../ui/Activities';
import db from '../../lib/db'

const Sub = props => {
    //const db = DB;
    const global = useContext(GlobalContext);
    const history = useHistory();
    const [loggingData, setLoggingData] = useState({})

    const updateLoggingData = (name, v) => {
	let localLog = loggingData
	localLog[name] = v
	setLoggingData(localLog)
	console.log(loggingData)
    }

    const pushLoggingData = () => {
	console.log("pushing data")
	db.logData(loggingData);
    }

    useEffect(() => {
	db();
	//db.test("whee");
	//console.log(db.getUser())
	//db.logData(loggingData);
    }, [])


    useEffect(() => {
	//console.log('mounting sliders');
	if (swiperRef.current) {
	    swiperRef.current.swiper.slideTo(global.targetSubPage);
	}
    });

    const [controlledSwiper, setControlledSwiper] = useState(null);
    const swiperRef = useRef(null);
    //const
    const tracks = [
	<Mood color={'#b2d4a7'} setLoggingData={updateLoggingData}/>,
	<Sleep color={'#a7aed4'} setLoggingData={updateLoggingData}/>,
	<Exercise color={'#d4a7a7'} setLoggingData={updateLoggingData}/>,
	<ScreenTime color={'#a7d4cf'} setLoggingData={updateLoggingData}/>,
	<Activities color={'#d4a7d0'} setLoggingData={updateLoggingData}/>,
    ];

    return (
	<IonPage>
	    {' '}
	    <IonContent className="" fullscreen>
		<Swiper
		    className="absolute h-screen border-0 border-blue-500"
		    modules={[Controller]}
		    ref={swiperRef}
		    onSwipe={setControlledSwiper}
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
				<Slide>
				    {v}
				    {swiperRef}
				    {i}
				    {pushLoggingData}
				</Slide>
			    </SwiperSlide>
			);
		    })}
		</Swiper>
	    </IonContent>{' '}
	</IonPage>
    );
};
export default Sub;
