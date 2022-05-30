import { useState, useEffect } from 'react'
import  supabaseClient  from '../lib/supabase'
//import { useHistory } from "react-router-dom";
import { useRouter } from 'next/router';



export default function Account() {

    const [session, setSession] = useState(null)
    const history = useRouter()


    useEffect(() => {
	setSession(supabaseClient.auth.session())
	supabaseClient.auth.onAuthStateChange((_event, session) => {
	    setSession(session)
	})
	console.log(session)
    }, [])

    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(null)
    const [website, setWebsite] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)

    useEffect(() => {
	getProfile()
    }, [session])

    async function getProfile() {
	try {
	    setLoading(true)
	    const user = supabaseClient.auth.user()

	    let { data, error, status } = await supabaseClient
		.from('profiles')
		.select(`username, website, avatar_url`)
		.eq('id', user.id)
		.single()

	    if (error && status !== 406) {
		throw error
	    }

	    if (data) {
		setUsername(data.username)
		setWebsite(data.website)
		setAvatarUrl(data.avatar_url)
	    }
	} catch (error) {
	    console.log(error.message)
	} finally {
	    setLoading(false)
	}
    }

    async function updateProfile({ username, website, avatar_url }) {
	try {
	    setLoading(true)
	    const user = supabaseClient.auth.user()

	    const updates = {
		id: user.id,
		username,
		website,
		avatar_url,
		updated_at: new Date(),
	    }

	    let { error } = await supabaseClient.from('profiles').upsert(updates, {
		returning: 'minimal', // Don't return the value after inserting
	    })

	    if (error) {
		throw error
	    }
	} catch (error) {
	    console.log(error.message)
	} finally {
	    setLoading(false)
	}
    }

    return (
	<div className="p-12 bg-white form-widget">
	    <div class="mt-8 flex align-center justify-items-center content-center text-center items-center justify-center">
		<label htmlFor="email" class="pr-2 font-black">email: </label>
		<input id="email" type="text" class="font-thin" value={session && session.user.email} disabled />
	    </div>

	    <div class="flex align-center items-center justify-center justify-items-center mt-5 font-xl">
		<button className="block p-1 pl-2 pr-2 mr-2 font-bold text-gray-100 bg-blue-500 rounded button"
		    onClick={() => {
			history.push("/tabs/log");
		    }}>

		    go back
		</button>
		<button className="block p-1 pl-2 pr-2 font-bold text-gray-100 bg-red-500 rounded button" onClick={() => supabaseClient.auth.signOut()}>
		    sign out
		</button>
	    </div>
	</div>
    )
}
