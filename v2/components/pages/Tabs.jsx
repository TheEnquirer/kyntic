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
import { cog, flash, list, barcodeOutline, ellipse, analytics, copy, radioButtonOnOutline, resizeOutline } from 'ionicons/icons';
import pageStyles from '../../styles/Pages.module.css';

import Log from './Log';
import See from './See';
import Sync from './Sync';

const Tabs = () => {
  return (
	  <IonTabs >
	      <IonRouterOutlet>
		  <Route path="/tabs/log" component={Log} exact={true} />
		  <Route path="/tabs/see" component={See} exact={true} />
		  <Route path="/tabs/sync" component={Sync} exact={true} />

		  {/*<Route path="/tabs/lists" component={Lists} exact={true} />
	<Route path="/tabs/lists/:listId" component={ListDetail} exact={true} />
	<Route path="/tabs/settings" component={Settings} exact={true} />*/}
		  <Route path="/tabs" render={() => <Redirect to="/tabs/log" />} exact={true} />
	      </IonRouterOutlet>
	      <IonTabBar
		  className={pageStyles.borderSep}
		  slot="bottom"
	      >
		  <IonTabButton className={pageStyles.tabs} tab="tab1" href="/tabs/log">
		      {/*<div className="flex flex-col border-2 border-blue-300">*/}
		      {/*<IonIcon icon={radioButtonOnOutline} />*/}
		      <IonLabel className="font-bold">log</IonLabel>
		      {/*</div>*/}
		  </IonTabButton>

		  <IonTabButton className={pageStyles.tabs} tab="tab2" href="/tabs/see">
		      {/*<IonIcon icon={copy} />*/}
		      <IonLabel className="font-bold">see</IonLabel>
		  </IonTabButton>

		  <IonTabButton className={pageStyles.tabs} tab="tab3" href="/tabs/sync">
		      {/*<IonIcon icon={resizeOutline} />*/}
		      <IonLabel className="font-bold">link</IonLabel>
		  </IonTabButton>
	      </IonTabBar>
	  </IonTabs>
  );
};

export default Tabs;
