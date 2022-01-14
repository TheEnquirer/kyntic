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
import React, { useState, useRef, useEffect, useReducer } from 'react';
import ExerciseBlock from "./ExerciseBlock";

const reducer = (state, action) => {
    switch (action.type) {
	case 'append':
	    //return state.append(action.payload)
	    return [...state, action.payload]
	//case 'decrement':
	//    return {count: state.count - 1};
	default:
	    throw new Error();
    }
}

const TEST = [
    {
	name: "run",
	len: "30m"
    },
    {
	name: "walk",
	len: "1h, 14m"
    },
    {
	name: "swim",
	len: "2h, 1m"
    },
    {
	name: "tennis",
	len: "30m"
    },
]

const Exercise = (props) => {
    const [workouts, manageWorkouts] = useReducer(reducer, TEST)

    return (
	<div className="w-screen h-screen border-0 border-red-500">
	    {/*<GreenBlob />*/}
	    <svg viewBox="0 0 566 234" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M115 212.5C35.1088 193.637 12.9999 172.041 -2.50006 155.5L-2.5 5.65648e-05C-2.5 5.65648e-05 326.539 -1.47787 569.966 5.27501e-05V172.041C548.276 168.641 556.593 199.931 439 219C309.5 240 225 238.472 115 212.5Z"
		//fill="#B2D4A7"
		fill={props.color}
		fill-opacity="0.56"/>
		<path d="M127.981 182.586C45.8926 182.586 32.5 129.5 -5.00007 115.5C-5.0001 59.5 -5.00045 68.5 -5.00007 1.50003C-5.00001 -8.99996 321.5 1.50005 569 1.50003V132.984C573.785 128.775 576.651 125.613 577.855 124.18C578.726 123.002 578.763 123.099 577.855 124.18C576.578 125.907 573.51 130.374 569 138.5V132.984C553.951 146.222 519.911 169.82 458.835 182.586C325.192 210.518 230.59 182.586 127.981 182.586Z" 
		//fill="#B2D4A7"
		fill={props.color}
		/>
		<path d="M-5.00007 115.5C32.5 129.5 45.8926 182.586 127.981 182.586C230.59 182.586 325.192 210.518 458.835 182.586C575.444 158.213 593.5 94.3538 569 138.5V1.50003C321.5 1.50005 -5.00001 -8.99996 -5.00007 1.50003C-5.00045 68.5 -5.0001 59.5 -5.00007 115.5Z" 
		//stroke="#B2D4A7"
		stroke={props.color}
		/>
	    </svg>
	    <div className={subStyles.emacs}>exercise</div>

	    <div className={subStyles.subtitle}>
		{/*how are you feeling today?*/}
		what exercise did you get today?
	    </div>
	    <div
		className={`flex flex-col items-center mt-5 text-center border-0 border-blue-500 h-1/2`}
	    >
		<div className={subStyles.fullButton}
		    //style={{
		    //    backgroundColor: props.color,
		    //}}
		    onClick={() => {
			console.log("clicking!")
			//manageWorkouts({type: 'append', payload: "workout!"})

		    }}
		> 
		    + add a workout
		</div>
		{workouts.map((v) => {
		   return ( <ExerciseBlock name={v.name} len={ v.len } color={props.color}/>)
		})}


	    </div>
	</div>
    );
}
export default Exercise;
