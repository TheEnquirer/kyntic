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
import { useState, useEffect, useContext } from 'react';
import pageStyles from '../../styles/Pages.module.css';
import Item from '../ui/Item';
import { useHistory } from 'react-router-dom';
import db from '../../lib/db'
import GlobalContext from '../../utils/global-context'


const Log = () => {

    const [trackedData, setTrackedData] = useState(false)
    const global = useContext(GlobalContext)


    useEffect(() => {

	db();
	db.getTodaysData().then((e) => {
	    setTrackedData(e)
	    console.log(e)
	    let globalData = global
	    let localTrackedVals = [!!e.mood, !!e.sleep, !!e.exercise, !!e.screenTime, !!e.activities, !!e.perceived]
	    globalData.localTracked = localTrackedVals
	    global.update(globalData)
	})
    }, [])

    return (
	<IonPage class="plt-android plt-mobile md" mode="md">
	    <IonToolbar>
		<IonTitle>
		    <div className={pageStyles.title}> log </div>
		    <hr className={pageStyles.sep} />
		</IonTitle>
	    </IonToolbar>
	    <IonContent className="ion-padding" fullscreen>
		{/*<IonHeader collapse="condense">
		    <IonToolbar>
			<IonTitle size="large">log</IonTitle>
		    </IonToolbar>
		</IonHeader>*/}
		<div className="flex flex-col mt-3 space-y-8">
		    {Items.map((e, i) => {
			return (
			    <Item
				obj={e}
				idx={i}
				tracked={trackedData && trackedData[e.dbName] != null}
			    />
			);
		    })}
		</div>
	    </IonContent>
	</IonPage>
    );
};

const Items = [
    {
	title: 'mood',
	color: '#b2d4a7',
	desc: 'how are you feeling?',
	target: '/tabs/log/sleep',
	dbName: 'mood',
    },
    {
	title: 'sleep',
	color: '#a7aed4',
	desc: 'how much sleep did you get?',
	target: '/tabs/log/sleep',
	dbName: 'sleep',
    },
    {
	title: 'exercise',
	color: '#d4a7a7',
	desc: 'how much exercise did you get?',
	target: '/tabs/log/sleep',
	dbName: 'exercise',
    },
    {
	title: 'screen time',
	color: '#a7d4cf',
	desc: 'how much screen time did you have?',
	target: '/tabs/log/sleep',
	dbName: 'screenTime',
    },
    {
	title: 'activities',
	color: '#d4a7d0',
	desc: 'what activities did you do?',
	target: '/tabs/log/sleep',
	dbName: 'activities',
    },
    {
	title: 'severity',
	color: '#E5CD8F',
	desc: 'how severe were your symptoms?',
	target: '/tabs/log/sleep',
	dbName: 'perceived',
    },
];

export default Log;
