import { useState, useEffect } from "react";
import supabaseClient from '../lib/supabase.js'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'



export default function SignIn() {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const router = useRouter()

    useEffect(() => {
	const user = supabaseClient.auth.user()
	if (user && router.pathname == "/sign-in") {
	    router.push('/tabs')
	}
    }, [])

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




















