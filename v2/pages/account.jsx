import { useState, useEffect } from 'react'
import  supabaseClient  from '../lib/supabase'

export default function Account() {

    const [session, setSession] = useState(null)

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
	    alert(error.message)
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
	    alert(error.message)
	} finally {
	    setLoading(false)
	}
    }

    return (
	<div className="form-widget">
	    <div>
		<label htmlFor="email">Email</label>
		<input id="email" type="text" value={session && session.user.email} disabled />
	    </div>
	    <div>
		<label htmlFor="username">Name</label>
		<input
		    id="username"
		    type="text"
		    value={username || ''}
		    onChange={(e) => setUsername(e.target.value)}
		/>
	    </div>
	    <div>
		<label htmlFor="website">Website</label>
		<input
		    id="website"
		    type="website"
		    value={website || ''}
		    onChange={(e) => setWebsite(e.target.value)}
		/>
	    </div>

	    <div>
		<button
		    className="block button primary"
		    onClick={() => updateProfile({ username, website, avatar_url })}
		    disabled={loading}
		>
		    {loading ? 'Loading ...' : 'Update'}
		</button>
	    </div>

	    <div>
		<button className="block button" onClick={() => supabaseClient.auth.signOut()}>
		    Sign Out
		</button>
	    </div>
	</div>
    )
}
