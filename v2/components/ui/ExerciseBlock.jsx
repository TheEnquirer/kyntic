
import pageStyles from "../../styles/Pages.module.css"
import subStyles from "../../styles/Sub.module.css"
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
import ReactDOM from 'react-dom';
import { ReactComponent as GreenBlob } from '../../public/green_blob.svg';
import React, { useState, useRef, useEffect } from 'react';
import Avatar from "boring-avatars";
import { open } from 'ionicons/icons';



const ExerciseBlock = (props) => {

    return (
	<div 
	    className={subStyles.workoutItem}
	    //className="text-black border-0 border-red-500"
	> 
	    <div className="flex flex-row items-center w-full">
		<Avatar
		    size={40}
		    name={props.name}
		    //variant="ring"
		    variant="beam"
		    colors={
			["#af4a4a", "#d07c7c", "#f7e8e8","#4a3333","#af4a5d"]
		    }
		    //className="pl-12"
		/>

		<div className="flex flex-col pl-3">
		    <p className="text-xl font-thin text-left text-gray-50" style={{
			fontfamily: "'rubik', sans-serif"
		    }}>{props.name}</p>
		    <p className="text-xl font-bold text-left text-gray-50"
			style={{
			    fontFamily: "'Rubik', sans-serif"
			}}
		    >{props.len}</p>
		</div>
	    </div>

	    <div className="flex mr-3 text-4xl align-middle border-0 border-red-500"
		onClick={() => {
		    console.log("clin", props.idx)
		    props.edit(props.idx)
		}}

	    > 
		<IonIcon icon={open} className="text-white" />
	    </div>
	</div>
    );
}
export default ExerciseBlock;
