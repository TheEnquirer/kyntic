import {
	IonPage,
	IonToolbar,
	IonTitle,
	IonButton,
	IonContent,
	IonProgressBar,
	IonIcon,
	IonToast
} from '@ionic/react';
import pageStyles from '../../styles/Pages.module.css';
import { MetawearCapacitor } from 'metawear-capacitor';
//import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

class Sync extends React.Component {
	
	// TODO: figure out how ionic toasts work in react so that we can alert the user

	constructor(props) {
        super(props);
		this.state = {
			connectCalled: false, // have we asked the plugin to connect?
			connected: false, // have we been told by the plugin that we have successfully connected?
			startedLogging: false, // have we started to log data? 
			connectedListenerMade: false // have we made a listener that hears when we successfully connected?
		}
    };

	/**
	 * Creates a listener to see if we have successfully connected to the sensor.
	 * If we have, call the startLogging function.
	 */
	createConnectedListener() {
		if (!this.state.connectedListenerMade) {
			this.setState({connectedListenerMade: true});
			console.log("CreateConnectedListener made.");
			MetawearCapacitor.addListener('successfulConnection', () => {
				if (!this.state.connected) {
					this.setState({connected: true});
					console.log('JS knows that we are connected!');
					this.startLogging();
				}
			});
		}
	}

	/**
	 * Attempts to create the data files.
	 * If we successfully create the files, start logging.
	 */
	startLogging() {
		if (!this.state.startedLogging) {
			this.setState({startedLogging: true});
			MetawearCapacitor.createDataFiles().then((successful) => {
				if (successful.successful) {
					console.log('JS: Data files created!');
					MetawearCapacitor.startData().then(() => {
						console.log('JS: Running startData did not error.');
						// TODO: tell the user that we are now logging
						this.createGyroDataListener();
						this.createAccelDataListener();
					}).catch(err => {
						console.log("JS: Error while starting data logging:")
						console.error(err);
						// TODO: alert the user
					});
				}
				else {
					console.log("JS: Error while making data files.");
					// TODO: alert the user
				}
			}).catch(err => {
				console.log("JS: Error while making data files:")
				console.error(err);
				// TODO: alert the user
			});
		}
	}

	/**
	 * Gyro data stream from native code.
	 */
	createGyroDataListener() {
		MetawearCapacitor.addListener('gyroData', (gyro) => {
			console.log(`JS: gyroData: (${gyro["x"]}, ${gyro["y"]}, ${gyro["z"]})`);
			// TODO: display for user to see
			// TODO: sync to server
		});
	}

	/**
	 * Accel data stream from native code.
	 */
	createAccelDataListener() {
		MetawearCapacitor.addListener('accelData', (accel) => {
			console.log(`JS: accel: (${accel["x"]}, ${accel["y"]}, ${accel["z"]})`);
			// TODO: display for user to see
			// TODO: sync to server
		});
	}

	// /**
	//  * Unsuccessfully tries to write the data to the filesystem.
	//  * @returns {Promise<WriteFileResult>}
	//  */
	// writeFile() {
	// 	console.log("JS: gonna try to write fileeee")
	// 	return Filesystem.writeFile({
	// 		path: 'accel.txt',
	// 		data: "test",
	// 		directory: Directory.Documents,
	// 		encoding: Encoding.UTF8,
	// 	});
	// };

	connectButton() {
		if (!this.state.connectCalled) {
			this.setState({connectCalled: true});
			MetawearCapacitor.connect()
				.then(async () => {
					console.log('Running connection did not error.');
				})
				.catch(err => {
					console.error(err);
					// TODO: alert the user that we couldn't connect
					this.setState({connectCalled: false});
				});
		}
		this.createConnectedListener(); // listens to see if we have successfully connected
	}

	render() {
		return (
			<IonPage>
				<IonToolbar>
					<IonTitle>
						<div className={pageStyles.title}> sync </div>
						<hr className={pageStyles.sep} />
					</IonTitle>
				</IonToolbar>
				<IonContent className="ion-padding" fullscreen>
					{
						// shows a loading indicator while we are connecting
						this.state.connectCalled && !this.state.connected &&
						<IonProgressBar type="indeterminate"></IonProgressBar>
						// <ion-icon slot="end" name="bluetooth"></ion-icon>
					}
					<IonButton onClick={() => this.connectButton()} expand='block'>
						Record 
						<IonIcon slot="end" name="bluetooth"></IonIcon>
					</IonButton>
				</IonContent>
			</IonPage>
		);
	}
}

export default Sync;
