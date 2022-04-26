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
import db from '../../lib/db'
import moment from "moment";
import DayGraph from '../ui/DayGraph';
import RangeGraph from '../ui/RangeGraph';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { useSpring, animated } from 'react-spring'

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
