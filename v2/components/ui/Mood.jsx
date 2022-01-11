import pageStyles from "../../styles/Pages.module.css"
import subStyles from "../../styles/Sub.module.css"
import { arrowBackOutline } from 'ionicons/icons';
import {
    IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonMenuButton,

} from '@ionic/react';
import { useHistory } from "react-router-dom";
import Slider from '@mui/material/Slider';
import ReactDOM from 'react-dom';



const Mood = () => {
    const history = useHistory()
    return (
	<div className="border-0 border-red-500 h-80 ">
	    <div className={subStyles.subtitle}>
		how are you feeling today?
	    </div>
	    <div
		//className="flex content-center justify-center border-2 border-red-500 h-96"
		className="flex justify-center h-full mt-12 mb-3 border-0 border-blue-500"
	    >
		<Slider
		    //size="small"
		    defaultValue={50}
		    //aria-label="Small"
		    valueLabelDisplay="off"
		    orientation="vertical"
		/>
	    </div>
	</div>
    );
}
export default Mood;
