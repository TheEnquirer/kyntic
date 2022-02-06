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
import db from '../../lib/db'

const Slide = ({ children, props }) => {
    useEffect(() => {
	db();

    }, [])
    const global = useContext(GlobalContext)
    const history = useHistory()
    const handleFinish = () => {
	children[3]()
	if (children[2] != 4) {
	    children[1].current.swiper.slideTo(children[2] + 1); // lmaoo
	} else { history.push("/tabs/log") }
    }

    return (
	<div className={pageStyles.pager}>
	    <IonIcon icon={arrowBackOutline} className="absolute z-10 p-3 mt-5 ml-3 text-lg text-gray-500 border-0 border-red-500"
		onClick={() => {
		    history.push("/tabs/log");
		}}
	    />
	    {children[0]}
	    <div className="flex flex-row content-center justify-center border-0 border-green-500">
	    <div
		onClick={handleFinish}
		//className="static absolute pt-3 pb-3 pl-10 pr-10 font-medium text-center border-0 border-red-500 rounded-full text-gray-50"
		className={pageStyles.fab}
		style={{backgroundColor: children[0].props? children[0].props.color : "black"}}
	    > done </div>
	    </div>

	</div>
    );
};
export default Slide;
