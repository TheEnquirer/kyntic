import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonRange, IonIcon,
    IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonInput, IonTextarea, IonLabel,
    IonButton
} from '@ionic/react';
import { happy, sad, bed, batteryDead, batteryCharging } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Log.css';
import { Controlled as CodeMirror } from 'react-codemirror2'
import React, { useState } from "react"

const Log = () => {
    const [text, setText] = useState("")
    return (
	<IonPage>
	    <IonHeader>
		<IonToolbar>
		    <IonTitle>Log</IonTitle>
		</IonToolbar>
	    </IonHeader>
	    <IonContent fullscreen>
		<IonHeader collapse="condense">
		    <IonToolbar>
			<IonTitle size="large">Log</IonTitle>
		    </IonToolbar>
		</IonHeader>

		<IonCard>
		    <IonCardHeader>
			<IonCardSubtitle>How are you feeling?</IonCardSubtitle>
			<IonCardTitle>Mood</IonCardTitle>
		    </IonCardHeader>
		    <IonItem>
			<IonRange min={0} max={100} step={1} snaps={false} color="tertiary" />
			<IonIcon slot="start" icon={sad} />
			<IonIcon slot="end" icon={happy} />
		    </IonItem>
		</IonCard>


		<IonCard>
		    <IonCardHeader>
			<IonCardSubtitle>How many hours of sleep did you get?</IonCardSubtitle>
			<IonCardTitle>Sleep</IonCardTitle>
		    </IonCardHeader>
		    <IonItem>
			<IonRange min={0} max={10} step={1} pin={true} snaps={true} color="secondary" />
			<IonIcon size="small" slot="start" icon={bed} />
			<IonIcon slot="end" icon={bed} />
		    </IonItem>
		</IonCard>

		<IonCard>
		    <IonCardHeader>
			<IonCardSubtitle>How much energy do you have?</IonCardSubtitle>
			<IonCardTitle>Energy</IonCardTitle>
		    </IonCardHeader>
		    <IonItem>
			<IonRange min={0} max={100} step={1} snaps={false} color="warning" />
			<IonIcon slot="start" icon={batteryDead} />
			<IonIcon slot="end" icon={batteryCharging} />
		    </IonItem>
		</IonCard>

		<IonCard>
		    <IonCardHeader>
			<IonCardSubtitle>What happened today?</IonCardSubtitle>
			<IonCardTitle>Events</IonCardTitle>
		    </IonCardHeader>
		    <IonItem>
			<IonTextarea
			    placeholder="Description..."
			    value={text}
			    onIonChange={e => setText(e.detail.value)}
			    autoGrow={true}
			    spellCheck={true}
			    className="input"
			></IonTextarea>
		    </IonItem>
		</IonCard>
		<div className="submit-wrapper">
	    <IonButton color="primary" expand={"block"} className="submit" mode="ios">Record</IonButton>
		</div>
	    </IonContent>
	</IonPage>
    );
};

export default Log;

