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
let startedLogging = false; // have we started to log data?


const createConnectedListener = () => {
	if (!connectedListenerMade) {
		connectedListenerMade = true;
		console.log("CreateConnectedListener made.");
		MetawearCapacitor.addListener('successfulConnection', () => {
			if (!connected) {
				connected = true;
				console.log('JS knows that we are connected!');
				startLogging();
			}
		});
	}
}

const startLogging = () => {
	if (!startedLogging) {
		startedLogging = true;

		MetawearCapacitor.createDataFiles().then((successful) => {
			if (successful.successful)
			{
				console.log('Data files created!');
				MetawearCapacitor.startData().then(() => {
					console.log('Running startData did not error.');
				}).catch(err => {
					console.log("Error while starting data logging:")
					console.error(err);
				});
			}
			else
			{
				console.log("Error while making data files.");
			}
		}).catch(err => {
			console.log("Error while making data files:")
			console.error(err);
		});
	}
}

const See = () => {
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
					<div className={pageStyles.title}> see </div>
					<hr className={pageStyles.sep} />
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
