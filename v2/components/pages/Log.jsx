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
import pageStyles from '../../styles/Pages.module.css';
import Item from "../ui/Item";

const Log = () => {

  return (
    <IonPage>
        <IonToolbar>
	  <IonTitle>
	      <div className={pageStyles.title}> log </div>
	      <hr className={pageStyles.sep}/>
	  </IonTitle>
        </IonToolbar>
      <IonContent className="ion-padding" fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
	    <IonTitle size="large">log</IonTitle>
          </IonToolbar>
	</IonHeader>
	  <div className="flex flex-col space-y-8">
	      {Items.map((e) => {
		  return ( <Item obj={e} /> )
	      })}
	  </div>
      </IonContent>
    </IonPage>
  );
};


const Items = [
    {
	title: "mood",
	color: "#b2d4a7",
	desc: "how much sleep did you get? this is some more description.",
	target: "/tabs/log/sleep",
    },
    {
	title: "sleep",
	color: "#a7aed4",
	desc: "how much sleep did you get? this is some more description.",
	target: "/tabs/log/sleep",
    },
    {
	title: "exercise",
	color: "#d4a7a7",
	desc: "how much sleep did you get? this is some more description.",
	target: "/tabs/log/sleep",
    },
    {
	title: "screen time",
	color: "#a7d4cf",
	desc: "how much sleep did you get? this is some more description.",
	target: "/tabs/log/sleep",
    },
    {
	title: "activities",
	color: "#d4a7d0",
	//color: "#e0afdc",
	desc: "how much sleep did you get? this is some more description.",
	target: "/tabs/log/sleep",
    },
]






export default Log;
