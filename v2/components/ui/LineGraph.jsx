import React, { useEffect, useRef, useState } from 'react';
import db from '../../lib/db'
import moment from "moment"
import subStyles from "../../styles/Sub.module.css"
import ExerciseBlock from "./ExerciseBlock";

//import {
//    Chart as ChartJS,
//    RadialLinearScale,
//    PointElement,
//    LineElement,
//    Filler,
//    Tooltip,
//    Legend,
//} from 'chart.js';
//import { Line } from 'react-chartjs-2';

//ChartJS.register(
//    CategoryScale,
//    LinearScale,
//    PointElement,
//    LineElement,
//    Title,
//    Tooltip,
//    Legend
//);

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)


export default function LineGraph(props) {

    let parsedData = props.parsedData

    const nameToIndex = name => {
	return {
	    "perceived severity": 0,
	    "mood": 1,
	    "sleep": 2,
	    "screen time": 3,
	    "exercise": 4,
	}[name]
    }

    const nameToColors = name => {
	return {
	    "perceived severity": ['rgba(229, 205, 143, 0.5)', 'rgba(229, 205, 143, 1)'],
	    "mood": ['rgba(178, 212, 167, 0.5)', 'rgba(178, 212, 167, 1)'],
	    "sleep": ['rgba(167, 174, 212, 0.5)', 'rgba(167, 174, 212, 1)'],
	    "screen time": ['rgba(167, 212, 207, 0.5)', 'rgba(167, 212, 207, 1)'],
	    "exercise": ['rgba(212, 167, 167, 0.5)', 'rgba(212, 167, 167, 1)'],
	}[name]
    }


    let locatedData = parsedData.map((d) => { return {
	x: (props.xAxis == "time")? (d.date.format("x")/8.64e+7) - parsedData.at(-1).date.format("x")/8.64e+7 : d.values[nameToIndex(props.xAxis)],
	y: d.values[nameToIndex(props.yAxis)]
    }}).sort((a, b) => a.x - b.x)

    let locatedTimeData = parsedData.map((d) => { return {
	x: (d.date.format("x")/8.64e+7) - parsedData.at(-1).date.format("x")/8.64e+7,
	y: d.values[nameToIndex(props.yAxis)]
    }}).sort((a, b) => a.x - b.x)
    console.log(locatedTimeData, "loc")


    const data = {
	labels: Array(parsedData.length).fill(""),
	datasets: [
	    {
		label: props.datasetName, // TODO fill this in later based on the axis
		data: locatedData,
		//data: locatedTimeData,
		fill: true,
		cubicInterpolationMode: 'monotone',
		tension: 0.4,
		backgroundColor: nameToColors(`${(props.xAxis == "time")? props.yAxis : props.xAxis}`)[0],
		borderColor: nameToColors(`${(props.xAxis == "time")? props.yAxis : props.xAxis}`)[1],
		//borderColor: nameToColors(((props.xAxis == "time")? props.yAxis : props.xAxis)[1]),

		borderWidth: 3,
	    },
	],
	config,
    }

    const config = {
	type: 'line',
	//skipLabels: true,
	data: data,
	plugins: {
	    legend: {
		display: false,
	    },
	    title: {
		display: false,
	    },
	},

	    responsive: true,
	    plugins: {
		title: {
		    display: false,
		},
		legend: {
		    display: false,
		}
	    },
	scales: {
		x: {
		    type: 'linear',
		    display: true,
		    title: {
			display: true,
			text: props.xAxis,
			//padding: -5,
		    },
		    ticks: {
			display: true,
			//stepSize: 0,
			callback: function(value, index, ticks) {
			    return ((value % 2 != "a")? value : "");
			}
		    }
		},
	    y: {
		    type: 'linear',
		title: {
		    display: true,
		    text: props.yAxis,
		},
		ticks: {
		    display: true,
		    callback: function(value, index, ticks) {
			return '' + value;
		    },
		}
	    },
	}
    };


    return (
	<div class="border-0 border-red-500 mt-5">
	    {parsedData[0] && <Line data={data} config={config} options={config}/>}
	</div>
    )


}
