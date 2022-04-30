/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import supabaseClient from '../lib/supabase.js'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function SignIn() {
    const handleChange = (event) => {
	setName(event.target.value);
    };

    const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    useEffect(() => {
	const user = supabaseClient.auth.user()
	if (user && router.pathname == "/sign-in") {
	    router.push('/tabs')
	}
    }, [])

    const validateEmail = (email) => {
	return String(email)
	    .toLowerCase()
	    .match(
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
    };

	async function signUp() {
		if (!validateEmail(email)) {
			setError("not a valid email :(")
			return
		}
		const { user, session, error } = await supabaseClient.auth.signUp({
			email: email,
			password: password,
		})
		if (error) {
			console.log({error})
			setError(error.message)
		}
	}

    async function signIn() {

	if (!validateEmail(email)) {
	    setError("not a valid email :(")
	    return
	}

	// TODO: only works for web, not ios
	// const { error, data } = await supabaseClient.auth.signIn({
	//     email
	// },{ redirectTo: "http://localhost:3000" })
	const { user, session, error } = await supabaseClient.auth.signIn({
		email: email,
		password: password,
	})

	// TODO: also only works for web
	// const { user, session, error } = await supabaseClient.auth.signIn({
	// 	provider: 'google'
	// })

	if (error) {
	    console.log({error})
	    setError(error.message)
	}
    }

    return (
	<>
	    <div className="flex flex-col content-center justify-center h-screen bg-gray-100 ">
		{error && (<div className="absolute top-0 w-48 p-3 mt-12 font-bold text-center text-red-700 bg-red-300 rounded left-1/2 transform -translate-x-1/2 "> {error} </div>)}
		<div className="flex flex-col h-screen pt-64 text-center border-0 border-red-500">
		    <p className={styles.cleanTitle}> sign in </p>

		    <Box
			className="mt-12"
			sx={{
			    '& > :not(style)': { m: 1, width: '25ch' },
			}}
			noValidate
			autoComplete="off"
		    >
			<TextField id="standard-basic" label="email" variant="standard"
			    value={email}
			    onChange={e => { setEmail(e.target.value); setError("") }}
			/>
			<TextField id="standard-basic" label="password" variant="standard"
			    value={password}
			    onChange={e => { setPassword(e.target.value); setError("") }}
			/>
		    </Box>
		    <div className="flex flex-col items-center content-center justify-center text-center center">
			<p
			    className={styles.largeButton}
			    onClick={() => signIn()}
			>
			    Login
			</p>
			<p
			    className={styles.largeButton}
			    onClick={() => signUp()}
			>
			    Signup
			</p>
		    </div>
		</div>

	    </div>

	</>
    )
}
