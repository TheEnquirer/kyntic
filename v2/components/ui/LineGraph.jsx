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

    const nameToIndex = (name) => {
	return {
	    "perceived": 0,
	    "mood": 1,
	    "sleep": 2,
	    "screenTime": 3,
	    "exercise": 4,
	}[name]
    }


    let locatedData = parsedData.map((d) => { return {
	x: d.values[nameToIndex(props.xAxis)],
	y: d.values[nameToIndex(props.yAxis)]
    }}).sort((a, b) => a.x - b.x)
    console.log(locatedData)

    //locatedData = [
	//{
	//    x: 3,
	//    y: 2
	//},
	//{
	//    x: 4,
	//    y: 2
	//},
	//{
	//    x: 5,
	//    y: 3
	//},
	//{
	//    x: 3,
	//    y: 2
	//},
	//{
	//    x: 4,
	//    y: 3
	//},
	//{
	//    x: 0,
	//    y: 2
	//},
    //]

    //locatedData = [
	//{x: 86, y: 75.18181818181819},
	//{x: 91, y: 70.90909090909092},
	//{x: 100, y: 0},


	//{x: 100, y: 0},
	//{x: 91, y: 70.90909090909092},
	//{x: 86, y: 75.18181818181819},

	//{x: 78, y: 66.27272727272728}
    //]

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
		backgroundColor: 'rgba(178, 212, 167, 0.5)',
		borderColor: 'rgba(178, 212, 167, 1)',
		borderWidth: 3,
	    },
	    //{
	    //    label: '', // TODO fill this in later based on the axis
	    //    //data: [0, 2,2, 4, 5],
	    //    //data: parsedData.map((d) => { return { x: d.sleep, y: d.sleep }}),
	    //    data: parsedData.map((d) => { return { x: d.values[2], y: d.values[3]}}),
	    //    //borderColor: Utils.CHART_COLORS.red,
	    //    fill: true,
	    //    cubicInterpolationMode: 'monotone',
	    //    tension: 0.4,
	    //    //backgroundColor: 'rgba(178, 212, 167, 0.5)',
	    //    //borderColor: 'rgba(178, 212, 167, 1)',
	    //    borderWidth: 3,
	    //},
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
