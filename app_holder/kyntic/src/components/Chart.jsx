import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonRange, IonIcon,
    IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonInput, IonTextarea, IonLabel,
    IonButton
} from '@ionic/react';
import { happy, sad, bed, batteryDead, batteryCharging } from 'ionicons/icons';
import React, { useState } from "react"
import { Line } from 'react-chartjs-2'

const Chart = (props) => {
    return (
	<IonContent>
	    <Line data={props.data} />
	</IonContent>

    );
};

export default Chart;


