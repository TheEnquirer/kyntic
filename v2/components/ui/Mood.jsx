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

const Mood = () => {
    const history = useHistory()
    return (
	<div className={pageStyles.pager}>
	    <IonIcon icon={arrowBackOutline} className="mt-8 ml-3 text-lg text-gray-500"
		onClick={() => {
		    history.push("/tabs/log");
		}}
	    />
	    <div className={subStyles.subtitle}> 
		how are you feeling today?
	    </div>
	</div>
    );
}
export default Mood;
