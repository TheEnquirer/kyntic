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
    }
};

export default function DayGraph(props) {
    const [localdata, setLocalData] = useState([0, 0, 0, 0, 0, 0])
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
		console.log(ldata, "wheee")
		let normData = dataNormalizer(ldata)
		setLocalData(normData)
	    })
	if (ldata.length == 0) { console.log("no data today!"); return } // deal with this later
	console.log(ldata, "tf?")

    }, [])

    const dataNormalizer = (d) => {
	let normed = []
	normed.push(100 - d.perceived)
	normed.push(d.mood)
	normed.push(d.sleep * (100/11))
	normed.push(d.screenTime * (100/16))

	let etime = 0
	for (let i = 0; i < d.exercise.length; i++) {
	    etime += parseInt(d.exercise[i].h? d.exercise[i].h : 0) * 60 + parseInt(d.exercise[i].m? d.exercise[i].m : 0)
	}

	normed.push(90) // normalize this!
	//normed.push(etime) // normalize this!
	//normed.push(0) // this is **incredibally* janky but it will work for now
	//normed.push(0) //
	//normed.push(0) //
	//normed.push(0) //
	//normed.push(0) //
	console.log(normed)
	return normed
    }

    const data = {
	labels: ['severity', 'mood', 'sleep', 'screen-time', 'exercise'],
	datasets: [
	    {
		label: [],
		//data: [1, 1.2, 1.3, 1.4, 1.5],
		data: localdata,
		backgroundColor: 'rgba(178, 212, 167, 0.5)',
		//backgroundColor: 'red',
		borderColor: 'rgba(178, 212, 167, 1)',
		//borderColor: 'rgba(31, 40, 145, 0.8)',
		//borderColor: 'blue',
		borderWidth: 3,

	    },
	],
	options,
    };

    useEffect(() => {
	setLoaded(true)
    }, [])

    return (
	<div class="border-0 border-red-500">
	    <Radar data={data} options={options} />
	</div>
    )
}
