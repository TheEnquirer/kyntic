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
import { MetawearCapacitor } from 'metawear-capacitor';

let connectedListenerMade = false; // when we have made a listener to listen if we have successfully connected 
let connectCalled = false; // have we asked the plugin to connect?
let connected = false; // have we been told by the plugin that we have successfully connected?

const createConnectedListener = () => {
	if (!connectedListenerMade) {
		connectedListenerMade = true;
		console.log("CreateConnectedListener made.");
		MetawearCapacitor.addListener('successfulConnection', () => {
			if (!connected) {
				connected = true;
				console.log('JS knows that we are connected!');
			}
		});
	}
}

const Sync = () => {
	// connect to the sensor
	if (!connectCalled) {
		MetawearCapacitor.connect()
			.then(async () => {
				console.log('Running connection did not error.');
			})
			.catch(err => {
				console.error(err);
			});
	}
	createConnectedListener(); // listens to see if we have successfully connected

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
