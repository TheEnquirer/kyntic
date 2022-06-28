import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { StatusBar, Style } from '@capacitor/status-bar';
import Link from 'next/link'
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, useLocation } from 'react-router-dom';
import Menu from './Menu';
import React, { useState, useEffect } from 'react';

import Tabs from './pages/Tabs';
import supabase from '../lib/supabase'
import PasswordReset from './pages/PasswordReset';

window.matchMedia('(prefers-color-scheme: dark)').addListener(async status => {
    try {
	await StatusBar.setStyle({
	    style: status.matches ? Style.Dark : Style.Light,
	});
    } catch { }
});

const AppShell = () => {
    const user = supabase.auth.user()
    //localStorage.theme = 'light'
    return (
	<IonApp>
	    <IonReactRouter>
		{/*<IonSplitPane contentId="main">*/}
		    {/*<Menu />*/}
		    <IonRouterOutlet id="main">
			<Route path="/tabs" render={() => <Tabs />} />
			<Route exact path="/" render={() => <Redirect to="/tabs" />} />
			<Route path="/password-reset" render={() => <PasswordReset />} />
			{/*<Route path="/#access_token" render={() => <> what </>} />*/}
		    </IonRouterOutlet>
		{/*</IonSplitPane>*/}
	    </IonReactRouter>
	</IonApp>
    );
};

export default AppShell;
