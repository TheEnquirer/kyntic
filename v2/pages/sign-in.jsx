/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import supabaseClient from '../lib/supabase.js'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';


export default function SignIn() {
    const handleChange = (event) => {
	setName(event.target.value);
    };

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [confirmEmail, setConfirmEmail] = useState(false)
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
	    setConfirmEmail(true)
	    const { user, session, error } = await supabaseClient.auth.signUp({
		    email: email,
		    password: password,
	    })
	    if (error) {
		    console.log({error})
		    setError(error.message)
	    }
    }

    async function resetEmail() {
	const { data, error } = await supabaseClient.auth.api
	    .resetPasswordForEmail(email)

	if (error) {
	    console.log({error})
	    setError(error.message)
	}

	return data
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
	    let modErr = error.message
	    if (error.message == "Invalid login credentials") {
		modErr += ". Try signing up if you don't have an account."
	    }
	    setError(modErr)
	}
    }

    return (
	<>
	    {/*<div className="flex flex-col content-center justify-center h-screen bg-gray-100 ">
		{error && (<div className="absolute top-0 w-48 p-3 mt-12 font-bold text-center text-red-700 bg-red-300 rounded left-1/2 transform -translate-x-1/2 "> {error} </div>)}
		[>{confirmEmail? <div class="absolute">please check your inbox and confirm your email!</div>: ""}<]
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
			    type={"email"}
			    onChange={e => { setEmail(e.target.value); setError("") }}
			/>
			<TextField id="standard-basic" label="password" variant="standard"
			    type={"password"}
			    value={password}
			    onChange={e => { setPassword(e.target.value); setError("") }}
			/>
		    </Box>
		    <div className="flex flex-col items-center content-center justify-center text-center center">
			<p
			    className={styles.largeButton}
			    onClick={() => signIn()}
			>
			    login
			</p>
			{confirmEmail? <div class="mt-5 p-5 font-bold"> 
			    please check your inbox and confirm your email, and then click the "login" button!
			</div>: <>
			<p
			    className={styles.largeButton}
			    onClick={() => signUp()}
			>
			    signup
			</p>
			    <p class="mt-2 font-bold text-gray-400"
				onClick={resetEmail}
			    > reset password </p>
			</>
			}
		    </div>
		</div>

	    </div>
*/}

	    {/*<div onClick={navToSignIn}> sign in </div>
	    <div onClick={navToSignUp}> sign up </div>*/}

	    <Accordion>
		<AccordionSummary expandIcon={"⌄"} >
		    sign in!
		</AccordionSummary>
		<AccordionDetails>

		<Accordion>
		    <AccordionSummary expandIcon={"⌄"} > phone number
		    </AccordionSummary>
		    <AccordionDetails>
			<PhoneInput supabaseClient={supabaseClient}/>
		</AccordionDetails></Accordion>

		<Accordion>
		    <AccordionSummary expandIcon={"⌄"} > email and password
		    </AccordionSummary>
		    <AccordionDetails>
		</AccordionDetails></Accordion>

		<Accordion>
		    <AccordionSummary expandIcon={"⌄"} > passwordless email
		    </AccordionSummary>
		    <AccordionDetails>
		</AccordionDetails></Accordion>

		</AccordionDetails>
	    </Accordion>



	    <Accordion>
		<AccordionSummary expandIcon={"⌄"} >
		    sign up!
		</AccordionSummary>
		<AccordionDetails>


		</AccordionDetails>
	    </Accordion>
	    </>
    )
}





const SignInComponent = () => { 

}





const PhoneInput = (props) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const phoneNumberRegex = /^\d{3}-\d{3}-\d{4}$/;

    const handleChange = e => {
	setPhoneNumber(e.target.value);
    };

    const handleBlur = e => {
	if (!phoneNumberRegex.test(e.target.value)) {
	    setError('Invalid phone number format. Please enter a valid phone number in the format 555-555-5555.');
	} else {
	    setError('');
	}
    };

    return (
	<>
	    <div className="relative rounded-md shadow-sm">
		<input
		    className={`form-input py-3 px-4 block w-full leading-5 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${error ? 'border-red-500' : ''}`}
		    placeholder="Enter phone number"
		    type="tel"
		    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
		    title="Format: 555-555-5555"
		    value={phoneNumber}
		    onChange={handleChange}
		    onBlur={handleBlur}
		/>
		{error && <p className="text-red-500 text-xs">{error}</p>}

	    </div>
	    <button
		disable={(error || !phoneNumber) ? true : false}
		className={`
		    mt-4 py-3 px-4
		    ${(error || !phoneNumber)? 'bg-gray-500' : 'bg-blue-500'}
		    text-white rounded-md
		`}
		onClick={async () => {
		    console.log("registering click")
		    console.log(props.supabaseClient.auth.signInWithOtp)
		    //let { data, error } = await props.supabaseClient.auth.signInWithOtp({
		    //    phone: '+1' + phoneNumber,
		    //})

		}}
	    > submit </button>
	</>
    );
};


