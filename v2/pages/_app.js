import Head from 'next/head';
import Script from 'next/script';

import 'tailwindcss/tailwind.css';
import '@ionic/react/css/core.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import '../styles/global.css';
import '../styles/variables.css';
import React, { useState, useRef, useEffect } from 'react';
import GlobalContext from '../utils/global-context';
//import { AppStateProvier } from './app-context'

function MyApp({ Component, pageProps }) {
    const [state, setState] = useState({
	count: 0,
	targetSubPage: 0,
	update
    })
    function update(data) {
	setState(Object.assign({}, state, data));
    }

    const [subPage, setSubPage] = useState(0)
    return (
	<GlobalContext.Provider value={state}>
	    <Head> <meta
		    name="viewport"
		    content="width=device-width, initial-scale=1.0, viewport-fit=cover"
	    ></meta> </Head>

	    <Component {...pageProps} />
	    <Script src="https://unpkg.com/ionicons@5.2.3/dist/ionicons.js"></Script>
	</GlobalContext.Provider>

    );
}

export default MyApp;
