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
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

let connectedListenerMade = false; // when we have made a listener to listen if we have successfully connected 
let connectCalled = false; // have we asked the plugin to connect?
let connected = false; // have we been told by the plugin that we have successfully connected?
let startedLogging = false; // have we started to log data?

/**
 * Creates a listener to see if we have successfully connected to the sensor.
 * If we have, call the startLogging function.
 */
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

/**
 * Attempts to create the data files.
 * If we successfully create the files, start logging.
 */
const startLogging = () => {
	if (!startedLogging) {
		startedLogging = true;

		MetawearCapacitor.createDataFiles().then((successful) => {
			if (successful.successful) {
				console.log('JS: Data files created!');
				MetawearCapacitor.startData().then(() => {
					console.log('JS: Running startData did not error.');
					createGyroDataListener();
					createAccelDataListener();
				}).catch(err => {
					console.log("JS: Error while starting data logging:")
					console.error(err);
				});
			}
			else {
				console.log("JS: Error while making data files.");
			}
		}).catch(err => {
			console.log("JS: Error while making data files:")
			console.error(err);
		});
	}
}

/**
 * Gyro data stream from native code.
 */
const createGyroDataListener = () => {
	MetawearCapacitor.addListener('gyroData', (gyro) => {
		console.log(`JS: gyroData: (${gyro["x"]}, ${gyro["y"]}, ${gyro["z"]})`);
	});
}

/**
 * Accel data stream from native code.
 */
 const createAccelDataListener = () => {
	MetawearCapacitor.addListener('accelData', (accel) => {
		console.log(`JS: accel: (${accel["x"]}, ${accel["y"]}, ${accel["z"]})`);
	});
}

const writeFile = () => {
	console.log("JS: gonna try to write fileeee")
	return Filesystem.writeFile({
		path: 'accel.txt',
		data: "test",
		directory: Directory.Documents,
		encoding: Encoding.UTF8,
	});
};

const See = () => {
	// connect to the sensor
	if (!connectCalled) {
		// this just crashes the app...
		// writeFile.then(() => {
		// 	console.log("lets gooooo")
		// }).catch(err => {
		// 	console.log("Error while trying to use cap file plugin:")
		// 	console.log(err);
		// });
		MetawearCapacitor.connect()
			.then(async () => {
				console.log('JS: Running connection did not error.');
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
