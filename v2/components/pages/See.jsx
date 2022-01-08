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


const See = () => {

  return (
    <IonPage>
        <IonToolbar>
	  <IonTitle>
	      <div className={pageStyles.title}> see </div>
	      <hr className={pageStyles.sep}/>
	  </IonTitle>
        </IonToolbar>
      <IonContent className="ion-padding" fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
	    <IonTitle size="large">see</IonTitle>
          </IonToolbar>
        </IonHeader>
	  stats, data, all the cool things!
      </IonContent>
    </IonPage>
  );
};

export default See;

