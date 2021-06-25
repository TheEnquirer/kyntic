import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonRange, IonIcon,
    IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent
} from '@ionic/react';
import { happy, sad } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Log = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Log</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
	    <IonTitle size="large">Log</IonTitle>
          </IonToolbar>
        </IonHeader>
	  {
	  //<ExploreContainer name="Tab 1 page" />
	  }

	  <IonCard>
	      <IonCardHeader>
		  <IonCardSubtitle>How are you feeling?</IonCardSubtitle>
		  <IonCardTitle>Mood</IonCardTitle>
	      </IonCardHeader>
	      <IonItem>
		  <IonRange min={0} max={100} step={1} snaps={false} color="tertiary" />
		  <IonIcon slot="start" icon={sad} />
		  <IonIcon slot="end" icon={happy} />
	      </IonItem>
	  </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Log;

