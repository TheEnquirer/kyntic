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
import React, { useState, useRef, useEffect } from 'react';
import { useContext } from 'react'
import GlobalContext from '../../utils/global-context'
import pageStyles from "../../styles/Pages.module.css"
import { arrowBackOutline } from 'ionicons/icons';
import { useHistory } from "react-router-dom";




const Slide = ({ children, props }) => {
    const global = useContext(GlobalContext)
    const history = useHistory()
    const handleFinish = () => {
	if (props.swiperRef.current) {
	    props.swiperRef.current.swiper.slideTo(props.i + 1);
	}
    }

    return (
	<div className={pageStyles.pager}>
	    <IonIcon icon={arrowBackOutline} className="mt-8 ml-3 text-lg text-gray-500"
		onClick={() => {
		    history.push("/tabs/log");
		}}
	    />
	    {children}
	    <div
		onClick={handleFinish}
	    >done</div>
	</div>
    );
};
export default Slide;
