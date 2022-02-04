import { useState, useEffect } from 'react';
import supabaseClient from '../lib/supabase'
import { useRouter } from 'next/router'

export default function Profile() {
    const [profile, setProfile] = useState(null)
    const router = useRouter()

    useEffect(() => {
	fetchProfile()
    }, [])

    async function fetchProfile() {
	const profileData = await supabaseClient.auth.user()
	console.log("profile data?", profileData)
	if (!profileData) {
	    router.push('/sign-in')
	} else {
	    setProfile(profileData)
	}
    }

    async function signOut() {
	await supabaseClient.auth.signOut()
	router.push('/sign-in')
    }

    if (!profile) return null

    return (
	<div style={{ maxWidth: '420px', margin: '96px auto' }}>
	    <h2>Hello, {profile.email}</h2>
	    <p>User ID: {profile.id}</p>
	    <button onClick={signOut}>Sign Out</button>
	</div>
    )
}
