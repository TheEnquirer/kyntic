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

//import useIonRouter from "@ionic/react";
//import GlobalContext from '../utils/global-context';
//import { AppStateProvier } from './app-context'


function SignIn() {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const router = useRouter()
    //console.log(supabaseClient, "supabase")

    //useEffect( async () => {
    //    const profileData = await supabaseClient.auth.user()
    //    if (profileData) {
    //        console.log("profileData!")
    //        router.push('/tabs')
    //    } else {
    //        console.log("not logged in yet")
    //    }
    //}, [])

    async function signIn() {

	if (!email) return

	const { error, data } = await supabaseClient.auth.signIn({
	    email
	})

	if (error) { console.log({error})}
	else { setSubmitted(true) }
    }

    if (submitted) {
	return (
	    <div className={styles.container}>
		<h1>Please check your email to sign in</h1>
	    </div>
	)
    }

    return (
	<div className={styles.container}>
	    <main className={styles.main}>
		<h1 className={styles.title}>
		    Sign In
		</h1>
		<input
		    onChange={e => setEmail(e.target.value)}
		    style={{ margin: 10 }}
		/>
		<button onClick={() => signIn()}>Sign In</button>
	    </main>
	</div>
    )
}





function MyApp({ Component, pageProps }) {
    const [authenticatedState, setAuthenticatedState] = useState('not-authenticated')
    const router = useRouter()
    console.log("history!!", router)

    useEffect(() => {
	/* fires when a user signs in or out */
	const { data: authListener } = supabaseClient.auth.onAuthStateChange((event, session) => {
	    handleAuthChange(event, session)
	    if (event === 'SIGNED_IN') {
		setAuthenticatedState('authenticated')
		router.push('/profile')
	    }
	    if (event === 'SIGNED_OUT') {
		setAuthenticatedState('not-authenticated')
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

    const handleNav = (target) => {
	router.push(target)
    }

    //const [state, setState] = useState({
    //    count: 0,
    //    targetSubPage: 0,
    //    update
    //})
    //function update(data) {
    //    setState(Object.assign({}, state, data));
    //}

    //const [subPage, setSubPage] = useState(0)
    return (
	<>
	    {/*<GlobalContext.Provider value={state}>*/}
	    <Head> <meta
		name="viewport"
		content="width=device-width, initial-scale=1.0, viewport-fit=cover"
	    ></meta> </Head>
	    <div>
		{(authenticatedState === 'not-authenticated')? (
		    <>
			<SignIn />
		    <div onClick={() => { handleNav("/sign-in") }}>
			<a style={linkStyle}>Sign In</a>
		    </div>
		    </>
		) : (
		    <>
			{/*<div onClick={() => { router.push("/protected") }}>
			    <a style={linkStyle}>Protected</a>
			</div>*/}

			<Component {...pageProps} />
		    </>
		)}

	    </div>
	    <Script src="https://unpkg.com/ionicons@5.2.3/dist/ionicons.js"></Script>

	    {/*</GlobalContext.Provider>*/}
	</>

    );
}

const linkStyle = {
  marginRight: 10
}

export default MyApp;
