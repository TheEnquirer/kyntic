import pageStyles from "../../styles/Pages.module.css"
import subStyles from "../../styles/Sub.module.css"
import { arrowBackOutline } from 'ionicons/icons';
import {
    IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonMenuButton,

} from '@ionic/react';
import { useHistory } from "react-router-dom";
import Slider from '@mui/material/Slider';
import ReactDOM from 'react-dom';
import { ReactComponent as GreenBlob } from '../../public/green_blob.svg';
import React, { useState, useRef, useEffect } from 'react';
import db from '../../lib/db'


const Perceived = (props) => {
    const history = useHistory()
    const sliderRef = useRef()
    const [sliderVal, setSlider] = useState();


    useEffect(() => {
	db();
	db.getTodaysData().then((e) => {
	    if (e !== false && e.perceived) {
		setSlider(e.perceived)
	    }
	})
    }, [])


    return (
	<div className="w-screen h-screen border-0 border-red-500">
	    {/*<GreenBlob />*/}
	    <svg viewBox="0 0 566 234" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M115 212.5C35.1088 193.637 12.9999 172.041 -2.50006 155.5L-2.5 5.65648e-05C-2.5 5.65648e-05 326.539 -1.47787 569.966 5.27501e-05V172.041C548.276 168.641 556.593 199.931 439 219C309.5 240 225 238.472 115 212.5Z" fill={props.color} fill-opacity="0.56"/>
		<path d="M127.981 182.586C45.8926 182.586 32.5 129.5 -5.00007 115.5C-5.0001 59.5 -5.00045 68.5 -5.00007 1.50003C-5.00001 -8.99996 321.5 1.50005 569 1.50003V132.984C573.785 128.775 576.651 125.613 577.855 124.18C578.726 123.002 578.763 123.099 577.855 124.18C576.578 125.907 573.51 130.374 569 138.5V132.984C553.951 146.222 519.911 169.82 458.835 182.586C325.192 210.518 230.59 182.586 127.981 182.586Z" fill={props.color}/>
		<path d="M-5.00007 115.5C32.5 129.5 45.8926 182.586 127.981 182.586C230.59 182.586 325.192 210.518 458.835 182.586C575.444 158.213 593.5 94.3538 569 138.5V1.50003C321.5 1.50005 -5.00001 -8.99996 -5.00007 1.50003C-5.00045 68.5 -5.0001 59.5 -5.00007 115.5Z" stroke={props.color}/>
	    </svg>
	    <div className={subStyles.emacs}>severity</div>

	    <div className={subStyles.subtitle}>
		how severe was your tourettes today?
	    </div>
	    <div
		//className="flex content-center justify-center border-2 border-red-500 h-96"
		className="flex flex-col items-center mt-12 mb-12 text-center border-0 border-blue-500 h-1/2"
	    >
		<p className={subStyles.infoTag}>mild</p>
		<Slider
		    sx={{
			color: "rgba(255, 255, 255, 0)",
			background: "linear-gradient(180deg, rgba(237,212,147,1) 0%, rgba(229,143,143,1) 100%)",
			padding: "5px !important",
			'& input[type="range"]': {
			    WebkitAppearance: 'slider-vertical',
			},
			'& .MuiSlider-thumb': {
			    color: '#131313',
			    width: "25px",
			    height: "25px",
			},
			'& .MuiSlider-track': {
			    backgroundColor: "rgba(255, 255, 255, 0)",
			    border: "none",
			},
		    }}
		    value={sliderVal? sliderVal : 50}
		    track="inverted"
		    onChange={(e) => {
			setSlider(e.target.value);
		    }}

		    onChangeCommitted={(e, v) => {
			props.setLoggingData("perceived", v)
		    }}
		    valueLabelDisplay="off"
		    orientation="vertical"
		/>
		<p className={subStyles.infoTag}
		>severe</p>
	    </div>
	</div>
    );
}
export default Perceived;

