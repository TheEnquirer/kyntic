import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonRange, IonIcon,
    IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonInput, IonTextarea, IonLabel,
    IonButton
} from '@ionic/react';
import { happy, sad, bed, batteryDead, batteryCharging } from 'ionicons/icons';
import React, { useState } from "react"
import { Line, Bar } from 'react-chartjs-2'

const Chart = (props) => {
    const options = {
	scales: {
	    yAxes: [
		{
		    ticks: {
			beginAtZero: true,
		    },
		},
	    ],
	},
	maintainAspectRatio: false,
	responsive: true,
    };
    return (
	<IonContent>
	    {
	    // <Line data={props.data} />
	    }
	    <Bar data={props.data} options={options}
		height={0.1}
		width={1}
	    />
	</IonContent>

    );
};

export default Chart;


