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
import { useState, useEffect } from 'react';
import pageStyles from '../../styles/Pages.module.css';
import { MetawearCapacitor } from 'metawear-capacitor';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import db from '../../lib/db'
import moment from "moment";
import DayGraph from '../ui/DayGraph';
import RangeGraph from '../ui/RangeGraph';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { useSpring, animated } from 'react-spring'


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
    useEffect(() => {
	db();
	//db.getDataFromRange([moment().subtract(1, 'days').format(), moment().subtract(0, 'days').format()]).then(e => {
	//    console.log(e)
	//})

    }, [])

    let target = [moment(), moment()]

    const [datepickerState, setDatepickerState] = useState([
	{
	    startDate: new Date(),
	    endDate: new Date(),
	    key: 'selection'
	}
    ]);

    const [dateRange, setDateRange] = useState([moment(), moment()])
    const [rangeText, setRangeText] = useState(["day", moment().format("dddd, MMM Do").toLowerCase()])

    const [showPicker, setShowPicker] = useState(false)

    const handleNewDates = (startDate, endDate) => {
	// check for a day
	if (startDate.getTime() == endDate.getTime()) {
	    setRangeText(["day", moment(startDate).format("dddd, MMM Do").toLowerCase()])
	} else {
	    setRangeText(["range", moment(startDate).format("MMM Do").toLowerCase() + " - " + moment(endDate).format("MMM Do").toLowerCase()])
	}
    }

    return (
	<IonPage>
	    <IonToolbar>
		<IonTitle>
		    <div className={pageStyles.title}> see </div>
		    <hr className={pageStyles.sep} />
		</IonTitle>
	    </IonToolbar>
	    <IonContent className="ion-padding" fullscreen>
		{/*<IonHeader collapse="condense">
		    <IonToolbar>
			<IonTitle size="large">see?</IonTitle>
		    </IonToolbar>
		</IonHeader>*/}
		<div className={pageStyles.date}
		    onClick={() => {
			if (showPicker) {
			    setDateRange([datepickerState[0].startDate, datepickerState[0].endDate])
			    handleNewDates(datepickerState[0].startDate, datepickerState[0].endDate)
			    console.log("showing", datepickerState)
			}
			setShowPicker(!showPicker)
		    }}
		>
		    <span className="">{rangeText[0]}</span> <span className="p-1 ml-1 mr-3 text-sm font-black bg-gray-600 rounded">/</span>
		    <span className="font-thin">{rangeText[1]}</span>
		</div>
		<div class="mt-4 absolute shadow-2xl rounded"
		    style={{
			//transform: "translateY(-100px)",
			//zIndex: "-100",
		    }}
		>
		    {showPicker?
			<>
			<DateRange
			    editableDateInputs={true}
			    onChange={item => {
				setDatepickerState([item.selection])
				console.log(item)
			    }}
			    moveRangeOnFirstSelection={false}
			    ranges={datepickerState}
			    disabledDay={(d) => {
				return d > new Date()
			    }}
			/>
			    <div class="text-center bg-gray-400 p-1 font-bold"

				onClick={() => {
				    if (showPicker) {
					setDateRange([datepickerState[0].startDate, datepickerState[0].endDate])
					handleNewDates(datepickerState[0].startDate, datepickerState[0].endDate)
					//console.log("showing", datepickerState)
				    }
				    setShowPicker(!showPicker)
				}}
			    >done</div>
			</>
			: "" }
		</div>
		{/*//{console.log(dateRange[0], "whee")}*/}
		{(rangeText[0] == "day") ?
		    <DayGraph date={dateRange[0]}/> :
		    <RangeGraph start={dateRange[0]} end={dateRange[1]} /> }
	    </IonContent>
	</IonPage>
    );
};

export default See;
