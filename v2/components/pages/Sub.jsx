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
import Perceived from '../ui/Perceived';
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
	//console.log(loggingData)
    }

    const pushLoggingData = () => {
	db.logData(loggingData);
	//console.log(loggingData, "logging data")
    }

    useEffect(() => {
	db();
	db.updateCache("yeetus")
	//db.checkCache()
	let startingData = db.getTodaysData().then((e) => {
	    if (e !== false) {
		setLoggingData(e)
	    }
	})
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
	<Mood color={'#b2d4a7'} setLoggingData={updateLoggingData} />,
	<Sleep color={'#a7aed4'} setLoggingData={updateLoggingData} />,
	<Exercise color={'#d4a7a7'} setLoggingData={updateLoggingData} />,
	<ScreenTime color={'#a7d4cf'} setLoggingData={updateLoggingData} />,
	<Activities color={'#d4a7d0'} setLoggingData={updateLoggingData} />,
	<Perceived color={'#e5cd8f'} setLoggingData={updateLoggingData} />,
    ];

    return (
	<IonPage>
	    {' '}
	    <IonContent className="" fullscreen>
		<Swiper
		    className="absolute h-screen border-0 border-blue-500"
		    modules={[Controller]}
		    ref={swiperRef}
		    //onSwipe={() => console.log(controlledSwiper, "whee")}
		    spaceBetween={30}
		    //spaceBetween={0}
		    slidesPerView={1}
		    onSlideChange={(e) => {
			//setLoggingData(e)
			console.log(e.activeIndex)
			let l = global
			//console.log(l)
			l.localTracked[e.activeIndex] = true
			l.targetSubPage = e.activeIndex
			//l[e.activeIndex] = true
			global.update(l)
		    }}
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
