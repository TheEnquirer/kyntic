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

const Sync = () => {
  return (
    <IonPage>
      <IonToolbar>
        <IonTitle>
          <div className={pageStyles.title}> sync </div>
          <hr className={pageStyles.sep} />
        </IonTitle>
      </IonToolbar>
      <IonContent className="ion-padding" fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">sync</IonTitle>
          </IonToolbar>
        </IonHeader>
        syncing to the sensor! do it, sense.
      </IonContent>
    </IonPage>
  );
};

export default Sync;
