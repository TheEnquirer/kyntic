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
	    "perceived": 0,
	    "mood": 1,
	    "sleep": 2,
	    "screenTime": 3,
	    "exercise": 4,
	}[name]
    }

    const nameToColors = name => {
	return {
	    "perceived": ['rgba(229, 205, 143, 0.5)', 'rgba(229, 205, 143, 1)'],
	    "mood": ['rgba(178, 212, 167, 0.5)', 'rgba(178, 212, 167, 1)'],
	    "sleep": ['rgba(167, 174, 212, 0.5)', 'rgba(167, 174, 212, 1)'],
	    "screenTime": ['rgba(167, 212, 207, 0.5)', 'rgba(167, 212, 207, 1)'],
	    "exercise": ['rgba(212, 167, 167, 0.5)', 'rgba(212, 167, 167, 1)'],
	}[name]
    }


    let locatedData = parsedData.map((d) => { return {
	x: d.values[nameToIndex(props.xAxis)],
	y: d.values[nameToIndex(props.yAxis)]
    }}).sort((a, b) => a.x - b.x)

    let locatedData2 = parsedData.map((d) => { return {
	x: d.values[nameToIndex(props.xAxis2)],
	y: d.values[nameToIndex(props.yAxis2)]
    }}).sort((a, b) => a.x - b.x)


    const data = {
	labels: Array(parsedData.length).fill(""),
	datasets: [
	    {
		label: props.datasetName, // TODO fill this in later based on the axis
		//data: [0, 2,2, 4, 5],
		//data: parsedData.map((d) => { return { x: d.sleep, y: d.sleep }}),
		data: locatedData,
		//borderColor: Utils.CHART_COLORS.red,
		fill: true,
		cubicInterpolationMode: 'monotone',
		tension: 0.4,
		backgroundColor: nameToColors(props.xAxis)[0],
		borderColor: nameToColors(props.xAxis)[1],
		borderWidth: 3,
	    },
	    {
		label: props.datasetName, // TODO fill this in later based on the axis
		//data: [0, 2,2, 4, 5],
		//data: parsedData.map((d) => { return { x: d.sleep, y: d.sleep }}),
		data: locatedData2,
		//borderColor: Utils.CHART_COLORS.red,
		fill: true,
		cubicInterpolationMode: 'monotone',
		tension: 0.4,
		backgroundColor: nameToColors(props.xAxis2)[0],
		borderColor: nameToColors(props.xAxis2)[1],
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
	    //xAxes: [{
	    //    type: 'linear',
	    //    ticks: {
	    //        suggestedMin: 0,
	    //        suggestedMax: 10,
	    //        stepSize: 2 //interval between ticks
	    //    }
	    //}],
	    //yAxes: [{
	    //    display: true,
	    //    ticks: {
	    //        suggestedMin: 70,
	    //        suggestedMax: 100
	    //    }
	    //}]
	}
    };


    return (
	<div class="border-0 border-red-500 mt-5">
	    {parsedData[0] && <Line data={data} config={config} options={config}/>}
	</div>
    )


}
