import React from 'react';
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

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export const data = {
    labels: ['severity', 'mood', 'sleep', 'screen-time', 'exercise'],
    datasets: [
	{
	    label: [],
	    data: [1, 1.2, 1.3, 1.4, 1.5],
	    backgroundColor: 'rgba(255, 99, 132, 0.2)',
	    borderColor: 'rgba(255, 99, 132, 1)',
	    borderWidth: 1,
	},
    ],
    options,
};


export const options = {
    plugins: {
	legend: {
	    display: false,
	},
	title: {
	    display: false,
	},
    },
};

export default function DayGraph(props) {
    return (
	<div>
	    <Radar data={data} options={options}/>
	</div>
    )
}
