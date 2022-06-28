// 3. pull down log ids from server (and temporarily make them nil in server so they don't get pulled down again)
// 4. request for log 
// 5. listener for log
// 6. shove log to server


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
import moment from "moment";
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import db from '../../lib/db';
import supabaseClient from '../../lib/supabase';
import { withRouter } from 'next/router';
export default withRouter(class Sync extends React.Component {

	// TODO: figure out how ionic toasts work in react so that we can alert the user

	constructor(props) {
        super(props);
		this.state = {
			connectCalled: false, // have we asked the plugin to connect?
			connected: false, // have we been told by the plugin that we have successfully connected?
			startedLogging: false, // have we started to log data? 
			connectedListenerMade: false, // have we made a listener that hears when we successfully connected?
			accelLogListenerMade: false, // have we made a listener that listens for the accel log ID?
			gyroLogListenerMade: false, // have we made a listener that listens for the gyro log ID?
			accel: null, // last accel data point
			gyro: null, // last gyro data point
			path: null, // TODO: reset path to null once done logging
			error: null
		}
		this.accelUpdated = false;
		this.gyroUpdated = false;
		this.user = supabaseClient.auth.user()
	    //console.log(
		//if (!user) router.push('/tabs')
		if (this.user && this.props.router.pathname == "/sign-in") {
			this.props.router.push('/tabs')
		}
    };

	componentDidMount() { db(); /* db init */ }

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
	 * Creates a listener to see if we have started on-board logging accel data.
	 */
	createAccelLogListener() {
		if (!this.state.accelLogListenerMade) {
			this.setState({accelLogListenerMade: true});
			console.log("CreateAccelLogListener made.");
			MetawearCapacitor.addListener('accelLogID', (data) => {
				let accelLogID = data["ID"];
				let time = data["time"];
				console.log(`JS: accelLogID: ${accelLogID}, time: ${time}`);
				db.setUserData({recordingStartTime: time});
			});
		}
	}

	/**
	 * Creates a listener to see if we have started on-board logging gyro data.
	 */
	createGyroLogListener() {
		if (!this.state.gyroLogListenerMade) {
			this.setState({gyroLogListenerMade: true});
			console.log("CreateGyroLogListener made.");
			MetawearCapacitor.addListener('gyroLogID', (data) => {
				let gyroLogID = data["ID"];
				let time = data["time"];
				console.log(`JS: gyroLogID: ${gyroLogID}, time: ${time}`);
				db.setUserData({recordingStartTime: time});
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
	}

	/**
	 * Gyro data stream from native code.
	 */
	createGyroDataListener() {
		MetawearCapacitor.addListener('gyroData', (gyro) => {
			this.setState({gyro: gyro})
			this.gyroUpdated = true
			// this.shouldWrite(); // now we use on board logging
			console.log(`JS: gyroData: (${gyro["x"]}, ${gyro["y"]}, ${gyro["z"]})`);
			// purely for display purposes 
		});
	}

	/**
	 * Accel data stream from native code.
	 */
	createAccelDataListener() {
		MetawearCapacitor.addListener('accelData', (accel) => {
			this.setState({accel: accel})
			this.accelUpdated = true
			// this.shouldWrite(); // now we use on board logging
			console.log(`JS: accel: (${accel["x"]}, ${accel["y"]}, ${accel["z"]})`);
			// purely for display purposes 
		});
	}

	/**
	 * DEPRECATED.
	 * Should we write to the data file?
	 */
	shouldWrite() {
		if (this.gyroUpdated && this.accelUpdated)
		{
			this.gyroUpdated = false, this.accelUpdated = false;
			this.writeFile(this.state.accel, this.state.gyro)
		}
	}

	/**
	 * DEPRECATED.
	 * Create a data file to write to. 
	 */
	createDataFile() {
		let path = (new Date()).getTime().toString();
		return Filesystem.writeFile({
			path: path,
			data: "!",
			directory: Directory.Data,
			encoding: Encoding.UTF8
		}).then(() => {
			console.log("Successfully created data file in JS!")
			this.setState({path: path})
		}).catch((err) => {
			console.error(err);
			this.setState({error: err.toString()})
			setTimeout(() =>
			{
				this.setState({error: null})
			}, 3000)
		})
	}

	/**
	 * 
	 * DEPRECATED.
	 * Write acceleration and gyroscope data to datafile.
	 * @param {*} accel 
	 * @param {*} gyro 
	 */
	async writeFile(accel, gyro) {
		// data format: [(a_x,a_y,a_z):(g_x,g_y,g_z)];
		// begginning of data file is a !
		if (!this.state.path)
		{
			await this.createDataFile();
		}
		let data = `[(${accel["x"]},${accel["y"]},${accel["z"]}):(${gyro["x"]},${gyro["y"]},${gyro["z"]})];`
		try {
			await Filesystem.appendFile({
				path: this.state.path,
				data: data,
				directory: Directory.Data,
				encoding: Encoding.UTF8
			})
		} catch (e) {
			console.error(`Error while appending: ${e}`)
			this.setState({error: err.toString()})
			setTimeout(() =>
			{
				this.setState({error: null})
			}, 3000)
		}
	}

	async uploadToServer() {
		console.log(`Going to uplaod datafile "${this.state.path}".`)
		if (!this.state.path) { console.log("No datafile path ;("); return; }
		let data;
		try {
			console.log("Let's read the datafile.")
			data = (await Filesystem.readFile({
				path: this.state.path,
				directory: Directory.Data
			})).data
			console.log("Successfully read data file.")
		} catch (e) {
			console.error(`Error while reading data from local file: ${e}`)
			this.setState({error: e.toString()})
			setTimeout(() =>
			{
				this.setState({error: null})
			}, 3000)
		}
		console.log("Calling db upload.")
		if (await db.uploadData(this.state.path, data)) { // db.uploadData will either return null or an error.
			console.error(`Error while uploading data to server :(`)
			this.setState({error: "Unable to upload data to server."})
			setTimeout(() =>
			{
				this.setState({error: null})
			}, 3000)
		}
		console.log("Done uploading to server!")
	}

	async uploadLogToServer() {

	}

	async connectButton() {
		if (!this.state.connectCalled) {
			this.setState({connectCalled: true});
			await this.createDataFile();
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
		this.createAccelLogListener(); // have we successfully begun on-board accel logging?
		this.createGyroLogListener(); // have we successfully begun on-board gyro logging?
	}

	stopButton()
	{
		MetawearCapacitor.stopData()
			.then(async () => {
				console.log("JS: disconnected.")
				console.log(`Datafile path: ${this.state.path}`)
				await this.uploadToServer()
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
		    button = <IonButton style={{"--box-shadow":"none"}}onClick={() => this.connectButton()} expand='block'>record<IonIcon slot="end" shadow="none" icon="bluetooth"></IonIcon></IonButton>
		}

		return (
			<IonPage class="plt-android plt-mobile md" mode="md">
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
					}
				    <>
					{button}
					<div class="text-gray-800 font-bold flex text-center align-center content-centor justify-center flex-col p-2 mt-4 rounded bg-green-400"
					    onClick={{
						// contents go here @nick
					    }}
					>
					    retrieve sensor data
					</div>
				    </>
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
					{this.state.error && (<IonFooter><div className="absolute w-48 p-3 mt-12 font-bold text-center text-red-700 bg-red-300 rounded top-14 left-1/2 transform -translate-x-1/2 "> {this.state.error} </div></IonFooter>)}
				    <hr class="border-1 border-gray-800 mt-8"/>
					<div class="border-red-500 flex flex-row border-0 mt-3 text-black text-3xl mt-5"
					    onClick={() => {
						this.props.router.push('/account')
					    }}
					> <IonIcon icon="settings-outline"></IonIcon>
					    <span class="text-lg ml-2 font-bold">
						settings
					    </span>
					</div>
				    <div class="text-gray-200 text-center bg-gray-700 p-2 rounded-lg mt-4"
					onClick={() => {
					    console.log(db.getLogTimestamp());
					}}
				    > test setting user data recording start timestamp </div>
				</IonContent>
			</IonPage>
		);
	}
})
