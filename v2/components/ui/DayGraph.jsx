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
		//display: false
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

    const radarRef = useRef(null)
    useEffect(() => {
	setLoaded(true)
    }, [])
    //useEffect(() => {
    //    if (radarRef.current) {
    //        let ctx = radarRef.current.ctx
    //        var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    //        gradientStroke.addColorStop(0, "#80b6f4");
    //        gradientStroke.addColorStop(1, "#f49080");

    //        let tempLocaldata = localdata
    //        tempLocaldata.datasets[0].borderColor = "borderColor: 'rgba(31, 40, 145, 0.8)',"
    //        tempLocaldata.datasets[0].pointBorderColor = gradientStroke
    //        tempLocaldata.datasets[0].pointBackgroundColor = gradientStroke
    //        tempLocaldata.datasets[0].pointHoverBorderColor = gradientStroke
    //        tempLocaldata.datasets[0].pointHoverBackgroundColor = gradientStroke

    //        setLocalData(tempLocaldata)
    //        console.log("setting", tempLocaldata)
    //    }

    //}, [radarRef])
    //var ctx = document.getElementById('myChart').getContext("2d");
    //console.log(ctx)

    return (
	<div class="border-0 border-red-500">
	    {loaded && <Radar data={localdata} options={options} ref={radarRef}/>}
	</div>
    )
}




