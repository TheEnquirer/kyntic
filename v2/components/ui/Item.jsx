import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonMenuButton,
} from '@ionic/react';
import { useState, useEffect } from 'react';
import itemStyles from '../../styles/Item.module.css';
import { useHistory } from "react-router-dom";
import GlobalContext from '../../utils/global-context'
import { useContext } from 'react'
import db from '../../lib/db'


const Item = (props) => {
    const history = useHistory()
    const [localTracked, setTracked] = useState(props.tracked)
    const global = useContext(GlobalContext)
    const handleNav = () => {
	setTracked(true)
	global.update({
	    localTracked: (global.localTracked? global.localTracked: Array(6).fill(false)),
	    targetSubPage: props.idx,
	})
	console.log("global", global)
    }

    return (
	<div className="p-4 ml-4 mr-4 h-28 rounded-2xl" style={{backgroundColor: props.obj.color}}
	    onClick={() => {
		handleNav()
		history.push("/tabs/log/sub");
	    }}
	>
	    <div className={itemStyles.title}>
		{props.obj.title}
	    </div>
	    <div className={itemStyles.desc}>
		<div className="flex flex-col">
		    {props.obj.desc}
		    {(localTracked || (global.localTracked && global.localTracked[props.idx]))?
			( <p><span className="font-extrabold">tracked</span> today!</p> )
			:
			( <p><span className="font-extrabold">untracked</span> so far.</p> )
		    }
		</div>
	    </div>
	</div>
    );
};

export default Item;

