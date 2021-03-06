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
import { useHistory } from "react-router-dom";
import Link from 'next/link';
import supabaseClient from '../lib/supabase';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css'
import SignIn from './sign-in'
import GlobalContext from '../utils/global-context';

function MyApp({ Component, pageProps }) {
    const [state, setState] = useState({
	count: 0,
	targetSubPage: 0,
	update
    })
    const [startingLocation, setStartingLocation] = useState("")
    function update(data) {
	setState(Object.assign({}, state, data));
    }
    const [authenticatedState, setAuthenticatedState] = useState('not-authenticated')
    const router = useRouter()
    const [subPage, setSubPage] = useState(0)

    useEffect(async () => {
	setStartingLocation(window.location.pathname)
	if (window.location.hash && window.location.hash.includes("access_token")) {
	    const access_token = window.location.hash.split("&")[0].substring(14)

	    router.push(`/password-reset#access_token=${access_token}`)
	}

	/* fires when a user signs in or out */
	const { data: authListener } = supabaseClient.auth.onAuthStateChange((event, session) => {
	    handleAuthChange(event, session)
	    if (event === 'SIGNED_IN') {
		setAuthenticatedState('authenticated')
		router.push('/tabs')
	    }
	    if (event === 'SIGNED_OUT') {
		setAuthenticatedState('not-authenticated')
		router.push('/tabs')
	    }
	})
	checkUser()
	return () => {
	    authListener.unsubscribe()
	}
    }, [])

    async function checkUser() {
	/* when the component loads, checks user to show or hide Sign In link */
	const user = await supabaseClient.auth.user()
	if (user) {
	    setAuthenticatedState('authenticated')
	}
    }

    async function handleAuthChange(event, session) {
	/* sets and removes the Supabase cookie */
	await fetch('/api/auth', {
	    method: 'POST',
	    headers: new Headers({ 'Content-Type': 'application/json' }),
	    credentials: 'same-origin',
	    body: JSON.stringify({ event, session }),
	})
    }

    return (
	<>
	    <GlobalContext.Provider value={state}>
		<Head> <meta
		    name="viewport"
		    content="width=device-width, initial-scale=1.0, viewport-fit=cover"
		></meta> </Head>
		<div>
		    {(authenticatedState === 'not-authenticated' && !startingLocation.includes("password-reset"))? (
			<> <SignIn /> </>
		    ) : (
			<div class="plt-android plt-mobile md" mode="md"> <Component {...pageProps} /> </div>
		    )}

		</div>
		<Script src="https://unpkg.com/ionicons@5.2.3/dist/ionicons.js"></Script>
	    </GlobalContext.Provider>
	</>
    );
}

export default MyApp;
