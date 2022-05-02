import {
	IonPage,
	IonToolbar,
	IonTitle,
	IonButton,
	IonContent,
	IonProgressBar,
	IonIcon,
	IonToast,
	IonList,
	IonFooter
} from '@ionic/react';
import pageStyles from '../../styles/Pages.module.css';
import { MetawearCapacitor } from 'metawear-capacitor';
import React from 'react';

import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

class Sync extends React.Component {

	// TODO: figure out how ionic toasts work in react so that we can alert the user

	constructor(props) {
        super(props);
		this.state = {
			connectCalled: false, // have we asked the plugin to connect?
			connected: false, // have we been told by the plugin that we have successfully connected?
			startedLogging: false, // have we started to log data? 
			connectedListenerMade: false, // have we made a listener that hears when we successfully connected?
			accel: null, // last accel data point
			gyro: null, // last gyro data point
			path: null, // TODO: reset path to null once done logging
			error: null
		}
		this.accelUpdated = false;
		this.gyroUpdated = false;
    };

	// ionic doesn't unmount tabs when they are switched, so this would not work
	// async componentWillUnmount()
	// {
	// 	// cleanup time!
	// 	// they'll have to reconnect to sensor
	// 	await MetawearCapacitor.disconnect();
	// }

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
						this.setState({error: err.toString()})
						setTimeout(() =>
						{
							this.setState({error: null})
						}, 3000)
					});
				}
				else {
					console.log("JS: Error while making data files.");
					this.setState({error: err.toString()})
					setTimeout(() =>
					{
						this.setState({error: null})
					}, 3000)
				}
			}).catch(err => {
				console.log("JS: Error while making data files:")
				console.error(err);
				this.setState({error: err.toString()})
				setTimeout(() =>
				{
					this.setState({error: null})
				}, 3000)
			});
		}
	}

	/**
	 * Gyro data stream from native code.
	 */
	createGyroDataListener() {
		MetawearCapacitor.addListener('gyroData', (gyro) => {
			this.setState({gyro: gyro})
			this.gyroUpdated = true
			this.shouldWrite();
			console.log(`JS: gyroData: (${gyro["x"]}, ${gyro["y"]}, ${gyro["z"]})`);
			// TODO: sync to server
		});
	}

	/**
	 * Accel data stream from native code.
	 */
	createAccelDataListener() {
		MetawearCapacitor.addListener('accelData', (accel) => {
			this.setState({accel: accel})
			this.accelUpdated = true
			this.shouldWrite();
			console.log(`JS: accel: (${accel["x"]}, ${accel["y"]}, ${accel["z"]})`);
			// TODO: sync to server
		});
	}

	/**
	 * Should we write to the data file?
	 */
	shouldWrite() {
		if (this.gyroUpdated && this.accelUpdated)
		{
			this.gyroUpdated = false, this.accelUpdated = false;
			this.writeFile(this.state.accel, this.state.gyro)
		}
	}

	createDataFile() {
		let path = (new Date()).getTime().toString();
		return Filesystem.writeFile({
			path: path,
			data: "!",
			directory: Directory.Data,
			encoding: Encoding.UTF8
		}).then(() => {
			this.setState({path: path})
		})
	}

	/**
	 * 
	 * Write acceleration and gyroscope data to datafile.
	 * @param {*} accel 
	 * @param {*} gyro 
	 */
	async writeFile(accel, gyro) {
		// data format: [(a_x,a_y,a_z):(g_x,g_y,g_z)];
		// begginning of data file is a !
		if (!this.state.path)
		{
			try{
				await this.createDataFile();
			} catch (e)
			{
				console.error(err);
				this.setState({error: err.toString()})
				setTimeout(() =>
				{
					this.setState({error: null})
				}, 3000)
			}
		}
		let data = `[(${accel["x"]},${accel["y"]},${accel["z"]}):(${gyro["x"]},${gyro["y"]},${gyro["z"]})];`
		try {
			Filesystem.appendFile({
				path: path,
				data: data,
				directory: Directory.Data,
				encoding: Encoding.UTF8
			})
		} catch (e) {
			console.log(`Error while appending: ${e}`)
		}
	}

	connectButton() {
		if (!this.state.connectCalled) {
			this.setState({connectCalled: true});
			this.createDataFile();
			MetawearCapacitor.connect()
				.then(async () => {
					console.log('Running connection did not error.');
				})
				.catch(err => {
					console.error(err);
					this.setState({error: err.toString()})
					setTimeout(() =>
					{
						this.setState({error: null})
					}, 3000)
					this.setState({connectCalled: false});
				});
		}
		this.createConnectedListener(); // listens to see if we have successfully connected
	}

	stopButton()
	{
		MetawearCapacitor.disconnect()
			.then(async () => {
				this.setState({connectCalled: false, connected: false, startedLogging: false, path: null})
			})
			.catch(err => {
				console.error(err);
				this.setState({error: err.toString()})
				setTimeout(() =>
				{
					this.setState({error: null})
				}, 3000)
			})
	}

	render() 
	{
		let button;
		if (this.state.startedLogging)
		{
			button = <IonButton onClick={() => this.stopButton()}>Stop</IonButton>
		}
		else
		{
			button = <IonButton onClick={() => this.connectButton()} expand='block'>Record<IonIcon slot="end" icon="bluetooth"></IonIcon></IonButton>
		}

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
					{button}
					{this.state.gyro &&
						<IonList>
							Gyroscope: {this.state.gyro["x"]}, {this.state.gyro["y"]}, {this.state.gyro["z"]}
						</IonList>
					}
					{this.state.accel &&
						<IonList>
							Acceleration: {this.state.accel["x"]}, {this.state.accel["y"]}, {this.state.accel["z"]}
						</IonList>
					}
					{this.state.error && (<IonFooter><div className="absolute top-0 w-48 p-3 mt-12 font-bold text-center text-red-700 bg-red-300 rounded left-1/2 transform -translate-x-1/2 "> {this.state.error} </div></IonFooter>)}
				</IonContent>
			</IonPage>
		);
	}
}

export default Sync;
