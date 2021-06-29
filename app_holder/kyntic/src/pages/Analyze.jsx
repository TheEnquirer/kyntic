import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonRange, IonIcon,
    IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonInput, IonTextarea, IonLabel,
    IonButton
} from '@ionic/react';
import { happy, sad, bed, batteryDead, batteryCharging } from 'ionicons/icons';
import React, { useState } from "react"
import Chart from "../components/Chart"

const Analyze = () => {
    const data = {
	labels: ['1', '2', '3', '4', '5', '6'],
	datasets: [
	    {
		label: '# of Votes',
		data: [12, 19, 3, 5, 2, 3],
		fill: false,
		backgroundColor: 'rgb(255, 99, 132)',
		borderColor: 'rgba(255, 99, 132, 0.2)',
	    },
	],
    };
    return (
	<IonPage>
	    <IonHeader>
		<IonToolbar>
		    <IonTitle>Analyze</IonTitle>
		</IonToolbar>
	    </IonHeader>
	    <IonContent fullscreen>
		<IonHeader collapse="condense">
		    <IonToolbar>
			<IonTitle size="large">Analyze</IonTitle>
		    </IonToolbar>
		</IonHeader>
		{/* CONTENT STARTS HERE */}
		<Chart data={data} />


	    </IonContent>
	</IonPage>

    );
};

export default Analyze;


