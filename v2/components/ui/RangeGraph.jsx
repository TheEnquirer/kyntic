import React, { useEffect, useRef, useState } from 'react';
import db from '../../lib/db'
import moment from "moment"
import subStyles from "../../styles/Sub.module.css"
import ExerciseBlock from "./ExerciseBlock";
import LineGraph from '../ui/LineGraph'

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





export default function RangeGraph(props) {
    const [normedLocal, setNormedLocal] = useState([0, 0, 0, 0, 0, 0])
    const [parsedData, setParsedData] = useState([])

    useEffect(() => db(), [])

    useEffect(() => {
	console.log("updating the range")
	retrieveData()
    }, [props.start.getTime(), props.end.getTime()]) // always use the getTime()!


    const retrieveData = () => {
	db.getDataFromRange([
	    moment(props.start).subtract(1, 'days').format(),
	    moment(props.end).format()
	]).then(e => {
	    console.log(e, "e!")
	    let parsed = e.map(d => { return {
		values: dataNormalizer(d),
		date: moment(d.created_at),
		activities: d.activities
	    }})
	    console.log(parsed)
	    setParsedData(parsed)
	})
    }


    const dataNormalizer = (d) => {
	if (d) {
	    let normed = [] // this should really be a dict..
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

    //const data = {
    //    labels: Array(parsedData.length).fill(""),
    //    datasets: [
    //        {
    //            label: '', // TODO fill this in later based on the axis
    //            //data: [0, 2,2, 4, 5],
    //            //data: parsedData.map((d) => { return { x: d.sleep, y: d.sleep }}),
    //            data: parsedData.map((d) => { return { x: d.values[2], y: d.values[1]}}),
    //            //borderColor: Utils.CHART_COLORS.red,
    //            fill: true,
    //            cubicInterpolationMode: 'monotone',
    //            tension: 0.4,
    //            //backgroundColor: 'rgba(178, 212, 167, 0.5)',
    //            //borderColor: 'rgba(178, 212, 167, 1)',
    //            borderWidth: 3,
    //        },
    //        {
    //            label: '', // TODO fill this in later based on the axis
    //            //data: [0, 2,2, 4, 5],
    //            //data: parsedData.map((d) => { return { x: d.sleep, y: d.sleep }}),
    //            data: parsedData.map((d) => { return { x: d.values[2], y: d.values[3]}}),
    //            //borderColor: Utils.CHART_COLORS.red,
    //            fill: true,
    //            cubicInterpolationMode: 'monotone',
    //            tension: 0.4,
    //            //backgroundColor: 'rgba(178, 212, 167, 0.5)',
    //            //borderColor: 'rgba(178, 212, 167, 1)',
    //            borderWidth: 3,
    //        },
    //    ],
    //    config,
    //}

    //const config = {
    //    type: 'line',
    //    //skipLabels: true,
    //    data: data,
    //    plugins: {
    //        legend: {
    //            display: false,
    //        },
    //        title: {
    //            display: false,
    //        },
    //    },

    //        responsive: true,
    //        plugins: {
    //            title: {
    //                display: false,
    //            },
    //            legend: {
    //                display: false,
    //            }
    //        },
    //    scales: {
    //            x: {
    //                display: true,
    //                title: {
    //                    display: true,
    //                    text: "whee",
    //                    //padding: -5,
    //                },
    //                ticks: {
    //                    display: false,
    //                    callback: function(value, index, ticks) {
    //                        return value;
    //                    }
    //                }
    //            },
    //        y: {
    //            title: {
    //                display: true,
    //                text: 'Value',
    //            },
    //            ticks: {
    //                display: false,
    //                callback: function(value, index, ticks) {
    //                    return '' + value;
    //                }
    //            }
    //        }
    //    }
    //};


    return (
	<div class="border-0 border-red-500 mt-5">
	    {/*{parsedData[0] && <Line data={data} config={config} options={config}/>}*/}
	    <LineGraph
		parsedData={parsedData}
		datasetName={""}
		//xAxis={"mood"}
		xAxis={"time"}
		//xAxis={"time"}
		yAxis={"sleep"}

	    />
	    {/*<LineGraph
		parsedData={parsedData}
		datasetName={""}
		xAxis={"sleep"}
		yAxis={"perceived severity"}

	    />
	    <LineGraph
		parsedData={parsedData}
		datasetName={""}
		xAxis={"exercise"}
		yAxis={"exercise"}

	    />*/}
	</div>
    )
}

