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


const Mood = (props) => {
    const history = useHistory()
    const sliderRef = useRef()
    const [sliderVal, setSlider] = useState();
    //useEffect(() => {
    //    console.log(sliderRef.current)
    //})


    return (
	<div className="w-screen h-screen border-0 border-red-500">
	    {/*<GreenBlob />*/}
	    <svg viewBox="0 0 566 234" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M115 212.5C35.1088 193.637 12.9999 172.041 -2.50006 155.5L-2.5 5.65648e-05C-2.5 5.65648e-05 326.539 -1.47787 569.966 5.27501e-05V172.041C548.276 168.641 556.593 199.931 439 219C309.5 240 225 238.472 115 212.5Z" fill="#B2D4A7" fill-opacity="0.56"/>
		<path d="M127.981 182.586C45.8926 182.586 32.5 129.5 -5.00007 115.5C-5.0001 59.5 -5.00045 68.5 -5.00007 1.50003C-5.00001 -8.99996 321.5 1.50005 569 1.50003V132.984C573.785 128.775 576.651 125.613 577.855 124.18C578.726 123.002 578.763 123.099 577.855 124.18C576.578 125.907 573.51 130.374 569 138.5V132.984C553.951 146.222 519.911 169.82 458.835 182.586C325.192 210.518 230.59 182.586 127.981 182.586Z" fill="#B2D4A7"/>
		<path d="M-5.00007 115.5C32.5 129.5 45.8926 182.586 127.981 182.586C230.59 182.586 325.192 210.518 458.835 182.586C575.444 158.213 593.5 94.3538 569 138.5V1.50003C321.5 1.50005 -5.00001 -8.99996 -5.00007 1.50003C-5.00045 68.5 -5.0001 59.5 -5.00007 115.5Z" stroke="#B2D4A7"/>
	    </svg>
	    <div className={subStyles.emacs}>mood</div>

	    <div className={subStyles.subtitle}>
		how are you feeling today?
	    </div>
	    <div
		//className="flex content-center justify-center border-2 border-red-500 h-96"
		className="flex flex-col items-center mt-12 mb-12 text-center border-0 border-blue-500 h-1/2"
	    >
		<p className={subStyles.infoTag}>good!</p>
		<Slider
		    sx={{
			color: "rgba(255, 255, 255, 0)",
			//alignItems: "center",
			//justifyContent: "center",
			//display: "flex",
			//border: "1px solid red",
			//background: "linear-gradient(180deg, rgba(171,197,197,1) 0%, rgba(199,196,225,1) 50%, rgba(163,115,144,1) 100%)",
			background: "linear-gradient(180deg, rgba(178,212,167,1) 0%, rgba(196,209,225,1) 50%, rgba(167,174,212,1) 100%)",
			//width: "0.01rem",
			padding: "5px !important",
			//maxWidth: "1px",
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
		    track="inverted"
		    ref={sliderRef}
		    onChange={(e) => {
			setSlider(e.target.value);
			//console.log(sliderVal)
		    }}

		    onChangeCommitted={(e, v) => {
			props.setLoggingData("mood", v)
		    }}

		    //size="small"
		    defaultValue={50}
		    //aria-label="Small"
		    valueLabelDisplay="off"
		    orientation="vertical"
		/>
		<p className={subStyles.infoTag}
		    //style={{marginBottom: "-20px"}}
		>not good.</p>
	    </div>
	</div>
    );
}
export default Mood;
