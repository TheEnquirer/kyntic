import { useState, useEffect } from "react";
import supabaseClient from '../lib/supabase.js'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';





export default function SignIn() {
    //const [name, setName] = useState('Cat in the Hat');
    const handleChange = (event) => {
	setName(event.target.value);
    };

    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [submitted, setSubmitted] = useState(false)
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

    async function signIn() {

	if (!validateEmail(email)) {
	    setError("not a valid email :(")
	    return
	}

	const { error, data } = await supabaseClient.auth.signIn({
	    email
	})

	if (error) { console.log({error})}
	else { setSubmitted(true) }
    }

    if (submitted) {
	return (
	    <div className={styles.container}>
		<h1>check your email to sign in!</h1>
	    </div>
	)
    }

    return (
	<>
	    <div className="flex flex-col content-center justify-center h-screen bg-gray-100 ">
		<div className="flex flex-col h-screen pt-64 text-center border-0 border-red-500">
		    <p className={styles.cleanTitle}> sign in </p>

		    <Box
			className="mt-12"
			//component="form"
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
		    </Box>
		    <div className="flex flex-col items-center content-center justify-center text-center center">
			<p
			    className={styles.largeButton}
			    onClick={() => signIn()}
			>
			    let's go!
			</p>
		    {error && (<div className="w-48 p-3 mt-12 font-bold text-center text-red-700 bg-red-300 rounded "> {error} </div>)}
		    </div>
		</div>

	    </div>

	</>
    )
}




