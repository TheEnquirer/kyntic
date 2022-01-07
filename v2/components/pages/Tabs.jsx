import { Redirect, Route } from 'react-router-dom';
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
import { IonReactRouter } from '@ionic/react-router';
import { cog, flash, list } from 'ionicons/icons';
import pageStyles from '../../styles/Pages.module.css';

import Home from './Log';
//import Lists from './Lists';
//import ListDetail from './ListDetail';
//import Settings from './Settings';

const Tabs = () => {
  return (
	  <IonTabs >
	      <IonRouterOutlet>
		  <Route path="/tabs/log" component={Home} exact={true} />
		  {/*<Route path="/tabs/lists" component={Lists} exact={true} />
	<Route path="/tabs/lists/:listId" component={ListDetail} exact={true} />
	<Route path="/tabs/settings" component={Settings} exact={true} />*/}
		  <Route path="/tabs" render={() => <Redirect to="/tabs/log" />} exact={true} />
	      </IonRouterOutlet>
	      <IonTabBar 
		  className={pageStyles.borderSep}
		  slot="bottom"
	      >
		  <IonTabButton className="mt-3" tab="tab1" href="/tabs/log">
		      <IonIcon icon={flash} />
		      <IonLabel>log</IonLabel>
		  </IonTabButton>

		  <IonTabButton className="mt-3" tab="tab1" href="/tabs/log">
		      <IonIcon icon={flash} />
		      <IonLabel>log</IonLabel>
		  </IonTabButton>

		  <IonTabButton className="mt-3" tab="tab1" href="/tabs/log">
		      <IonIcon icon={flash} />
		      <IonLabel>log</IonLabel>
		  </IonTabButton>
	      </IonTabBar>
	  </IonTabs>
  );
};

export default Tabs;
