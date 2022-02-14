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
    labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
    datasets: [
	{
	    label: [],
	    data: [2, 9, 3, 5, 2, 3],
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
    scales: { yAxes: [{ ticks: { display: false } }] },
    scales:{
	yAxes:[{
	    scaleLabel:{
		display: false
	    },
	    ticks: {
		display:false
	    }
	}],
    },
};

export default function DayGraph(props) {
    return <Radar data={data} options={options}/>;
}
