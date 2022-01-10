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
	children[1].current.swiper.slideTo(children[2] + 1);
    }

    return (
	<div className={pageStyles.pager}>
	    <IonIcon icon={arrowBackOutline} className="mt-8 ml-3 text-lg text-gray-500"
		onClick={() => {
		    history.push("/tabs/log");
		}}
	    />
	    {children[0]}
	    <div className="flex flex-row content-center justify-center">
	    <div
		onClick={handleFinish}
		className="pt-3 pb-3 pl-10 pr-10 mt-32 font-medium text-center border-0 border-red-500 rounded-full text-gray-50"
		style={{backgroundColor: children[0].props? children[0].props.color : ""}}
	    > done </div>
	    </div>

	</div>
    );
};
export default Slide;
