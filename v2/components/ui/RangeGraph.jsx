import React, { useEffect, useRef, useState } from 'react';
import db from '../../lib/db'
import moment from "moment"
import subStyles from "../../styles/Sub.module.css"
import ExerciseBlock from "./ExerciseBlock";
import LineGraph from '../ui/LineGraph'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';

const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //width: 400,
    width: "80%",
    //bgcolor: 'background.paper',
    bgcolor: '#f2e8e8',
    //border: '2px solid #000',
    borderRadius: "0.8rem",
    boxShadow: 24,
    p: 4,
    outline: "none",
    color: "#363638",
    fontWeight: "900",
};


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
    const [acti, setActi] = useState({})
    const [averages, setAverages] = useState([])
    const [modal, toggleModal] = useState(false)

    const [activeGraph, setActiveGraph] = useState(0)

    const [graphSettings, setGraphSettings] = useState([
	{
	    xAxis: "mood",
	    yAxis: "perceived severity"
	},
	{
	    xAxis: "screen time",
	    yAxis: "perceived severity"
	},
	{
	    xAxis: "sleep",
	    yAxis: "mood"
	},
    ])


    useEffect(() => db(), [])

    useEffect(() => {
	console.log("updating the range")
	retrieveData()
    }, [props.start.getTime(), props.end.getTime()]) // always use the getTime()!


    const retrieveData = () => {
	db.getDataFromRange([
	    moment(props.start).subtract(1, 'days').format(),
	    moment(props.end).subtract((moment().isSame(props.end, 'day'))? -1 : 0, 'days').format(),

	]).then(e => {
	    //console.log(e, "e!")
	    let actiCount = {}
	    let vals = []

	    let parsed = e.map(d => { return {
		values: dataNormalizer(d),
		date: moment(d.created_at),
		activities: d.activities
	    }})

	    parsed.forEach(p => {
		p.activities && p.activities.forEach(pp => {
		    actiCount[pp] = (+actiCount[pp] || 0) + 1
		})
		p.values && vals.push(p.values)
	    })

	    let avgs = Array(5).fill(0)
	    vals.forEach((v) => {
		v.forEach((vv, j) => {
		    avgs[j] += vv / 5
		})
	    })

	    setAverages(avgs)
	    setActi(actiCount)
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

    const axisOptions = [
	    "perceived severity",
	    "mood",
	    "sleep",
	    "screen time",
	    "exercise"]

    return (
	<>
	    {parsedData.length? 
	<div class="border-0 border-red-500 mt-5">
	    
	    {graphSettings.map((g, i) =>
		<div
		    onClick={() => {
			setActiveGraph(i)
			toggleModal(true)
		    }}
		>
		    <LineGraph
			parsedData={parsedData}
			datasetName={""}
			xAxis={g.xAxis}
			yAxis={g.yAxis}

		    />
		</div>
	    )}
	    <Modal
		open={modal}
		onClose={() => {
		    toggleModal(false)
		}}
		closeAfterTransition
		BackdropComponent={Backdrop}
		BackdropProps={{
		    timeout: 500,
		}}
	    >
		<Fade in={modal}>
		    <Box sx={style}>
			{/*{graphSettings[activeGraph].yAxis + " vs. " + graphSettings[activeGraph].xAxis}*/}
			<div>
			    <div class="flex flex-wrap justify-left">
				{axisOptions.map(o =>
				<div class={`rounded ${(o == graphSettings[activeGraph].yAxis)? "bg-green-300" : "bg-blue-200"} p-1 m-1 transition`}
				    onClick={() => {
					let lgs = graphSettings
					lgs[activeGraph].yAxis = o
					//lgs[activeGraph].yAxis = "exercise"
					setGraphSettings(lgs)
					toggleModal(false)
					setTimeout(function(){
					    toggleModal(true)
					}, 1);
				    }}

					>{o}</div>
				)}
			    </div>
			    <p class="text-center mt-2 mb-4">vs.</p>
			    <div class="flex flex-wrap justify-end">

				{[...axisOptions, "time"].reverse().map(o =>
				<div class={`rounded ${(o == graphSettings[activeGraph].xAxis)? "bg-green-300" : "bg-blue-200"} p-1 m-1 transition`}
				    onClick={() => {
					let lgs = graphSettings
					lgs[activeGraph].xAxis = o
					//lgs[activeGraph].yAxis = "exercise"
					setGraphSettings(lgs)
					toggleModal(false)
					setTimeout(function(){
					    toggleModal(true)
					}, 1);
				    }}
					>{o}</div>
				)}
			    </div>
			</div>
		    </Box>
		</Fade>
	    </Modal>

	<div class="flex flex-row space-x-1 justify-center mt-8">
	    <div class="p-3 pr-5 pl-5 rounded"
		style={{
		    background: "#B2D4A7"
		}}
	    >
		{(averages[1] >= 80) && <div class="text-sm" style={{lineHeight: "13px"}}>▲<br />▲</div>}
		{(averages[1] >= 60 && averages[1] < 80) && <div class="text-sm mt-1">▲</div>}
		{(averages[1] >= 40 && averages[1] < 60) && <div class="text-lg font-black">--</div>}
		{(averages[1] >= 20 && averages[1] < 40) && <div class="text-sm">▼</div>}
		{(averages[1] >= 0 && averages[1] < 20) && <div class="text-sm" style={{lineHeight: "13px"}}>▼<br />▼</div>}
	    </div>
	    <div class="p-3 pr-5 pl-5 rounded"
		style={{
		    background: "#A7AED4"
		}}
	    >
		{(averages[2] >= 80) && <div class="text-sm" style={{lineHeight: "13px"}}>▲<br />▲</div>}
		{(averages[2] >= 60 && averages[2] < 80) && <div class="text-sm mt-1">▲</div>}
		{(averages[2] >= 40 && averages[2] < 60) && <div class="text-lg font-black">--</div>}
		{(averages[2] >= 20 && averages[2] < 40) && <div class="text-sm mt-1">▼</div>}
		{(averages[2] >= 0 && averages[2] < 20) && <div class="text-sm" style={{lineHeight: "13px"}}>▼<br />▼</div>}
	    </div>
	    <div class="p-3 pr-5 pl-5 rounded"
		style={{
		    background: "#E0ADAD"
		}}
	    >
		{(averages[3] >= 80) && <div class="text-sm" style={{lineHeight: "13px"}}>▲<br />▲</div>}
		{(averages[3] >= 60 && averages[3] < 80) && <div class="text-sm mt-1">▲</div>}
		{(averages[3] >= 40 && averages[3] < 60) && <div class="text-lg font-black">--</div>}
		{(averages[3] >= 20 && averages[3] < 40) && <div class="text-sm mt-1">▼</div>}
		{(averages[3] >= 0 && averages[3] < 20) && <div class="text-sm" style={{lineHeight: "13px"}}>▼<br />▼</div>}
	    </div>
	    <div class="p-3 pr-5 pl-5 rounded"
		style={{
		    background: "rgb(167, 212, 207)"
		}}
	    >
		{(averages[4] >= 80) && <div class="text-sm" style={{lineHeight: "13px"}}>▲<br />▲</div>}
		{(averages[4] >= 60 && averages[4] < 80) && <div class="text-sm mt-1">▲</div>}
		{(averages[4] >= 40 && averages[4] < 60) && <div class="text-lg font-black">--</div>}
		{(averages[4] >= 20 && averages[4] < 40) && <div class="text-sm mt-1">▼</div>}
		{(averages[4] >= 0 && averages[4] < 20) && <div class="text-sm" style={{lineHeight: "13px"}}>▼<br />▼</div>}
	    </div>
	    <div class="p-3 pr-5 pl-5 rounded"
		style={{
		    background: "rgb(229, 205, 143)"
		}}
	    >
		{(averages[0] >= 80) && <div class="text-sm" style={{lineHeight: "13px"}}>▲<br />▲</div>}
		{(averages[0] >= 60 && averages[0] < 80) && <div class="text-sm mt-1">▲</div>}
		{(averages[0] >= 40 && averages[0] < 60) && <div class="text-lg font-black">--</div>}
		{(averages[0] >= 20 && averages[0] < 40) && <div class="text-sm mt-1">▼</div>}
		{(averages[0] >= 0 && averages[0] < 20) && <div class="text-sm" style={{lineHeight: "13px"}}>▼<br />▼</div>}
	    </div>
	</div>

	<div className={subStyles.activWrapper}>
	    <div class="mt-4 flex flex-wrap justify-center">
		{Object.entries(acti).sort((a,b) => b[1] - a[1]).map( o => { return (
		    <div class="border-0 text-gray-600 border-red-500 flex flex-row justify-center mt-4">
			<p class="bg-purple-200 p-2 rounded"> {o[0]} </p>
			<p class="align-middle content-center p-2 mr-1"> x {o[1]} </p>
		    </div>
		)})}
	    </div>
	    </div>
	</div> : <p class="font-black text-center text-gray-700 mt-3">no data to show</p>}
	</>
    )
}

