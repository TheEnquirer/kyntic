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
import { useState } from 'react';
import itemStyles from '../../styles/Item.module.css';
import { useHistory } from "react-router-dom";
//import Link from "next/link";   //import this
//import { BrowserRouter as Router, Route, Link } from "react-router-dom"

const Item = (props) => {
    const history = useHistory()
    return (
	    <div className="p-4 ml-4 mr-4 h-28 rounded-2xl" style={{backgroundColor: props.obj.color}}
		onClick={() => {
		//    console.log("clicked?")
		    history.push("/tabs/new");
		}}
		//href="/tabs/sub"
	    > 
		<div className={itemStyles.title}>
		    {props.obj.title}
		</div>
		<div className={itemStyles.desc}>
		    <div className="flex flex-col">
			{props.obj.desc}
			<p><span className="font-extrabold">untracked</span> so far.</p>
		    </div>
		</div>
	    </div>
    );
};

export default Item;

