import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import pageStyles from '../../styles/Pages.module.css';
import { MetawearCapacitor } from 'metawear-capacitor';
import supabaseClient from '../../lib/supabase';
import { withRouter } from 'next/router';
import db from '../../lib/db';
import React from 'react';
import {
	IonProgressBar,
	IonToolbar,
	IonContent,
	IonButton,
	IonFooter,
	IonTitle,
	IonPage,
	IonIcon,
	IonList
} from '@ionic/react';

export default withRouter(class Sync extends React.Component {

	// the IDs of the on-board log
	GYRO_LOG_ID = "angular-velocity"; 
	ACCEL_LOG_ID = "acceleration"; 

	constructor(props) {
        super(props);

		this.state = {
			connectCalled: false, // have we asked the plugin to connect?
			connected: false, // have we been told by the plugin that we have successfully connected?
			streaming: false, // have we started to log data? 
			accel: null, // last streamed accel data point
			gyro: null, // last streamed gyro data point
			error: null // error message if there is one
		}

		this.connectedListenerMade = false // have we made a listener that hears when we successfully connected?
		this.accelLogListenerMade = false // have we made a listener that listens for the accel log ID?
		this.gyroLogListenerMade = false // have we made a listener that listens for the gyro log ID?
		this.accelLogDownloadListenerMade = false // have we made a listener that listens for the accel log download?
		this.gyroLogDownloadListenerMade = false // have we made a listener that listens for the gyro log download?
		this.accelLogDownloadFinishedListenerMade = false // have we made a listener that listens for the accel log download finished?
		this.gyroLogDownloadFinishedListenerMade = false // have we made a listener that listens for the gyro log download finished?
		this.gyroLogDownloadFinished = false // have we finished downloading the accel log?
		this.accelLogDownloadFinished = false // have we finished downloading the gyro log?
		this.path = null // path to the file that we write the on-board log to
		this.logTime = null // time the log started
		this.user = supabaseClient.auth.user()
		this.callback = null // janky callback

		if (this.user && this.props.router.pathname == "/sign-in") {
			this.props.router.push('/tabs')
		}
    };

	componentDidMount() { db(); /* db init */ }


	/**
	 * Creates a listener to see if we have successfully connected to the sensor.
	 * If we have, call the startLogging function.
	 */
	createConnectedListener() {
		if (!this.connectedListenerMade) {
			this.connectedListenerMade = true;
			console.log("CreateConnectedListener made.");
			MetawearCapacitor.addListener('successfulConnection', () => {
				if (!this.state.connected) {
					this.setState({connected: true});
					console.log('JS knows that we are connected!');
					if (this.callback) { this.callback(); this.callback = null; }
					else { this.startStreamVis(); }
				}
			});
		}
	}

	/**
	 * Creates a listener to see if we have started on-board logging accel data.
	 */
	createAccelLogListener() {
		if (!this.accelLogListenerMade) {
			this.accelLogListenerMade = true;
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
		if (!this.gyroLogListenerMade) {
			this.gyroLogListenerMade = true;
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
	 * Start streaming real-time data and display on the screen.
	 */
	startStreamVis() {
		if (!this.state.streaming) {
			this.setState({streaming: true});
			console.log("JS: Starting stream vis.")
			MetawearCapacitor.startData().then(() => {
				console.log('JS: Running startData did not error.');
				this.createGyroDataListener();
				this.createAccelDataListener();
			}).catch(err => {
				console.log("JS: Error while starting data stream:")
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
	 * Real-time gyro data stream from native code.
	 * Purely for display purposes (user-satisfaction).
	 */
	createGyroDataListener() {
		MetawearCapacitor.addListener('gyroData', (gyro) => {
			this.setState({gyro: gyro})
			//console.log(`JS: gyroData: (${gyro["x"]}, ${gyro["y"]}, ${gyro["z"]})`);
		});
	}

	/**
	 * Real-time accel data stream from native code.
	 * Purely for display purposes (user-satisfaction).
	 */
	createAccelDataListener() {
		MetawearCapacitor.addListener('accelData', (accel) => {
			this.setState({accel: accel})
			//console.log(`JS: accel: (${accel["x"]}, ${accel["y"]}, ${accel["z"]})`);
		});
	}

	/**
	 * Create a data file to write to. 
	 * Now used for when we are creating a data file on the phone for the on-board logging.
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
	 * Write acceleration or gyroscope data to datafile.
	 * Now used for when we are writing to a data file on the phone for the on-board logging.
	 */
	async writeFile(datapoint, isAccel) {
		// data format: !a(x,y,z)a(x,y,z)...g(x,y,z)g(x,y,z)...;
		// begginning of data file is a !
		if (!this.state.path)
		{
			await this.createDataFile();
		}
		let data = isAccel ? `a(${datapoint["x"]},${datapoint["y"]},${datapoint["z"]})` : `g(${datapoint["x"]},${datapoint["y"]},${datapoint["z"]})`;
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
		await this.createDataFile(); // create a new data file for a later log
		if (await db.uploadData(this.logTime, data)) { // db.uploadData will either return null or an error.
			console.error(`Error while uploading data to server :(`)
			this.setState({error: "Unable to upload data to server."})
			setTimeout(() =>
			{
				this.setState({error: null})
			}, 3000)
		}
		else 
		{
			this.logTime = null;
			console.log("Done uploading to server!")
		}
	}

	async createLogDownloadListeners() {
		if (!this.accelLogDownloadListenerMade) {
			this.accelLogDownloadListenerMade = true;
			MetawearCapacitor.addListener(`logData-${this.ACCEL_LOG_ID}`, (log) => {
				console.log(`JS: log accelData: (${log["x"]}, ${log["y"]}, ${log["z"]})`);
				this.writeFile(log, isAccel=true);
			})
		}
		if (!this.gyroLogDownloadListenerMade) {
			this.gyroLogDownloadListenerMade = true;
			MetawearCapacitor.addListener(`logData-${this.GYRO_LOG_ID}`, (log) => {
				console.log(`JS: log gyroData: (${log["x"]}, ${log["y"]}, ${log["z"]})`);
				this.writeFile(log, isAccel=false);
			})
		}
		if (!this.gyroLogDownloadFinishedListenerMade) {
			this.gyroLogDownloadFinishedListenerMade = true;
			MetawearCapacitor.addListener(`logFinished-${this.GYRO_LOG_ID}`, () => {
				this.gyroLogDownloadFinished = true;
				console.log("JS: gyro log download finished.");
				if (!this.accelLogDownloadFinished) {
					MetawearCapacitor.downloadData({ID: this.ACCEL_LOG_ID}) // start downloading accel data, we can only download one at a time
					.then(() => {})
					.catch(err => {
						console.error(err);
						this.setState({error: err.toString()})
						setTimeout(() =>
						{
							this.setState({error: null})
						}, 3000)
					})
				}
			})
		}
		if (!this.accelLogDownloadFinishedListenerMade) {
			this.accelLogDownloadFinishedListenerMade = true;
			MetawearCapacitor.addListener(`logFinished-${this.ACCEL_LOG_ID}`, () => {
				this.accelLogDownloadFinished = true;
				console.log("JS: accel log download finished.");
				if (!this.gyroLogDownloadFinished) {
					MetawearCapacitor.downloadData({ID: this.GYRO_LOG_ID}) // start downloading gyro data, we can only download one at a time
						.then(() => {})
						.catch(err => {
							console.error(err);
							this.setState({error: err.toString()})
							setTimeout(() =>
							{
								this.setState({error: null})
							}, 3000)
						})
				}
			})
		}
	}

	/**
	 * Button to upload on-board log to server.
	 */
	async uploadLogToServer() {
		await db.setUserData({recordingStartTime: 1}); // TODO: remove
		let logTime = await db.getLogTimestamp()
		this.logTime = logTime[0].recordingStartTime;
		if (this.logTime) {
			console.log("JS: Log time: " + this.logTime)
			this.createLogDownloadListeners(); // create listeners for log download
			await this.recordButton();
			this.callback = () => {
				MetawearCapacitor.downloadData({ID: this.ACCEL_LOG_ID}) // download accel log, we will download gyro log after
					.then(() => {})
					.catch(err => {
						console.error(err);
						this.setState({error: err.toString()})
						setTimeout(() =>
						{
							this.setState({error: null})
						}, 3000)
					})
			}
		}
		else
		{
			console.log("JS: ERR: No log time found.")
		}
	}

	async recordButton() {
		if (!this.state.connectCalled) {
			this.setState({connectCalled: true});
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
				//console.log(`Datafile path: ${this.state.path}`)
				//await this.uploadToServer()
				this.setState({connectCalled: false, connected: false, streaming: false, path: null})
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
		if (this.gyroLogDownloadFinished && this.accelLogDownloadFinished) {
			this.gyroLogDownloadFinished = false;
			this.accelLogDownloadFinished = false;
			this.uploadToServer().then(() => {
				db.setUserData({recordingStartTime: null}) // reset the log time
			})
		}

		let button;
		if (this.state.streaming)
		{
			button = <IonButton onClick={() => this.stopButton()}>Stop</IonButton>
		}
		else
		{
		    button = <IonButton style={{"--box-shadow":"none"}}onClick={() => this.recordButton()} expand='block'>record<IonIcon slot="end" shadow="none" icon="bluetooth"></IonIcon></IonButton>
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
					    onClick={ () => {
						this.uploadLogToServer();
					    }}
					>
					    retrieve sensor data
					</div>
				    </>
					{this.state.gyro && this.state.streaming &&
						<IonList>
							Gyroscope: {this.state.gyro["x"]}, {this.state.gyro["y"]}, {this.state.gyro["z"]}
						</IonList>
					}
					{this.state.accel && this.state.streaming &&
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
				    {/*<div class="text-gray-200 text-center bg-gray-700 p-2 rounded-lg mt-4"
					onClick={() => {
					    console.log(db.getLogTimestamp());
					}}
				    > test setting user data recording start timestamp </div>*/}
				</IonContent>
			</IonPage>
		);
	}
})
