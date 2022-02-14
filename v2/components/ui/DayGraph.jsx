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
    //options: {
    //    legend: {
    //        display: false
    //    },
    //    tooltips: {
    //        callbacks: {
    //            label: function(tooltipItem) {
    //                return tooltipItem.yLabel;
    //            }
    //        }
    //    }
    //},
};


export const options = {
    //indexAxis: 'y',
    //elements: {
    //    bar: {
    //        borderWidth: 2,
    //    },
    //},
    //responsive: true,
    plugins: {
	legend: {
	    display: false,
	},
	title: {
	    display: false,
	},
	//ticks: {
	//    display: false,
	//}
	//scale: {
	//    display: false,
	//    ticks: {
	//        display: false,
	//    }
	//}
    },
    //scale: {
    //    ticks: {
    //        //callback: function() {return ""},
    //        //backdropColor: "rgba(0, 0, 0, 0)"
    //    }
    //}
    //scale: {
    //    ticks: {
    //        display: false,
    //    }
    //}
    //scales: { yAxes: [{ ticks: { display: false } }] },
    //scales:{
    //    yAxes:[{
    //        scaleLabel:{
    //            display: false
    //        },
    //        ticks: {
    //            display:false
    //        }
    //    }],
    //},
};

export default function DayGraph(props) {
    return <Radar data={data} options={options}/>;
}
