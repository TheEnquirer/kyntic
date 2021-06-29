import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonRange, IonIcon,
    IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonInput, IonTextarea, IonLabel,
    IonButton
} from '@ionic/react';
import { happy, sad, bed, batteryDead, batteryCharging } from 'ionicons/icons';
import React, { useState } from "react"
import Chart from "../components/Chart"

const Analyze = () => {
    const data = (canvas) => {
	const c = canvas.getContext('2d')
	const grd = c.createLinearGradient(0,1200,0,0);
	grd.addColorStop(1, "#96e2d6");
	grd.addColorStop(0, "#3fbda8");
	return {
	    labels: ['12 AM', '', '', '', '', '', '6', '', '', '', '', '', '12 PM', '', '', '', '', '', '6'],
	    datasets: [
		{
		    label: '# of Tics',
		    data: [12, 19, 3, 5, 2, 3, 7, 19, 4, 9, 1, 12, 5, 14, 6, 18, 3, 9, 12, 4],
		    backgroundColor: grd,
		    borderWidth: 0,
		},
	    ],
	}
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
		<div className="chart-wrapper">
		</div>
		    <Chart data={data} />

	    </IonContent>
	</IonPage>

    );
};

export default Analyze;


