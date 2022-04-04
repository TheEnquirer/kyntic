import React, { useEffect, useRef, useState } from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import db from '../../lib/db'
import moment from "moment"
import subStyles from "../../styles/Sub.module.css"
import ExerciseBlock from "./ExerciseBlock";



ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);



export const options = {
    plugins: {
	legend: {
	    display: false,
	},
	title: {
	    display: false,
	},
    },

    scales: {
	r: {
	    ticks: {
		//display: false // this breaks it, sometimes! for some reason!
		callback: function(value, index, ticks) {
		    return ''
		},
		beginAtZero: true,
		max: 100,
		min: 0,
		suggestedMin: 0,
		suggestedMax: 100,
		backdropColor: 'rgba(255, 255, 255, 0)',
		stepSize: 50,
	    }
	}
    },

    scale: {
	ticks: {
	    //maxTicksLimit: 4,
	},
	min: 0,
	max: 100,

	pointLabels :{
	    fontStyle: "bold",
	}
    }
};

export default function DayGraph(props) {
    const [normedLocal, setNormedLocal] = useState([0, 0, 0, 0, 0, 0])
    const [localData, setLocalData] = useState(null)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => { // load the data
	db()
	let ldata = false
	db.getDataFromRange(
	    [
		moment().subtract(1, 'days').format(),
		moment().subtract(0, 'days').format()
	    ]).then(e => {
		ldata = e[0]
		let normData = dataNormalizer(ldata)
		setNormedLocal(normData)
		setLocalData(ldata)
		//console.log(ldata)
	    })
	if (ldata.length == 0) { console.log("no data today!"); return } // deal with this later

    }, [])

    const dataNormalizer = (d) => {
	if (d) {
	    let normed = []
	    normed.push(100 - d.perceived)
	    normed.push(d.mood)
	    normed.push(d.sleep * (100/11))
	    normed.push(d.screenTime * (100/16))

	    let etime = 0
	    if (d.exercise) {
		for (let i = 0; i < d.exercise.length; i++) {
		    etime += parseInt(d.exercise[i].h? d.exercise[i].h : 0) * 60 + parseInt(d.exercise[i].m? d.exercise[i].m : 0)
		}
	    }

	    etime = Math.min(etime, 100)
	    normed.push(etime) // normalize this!
	    return normed
	}
    }

    const data = {
	labels: ['severity', 'mood', 'sleep', 'screen-time', 'exercise'],
	datasets: [
	    {
		label: [],
		data: normedLocal,
		backgroundColor: 'rgba(178, 212, 167, 0.5)',
		borderColor: 'rgba(178, 212, 167, 1)',

		//backgroundColor: 'rgba(62,180,137, 0.5)',
		//borderColor: 'rgba(62,180,137,1)',

		borderWidth: 3,

	    },
	],
	options,
    };

    useEffect(() => {
	setLoaded(true)
    }, [])

    let temp = ["activity1", "activity2", "activity4", 'activity3', 'activity3', 'activity3']

    return (
	<div class="border-0 border-red-500 ">
	    <Radar data={data} options={options} />
	    <div class="flex flex-col h-full">
		    <p class="text-black">activities</p>
		    {/*<div class="bg-gray-900 h-full"> asdfafd </div>*/}
		<div class="flex flex-row justify-center border-dashed border-purple-300 space-x-3 flex-wrap pt-3 rounded-lg border-2 w-full">
		{/*{localData && localData.activities && localData.activities.map((e) =>*/}

		{(localData && localData.activities) && localData.activities.map((e) =>
		    <div class="text-gray-700 font-bold p-1 border-4 border-purple-100 rounded-lg mb-3">{e}</div>
		)}

		{/*notes*/}
		{/*//exercise*/}
		</div>

		    <p class="text-black">notes</p>
		<div className="flex flex-col -mt-2 border-0 border-red-300">
		    <textarea
			type="text"
			value={(localData && localData.notes) && localData.notes}
			onChange={(e) => {
			    //setNoteValue(e)
			    //props.setLoggingData("notes", e.target.value)
			}}
			class={subStyles.displayNoteBox}
			readOnly={true}
			placeholder={"any notes about today?"}
		    />
		</div>
		    <p class="text-black">exercise</p>
		{(localData && localData.exercise) && localData.exercise.map((e, i) => {
		    return (
			<div
			    class="text-black border-0 border-red-500 flex center content-center align-center items-center justify-center justify-items-center"
			>
			    <ExerciseBlock name={e.name} idx={i} edit={() => {}} len={ e.len } color={"red"}/>

			</div>
		    )
		})}
	    </div>
	</div>
    )
}
