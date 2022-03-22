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
		backdropColor: 'rgba(255, 255, 255, 0)'

	    }
	}
    },

    scale: {
	ticks: {
	    maxTicksLimit: 4
	}
    }
};

export default function DayGraph(props) {
    const [localdata, setLocalData] = useState(data)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => { // load the data
	db()
	let ldata = false
	db.getDataFromRange(
	    [
		moment().subtract(1, 'days').format(),
		moment().subtract(0, 'days').format()
	    ]).then(e => {
		ldata = e
		console.log(e)
	    })
	if (ldata.length == 0) { console.log("no data today!"); return } // deal with this later
	console.log(ldata, "tf?")

    }, [])

    const data = {
	labels: ['severity', 'mood', 'sleep', 'screen-time', 'exercise'],
	datasets: [
	    {
		label: [],
		data: [1, 1.2, 1.3, 1.4, 1.5],
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
